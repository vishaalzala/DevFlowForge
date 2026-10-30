---
name: caching-cdn-invalidation
description: Use when designing browser, server, CDN, edge or query caching and reducing latency or cost.
---

# Caching, CDN and invalidation

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Identify ownership, data freshness, authorization scope, cache key inputs, invalidation events and privacy constraints.
2. Select cache layer and strategy for each resource: no-store, time-based, revalidation, event invalidation or stale-while-revalidate.
3. Prevent cross-tenant leaks by incorporating user/tenant context or avoiding shared caching of private resources.
4. Measure hit rates, origin load, staleness and error modes before and after changes.
5. Test invalidation, logout, access revocation, deploy changes and outages.

## Deliverable
Cache policy matrix, key plan, invalidation tests and observability.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
