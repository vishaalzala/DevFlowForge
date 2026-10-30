---
name: performance-engineering
description: Use for slow web/mobile/backend pages, dashboard delays, expensive queries, network waterfalls, repeated requests, infrastructure costs, background-job contention or user-experience performance metrics.
---

# Measure before optimizing

1. Establish page, environment, baseline median and p95 where available, cache state and client/server measurements. Differentiate first load, navigation, API time, DB time and render time.
2. Trace request waterfalls, repeated session guards, sequential awaits, N+1 queries, fetch waterfalls, React hydration/effects, query plans, connection pooling, indexes, caching, bundle sizes and queue workers. Use profiler/logs rather than guessing.
3. Define narrow hypothesis; reduce redundant calls, parallelize independent operations, defer low-priority widgets, batch queries, add proper indexes after EXPLAIN analysis, consider safe prefetch or caching. Never cache cross-tenant or entitlement-sensitive data without isolation/invalidation.
4. Keep crawl/index work asynchronous with bounded concurrency, queues, retries and observability; preserve existing jobs, checkpoints and request-serving priority.
5. Avoid stale billing/permission values: list invalidation triggers (login/logout, company switch, permission/entitlement/subscription changes). Check session and data safety.
6. Run before/after benchmarks under comparable conditions; test critical user flows, error handling and permissions. Report metrics measured and do not quote unobserved improvement percentages.
7. For platform costs, inspect actual billable build CPU, function duration, bandwidth, caching and deployment frequency before recommending changes.
