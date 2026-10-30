---
name: agent-tool-design-and-safety
description: Use when building AI agents with tools, approval gates, MCP servers or multi-step execution.
---

# AI agent tool design and safeguards

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Define permitted actions, user identity, tool schemas, trusted vs untrusted inputs and permission boundaries.
2. Use explicit confirmation for irreversible actions, least-privilege access and scoped resource identifiers.
3. Design retries, idempotency, output validation, timeouts and clear failure/partial-success reporting.
4. Test prompt injection resilience, misuse of external content, tool errors, approval bypasses and secret leakage.
5. Log auditable decisions without exposing sensitive prompts or user data unnecessarily.

## Deliverable
Tool contract, trust-boundary model, safe action policies and eval cases.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
