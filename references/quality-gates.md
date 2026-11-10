# Engineering evidence and quality gates

For changes, report each gate as **Pass**, **Fail**, **Not run**, or **Not applicable** with evidence. Never convert 'Not run' to 'Pass'.

1. Scope: verified repository, branch, environment, requirement and acceptance checks.
2. Baseline/reproduction: a failing test, logged error, trace, measured timing or explicit reason that reproduction was impossible.
3. **Mandatory architecture connection / impact triage** for existing-project coding tasks: Connected or Isolated with evidence. If Connected, use `architecture-connection-impact-analysis`: map verified producer → shared state/component → API/service → storage/policy → downstream consumers/side effects, record unknown connections, impacted routes/roles/data contracts and approved change paths; require matched regression evidence before marking ready. If Isolated, give a concise reason. The optional `tools/architecture-impact-checker/` checks report completeness only, not the accuracy of claimed architecture/tests.
4. Impact: affected modules, tenants, billing, data shapes, auth, notifications, jobs and interfaces.
5. Implementation: minimal change, pre-existing patterns followed, no uncontrolled new dependencies.
6. Tests: for behavior changes use Red → Green → Refactor when feasible; unit, integration, contract and E2E as appropriate; record test commands, failures, passes and skipped checks, not fabricated outcomes.
7. Security: secrets, least privilege, input validation, auth, data isolation, payment logic, consent, safe logging and errors.
8. Operations: migration reversibility, feature flags where warranted, delivery and retry idempotency, backups where relevant, monitoring and rollback.
9. Review: inspect final diff, API and contract changes, regression scenarios, accessibility, localization and timezone handling when affected.
10. Compression changes (when applicable): verify `Accept-Encoding` negotiation, explicit exclusions, identity fallback, Vary/cache keys, sensitive content, compressed payload integrity, streaming semantics and comparable performance before/after; if managed CDN already handles correctly, no new middleware.
11. Website QA (when applicable): publish expected vs visited routes, inventory coverage vs verified scenarios, role and viewport matrix, failed links, browser/console/API findings, axe results and actual reproduction/screenshot artifacts. Staging-only interactive testing needs an explicitly approved origin, synthetic accounts and mutation safeguards; no production clicks or emails. Distinguish discovered from tested coverage.
12. Visual design changes (when applicable): record the real audience, approved brand system and intended design depth; separate objective visual/accessibility issues from taste; capture safe before/after inventories and optional screenshots on identical local/staging fixtures; review unexpected removed content/controls and run functional QA for changed behaviours. A pixel difference alone is not a failure.
13. Handoff: links to real branch/PR/commit if created, outstanding failures and next steps. After required functional and security checks, ask whether an explicitly authorized, appropriately scoped penetration test is wanted when risk warrants it. Never initiate active testing from this suggestion.
14. Release decision: distinguish coding complete, automated tests passed, optional security assessment requested and deployment approved; no implicit production promotion.

## Change risk
- LOW: copy/style, isolated test or nonfunctional docs change. Use targeted verification.
- MEDIUM: noncritical UI data flow, internal API, caching. Run affected tests and pre/post verification.
- HIGH: auth/RLS, financial operations, identity and email delivery, schema migrations, background workers, subscription gates, cross-tenant actions. Require end-to-end safety checks and a review of backward compatibility and rollback.

## Status format
**Observed:** evidence, commands, source/paths. **Root cause:** proven vs hypothesis. **Changed:** files/PR. **Verified:** test evidence. **Risks:** concrete. **Next:** remaining action.

## Weekly improvement validation gates (v0.10.0)
- Next.js: applicability verified against current lockfile, runtime and cache usage; synthetic cross-tenant and forbidden-access checks separate from speculation.
- Browser QA: consolidated report retains failure, review, not-run, browser/viewports, screenshots when captured; check optional Playwright version and Node.js 22+ compatibility in CI.
- Agent skills: held-out positive/negative/ambiguous fixtures, with/without baseline, external evidence links and independent grading; a synthetic example is not validation.
- MCP: version, transport, audience, issuer, scope and error handling verified on approved synthetic/mocked endpoints; no secret leakage, unauthorized tool use or silent approval bypass.
- Jobs: controlled retry/crash/duplicate fixtures, SLO and alert ownership, no sensitive payload in traces, observability provider costs disclosed.
