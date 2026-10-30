---
name: realtime-and-event-streaming
description: Use for WebSockets, SSE, event buses, push notifications or event-driven UI.
---

# Realtime and event streaming architecture

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Clarify delivery semantics, ordering, scaling, replay, deduplication and connection authentication.
2. Separate events from authoritative state and plan reconnect, backpressure, heartbeat and slow-client behavior.
3. Enforce tenant/user authorization per subscription and ensure sensitive event payloads are minimized.
4. Instrument lag, drops, retries and dead-letter handling; define fallback behavior if realtime transport fails.
5. Test reconnect storms, duplicate events, out-of-order delivery and permission revocation.

## Deliverable
Event contract, flow architecture and failure-mode test matrix.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
