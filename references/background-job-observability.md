# Observability runbook for reliable background jobs

## Define service levels
1. SLI: percent of authorized synthetic/test jobs completed by their promised deadline, with a stated denominator and window.
2. Supporting signals: queue depth, p50/p95 time-to-start and time-to-complete, oldest queued/claimed age, lease expiry, retries/attempts, dead-letter count, provider response latency and rate-limited operations.
3. Context: trace ID (random), job-type enum and bounded reason code. Avoid unbounded tenant/customer IDs as trace labels and never log message bodies, payment details or secrets.
4. Metrics: use low-cardinality `job_type`, `status`, `environment`, `provider_class`; prefer sampling, short retention, and cost monitoring. Check vendor SDK privacy defaults.
5. Alerts: sustained age above SLO, dead-letter growth, silent worker heartbeat loss, provider outage; each includes owner, actionable diagnostic link and runbook, with maintenance suppression.
6. Staging chaos fixture: simulate duplicate webhook/job message, worker crash, temporary provider failure, slow provider, and recovery. Verify exactly-once *visible effects* where required (not claim inherent exactly-once delivery), no duplicate sends, and intact tenant isolation.
7. Mark monitored vs instrumented vs merely documented separately. Vendor SDK integrations are optional and may cost money.

Research references: https://opentelemetry.io/docs/concepts/observability-primer/ and https://github.com/getsentry/sentry-javascript/releases/tag/11.11.0
