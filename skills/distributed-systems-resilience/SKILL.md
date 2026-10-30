---
name: distributed-systems-resilience
description: Use when designing microservices, distributed workflows, retries, partial failures or cross-service consistency.
---

# Distributed systems and resilience

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Map service boundaries, synchronous dependencies, data ownership, consistency requirements and fault domains.
2. Design timeouts, retries with jitter, idempotency, backpressure, circuit breaking and dead-letter paths as relevant.
3. Avoid unbounded fan-out and retry storms; document acceptable degradation and manual reconciliation workflows.
4. Define SLOs and trace context for end-to-end debugging across services and queues.
5. Test partial outages and duplicate/out-of-order operations with realistic observability.

## Deliverable
Failure-mode model, resilience controls, recovery tests and SLOs.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
