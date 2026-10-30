---
name: frontend-state-async-data
description: Use when debugging React/Vue/Svelte/Angular state, async loading, cache invalidation, forms or optimistic updates.
---

# Frontend state, forms and data fetching

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Trace the current data lifecycle from request to local state, rendering, caching and mutation.
2. Identify request waterfalls, duplicate fetches, stale closures, race conditions, double submissions and inconsistent invalidation.
3. Choose server/client state boundaries appropriate to the framework; cancel obsolete work and handle retries intentionally.
4. Preserve input state, autosave, focus and navigation across loading/error/empty/success paths.
5. Add deterministic tests for concurrent changes, slow networks, navigation and failure recovery.

## Deliverable
State-flow map, minimal fix and timing/regression evidence.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
