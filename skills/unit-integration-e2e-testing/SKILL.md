---
name: unit-integration-e2e-testing
description: Use when designing or implementing unit, integration, contract or end-to-end tests for features, regressions, APIs and multi-tenant flows.
---

# Unit, integration, contract and end-to-end testing

**Goal:** Prevent real regressions with layered behavioral coverage. For code changes, pair with `test-driven-development`; for release readiness, use `test-strategy-release-gates`.

## Strategy
1. Inspect the repository's languages, test frameworks, CI and current coverage before creating a new runner. Map each acceptance scenario to the smallest test level that can prove it.
2. **Unit tests**: isolate pure business rules, transformations, edge conditions and validation. Assert useful behavior rather than internal implementation details. For bug fixes, start with a meaningful failing regression test when feasible.
3. **Integration tests**: verify API routes, persistence, transactions, external service adapters, queues, auth and cross-component effects with disposable resources. Verify rollback/cleanup and failure modes; mock third-party boundaries when unavoidable, but validate the actual contract separately.
4. **Contract tests**: protect request and response shapes, versions, schema, error semantics, idempotency and compatibility between consumers and providers.
5. **End-to-end tests**: cover a small set of critical human journeys using a safe environment, seeded synthetic identities and realistic user interactions. Include positive, negative, retry and role-permission paths when affected.
6. Verify accessibility, performance, localizations and browser/device behavior when in scope. See `browser-e2e-visual-regression` and `load-stress-capacity-testing` for dedicated cases.

## Execution and reporting
7. Where appropriate follow **Red → Green → Refactor**: show the targeted test failing for the expected reason, then passing after the smallest fix, then passing again after refactor.
8. Run the actual available commands and CI checks. Report commands, passed/failed/skipped counts, test-data environment and measured coverage if available. Do not invent test execution, security certification or coverage percentages.
9. Separate **Pass / Fail / Not run / Not applicable**; investigate flaky tests rather than silently retrying until green. Test failures block claims of release readiness unless a documented, explicitly accepted exception exists.

**Deliverable:** A test matrix of requirements to test levels, verified results, unresolved risk and links to real test/CI evidence.
