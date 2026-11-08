# DevFlowForge skill routing and composition

## Activation rules
- First inspect the user's objective and project context, then activate the smallest set of relevant skills. Never load all skills simply because they are installed.
- For major requests, start with `cto-orchestration` and `requirements-acceptance-criteria`; for existing projects include `cross-stack-codebase-onboarding`.
- Use `ui-ux-design` to define human interaction, `design-systems-tokens` for reusable foundations, `design-to-code-implementation` for code, and `visual-design-critique` for final inspection.
- For distinctive new-page concepts, activate `visual-direction-engine`; for objective defects versus subjective aesthetic signals, activate `design-quality-auditor`. For an existing design being changed, use `design-preservation-verification` with before/after route, control and screenshot evidence. Read `references/design-intelligence-quality.md`. The optional `tools/design-intelligence/` local/staging browser runner is not a hosted ChatGPT agent and does not click, submit or access production.
- Use `frontend-ux-accessibility` for implementation basics and `accessibility-audit-wcag` for thorough audits. Neither by itself proves WCAG certification.
- For site-wide functional coverage and control inventories, use `website-qa-auditor` and `references/website-qa-audit-playbook.md`. Run the optional local Playwright tool only against an authorised target; crawl read-only by default, and require staging-only approval for explicit workflow interactions. Pair with `browser-e2e-visual-regression`, `unit-integration-e2e-testing` and release gates. A skills-only ChatGPT installation does not itself control a browser.
- For behavioral code work use `test-driven-development` (Red → Green → Refactor); `unit-integration-e2e-testing` for layered suites; `browser-e2e-visual-regression` for real browser flows; `contract-compatibility-testing` for producer/consumer compatibility; and `test-strategy-release-gates` before claiming completion. Avoid mandatory TDD claims for documentation-only work.
- Only *after* relevant automated/functional verification, use `authorized-penetration-test-handoff` to offer a separate, scoped, consent-based penetration test for exposed or sensitive applications. Do not automatically test or silently infer consent.
- Use `performance-engineering` for general bottlenecks, `web-vitals-performance-audit` for field/lab web metrics, `database-query-index-optimization` for database query plans, or `load-stress-capacity-testing` for authorised load measurements.
- Use `adaptive-http-compression` for negotiated HTTP body compression (Zstd/Brotli/Gzip), actual client `Accept-Encoding` support and CDN/cache correctness; combine with `performance-engineering` for bottleneck investigation or `web-vitals-performance-audit` for user-visible metrics. Do not use user-agent mobile/desktop assumptions or add second compression middleware without confirming CDN behavior.
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

## Weekly improvement v0.10.0 routing
- For published framework advisories and tenant/caching conditions, start with `dependency-vulnerability-upgrades`; pair with `web-framework-architecture` and `security-permissions-billing` **only when verified**, and use `references/nextjs-tenant-security-review.md`.
- For site-wide browser report triage, use `website-qa-auditor` plus `tools/qa-report-aggregator/` to join observed QA and design outputs. Never equate discovered pages with tested workflows; if a host uses Playwright Test, its separate failure-only reporter does not apply automatically to our standalone runner.
- For measuring skill gains, use `prompt-and-agent-skill-evaluation` and optional offline `tools/skill-evaluator/`; require actual externally graded baseline/candidate evidence, not a synthetic sample score as proof.
- For MCP connection work, use `agent-tool-design-and-safety` with `references/mcp-version-compatibility.md`; verify negotiated version and transport before authorizing tool operations.
- For scheduled jobs and observability, combine `background-jobs-idempotency`, `observability-slo-error-budgets` and `references/background-job-observability.md`; protect data and telemetry costs.
