---
name: containers-kubernetes-delivery
description: Use when authoring Dockerfiles, Compose, Kubernetes manifests, container builds or cluster rollouts.
---

# Containers and container orchestration

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Inspect runtime constraints, base images, image provenance, networking and persistence requirements.
2. Use non-root execution, minimal images, pinned dependencies and sensible resource/security limits.
3. Configure probes, graceful shutdown, secrets injection, immutable releases and rollout strategies.
4. Validate images, manifests, vulnerability findings and local service dependencies before cluster changes.
5. Test scaling, health failures, rollback, persistent-volume behavior and observable errors.

## Deliverable
Container build plan, deployment manifests and verification checklist.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
