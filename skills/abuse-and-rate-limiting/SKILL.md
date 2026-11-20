---
name: abuse-and-rate-limiting
description: Use when reviewing login attempts, OTP requests, account enumeration, webhook floods, bulk exports, denial of service, resource exhaustion or rate limiting.
---

# Abuse And Rate Limiting

**Ownership:** Own misuse cases, request budgets and safe throttling across boundaries.

**Workflow**
1. Map the actor, route, tenant, identity, cost and legitimate peak usage, including anonymous and privileged operations.
2. Review per-tenant and per-identity quotas, client IP handling, rate limits, bounded retries, idempotency and provider budgets.
3. Inspect upload, export, pagination, SMS/email and background queue consumption for resource exhaustion.
4. Keep account existence private, avoid penalizing unrelated users behind shared IPs, and preserve legitimate recovery flows.
5. Use synthetic low-volume tests of throttling, backoff, reset and recovery. Load tests require separately authorized staging scope and caps.
6. Report abuse hypotheses, controls, alerts, false-positive risks and rollback.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
