---
name: load-stress-capacity-testing
description: Use when validating throughput, concurrency, resource limits or autoscaling for applications and APIs.
---

# Load, stress and capacity testing

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Specify representative workload mix, concurrency, data shapes and nonfunctional targets from legitimate usage.
2. Run tests only against authorized systems with agreed rate ceilings and a stop condition; prefer staging.
3. Measure p50/p95/p99 latency, error rates, queues, CPU/memory, database pressure and saturation over time.
4. Distinguish functional bugs from environment limits and avoid extrapolating beyond measured conditions.
5. Propose capacity and efficiency changes with safe retesting and cost implications.

## Deliverable
Authorized load profile, capacity curve and bottleneck report.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
