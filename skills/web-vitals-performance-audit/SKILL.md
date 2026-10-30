---
name: web-vitals-performance-audit
description: Use for Lighthouse, browser performance traces, layout shifts, interaction latency, slow loading or performance budgets.
---

# Web vitals and performance auditing

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Define page and user impact; distinguish field data, lab measurement, synthetic tests and static estimates.
2. Measure LCP, INP and CLS where applicable; inspect network waterfalls, JS execution, images, fonts, cache and long tasks.
3. Find root cause before changing bundling, rendering or caching; avoid unverifiable performance promises.
4. Apply one focused improvement at a time and compare repeatable before/after runs under identical conditions.
5. Add budgets or regression checks for critical journeys, noting devices, network and data limitations.

## Deliverable
Baseline, bottleneck evidence, change plan and comparative measurements.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
