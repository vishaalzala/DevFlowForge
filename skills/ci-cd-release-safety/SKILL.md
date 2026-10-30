---
name: ci-cd-release-safety
description: Use when designing or repairing CI pipelines, cloud, on-premises or local releases, preview deployments, feature flags, build jobs or rollback procedures.
---

# Ci Cd Release Safety

**Goal:** Release incrementally with explicit environment and failure boundaries.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Locate actual pipeline config and deployment provider settings via authorized tools; distinguish preview, staging and production.
2. Create build/lint/type/test/security stages appropriate to the repo, using lockfiles and scoped credentials.
3. Explain migration ordering, backward compatibility, environment-variable presence and external provider readiness.
4. Prefer preview verification, feature flags and measurable canary/rollback criteria for high-risk changes.
5. Capture deployment URLs and checks only when a tool returns them; never claim a successful rollout from a green local build.

## Verification checklist
- No production secrets echoed.
- Rollback path documented.
- Preview and production not conflated.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
