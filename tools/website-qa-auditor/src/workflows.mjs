import { assertMutationAllowed, assertStepAllowed, canonicalRoute, isSafeNavigation, originFrom, safeText } from './policy.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';

function selectTarget(page, step) {
  if (step.testId) return page.getByTestId(step.testId);
  if (step.role) return page.getByRole(step.role, { name: step.name, exact: true });
  if (step.label) return page.getByLabel(step.label, { exact: true });
  if (step.selector) return page.locator(step.selector);
  throw new Error('Step requires testId, role/name, label or selector.');
}

export async function runWorkflows(browser, config, workflows, env = process.env, outDir = null) {
  if (!Array.isArray(workflows.scenarios)) throw new Error('Workflow file needs a scenarios array.');
  // Explicit scenarios can click or type, so only run on an approved local/staging origin.
  assertMutationAllowed(config, env);
  const results = [];
  for (const scenario of workflows.scenarios.slice(0, 60)) {
    const options = { viewport: scenario.viewport || { width: 1366, height: 768 } };
    if (scenario.storageStateEnv && env[scenario.storageStateEnv]) options.storageState = env[scenario.storageStateEnv];
    else if (env.QA_STORAGE_STATE) options.storageState = env.QA_STORAGE_STATE;
    const ctx = await browser.newContext(options);
    const page = await ctx.newPage();
    await ctx.route('**/*', async (route) => {
      const req = route.request();
      if (req.isNavigationRequest() && req.frame() === page.mainFrame() && new URL(req.url()).origin !== originFrom(config.baseUrl)) {
        await route.abort('blockedbyclient'); return;
      }
      await route.continue();
    });
    const vars = {};
    let status = 'pass'; let message = `${(scenario.steps || []).length} steps passed`;
    try {
      if (!Array.isArray(scenario.steps) || !scenario.steps.length) throw new Error('No workflow steps.');
      for (const [index, step] of scenario.steps.entries()) {
        assertStepAllowed(step, config, env);
        const prefix = `Step ${index + 1} (${step.action}): `;
        try {
          switch (step.action) {
            case 'navigate': {
              const target = step.fromVar ? vars[step.fromVar] : step.path;
              if (!target || !isSafeNavigation(target, config.baseUrl, config)) throw new Error('Unapproved navigation target');
              await page.goto(canonicalRoute(target, config.baseUrl), { waitUntil: 'domcontentloaded' });
              break;
            }
            case 'click': await selectTarget(page, step).click(); break;
            case 'fill': await selectTarget(page, step).fill(step.value ?? ''); break;
            case 'select': await selectTarget(page, step).selectOption(step.value); break;
            case 'expectVisible': await selectTarget(page, step).waitFor({ state: 'visible', timeout: 10000 }); break;
            case 'expectHidden': await selectTarget(page, step).waitFor({ state: 'hidden', timeout: 10000 }); break;
            case 'expectText': {
              const actual = await selectTarget(page, step).innerText();
              if (!actual.includes(String(step.contains))) throw new Error('Expected substring not found');
              break;
            }
            case 'expectCount': {
              const n = await selectTarget(page, step).count();
              if (n !== step.count) throw new Error(`Expected ${step.count}, got ${n}`);
              break;
            }
            case 'expectUrl': {
              const u = new URL(page.url());
              if (u.origin !== originFrom(config.baseUrl) || !u.pathname.includes(step.path)) throw new Error('Unexpected URL');
              break;
            }
            case 'capturePath': {
              const u = new URL(page.url());
              if (u.origin !== originFrom(config.baseUrl)) throw new Error('Cross-origin URL capture denied');
              vars[step.as] = u.pathname;
              break;
            }
            default: throw new Error(`Unknown workflow action ${safeText(step.action)}`);
          }
        } catch (e) { throw new Error(prefix + safeText(e?.message || e)); }
      }
    } catch (error) { status = 'fail'; message = safeText(error?.message || error, 210); }
    finally {
      if (status === 'fail' && env.QA_SCREENSHOTS === '1' && outDir) {
        const file = path.join(outDir, 'screenshots', `workflow-${results.length + 1}.png`);
        await fs.mkdir(path.dirname(file), { recursive: true });
        await page.screenshot({ path: file, fullPage: false }).catch(() => {});
      }
      await ctx.close();
    }
    results.push({ name: safeText(scenario.name || 'unnamed scenario'), status, message });
  }
  return results;
}
