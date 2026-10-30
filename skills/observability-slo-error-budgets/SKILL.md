---
name: observability-slo-error-budgets
description: Use for logging, distributed tracing, operational dashboards, on-call alerts, SLIs or reliability targets.
---

# Observability and SLO engineering

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Choose user-centered SLIs such as successful operations, latency and freshness, not only infrastructure utilization.
2. Define SLO windows, actionable alert thresholds, routing and error budgets using service criticality.
3. Instrument request IDs, correlated traces and structured logs while redacting credentials and personal data.
4. Build dashboards with symptom and cause views; differentiate no-data, zero, slow and failed states.
5. Drill an incident scenario and verify alert ownership, runbook links and false-positive controls.

## Deliverable
SLI/SLO spec, telemetry plan, dashboards and alert test evidence.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
