---
name: architecture-connection-impact-analysis
description: Use when a bug or feature crosses connected routes, selectors, shared components, APIs, databases, permissions, conversions, background jobs or documents; require a dependency and impact map before changes.
---

# Architecture Connection & Impact Analysis

**Goal:** Fix a cause across connected workflows rather than patching each visible symptom independently. This is a **required gate** for interconnected implementation and root-cause work. Read `../../references/architecture-connection-impact-playbook.md` and `../../references/quality-gates.md`. Use with `cto-orchestration`, `root-cause-debugging`, `repository-architecture-audit`, `unit-integration-e2e-testing` and `test-strategy-release-gates`. This skill does not itself obtain repository, database or browser access.

## Mandatory triage (every existing-project code task)
1. Inspect the actual repository/branch/environment and the user's exact permission scope. Classify the task **Connected** or **Isolated** with a short, verifiable reason. Multiple pages showing the same missing value, shared selectors, persisted identity, quotes/documents, tenant filtering, state transitions and reuse/conversion flows are **Connected** until evidence proves otherwise. If the task is only planning or explicitly read-only, do not alter files.
2. For **Connected** work, do not recommend a code change until the involved dependencies are traced using real source files, schemas, requests, logs or tests. Unknown connections must be labelled **Unverified**; do not infer table names, paths, roles or API endpoints from screenshots, memory or code conventions.
3. Trace both directions: **producer/origin → transformation/service/API → storage/authorization → every known consumer**, and **consumer action → mutations/events/notifications/PDFs/other downstream effects**. Include shared-state handling, async fetch/caching, role/tenant filtering, null/empty values, old records and conversion between business objects where relevant.
4. Build an **Impact Map** identifying source paths, cross-module edges with evidence, affected routes/roles/data contracts, shared dependencies, downstream side effects, and unaffected boundaries. Separate **confirmed**, **suspected** and **not inspected** connections; use a repo-wide search when necessary, not an unbounded code rewrite.
5. Propose the smallest safe fix at the common owning layer, not independent page hacks. State which files need editing and why. Do **not** automatically update every connected module: alter only proven impacted paths within the user's approved scope. Permission, schema, payment, notification, tenant isolation and production data changes require their own explicit authorization.
6. Map regression assertions to each affected consumer and boundary: existing records, new records, wrong roles/tenants, refresh, empty data, conversion/save, repeated actions, failure recovery and downstream outputs as relevant. Prefer meaningful Red → Green → Refactor tests and one cross-workflow integration/E2E check where feasible. Preserve unrelated behavior.
7. Before declaring **Ready**, inspect the final diff, compare the Impact Map to changed files, confirm all required tests/permissions and mark each as **Pass / Fail / Not run / Not applicable** with proof. A skipped check is not a pass; an unknown connection remains a release risk.
8. Record verified findings and decisions in the project's existing docs/PR if authorized; this does not create autonomous memory. Report upstream and downstream connections, changes proposed/implemented, tests, gaps, rollback and next actions.

## Required artifacts
- **Connection triage:** Connected / Isolated, with evidence; isolated work can use a brief rationale instead of a full map.
- **Architecture Impact Map:** nodes, evidence-based edges, known consumers, owner of shared rule, access boundary and downstream effects.
- **Change and verification matrix:** each impacted surface, proposed edit, negative/positive test, status and explicit remaining risk.
- **Optional machine-checkable gate:** Create an evidence-based JSON impact manifest and run `node tools/architecture-impact-checker/src/cli.mjs --input <manifest.json>`. Its output validates the report's **completeness and consistency**, not the correctness of source claims or actual test execution. Use a separate CI step in the target repository if hard enforcement is wanted.

**Example:** A shared record selector is empty on three document-entry pages. Inspect the selector and its caller props, API filtering, customer relationship, authorization policy and persistence, then check other consumers and conversion flows. Fix the responsible shared layer if evidence supports it; test the three pages, older records and wrong-tenant access without modifying production data.

**Limits:** Never describe a planned connection or unrun test as confirmed. Respect investigation-only or design-only scope and obtain separate approval before edits, merge, deployment or irreversible operations.
