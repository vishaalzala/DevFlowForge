import test from 'node:test';
import assert from 'node:assert/strict';
import { isSafeNavigation, canonicalRoute, validateConfig, assertMutationAllowed, assertStepAllowed, safeText } from '../src/policy.mjs';
import { markdownReport, summarise } from '../src/report.mjs';

const config = { baseUrl: 'https://staging.example.test', environment: 'staging', startPaths: ['/dashboard'], allowedPathPrefixes: ['/dashboard'], maxPages: 15, maxDepth: 3 };
const yes = (href) => isSafeNavigation(href, config.baseUrl, config);
test('same-origin, path-restricted navigation', () => {
  assert.equal(yes('/dashboard'), true);
  assert.equal(yes('/dashboard/invoices'), true);
  assert.equal(yes('/dashboards'), false);
  assert.equal(yes('/'), false);
  assert.equal(yes('https://evil.example/dashboard'), false);
  assert.equal(yes('javascript:alert(1)'), false);
  assert.equal(yes('https://user:secret@staging.example.test/dashboard'), false);
});
test('read-only crawl rejects dangerous and query-bearing links', () => {
  for (const href of ['/dashboard/logout', '/dashboard/delete/4', '/dashboard/cancel-plan', '/dashboard/export.csv', '/dashboard?token=abc', '/api/users', '/dashboard/checkout']) assert.equal(yes(href), false, href);
  assert.equal(canonicalRoute('/dashboard/invoices#tab', config.baseUrl), 'https://staging.example.test/dashboard/invoices');
});
test('config validation enforces bounds and configured starts', () => {
  assert.deepEqual(validateConfig(config), {maxPages:15,maxDepth:3});
  assert.throws(() => validateConfig({...config, startPaths:['https://bad.test/']}), /safe/);
  assert.throws(() => validateConfig({...config, maxPages:2000}), /maxPages/);
  assert.throws(() => validateConfig({...config, environment:'production'}), /environment/);
});
test('staging approval, explicit interactions and high-risk actions', () => {
  const env = { QA_ALLOW_MUTATIONS:'1', QA_APPROVED_ORIGIN:'https://staging.example.test' };
  assert.equal(assertMutationAllowed(config, env),true);
  assert.throws(() => assertMutationAllowed(config, {}), /opt-in/);
  assert.throws(() => assertMutationAllowed(config, {...env, QA_APPROVED_ORIGIN:'https://other.example'}), /exact/);
  assert.throws(() => assertMutationAllowed({...config, environment:'production-readonly'},env), /forbidden/);
  assert.doesNotThrow(() => assertStepAllowed({action:'click',name:'Next'},config,env));
  assert.throws(() => assertStepAllowed({action:'click',name:'Finish Job'},config,env), /HIGH_RISK/);
  assert.doesNotThrow(() => assertStepAllowed({action:'click',name:'Finish Job'},config,{...env,QA_ALLOW_HIGH_RISK:'1'}));
});
test('reports show actual bounded counts and redact standard secrets', () => {
  assert.equal(safeText('sensitive@example.com has bearer abcdefabcde'), '[email] has bearer [redacted]');
  const data = { origin:'https://staging.example.test', environment:'staging', mode:'passive-audit', startedAt:'2026-11-06', pages:[{path:'/dashboard',viewport:'desktop',controls:[{},{}],forms:[{}],links:[{}],findings:[{type:'broken-link',message:'HTTP 404',severity:'high'}]}],workflows:[{name:'Quote flow',status:'not-run'}],findings:[] };
  assert.equal(summarise(data).visitedPages,1);
  assert.equal(summarise(data).bySeverity.high,1);
  assert.match(markdownReport(data),/Not run|not run/i);
});
