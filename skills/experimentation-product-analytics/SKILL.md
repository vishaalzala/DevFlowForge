---
name: experimentation-product-analytics
description: Use when adding event analytics, instrumenting product funnels, evaluating experiments, or measuring feature adoption.
---

# Product analytics and experimentation

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Define decisions and success criteria before selecting events; choose guardrail metrics and time windows.
2. Specify an event taxonomy with user consent, anonymization, retention and anti-duplication rules; avoid sensitive payloads.
3. Check sampling, bot traffic, event time, denominator choices and baseline variation before inferring changes.
4. Design appropriate comparisons and document assignment, exclusions, confounders and statistical uncertainty when doing experiments.
5. Interpret results conservatively and propose next steps based on both success and downside metrics.

## Deliverable
Event plan, metric definitions, validation steps and decision log.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
