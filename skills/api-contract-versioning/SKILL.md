---
name: api-contract-versioning
description: Use for designing REST/GraphQL/gRPC APIs, SDK contracts, versioning, pagination and integration compatibility.
---

# API contracts and versioning

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Inventory consumers, existing endpoint behavior, schema and authentication; write contract examples before implementation.
2. Define validation, idempotency, pagination, filtering, error envelopes, rate limits and observability.
3. Choose compatibility strategy and deprecation period based on consumer usage; avoid silent breaking changes.
4. Generate or maintain machine-readable schemas where useful and write consumer/provider contract tests.
5. Check authorization, input boundaries, error leakage, retries and real integration flows.

## Deliverable
Versioned contract, compatibility matrix and contract-test plan.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
