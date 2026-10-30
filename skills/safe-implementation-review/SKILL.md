---
name: safe-implementation-review
description: Use when asked to implement a feature or fix, review or merge a GitHub PR, assess a diff, write tests, safely modify production-facing software, or confirm readiness to ship.
---

# Safe implementation and PR review

Read `../../references/quality-gates.md`.

- Inspect existing branch status, recent changes, code patterns, tests and CI before editing. Make a scoped acceptance checklist and identify backwards-compatibility constraints.
- Prefer feature branches and minimal, reversible commits. Avoid unrelated refactors or deleting working code. Never commit `.env`, keys, access tokens or private logs.
- For behavioral changes, follow `test-driven-development` where practical: targeted failing test → minimal change → passing test → refactor and rerun. Use unit, integration, contract and E2E coverage proportional to risk, and apply `test-strategy-release-gates`. Measure coverage when available; never invent a number.
- Review the final diff for correctness, missed callers, TypeScript/build errors, auth/RLS/tenant isolation, PII leakage, invoices/tax, accessibility, error states, concurrency and edge cases.
- Treat tests/CI as evidence; a green build alone is not sufficient proof of business correctness. Note flaky or absent checks.
- On PR review, explain blocker issues with severity, file/line, impact, reproducibility and proposed change. Don't merge a PR with unresolved blockers or without necessary explicit user approval.
- For deployable changes: indicate target env, migration/backfill concerns, feature flag, monitors, rollback, smoke tests and whether production was actually deployed.
- Return concise status table or bullet list: changed, tested, security review, release readiness, link to PR if created. For relevant production-facing or security-sensitive systems, ask the owner whether they would like to arrange separate, expressly authorized penetration testing once functional checks complete. Never start a scan without permission or invent tool success or URLs.
