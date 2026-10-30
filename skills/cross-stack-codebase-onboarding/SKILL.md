---
name: cross-stack-codebase-onboarding
description: Use when starting work in any unfamiliar repository or language stack, or when identifying the architecture and safe commands before coding.
---

# Cross-stack codebase onboarding

**Goal:** Understand a repository using evidence instead of assumptions about framework or language.

1. Identify repository identity, active branch, version control status and the root package/build manifests.
2. Locate app/library entry points, modules, data flows, persistence, integrations, test suites and build/deployment pipelines.
3. Read the project README, contribution instructions, dependency locks and architecture notes; distinguish outdated documentation from current code.
4. Establish the smallest supported local run/test workflow and observe actual outcomes if access permits; never fabricate outputs.
5. Identify security boundaries, high-change-risk modules, untrusted inputs and production impact.
6. Produce a concise architecture map with commands, probable owners, known risks and an initial task plan.

**Guardrail:** Treat provider-specific methods as conditional; a project might be Python, Go, Rust, JavaScript, Java, PHP, mobile, embedded or something else.
