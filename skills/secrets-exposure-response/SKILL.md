---
name: secrets-exposure-response
description: Use for scanner-reported exposed secrets, committed credentials, leaked JWTs, API tokens, CI variables, secret history reviews and rotation planning.
---

# Secrets Exposure Response

**Ownership:** Own evidence-based exposed-credential classification and coordinated containment.

**Workflow**
1. Classify token type, scope, privilege, issuer, environment, age and validity using safe metadata, not secret values.
2. Differentiate intentionally public keys, disposable test material and credible privileged credential leaks.
3. Review repository history and artifacts only with authorized access; deleting a committed secret does not revoke it.
4. Prepare provider-specific rotation/revocation order, dependency mapping, rollback and service owner approvals.
5. Verify new credentials only in authorized environments and confirm old privileged credentials no longer grant access.
6. Keep secret values out of reports; maintain a private timeline, monitoring plan and breach-assessment handoff.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
