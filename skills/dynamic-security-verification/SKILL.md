---
name: dynamic-security-verification
description: Use when planning or interpreting authorized staging-only dynamic security tests, DAST reports, browser authorization tests or a professional penetration-test handoff.
---

# Dynamic Security Verification

**Ownership:** Own scoped, non-destructive staging verification and evidence collection.

**Workflow**
1. Require explicit owner approval, named staging origins, synthetic users, boundaries, test window and emergency stop conditions.
2. Prefer passive or narrowly scoped defensive functional checks; do not test third-party targets or production without separate permission.
3. Verify account roles, session restrictions, safe redirects, error handling and data separation with benign fixtures.
4. Cross-check reported issues against exact source and scan revision; distinguish observed failures and unverified hypotheses.
5. Exclude customer data and secrets from reports, and record all tests that were not executed.
6. Refer independent penetration testing to authorized-penetration-test-handoff under separately approved conditions.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
