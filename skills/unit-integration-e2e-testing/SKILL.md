---
name: unit-integration-e2e-testing
description: Use when designing or implementing unit, integration, contract or end-to-end tests for features, regressions, APIs and multi-tenant flows.
---

# Unit Integration E2E Testing

**Goal:** Choose the smallest credible test suite that prevents the specific bug from recurring.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Write acceptance scenarios from the current behaviour and requested behaviour; include failure paths, retries and permissions.
2. Prefer a failing regression test before a bug fix when practical; avoid brittle tests coupled to internal implementation.
3. Unit-test calculations and pure helpers; integration-test database/API side effects; E2E-test critical multi-page journeys on a disposable environment.
4. Use seeded, synthetic accounts and data for cross-tenant cases; mock providers at the boundary without masking integration contracts.
5. Run the project’s existing commands; report commands, pass/fail counts and skipped tests, never invent coverage percentages.

## Verification checklist
- One normal and one failure scenario.
- Negative authorization tests for privileged paths.
- Repro evidence retained.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
