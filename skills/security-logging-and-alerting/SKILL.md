---
name: security-logging-and-alerting
description: Use when designing or auditing security event logs, administrator audit trails, tamper resistance, alert routing, anomalous access detection or incident evidence retention.
---

# Security Logging And Alerting

**Ownership:** Own attributable security event capture and alert actionability.

**Workflow**
1. Enumerate privileged events: admin OTP/login, role/tenant changes, billing/refunds, credential rotation and access denials.
2. Require actor, tenant, timestamp, result, request correlation and affected object with data minimization.
3. Redact credentials, JWTs and customer-sensitive fields; protect access, integrity and retention.
4. Define actionable alert thresholds, deduplication, named owners and acknowledgement to avoid alert fatigue.
5. Test event durability, alert routing and safe application behavior if the logging sink fails.
6. Map findings to OWASP A09:2025 and ASVS V16 only with verified requirement references.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
