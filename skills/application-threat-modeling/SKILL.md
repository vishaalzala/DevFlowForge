---
name: application-threat-modeling
description: Use when planning a new application architecture, reviewing trust boundaries, prioritizing security controls or performing defensive design threat modeling.
---

# Application Threat Modeling

**Ownership:** Own pre-implementation threat hypotheses, design controls and risk acceptance.

**Workflow**
1. Map actors, assets, trust boundaries, APIs, storage, background jobs, AI tools, tenant identities and privileged services.
2. Identify misuse cases, trust upgrades, authorization decisions, cache isolation and possible fail-open behavior.
3. Inspect where service credentials or elevated database roles bypass ordinary client authorization.
4. Separate credible threats from confirmed vulnerabilities and prioritize by impact, exposure and likelihood.
5. Translate priority threats into security acceptance criteria and synthetic negative regression tests.
6. Document mitigation tradeoffs, ownership, monitoring, residual risk and rollback ahead of sensitive changes.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
