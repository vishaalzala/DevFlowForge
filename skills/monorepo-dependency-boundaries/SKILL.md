---
name: monorepo-dependency-boundaries
description: Use for multi-package repositories, workspace tooling, dependency graphs and shared libraries.
---

# Monorepo and package boundary management

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Identify package boundaries, ownership, build tools and dependency constraints before proposing consolidation.
2. Define stable public interfaces and avoid cyclic dependencies, implicit workspace imports and unversioned sharing.
3. Coordinate type/build/test caches and affected-package test scope without missing cross-package regressions.
4. Choose versioning and release strategy appropriate to internal and external consumers.
5. Verify clean install, affected builds, CI cache keys and package publishing paths.

## Deliverable
Package map, boundary rules and affected-build checks.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
