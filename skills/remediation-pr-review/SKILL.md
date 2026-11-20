---
name: remediation-pr-review
description: Use to review a security fix pull request for risk, correctness, proof of remediation, affected architecture, regression coverage and rollback safety.
---

# Remediation Pr Review

**Ownership:** Own final security fix review, not code merging or deployment.

**Workflow**
1. Bind the review to actual finding IDs, scan revision, approved scope and changed files.
2. Inspect shared guards, callers, tenant boundaries, privileged actions, migrations, caches and downstream consumers.
3. Reject cosmetic fixes, disabled RLS, unauthorized grants, hidden warning suppression and broad risky upgrades.
4. Require positive/negative regression tests, exact CI evidence, secret scanning and compatible rollback.
5. Mark Approved for review, Changes required or Needs evidence; distinguish code fixes from deployed runtime verification.
6. Treat scanner-suggested code as untrusted until independently reviewed.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
