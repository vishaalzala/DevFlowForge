---
name: test-driven-development
description: Use for a new feature, refactor or bug fix when the team wants test-driven development (TDD), a failing regression test first, or a verified Red-Green-Refactor cycle.
---

# Test-driven development — Red, Green, Refactor

## Activation and scope
Inspect the existing project, the selected test runner and existing test conventions. Apply this workflow to new or changed program behavior when testable. For visual exploration, documentation-only edits, or legacy modules without a feasible harness, explain the smallest alternative verification approach; do not falsely claim TDD occurred.

## Red: describe the expected behavior
1. Translate requirements into examples with observable inputs, outcomes and edge conditions. Include permissions, validation, empty state and error cases relevant to the change.
2. Choose the lowest-cost useful level: a focused unit test for local logic, an integration test for boundary interactions or a real browser test for a user journey. Avoid snapshot-only assertions that do not protect behavior.
3. Write the test **before** changing production behavior; execute it and capture its expected failure and why it fails. A test that fails for a missing dependency or unrelated runtime error does not satisfy Red.

## Green: smallest behavior change
4. Implement the minimum change to satisfy the failing test, preserving the project's architecture and public contracts. Run the targeted test and record its actual result.
5. Cover important unhappy paths and interaction boundaries; write integration or contract checks when the fix crosses services or storage. Do not rely on mocks that hide broken API or database behavior.

## Refactor: maintain and confirm
6. Improve naming, duplication and structure without changing externally visible behavior. Rerun targeted tests and relevant broader suites; review coverage if measurable, but never invent a percentage.
7. Report the exact Red failure, Green success, refactoring checks, changed files, commands executed and remaining gaps. Mark inaccessible or unrun tests **Not run**, not **Pass**.

## Exit criteria
- The expected behavior has an automated test when practical.
- At least one meaningful fail-to-pass test result is evidenced if TDD is claimed.
- All affected suites have an observed outcome; unresolved failures remain explicit.
- Security-sensitive changes add negative authorization checks and a dedicated review before release.
