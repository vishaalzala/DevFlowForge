---
name: prd-acceptance-scenarios
description: Use when turning an idea into a PRD, feature specification, user stories, or measurable acceptance criteria.
---

# Product requirements and acceptance scenarios

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. State objective, target roles, functional outcomes, existing workflows, constraints and excluded scope.
2. Map key and exceptional user journeys including permissions, offline/error/empty/loading states and data retention.
3. Write acceptance scenarios in testable Given-When-Then or equivalent observable language without prescribing unneeded implementation.
4. Identify metrics, dependencies, data contracts, accessibility implications, security considerations and release gates.
5. Review for ambiguity, contradictions, missing negative cases and backward-compatibility before implementation starts.

## Deliverable
Concise PRD, scenario matrix, explicit non-goals and unresolved decisions.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
