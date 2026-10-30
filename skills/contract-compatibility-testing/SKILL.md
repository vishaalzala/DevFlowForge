---
name: contract-compatibility-testing
description: Use when APIs, events, schemas or shared libraries change and downstream consumers may break.
---

# Contract and compatibility testing

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Catalog producers, consumers, supported versions, event schemas and actual usage before making changes.
2. Identify mandatory and optional fields, defaults, semantic behavior and compatibility expectations.
3. Write provider and consumer tests for old/new payloads, missing fields, pagination and errors.
4. Gate breaking changes behind versioning and migration windows with explicit announcements.
5. Check staged rollout and rollback using both compatibility test results and production-safe telemetry.

## Deliverable
Contract matrix, tests and migration plan.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
