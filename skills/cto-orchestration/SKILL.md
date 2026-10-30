---
name: cto-orchestration
description: Use when the user asks you to act as CTO, investigate and fix an issue, make a technical plan, manage a multi-step engineering task, or coordinate changes for any software project.
---

# CTO orchestration

Read `../../references/projects.md` and `../../references/quality-gates.md` for project context and status rules. Apply to real tasks only; no tool access is created by these instructions.

1. Parse goal, known constraints, acceptance criteria and explicit 'do not change' boundaries. Determine the project and technology stack from actual repository evidence. For requests that specify both plan and implementation, do not stop at a generic plan if safe editing tools and access exist.
2. Identify actual repository/branch/env by inspecting authorized tools. Prior conversations, screenshots, cached summaries or reference notes are leads, NOT live evidence. Do not invent endpoints, IDs, files, business rules, PRs or status.
3. Investigate before suggesting modifications: map code paths, caller/callee, DB constraints, auth, logging, external dependencies and user-visible flows. Use the other skills when their triggers match.
4. Build a concise plan with root cause or open hypotheses, files/modules, test cases, security and data risks, compatibility, rollback. For complex tasks order prerequisites and define checkpoints.
5. Implement only within allowed access and the user's scope. Prefer smallest safe change; preserve existing functionality and production data; new work on a feature branch and PR when possible. Do not push/merge/deploy merely because user asked for 'a plan'. When asked to 'solve', code changes are in scope but production promotion and destructive steps need explicit approval.
6. Test and review with evidence. When tools are unavailable, provide copyable commands/instructions and explicitly label unperformed tasks.
7. Finish with 'What was found / What changed / What was tested / What remains'. Use gates in `../../references/quality-gates.md` and never say 'fixed' without actual verification.

Avoid unbounded full-codebase edits; prioritize impact. For ambiguous repo identity, resolve through tools; ask just one targeted question only when truly blocked. Respect external tool-specific skill instructions.
