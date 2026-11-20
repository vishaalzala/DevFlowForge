---
name: nz-privacy-compliance
description: Use when a New Zealand software product handles personal information, assesses a privacy breach, needs retention/consent controls or plans OPC notification steps.
---

# Nz Privacy Compliance

**Ownership:** Own NZ privacy guidance and escalation, not legal advice or automatic notification.

**Workflow**
1. Inventory collection purposes, data categories, disclosures, processors, access, correction, retention and deletion.
2. Distinguish a scanner warning from an actual privacy breach and assess likely serious harm under NZ Privacy Act 2020.
3. For potentially notifiable breaches, refer to current OPC guidance; notify promptly as legally required. The OPC 72-hour expectation is guidance, not a universal fixed statutory deadline.
4. Protect affected people's identities, limit disclosure, preserve evidence and plan containment with the incident owner.
5. Review cross-border disclosure, vendor terms and access/correction rights where relevant.
6. Require qualified legal review for material interpretations and explicit approval before any regulatory submissions.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
