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
