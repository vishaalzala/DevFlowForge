# Engineering evidence and quality gates

For changes, report each gate as **Pass**, **Fail**, **Not run**, or **Not applicable** with evidence. Never convert 'Not run' to 'Pass'.

1. Scope: verified repository, branch, environment, requirement and acceptance checks.
2. Baseline/reproduction: a failing test, logged error, trace, measured timing or explicit reason that reproduction was impossible.
3. Impact: affected modules, tenants, billing, data shapes, auth, notifications, jobs and interfaces.
4. Implementation: minimal change, pre-existing patterns followed, no uncontrolled new dependencies.
5. Tests: for behavior changes use Red → Green → Refactor when feasible; unit, integration, contract and E2E as appropriate; record test commands, failures, passes and skipped checks, not fabricated outcomes.
6. Security: secrets, least privilege, input validation, auth, data isolation, payment logic, consent, safe logging and errors.
7. Operations: migration reversibility, feature flags where warranted, delivery and retry idempotency, backups where relevant, monitoring and rollback.
8. Review: inspect final diff, API and contract changes, regression scenarios, accessibility, localization and timezone handling when affected.
9. Handoff: links to real branch/PR/commit if created, outstanding failures and next steps. After required functional and security checks, ask whether an explicitly authorized, appropriately scoped penetration test is wanted when risk warrants it. Never initiate active testing from this suggestion.
10. Release decision: distinguish coding complete, automated tests passed, optional security assessment requested and deployment approved; no implicit production promotion.

## Change risk
- LOW: copy/style, isolated test or nonfunctional docs change. Use targeted verification.
- MEDIUM: noncritical UI data flow, internal API, caching. Run affected tests and pre/post verification.
- HIGH: auth/RLS, financial operations, identity and email delivery, schema migrations, background workers, subscription gates, cross-tenant actions. Require end-to-end safety checks and a review of backward compatibility and rollback.

## Status format
**Observed:** evidence, commands, source/paths. **Root cause:** proven vs hypothesis. **Changed:** files/PR. **Verified:** test evidence. **Risks:** concrete. **Next:** remaining action.
