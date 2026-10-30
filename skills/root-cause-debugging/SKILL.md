---
name: root-cause-debugging
description: Use for recurring bugs, UI errors, failed saves, 404s, duplicate inserts, email failures, unexpected permissions, or any request to trace and permanently fix a code defect.
---

# Reproducible root-cause debugging

1. Describe symptom, expected behavior, impacted actors, frequency, environment and first known regression. Look for relevant screenshots, logs, stack traces, failing requests, Git commits and recent deployments.
2. Reproduce safely with smallest possible fixture; capture the exact call path and root causal condition. Distinguish proven causes from plausible guesses.
3. For double inserts/requests, inspect event handler invocation, effect dependencies, React Strict Mode, autosave, retry and optimistic updates, API-side idempotency and uniqueness. Do not 'solve' by hiding duplicated UI entries only.
4. For form state anomalies, map initial/default values, API shape, controlled inputs, parent/child changes, async fetches, race conditions, navigation/query params and save flows.
5. Write a regression test that fails on the original behavior where feasible; implement a minimal fix; run targeted tests then broader dependent tests; inspect logs for remaining errors.
6. For production bugs, verify tenant isolation, billing effects, old/new records, timezone/date handling and backward compatibility. Explain whether data remediation is needed, but do not mutate real customer data without authorization.
7. Report: symptom, evidence, root cause, changed files, before/after behavior, tests run/results and unresolved issues. Do not claim access or tests that did not happen.

If the user says 'still same issue', compare evidence to earlier attempted fixes rather than repeating the same guess.
