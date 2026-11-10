import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {assessImpact} from '../src/core.mjs';
const template=JSON.parse(readFileSync(new URL('../examples/connected-release.json',import.meta.url)));
const copy=()=>structuredClone(template);
const errors=r=>r.errors.map(e=>e.code);
test('synthetic connected fixture is structurally complete',()=>{
  const r=assessImpact(copy());assert.equal(r.ready,true);assert.ok(r.warnings.some(w=>w.code==='synthetic'));assert.equal(r.summary.affectedSurfaces,2);
});
test('triage is mandatory and cannot be silently omitted',()=>{
 const d=copy();delete d.classification;assert.equal(assessImpact(d).ready,false);assert.ok(errors(assessImpact(d)).includes('missing-triage'));
});
test('missing upstream/downstream edges fail a connected map',()=>{
 const d=copy();d.edges=[];assert.ok(errors(assessImpact(d)).includes('missing-edges'));
});
test('dangling graph edge and missing source evidence fail',()=>{
 const d=copy();d.edges[0].to='made-up';d.nodes[0].evidence='';const r=assessImpact(d);assert.ok(errors(r).includes('invalid-edge'));assert.ok(errors(r).includes('unverified-node'));
});
test('sibling path not covered by approved dir',()=>{
 const d=copy();d.approvedPaths=['src/components/'];d.changePaths=['src/components-malicious/file.ts'];assert.ok(errors(assessImpact(d)).includes('out-of-scope'));
});
test('traversal paths rejected',()=>{
 const d=copy();d.changePaths=['src/components/../secrets.ts'];assert.ok(errors(assessImpact(d)).includes('invalid-changes'));
});
test('release requires every impacted consumer to be tested',()=>{
 const d=copy();d.tests=d.tests.filter(x=>x.name.includes('job'));assert.ok(errors(assessImpact(d)).includes('untested-consumer'));
});
test('unrun is not passed on release',()=>{
 const d=copy();d.tests[0].status='not-run';assert.ok(errors(assessImpact(d)).includes('unresolved-test'));assert.ok(errors(assessImpact(d)).includes('unverified-consumer'));
});
test('checks cannot silently claim pass without evidence',()=>{
 const d=copy();d.riskChecks.authorization.evidence='';assert.ok(errors(assessImpact(d)).includes('risk-evidence'));
});
test('unknown dependency prevents ready claim',()=>{
 const d=copy();d.unknownConnections=['queue listener not inspected'];assert.ok(errors(assessImpact(d)).includes('unresolved-connections'));
});
test('plan allows pending checks but records an uninspected warning',()=>{
 const d=JSON.parse(readFileSync(new URL('../examples/connected-plan.json',import.meta.url)));const r=assessImpact(d);assert.equal(r.ready,true);assert.ok(r.warnings.some(w=>w.code==='uninspected-connections'));
});
test('isolated work requires documented justification and release tests',()=>{
 const d={task:'Fix a label in one view',repository:'example/test',stage:'release',classification:{kind:'isolated',reason:'This text label has no shared state or downstream consumers'},approvedPaths:['src/pages/'],changePaths:['src/pages/home.tsx'],tests:[{name:'render label',status:'passed',evidence:'synthetic test output line 5'}]};assert.equal(assessImpact(d).ready,true);d.classification.reason='trivial';assert.equal(assessImpact(d).ready,false);
});

test('disconnected affected surface is not accepted',()=>{
 const d=copy();d.edges=d.edges.slice(0,1);assert.ok(errors(assessImpact(d)).includes('disconnected-surface'));
});
test('unknownConnections must explicitly be considered',()=>{
 const d=copy();delete d.unknownConnections;assert.ok(errors(assessImpact(d)).includes('unrecorded-unknowns'));
});
