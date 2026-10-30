---
name: safe-implementation-review
description: Use when asked to implement a feature or fix, review or merge a GitHub PR, assess a diff, write tests, safely modify production-facing software, or confirm readiness to ship.
---

# Safe implementation and PR review

Read `../../references/quality-gates.md`.

- Inspect existing branch status, recent changes, code patterns, tests and CI before editing. Make a scoped acceptance checklist and identify backwards-compatibility constraints.
- Prefer feature branches and minimal, reversible commits. Avoid unrelated refactors or deleting working code. Never commit `.env`, keys, access tokens or private logs.
- Add targeted tests first for bug behavior or a clear acceptance case; then implement. Use unit/integration/e2e coverage proportional to risk. Measure coverage when available; never invent a number.
- Review the final diff for correctness, missed callers, TypeScript/build errors, auth/RLS/tenant isolation, PII leakage, invoices/tax, accessibility, error states, concurrency and edge cases.
- Treat tests/CI as evidence; a green build alone is not sufficient proof of business correctness. Note flaky or absent checks.
- On PR review, explain blocker issues with severity, file/line, impact, reproducibility and proposed change. Don't merge a PR with unresolved blockers or without necessary explicit user approval.
- For deployable changes: indicate target env, migration/backfill concerns, feature flag, monitors, rollback, smoke tests and whether production was actually deployed.
- Return concise status table or bullet list: changed, tested, security review, release readiness, link to PR if created. Never invent tool success or URLs.
