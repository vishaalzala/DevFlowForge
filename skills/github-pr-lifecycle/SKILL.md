---
name: github-pr-lifecycle
description: Use when preparing feature branches, pull requests, change review, release notes or merge-readiness checks in GitHub.
---

# Github Pr Lifecycle

**Goal:** Keep changes auditable and easy to review without exposing sensitive information.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Confirm remote, repository permissions, default branch and current diff; do not assume permissions from past sessions.
2. Prefer a focused feature branch and small commits; avoid unrelated edits and never push secrets or environment files.
3. Draft a PR with purpose, root cause, changed paths, acceptance criteria, test results, rollout/rollback and known risks.
4. Inspect diff and status checks; call out failing or missing workflows, API/schema compatibility, and authorization issues.
5. Do not merge or deploy without the user’s requested scope and required approvals; report an exact PR URL only after creation succeeds.

## Verification checklist
- Diff inspected.
- Tests labelled by evidence.
- Secrets checked and approvals respected.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
