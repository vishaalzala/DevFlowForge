---
name: cloud-infrastructure-security
description: Use when assessing cloud hosting, Vercel, AWS, Azure, GCP, containers, exposed storage, service identities, network controls or infrastructure configuration.
---

# Cloud Infrastructure Security

**Ownership:** Own read-only cloud configuration and runtime boundary reviews, not active external scans.

**Workflow**
1. Inventory cloud projects, regions, public endpoints, environment separation, service roles, storage buckets and databases.
2. Compare intended and actual IAM, network, TLS, secret, backup and access-log configuration using authorized metadata.
3. Check separation of preview/test/production credentials, traffic paths and sensitive build outputs.
4. Identify exposed storage, broad access, weak identity assumptions, missing alerts and configuration drift.
5. Prepare reversible, least-privilege remediation proposals and test plans before requesting risky changes.
6. State provider cost and availability dependencies; a firewall does not replace server-side tenant authorization.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
