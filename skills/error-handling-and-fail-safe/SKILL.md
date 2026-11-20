---
name: error-handling-and-fail-safe
description: Use when reviewing exception handling, failing-open authorization, missing dependencies, timeouts, errors in billing or jobs, or information leaked in error responses.
---

# Error Handling And Fail Safe

**Ownership:** Own safe defaults and security behavior during exceptional conditions.

**Workflow**
1. Trace missing identity, tenant context, failed database calls, incomplete inputs, timeouts, retries and partial writes.
2. Require fail-closed authorization when identity or ownership cannot be verified; guard transaction and rollback boundaries.
3. Ensure client errors reveal no secrets, stack traces or provider internals; use redacted correlation IDs for internal logs.
4. Test invalid configuration, lost RPC connectivity, duplicate callbacks and cancelled jobs using disposable fixtures.
5. Check resource cleanup, bounded retries, idempotency and recovery rather than suppressing error signals.
6. Produce negative-path evidence and flag any confirmed unauthorized-access fail-open state as a release blocker.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
