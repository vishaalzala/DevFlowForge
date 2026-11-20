---
name: webhook-and-third-party-integration-security
description: Use when assessing payment webhooks, SMS/email integrations, external APIs, signed callbacks, token exchange, retries, duplicate events or third-party trust.
---

# Webhook And Third Party Integration Security

**Ownership:** Own trust, replay and idempotency boundaries around external integrations.

**Workflow**
1. Inventory providers, callback endpoints, versions, shared secrets and authentication methods.
2. Verify signature handling using vendor documentation, timestamp windows, raw-body requirements and replay prevention.
3. Use idempotency keys, transaction boundaries and resilient recovery to prevent duplicate billing or notifications.
4. Check outbound URL validation, redirected destinations, credential scope, timeouts and response-size bounds.
5. Test invalid signatures, duplicate/out-of-order deliveries, provider outages and tenant mismatches with disposable fixtures.
6. Preserve provider-specific semantics and reconcile money effects against the authoritative billing source.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
