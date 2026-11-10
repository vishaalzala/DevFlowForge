# Architecture Connection & Impact Analysis — evidence and release playbook

## Activation and decision rule
For **every existing-project coding request**, perform a short architecture-connection triage in `cto-orchestration`. If the request spans multiple routes, shared data/selector/state, API↔database, generated documents, permissions or lifecycle transitions, classify as **Connected** and use `architecture-connection-impact-analysis`. For a strictly isolated change, record a reason and keep verification proportional. Do not treat a change as isolated merely because its symptom appears on one screen. For read-only investigations produce findings, not code changes.

## Trace the connected workflow (source-grounded)

| Boundary | Evidence to inspect | Typical regressions |
|---|---|---|
| Entry / consumers | Route definitions, component props, selectors, reused hooks, query parameters | One route works while another doesn't; wrong default selection |
| State and transformation | Initial values, async effects, normalized IDs, caches, request builders | Stale requests, wrong key, missing refresh, empty defaults |
| API / services | Request handlers, validation, response shape, feature flags, error handling | Data lost between layers; unhandled empty response |
| Persistence | Actual schema, foreign keys, joins, historical rows, migrations | Incorrect relation, old records not covered, duplicate documents |
| Security | Auth, tenant/company scoping, policy/RLS, role restrictions, signed URLs | Cross-tenant exposure or incorrectly hidden records |
| Downstream | Conversions, invoices, jobs, files/PDFs, email/SMS, audit logs, queues, reports | Side effects ignored, wrong linked IDs, unintended notification |

Build a directed dependency graph with **verified edges referencing actual source evidence**. Trace *upstream origin* and *downstream consequences*, not only the failing page. If repository access is limited, mark the missing parts **Not inspected** and block unsupported completion claims.

## Example: a shared vehicle selector is blank on multiple entry routes

This is a **hypothetical example**, not an observed finding in any particular project.

1. Identify all consumer routes, the shared record selector and the expected relationship between a customer and a vehicle. Distinguish new/edit flows and null customer states.
2. Trace component props → data-fetch call → API/service → query/join → tenant and role policy → vehicle records, with real identifiers and filters verified from source.
3. Search other consumers of the shared vehicle hook/query and every path converting draft documents into persistent records. Check other vehicle outputs (PDFs, customer history, completed jobs) **only where connected evidence exists**.
4. Reproduce with synthetic fixtures: vehicle attached to chosen customer, no vehicle, existing historical record, incorrect tenant, route reload, rapid selection changes and failed network. Verify only authorized records are returned.
5. Fix root ownership (for example, a shared query contract) instead of duplicating patches across each UI page; edit additional consumers only if their contracts really require it.
6. Cover the three entry screens and one persisted cross-workflow state path in targeted regression tests. Mark unrun flows and risk separately.

## Impact Map contract

Record the repository, environment, scope and each observed connection with a real file/API/schema/test reference. For each proposed edit, link to an affected surface and positive and negative assertions. Use `tools/architecture-impact-checker/examples/` to see a **synthetic** format; never treat sample paths or made-up evidence as actual. The optional checker is an *attestation quality gate*, not a static analyzer, tracing engine or independent proof of test execution.

## Mandatory before implementation and release

- Investigation/plan: record **Connected/Isolated**, verified nodes/edges, unknowns and estimated impact, authorized scope and proposed validation. **Do not** claim all connections are found.
- Implementation: preserve smallest necessary patch and track any newly discovered consumers. Stop and seek consent if changes would cross the approved scope or require destructive or financial actions.
- Release review: inspect the diff; require regression evidence across known affected surfaces and relevant auth/tenant/data/side-effect boundaries; record failures and unrun checks honestly. Use the optional checker in CI to reject incomplete JSON impact reports if project policy requires it.
- Documentation: save evidence-backed summaries only with proper repository access; avoid secrets, personal data and unsupported architectural assertions.
