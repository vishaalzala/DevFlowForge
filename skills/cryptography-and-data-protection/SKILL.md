---
name: cryptography-and-data-protection
description: Use for application cryptography, password hashing, key lifecycle, random identifiers, encryption at rest/in transit, data minimization, backups and sensitive data handling.
---

# Cryptography And Data Protection

**Ownership:** Own cryptographic primitives, key lifecycle and sensitive-data protection decisions.

**Workflow**
1. Inventory classified data, crypto operations, libraries, administrators, keys, secrets, backups and recovery paths.
2. Check algorithms and parameter choices against current provider guidance, including password hashing and reliable randomness.
3. Review key creation, storage, access, rotation, destruction, per-tenant separation and nonce/identifier uniqueness.
4. Verify transport security, safe exports, retention, redacted logs and deletion/backup treatment for sensitive records.
5. Prefer vetted provider primitives instead of bespoke cryptographic code; protect older ciphertext through staged migration.
6. Map verified ASVS cryptography and data controls, documenting tests and residual risks rather than claiming certification.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
