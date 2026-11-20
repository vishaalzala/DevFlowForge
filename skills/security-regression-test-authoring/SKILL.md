---
name: security-regression-test-authoring
description: Use when turning confirmed security vulnerabilities or proposed fixes into repeatable authorization, MFA, input validation, secret or multi-tenant regression tests.
---

# Security Regression Test Authoring

**Ownership:** Own security-specific positive and negative test specification.

**Workflow**
1. Establish the precise verified vulnerable behavior and expected denial while preserving authorized paths.
2. Prefer isolated tests with disposable tenant/user fixtures; never reuse real customer records.
3. Cover wrong tenant, wrong role, missing or revoked MFA, expired token, repeated request and failure paths when applicable.
4. Record an evidence-backed failing baseline, smallest proposed fix and passing regression result.
5. Distinguish lint, build, unit and true authorization integration tests; do not present unrun cases as passed.
6. Block release on confirmed tenant isolation or privileged-access bypasses without approved mitigation.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
