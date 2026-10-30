---
name: api-webhook-integrations
description: Use for external service integrations, API or webhook design, event/data synchronisation, third-party partnerships, data import/export, OAuth/consent, third-party workflows and integration architecture.
---

# Customer-authorized API and webhook integration design

1. Clarify business purpose and actors, source of truth, read/write direction, object schema, event types, freshness, scale, versioning and data retention. Separate confirmed requirements from assumptions. Use current code/docs/API evidence.
2. Map data ownership, consent and tenant boundaries. Define opt-in by organisation/end user as appropriate; least privilege scopes, revoke/disconnect, data minimization, legal basis, visibility and audit logs. Do not promise third-party record sharing by default.
3. Design authentication (OAuth 2.0 or signed integration keys depending on actors), secret storage and rotation, HMAC-signed webhook events, event version, idempotency key, retries with exponential backoff, DLQ/replay and deduplication.
4. For sync, define conflict resolution, pagination, initial backfill vs incremental, deletion/rectification semantics, immutable audit records and rate limits. Include failure cases and recovery controls.
5. Prefer an adapter layer and versioned contracts; do not expose raw tables, privileged database credentials or PII in URLs. Use secure, least-privileged API routes.
6. Prototype with synthetic data and a limited sandbox integration. Provide endpoint/event proposal, field mapping table, permission matrix, sequence flow, tests, operational monitoring and release plan. Never claim an API/webhook exists unless confirmed in repository or provider docs.
