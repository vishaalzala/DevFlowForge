#!/usr/bin/env node
/** Bounded Playwright browser audit; never submits forms or clicks controls in crawl mode. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { canonicalRoute, isSafeNavigation, originFrom, safeText, validateConfig } from './policy.mjs';
import { markdownReport, summarise } from './report.mjs';
import { runWorkflows } from './workflows.mjs';

function argValue(flag) { const at = process.argv.indexOf(flag); return at >= 0 ? process.argv[at + 1] : null; }
function ensureAbsoluteFile(f, configDir) { return path.resolve(configDir, f); }
function readableError(err) { return safeText(err?.message || err, 220); }
function fileTag(pathname) { return pathname.replace(/[^a-z0-9-]/gi, '-').slice(0, 65) || 'root'; }

async function collectPage(page, config, pathname, name, outDir, axeBuilder) {
  const findings = [];
  const errors = [];
  const networkFailures = [];
  page.on('pageerror', (err) => errors.push(readableError(err)));
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push('Browser console reported an error'); });
  page.on('requestfailed', (req) => {
    const u = new URL(req.url());
    if (u.origin === originFrom(config.baseUrl)) networkFailures.push(u.pathname);
  });
  const target = canonicalRoute(pathname, config.baseUrl);
  let response;
  try {
    response = await page.goto(target, { waitUntil: 'domcontentloaded', timeout: config.navigationTimeoutMs || 15000 });
    await page.waitForLoadState('load', { timeout: 4000 }).catch(() => {});
    if (config.readySelector) await page.locator(config.readySelector).first().waitFor({ state: 'visible', timeout: config.readyTimeoutMs || 8000 }).catch(() => {
      findings.push({ severity: 'medium', type: 'readiness-timeout', message: 'Configured readySelector did not become visible.' });
    });
  } catch (error) {
    findings.push({ severity: 'high', type: 'navigation', message: readableError(error) });
    return { path: new URL(target).pathname, viewport: name, forms: [], controls: [], links: [], findings };
  }
  if (new URL(page.url()).origin !== originFrom(config.baseUrl)) {
    findings.push({ severity: 'high', type: 'cross-origin-redirect', message: 'Navigation redirected outside the approved origin; not inspected.' });
    return { path: new URL(target).pathname, viewport: name, forms: [], controls: [], links: [], findings };
  }
  if (response && response.status() >= 400) findings.push({ severity: 'high', type: 'http-status', message: `Document HTTP ${response.status()}` });
  const captured = await page.evaluate(() => {
    // Never collect field values. Use synthetic test data only; labels can contain names.
    const label = (el) => String(el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent || el.getAttribute('placeholder') || '').trim().replace(/\s+/g, ' ').slice(0, 105);
    const controls = [...document.querySelectorAll('button,input,select,textarea,[role="button"],[role="combobox"]')]
      .slice(0, 700).map(el => ({ tag: el.tagName.toLowerCase(), type: el.getAttribute('type') || '', name: label(el), disabled: !!el.disabled, id: el.id || '', required: !!el.required }));
    const forms = [...document.forms].slice(0, 150).map(f => ({ method: f.method || '', fields: f.querySelectorAll('input,select,textarea').length }));
    const links = [...document.querySelectorAll('a[href]')].slice(0, 1000).map(el => ({ href: el.href, name: label(el) }));
    return { title: document.title, controls, forms, links };
  });
  const cleanedLinks = captured.links.map(link => ({
    path: (() => { try { const u = new URL(link.href); return u.origin === originFrom(config.baseUrl) ? u.pathname : '[external]'; } catch { return '[invalid]'; } })(),
    name: safeText(link.name),
  }));
  for (const error of errors.slice(0, 30)) findings.push({ severity: 'medium', type: 'browser-error', message: error });
  for (const p of [...new Set(networkFailures)].slice(0, 30)) findings.push({ severity: 'medium', type: 'network-failure', message: `Request failed: ${safeText(p)}` });
  for (const control of captured.controls) {
    if (!control.name && !['hidden', 'submit'].includes(control.type)) findings.push({ severity: 'low', type: 'unlabelled-control', message: `Possible unnamed ${control.tag} ${safeText(control.id)}` });
  }
  if (config.accessibility !== false && axeBuilder) {
    try {
      const axe = await new axeBuilder({ page }).analyze();
      for (const violation of axe.violations.slice(0, 50)) {
        findings.push({ severity: ['critical', 'serious'].includes(violation.impact) ? 'high' : 'medium', type: `axe:${violation.id}`, message: `${safeText(violation.help)} (${violation.nodes.length} nodes; ${safeText(violation.helpUrl, 80)})` });
      }
    } catch (error) { findings.push({ severity: 'medium', type: 'axe-run', message: readableError(error) }); }
  }
  if (process.env.QA_SCREENSHOTS === '1' && findings.length) {
    const file = path.join(outDir, 'screenshots', `${fileTag(new URL(target).pathname)}-${name}.png`);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await page.screenshot({ path: file, fullPage: false }).catch(() => {});
  }
  return {
    path: new URL(target).pathname, viewport: name, title: safeText(captured.title),
    controls: captured.controls.map(c => ({ ...c, name: safeText(c.name), id: safeText(c.id) })),
    forms: captured.forms, links: cleanedLinks, findings,
    candidates: captured.links.filter(x => isSafeNavigation(x.href, config.baseUrl, config)).map(x => canonicalRoute(x.href, config.baseUrl)),
  };
}

async function main() {
  if (process.argv.includes('--help')) {
    console.log('Usage: node src/audit.mjs --config config/audit.json [--workflows config/workflows.json]');
    console.log('Passive crawl by default. Interactive workflow execution requires explicit staging approval flags.');
    return;
  }
  const file = argValue('--config');
  if (!file) throw new Error('Missing --config file. See config/audit.example.json.');
  const configPath = path.resolve(file);
  const configDir = path.dirname(configPath);
  const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
  const { maxPages, maxDepth } = validateConfig(config);
  const outDir = path.resolve(configDir, config.outputDir || '../.qa-results');
  if (outDir === path.parse(outDir).root) throw new Error('Refusing to write results to filesystem root.');
  const { chromium, firefox, webkit } = await import('playwright');
  const engine = { chromium, firefox, webkit }[config.browser || 'chromium'];
  if (!engine) throw new Error('Unsupported browser: choose chromium, firefox or webkit.');
  let axeBuilder = null;
  if (config.accessibility !== false) axeBuilder = (await import('@axe-core/playwright')).default;
  const browser = await engine.launch({ headless: true });
  const report = { origin: originFrom(config.baseUrl), environment: config.environment, mode: 'passive-audit', startedAt: new Date().toISOString(), pages: [], workflows: [], findings: [] };
  try {
    const profiles = config.viewports || [{ name: 'desktop', width: 1366, height: 768 }, { name: 'mobile', width: 390, height: 844 }];
    for (const vp of profiles) {
      if (!vp.name || vp.width < 240 || vp.height < 240) throw new Error('Invalid viewport profile.');
      const contextOptions = { viewport: { width: vp.width, height: vp.height }, serviceWorkers: 'block' };
      if (process.env.QA_STORAGE_STATE) contextOptions.storageState = path.resolve(process.env.QA_STORAGE_STATE);
      const context = await browser.newContext(contextOptions);
      const page = await context.newPage();
      await context.route('**/*', async (route) => {
        const req = route.request();
        if (req.isNavigationRequest() && req.frame() === page.mainFrame() && new URL(req.url()).origin !== originFrom(config.baseUrl)) {
          await route.abort('blockedbyclient'); return;
        }
        await route.continue();
      });
      try {
        const queue = config.startPaths.map(p => ({ href: canonicalRoute(p, config.baseUrl), depth: 0 }));
        const visited = new Set();
        while (queue.length && visited.size < maxPages) {
          const { href, depth } = queue.shift();
          if (!isSafeNavigation(href, config.baseUrl, config) || visited.has(href)) continue;
          visited.add(href);
          const result = await collectPage(page, config, href, vp.name, outDir, axeBuilder);
          const { candidates = [], ...stored } = result;
          report.pages.push(stored);
          if (depth < maxDepth) for (const href of candidates) if (!visited.has(href)) queue.push({ href, depth: depth + 1 });
        }
      } finally { await context.close(); }
    }
    const workflowFile = argValue('--workflows');
    if (workflowFile) {
      report.mode = 'passive-audit+explicit-workflows';
      const workflows = JSON.parse(await fs.readFile(ensureAbsoluteFile(workflowFile, process.cwd()), 'utf8'));
      report.workflows = await runWorkflows(browser, config, workflows, process.env, outDir);
    }
  } finally { await browser.close(); }
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, 'report.json'), JSON.stringify({ ...report, summary: summarise(report) }, null, 2));
  await fs.writeFile(path.join(outDir, 'report.md'), markdownReport(report));
  const summary = summarise(report);
  console.log(`Website QA Auditor: ${summary.visitedPages} pages; ${summary.controlsInventoried} controls; ${summary.issues} issues; ${summary.workflows.failed} failing workflows`);
  console.log(`Saved: ${path.join(outDir, 'report.md')} and report.json`);
  if (summary.workflows.failed || summary.bySeverity.critical || summary.bySeverity.high) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(err => { console.error(`QA audit failed: ${safeText(err?.message || err, 230)}`); process.exitCode = 1; });
}
