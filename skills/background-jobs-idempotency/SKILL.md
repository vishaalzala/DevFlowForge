---
name: background-jobs-idempotency
description: Use when designing or debugging cron, queues, scheduled emails, crawlers, retries, workers, webhook processing or long-running tasks.
---

# Background Jobs Idempotency

**Goal:** Keep user-facing requests responsive while background work runs safely.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Identify which tasks run in request/response paths; move expensive or unpredictable work to bounded workers where infrastructure permits.
2. Model lifecycle states, ownership leases, visibility timeouts, retry counts, backoff, dead-letter handling and job cancellation.
3. Choose stable idempotency keys for external sends and persisted state transitions; make retries safe after partial success.
4. Enforce concurrency, rate, memory and provider-cost budgets; avoid simultaneous cron invocations processing the same job.
5. Instrument queue depth, oldest pending age, processing latency, failures and replays; test crash recovery and backpressure.

## Verification checklist
- No double-send on retry.
- UI remains responsive under load.
- Stalled work can be detected and resumed.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.

## Verifiable job lifecycle instrumentation
Add idempotency-key-safe telemetry for enqueue/claim/start/heartbeat/retry/dead-letter/success; measure oldest-unfinished age and attempts separately from queue depth. Distinguish no jobs (normal zero) from no telemetry (instrumentation failed). Instrument external provider latency and delivery acknowledgements without logging message bodies, phone numbers, emails or tokens. Test a crash/retry, duplicate event and provider timeout with **synthetic** jobs. Detect jobs stuck in claimed status and ownership lease expiration; mark expected no-send vs failed-send explicitly. Refer to `../../references/background-job-observability.md`; changes to real alerting, schedules or integrations require authorization.
