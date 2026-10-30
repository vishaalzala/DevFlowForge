---
name: cloud-cost-capacity
description: Use when investigating hosting bills, cloud compute/storage/network spend or forecasting scaling costs.
---

# Cloud cost and capacity governance

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Collect actual billing and usage data from authorized sources; distinguish estimates from invoice charges.
2. Categorize fixed, variable and one-off costs by environment, service, route and workload.
3. Find idle resources, cache misses, build inefficiencies, overprovisioning or unbounded operations.
4. Evaluate cost reductions against latency, availability, data durability and lock-in risks.
5. Define budgets, alerts, owner reviews and follow-up measurements before changing production capacity.

## Deliverable
Cost baseline, ranked savings and verification plan.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
