---
name: data-pipeline-etl-quality
description: Use for ingest pipelines, CSV imports, analytics ETL/ELT, data transformation, schema drift or data validation.
---

# Data pipelines and ETL quality

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. List upstream sources, downstream contracts, ownership, refresh cadence, data classification and lineage.
2. Validate schema, timestamps, nulls, duplicates, late arrivals, encoding and idempotent replay behavior.
3. Isolate raw/staging/curated transformations where appropriate with explicit quality checks and reconciliation.
4. Handle consent, retention, access controls, errors and retry/backfill without exposing production data.
5. Measure completeness, freshness, correctness and drift, with runbooks for repair.

## Deliverable
Pipeline map, data-quality checks, backfill plan and observability.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
