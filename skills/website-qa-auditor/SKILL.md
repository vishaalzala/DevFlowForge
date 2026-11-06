---
name: website-qa-auditor
description: Use when auditing a whole website or application across routes, links, forms, buttons, permissions, accessibility, and business journeys, especially using Playwright or AI-assisted exploration.
---

# Website QA Auditor — evidence-driven site-wide testing

**Purpose:** Audit an authorised website systematically and turn observed problems into reproducible regression tests. Combine the standalone Playwright runner in `../../tools/website-qa-auditor/` with the project's own E2E, integration and domain tests. Read `../../references/website-qa-audit-playbook.md` before execution and use `browser-e2e-visual-regression`, `unit-integration-e2e-testing`, `test-driven-development` and `test-strategy-release-gates` where relevant.

## Workflow

1. **Discover boundaries.** Confirm the exact repository, deployed environment, authorised origin, user roles and routes. Inspect route definitions, permission rules, workflow state transitions and test data. Never infer full coverage from an initial homepage crawl.
2. **Select safe access.** Prefer staging/local, seeded synthetic accounts, least-privilege test identities, and a disposable data store. Keep Playwright `storageState` outside Git and reports. Production can receive a bounded passive read-only inspection only with the site's owner's permission. No production form submission, destructive actions, payments, emails, SMS or permission changes.
3. **Build a route and control inventory.** Map every known route to its role, viewports, forms, inputs, buttons, links, navigation, empty/error/loading states, date fields and API dependencies. Use both repository inspection and discovered links; compare discovered vs expected routes.
4. **Run deterministic passive audits.** The included runner performs allowlisted same-origin navigation, page/control/field inventory, document errors, failed requests, accessibility checks via axe-core, and responsive viewport inspection. It does not click buttons or submit forms while crawling. Optional screenshots are disabled by default.
5. **Model business workflows.** From actual project requirements and observed behavior, author explicit staging-only Playwright scenario steps and assertions; prove persisted state and server-side outcomes, not merely that a button was clicked. Check empty documents, linked entities, stale state after refresh, wrong-role access, duplicate actions, validation and recovery. Use data creation/cleanup only with explicit approval; some steps require a stronger high-risk approval flag.
6. **Use AI to extend, not replace, testing.** With separately installed and authorised browser tooling, an assistant may explore previously unseen controls, propose tests and triage failures. Playwright MCP, Stagehand or other automation adapters are optional; their installation, authentication and agent runtimes are **not** provided by this skills package. Never claim an autonomous browser agent is active merely because this skill is installed.
7. **Collect evidence.** For every failed check record route, role, environment, browser/viewport, action, expected vs observed result, reproducible steps, severity, relevant console/request errors and screenshot/trace only when actually captured. Mask secrets and avoid customer PII in logs and images.
8. **Fix via TDD after approval.** Report-only by default. If asked to repair, first reproduce with a failing regression test, apply a scoped fix on a feature branch, rerun unit/integration/E2E and compare previous failures. Do not merge, deploy or alter production without authorisation.

## Coverage and safety contract

- Separate **discovered**, **visited**, **automated-asserted** and **manually-reviewed** routes. A crawler cannot discover every authenticated or hidden route by itself.
- Never bulk-click controls or assume an action is safe because it is a GET request; use path/host allowlists, limits, and explicit scenario definitions.
- Never assert all buttons, permission boundaries, payments or workflows pass unless corresponding tests were run with verified outcomes. Accessibility automation is partial.
- Run approval-gated workflows only on an explicitly confirmed staging/local origin. Stop if redirected to an unauthorised origin or when the target environment becomes uncertain.

**Output:** Route/control inventory, risk-based test matrix, a per-failure report with actual artifacts, Pass/Fail/Not run/Not applicable results, coverage gaps, and follow-up PR proposal where authorised.
