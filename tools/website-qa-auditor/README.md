# DevFlowForge Website QA Auditor — local Playwright runner

Runs a bounded site-wide **passive audit** and optionally explicit **staging-only scenario tests**. It is part of [DevFlowForge](../../README.md), not a hosted browser, ChatGPT MCP server, or autonomous AI testing agent.

## Install

Node.js 20+ and a project you are authorised to test:

```bash
cd tools/website-qa-auditor
npm install
npx playwright install chromium
cp config/audit.example.json config/audit.json
# Change the URL, allowed paths and start paths before executing.
npm run audit -- --config config/audit.json
```

For Windows PowerShell, copy the config with `Copy-Item config/audit.example.json config/audit.json`, and run the same npm commands. `--help` displays CLI usage without installing dependencies.

The default example points at a **local** web server. It does not contain login details, visit third-party sites or work against a real deployment until you explicitly edit its configuration. Only same-origin allowlisted paths are crawled. Queries, downloads, action-like paths and cross-origin navigation are excluded. Adjust route prefixes to your actual project; the auditor cannot discover hidden paths that aren't in its starting list or a discovered link.

## Optional authenticated audit

Use **synthetic test identities**, not a production account. In a local/staging environment:

```bash
mkdir -p auth
npx playwright codegen --save-storage=auth/state.json http://localhost:3000
# Sign in to the disposable test user, then close codegen.
QA_STORAGE_STATE=auth/state.json npm run audit -- --config config/audit.json
```

Playwright storage-state files may contain session tokens. Keep `auth/` and `.qa-results/` untracked. Avoid sharing screenshots or logs with private data.

## Optional workflows (staging/local only)

The passive crawler **never** clicks buttons or submits forms. For explicitly authored test scenarios on disposable data:

```bash
QA_ALLOW_MUTATIONS=1 QA_APPROVED_ORIGIN=http://localhost:3000 \
  npm run audit -- --config config/audit.json --workflows config/workflows.example.json
```

On PowerShell use `$env:QA_ALLOW_MUTATIONS='1'; $env:QA_APPROVED_ORIGIN='http://localhost:3000'` before running the npm command. For potentially destructive/state-changing named buttons, `QA_ALLOW_HIGH_RISK=1` is additionally required. Use only when the test environment and its seeded data are safe. This flag does **not** grant authority to interact with someone else's site.

Supported steps: `navigate`, `click`, `fill`, `select`, `expectVisible`, `expectHidden`, `expectText`, `expectCount`, `expectUrl`, `capturePath`. Targets accept `testId`, `role` + `name`, `label` or `selector`. Use `storageStateEnv` on a scenario to test separate roles. URLs stay same-origin and allowlisted. Workflows can be designed to revisit captured paths after refresh and check persistence, but the user must define expected application behaviour.

## Output and verification

Generated `.qa-results/report.json` and `.qa-results/report.md` contain visited paths, controls, form summaries, link inventories, failed requests, browser errors, accessibility results and workflow outcomes. Screenshots on findings/failures require `QA_SCREENSHOTS=1` and remain local. High-severity findings or failing workflows make the CLI exit non-zero. Use `npm test` for Node policy tests.

This checks **only the pages visited and assertions executed**. It does not automatically prove that every field, payment, invoice, linked record or user role works. Real browser setup and target-site testing remain necessary. AI-assisted exploratory control via Playwright MCP or Stagehand requires separately configured tools and authorisation. Never enable arbitrary production clicking or automatically merge proposed code fixes.
