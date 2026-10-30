# DevFlowForge skill routing and composition

## Activation rules
- First inspect the user's objective and project context, then activate the smallest set of relevant skills. Never load all skills simply because they are installed.
- For major requests, start with `cto-orchestration` and `requirements-acceptance-criteria`; for existing projects include `cross-stack-codebase-onboarding`.
- Use `ui-ux-design` to define human interaction, `design-systems-tokens` for reusable foundations, `design-to-code-implementation` for code, and `visual-design-critique` for final inspection.
- Use `frontend-ux-accessibility` for implementation basics and `accessibility-audit-wcag` for thorough audits. Neither by itself proves WCAG certification.
- For behavioral code work use `test-driven-development` (Red → Green → Refactor); `unit-integration-e2e-testing` for layered suites; `browser-e2e-visual-regression` for real browser flows; `contract-compatibility-testing` for producer/consumer compatibility; and `test-strategy-release-gates` before claiming completion. Avoid mandatory TDD claims for documentation-only work.
- Only *after* relevant automated/functional verification, use `authorized-penetration-test-handoff` to offer a separate, scoped, consent-based penetration test for exposed or sensitive applications. Do not automatically test or silently infer consent.
- Use `performance-engineering` for general bottlenecks, `web-vitals-performance-audit` for field/lab web metrics, `database-query-index-optimization` for database query plans, or `load-stress-capacity-testing` for authorised load measurements.
- Activate vendor-specific skills (`supabase-rls-multi-tenant`, `stripe-billing-integrity`) only when the verified project uses those services.
- Security/privacy/AI/production changes add the relevant safety review skill and approval checks even if another skill owns implementation.

## Avoid contradictory advice
If multiple skills overlap, the more specific skill owns the technical procedure; the general skill owns coordination and the reporting contract. De-duplicate checklists, tests and output. Favor current repository evidence and authoritative version-specific documentation over historical assumptions.

## Suggested outcomes
For design: user task map + states + reusable components + accessibility review.
For bug fixes: reproducible failure + root cause + smallest safe fix + regression test.
For architecture: tradeoffs + system boundaries + migration and rollback.
For production releases: rollout decision + test evidence + monitoring and rollback.
For AI: dataset + baseline + measured quality and cost + human oversight.

Do not claim skills alone execute code, operate tools or have autonomous memory. They are instruction assets compatible with capable agent hosts.
