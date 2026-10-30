---
name: frontend-component-architecture
description: Use when designing reusable components, UI module boundaries, state ownership or frontend refactoring.
---

# Frontend component architecture

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Inventory existing components, design tokens, interfaces and route boundaries before proposing architecture.
2. Separate business logic from presentation where useful; avoid abstraction that hides a one-off use case.
3. Use explicit prop and event contracts, composition, consistent naming and accessible semantic primitives.
4. Choose state ownership to minimize prop drilling and unnecessary shared subscriptions; preserve form and navigation behavior.
5. Write component tests for variants, edge states and user interactions; document migration when replacing shared components.

## Deliverable
Component boundary proposal, contract map and test checklist.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
