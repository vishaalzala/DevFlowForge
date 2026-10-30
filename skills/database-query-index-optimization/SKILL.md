---
name: database-query-index-optimization
description: Use for slow SQL, ORM query plans, N+1 issues, indexes, locking, connection limits or database performance.
---

# Database queries and index optimization

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Identify actual engine/version and workload; gather representative query plans and latency distributions where permitted.
2. Check missing filters, join cardinality, indexes, lock waits, transaction duration, parameterization and connection-pool pressure.
3. Propose smallest change with write-amplification and storage tradeoffs; preserve access-control filters.
4. Apply safe migration and benchmark on representative data without dumping private records.
5. Monitor p95 latency, CPU, I/O, locks and regressions after change; document rollback.

## Deliverable
Query evidence, explain-plan interpretation, index proposal and tests.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
