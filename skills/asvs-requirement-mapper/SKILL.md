---
name: asvs-requirement-mapper
description: Use when mapping security findings, tests or proposed controls to OWASP ASVS 5.0 requirements and assurance levels; building a coverage matrix or identifying omitted security chapters.
---

# Asvs Requirement Mapper

**Ownership:** Own pinned ASVS requirement IDs, applicability and evidence traceability.

**Workflow**
1. Pin the exact primary ASVS version and only quote identifiers, control language and levels verified from its official data.
2. Select the assurance target from exposure and data sensitivity; mark irrelevant chapters as Not applicable with a reason.
3. Map each issue to a verified requirement or label a chapter-level candidate pending lookup; never invent an ID.
4. Separate applicability, implementation, test existence and test execution statuses.
5. Use OWASP Top 10 for risk themes and NIST SSDF for process concerns without treating them as equivalent to ASVS verification.
6. Produce a matrix of requirement, level, evidence, affected control, test plan, owner and approval.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
