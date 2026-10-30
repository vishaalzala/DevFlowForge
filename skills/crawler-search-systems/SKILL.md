---
name: crawler-search-systems
description: Use for sitemap processing, forum indexing, crawler queues, robots compliance, indexing, search result ranking, cron scheduling, backfills, duplicates and crawl-related performance.
---

# Safe crawler and search operations

1. Determine input type: sitemap XML vs forum post listing, paginated threads, dynamic pages or RSS. Forum sources can need custom discovery/normalization beyond sitemap parsing; do not treat all content as identical.
2. Inspect current schema, approved-site workflow, cursor/checkpoint state, queue visibility, dedupe keys, indexing pipeline and timing. Never silently reset running crawls.
3. Enforce host and scope allowlists, URL normalization, SSRF prevention, robots/site policies, request budgets, timeouts, bounded concurrency, exponential backoff and crawl delay as appropriate.
4. Separate user requests/admin UI from worker execution. Prefer queue leasing/acknowledgement, idempotent processing, retries, dead letters, heartbeat and recovery. Do not promise cron availability without verifying platform limits.
5. Use content extraction and canonicalization for title, body, author/date where permitted, thread/post relationships and update/delete semantics. Exclude restricted/private forum content.
6. Plan searchable index fields, relevance, pagination, no-result handling and freshness. Verify ranking quality with a representative query set and check security of any snippets.
7. Measure query latency, crawl throughput, error counts, queue lag, storage and database load. Include safe staged rollout, tested rollback and preservation of existing jobs.
