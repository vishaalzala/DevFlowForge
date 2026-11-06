# Website QA Auditor — practical setup, test matrix and limits

## Dependencies and architecture

The `website-qa-auditor` skill is an instruction workflow. A separate reproducible Node CLI under `tools/website-qa-auditor/` performs bounded browser inspection via [Microsoft Playwright](https://github.com/microsoft/playwright), with optional [axe-core Playwright](https://github.com/dequelabs/axe-core) checks. It does not add an MCP server, schedule scans, control a private browser, or supply hosted AI credentials. Additional AI exploration requires the user's own configured and authorised agent/browser runtime. Do not install optional exploration packages automatically.

Do **not** make a generic crawler submit every form or click every button. Destructive links, subscription actions, payments, invitation, email, SMS, privileged changes and deletion can produce irreversible consequences. Even passive GET navigation should be restricted to an approved origin and known-safe route prefixes.

## Start with a passive report

```bash
cd tools/website-qa-auditor
npm install
npx playwright install chromium
cp config/audit.example.json config/audit.json
# Edit baseUrl, environment, allowedPathPrefixes, startPaths, viewports and blocked paths.
npm run audit -- --config config/audit.json
```

The passive audit inventories discovered pages, links and controls and attempts an axe-core accessibility scan. It does **not** invoke button actions, submit forms or exercise business workflows. Its JSON/Markdown reports go under `.qa-results/`, excluded from Git. Console failures are reported without dumping raw messages. Screenshots are disabled by default: set `QA_SCREENSHOTS=1` only for a sanitised staging environment.

Authenticated pages: Use a test account to create a local Playwright storage-state file; see the README in the tool directory. Point `QA_STORAGE_STATE` at it. Do not commit credentials, tokens, actual customer screenshots or test reports. Production-readonly mode must remain passive and requires permission from the site owner.

## Test explicit workflows on disposable staging only

Create a scenario file describing known-safe steps using `navigate`, `click`, `fill`, `select`, `expectVisible`, `expectHidden`, `expectText`, `expectCount`, `expectUrl`, `capturePath`. Capture actual outcome after each transition. The CLI checks `QA_ALLOW_MUTATIONS=1` **and** `QA_APPROVED_ORIGIN` equal to the configured origin. Potentially state-changing clicks also need `QA_ALLOW_HIGH_RISK=1`. This is necessary but **not** a substitute for the site owner's permission, synthetic data or sandbox billing configuration.

```bash
QA_ALLOW_MUTATIONS=1 QA_APPROVED_ORIGIN=http://localhost:3000 \
  npm run audit -- --config config/audit.json --workflows config/workflows.example.json
```

**Example business acceptance cases to translate into tests (not built-in assertions):**

- Entity created without items persists as an empty document in listings and after refresh.
- Linked records update correctly in both directions when their statuses change.
- Payment completion is simulated using sandbox/test payment providers; avoid live charges.
- Duplicate clicks and retries do not create duplicate records or notifications.
- Missing email, phone, invalid dates, permissions, RLS and multi-tenant isolation produce safe and clear failures.
- Documents exported as PDF and email attachments contain consistent totals, without sending real email.
- Desktop/mobile layouts have usable forms, focus handling and accessibility.

Make every test name expected result and role. Verify persistence with authorised API/database reads when needed. Do not infer correctness from matching UI text only. Build project-specific flows from actual requirements and existing tests; never hard-code one client's data model into the public plugin.

## Test coverage matrix

| Layer | Discovery/check | Meaningful verification |
| --- | --- | --- |
| Routes | Link and source-route inventory, HTTP/navigation failures | Visit authorised route with the expected role |
| Controls | Fields, dropdowns, links, buttons, labels, required indicators | Assert the resulting UI/state through explicit scenario steps |
| Functional | Empty, validation, retry, duplicate and refresh states | Deterministic staging tests with seeded fixtures |
| Cross-system | Document/job/payment/reminder sync | Integration/API/database assertions with sandbox services |
| Access | Admin/staff/customer roles, direct URLs, server auth/RLS | Negative-access tests on disposable accounts |
| Accessibility | axe-core, keyboard/assistive review | Automated findings plus manual checks |
| Responsive | Representative desktop and mobile viewports | Visual baselines and interaction checks on both |
| Operational | Console errors, failed APIs, timeouts, reports | Reproduction and fixed regression test |

## Before accepting an audit as complete

Publish route coverage **counts** alongside findings: expected known routes vs visited; buttons inventoried vs scenario-asserted; requested roles vs tested. Mark inaccessible routes, skipped scenarios and broken dependencies as **Not run**, not **Pass**. Provide reproducible steps, screenshots only if captured, severity, owner, evidence and suggested fix. For fixed bugs, follow Red → Green → Refactor and run affected suites. Approval is required for production testing beyond passive inspection and for production modifications.

Licensing: this is independently authored DevFlowForge logic. Playwright is Apache-2.0; axe-core is MPL-2.0; verify the precise dependency and transitives in the user's lockfile when distributing binaries. Optional external AI frameworks have independent licenses and requirements; this module does not bundle them.
