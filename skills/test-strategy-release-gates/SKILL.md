---
name: test-strategy-release-gates
description: Use when defining a project's mandatory test pipeline, checking completion after implementation, setting release gates, or choosing unit, integration, contract, E2E, UAT and performance checks.
---

# Test strategy and completion gates

Treat 'all tests passed' as an evidenced claim, not a promise. Match the gates to the repository's stack, change impact, deployment model and risk. Do not require every type of test for every documentation or design-only change.

## Plan the test pyramid
1. Before implementation, agree on examples and acceptance criteria. List changed code paths and responsibilities across functions, service boundaries, databases and user journeys.
2. Unit: assert transformations, validation and business rules including boundaries and failures. Integration: test API/database/provider interactions with sandbox or disposable resources. Contract: check payload and compatibility across clients and servers. End-to-end: run representative real user journeys in a safe test environment.
3. Add accessibility, visual regression, mobile/device, data migration and localization checks when affected. For performance, use baselines and authorization-bound load or capacity profiles, not production load without permission.
4. Prefer test-driven development for new/changed behavior; retain and expand existing regression tests, and do not replace credible integration checks with deep mocking.

## Release readiness decision
5. Collect actual commands, CI links, passed/failed/skipped counts and coverage where measured. Recheck build, types, lint, changed route, security permissions, migrations, data integrity, error handling and rollback.
6. For each gate use **Pass / Fail / Not run / Not applicable** with evidence and risk rationale. Failed required gates block 'ready'; a skipped or unavailable test never becomes a pass.
7. Confirm the environment, owner, rollback and smoke-check plan. Distinguish 'implementation complete', 'tests verified', 'staging approved' and 'production deployed'. Production deployment requires explicit authorization where applicable.
8. After functional and automated verification, offer an *optional* authorized penetration-test readiness review when the app has exposed surfaces or sensitive data. Do not run scans without explicit consent. For low-risk or documentation work, note security testing is not needed.

**Output:** A risk-based test matrix, evidenced results, unresolved gaps, go/no-go recommendation, and clearly separated optional security-testing handoff.
