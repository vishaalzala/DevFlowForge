---
name: security-audit-orchestrator
description: Use when auditing a software project for cybersecurity risks, interpreting multiple scanners, planning a comprehensive security review, or coordinating remediation with architecture and release gates.
---

# Security Audit Orchestrator

**Ownership:** Own security review coordination, evidence tracking and risk ranking, not individual exploit analysis.

**Workflow**
1. Confirm repo, branch, deployed revision, authorized scope, data classification and owner before acting.
2. Inventory exposed APIs, admin paths, service identities, tenancy, storage, providers, jobs and agent tools.
3. Select only relevant specialist skills and existing scanners; avoid duplicated findings and overlapping ownership.
4. Track issue ID, source, revision, severity, confidence, verified preconditions, affected assets and remediation owner.
5. Require permission-negative tests for claims involving tenants or administrator access; label hypotheses distinctly.
6. Report prioritized mitigations, exact test evidence, residual risks, approvals and rollback; never claim active compromise from a scanner warning.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
