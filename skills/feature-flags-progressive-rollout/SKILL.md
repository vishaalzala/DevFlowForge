---
name: feature-flags-progressive-rollout
description: Use when releasing risky features gradually, running canaries, A/B rollouts or planning kill switches.
---

# Feature flags and progressive rollout

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Define rollout segments, safeguards and observability with a single authoritative eligibility check.
2. Make behavior safe when flag service is unavailable, users switch accounts or cached decisions become stale.
3. Plan progressive exposure, guardrail thresholds and explicit owner for pause/rollback decisions.
4. Test both flag states, combinations, permissions and data/schema compatibility; remove expired flags.
5. Capture deployment and rollout status separately, never claim release complete from a merged PR alone.

## Deliverable
Rollout checklist, segment map, rollback trigger and flag-cleanup plan.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
