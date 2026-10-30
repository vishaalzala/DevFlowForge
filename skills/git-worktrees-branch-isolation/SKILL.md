---
name: git-worktrees-branch-isolation
description: Use when coordinating parallel development, protecting work in progress or preparing a safe PR workflow.
---

# Git branches and worktree isolation

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Inspect working tree and current branch; preserve uncommitted changes and avoid overwriting another author.
2. Choose clean branch/worktree isolation for risky or parallel tasks; document base commit and environment setup.
3. Keep commits focused, avoid unrelated file churn and maintain an explicit review/testing trail.
4. Rebase or merge only after inspecting conflicts, test results and team conventions; never force-push shared branches casually.
5. Confirm the final branch and files changed, and identify any cleanup that remains.

## Deliverable
Branch strategy, diff summary and conflict/verification status.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
