---
name: repository-architecture-audit
description: Use when auditing an existing repository, mapping architecture, locating module ownership, detecting duplicated logic or planning a significant refactor.
---

# Repository Architecture Audit

**Goal:** Map a real brownfield system before recommending structural changes.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Confirm the exact repository, branch, deployed environment, framework versions, tests and package manager from source rather than remembered details.
2. Trace key user journeys end-to-end: route/component → API → services → database → queues/providers; map dependencies and where security checks occur.
3. Identify data ownership, cross-module coupling, duplicated business rules, accidental synchronous work, dead paths and dependency cycles. Distinguish confirmed defects from architectural preferences.
4. Rank findings by customer impact, change risk and expected payoff; provide an incremental migration plan with compatibility layers where needed.
5. Prefer boundary tests and small refactors over broad rewrites; preserve stable APIs, current tables and user-visible contracts.

## Verification checklist
- Code paths and evidence linked.
- Impact and rollback documented.
- No hypothetical file paths stated as confirmed.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
