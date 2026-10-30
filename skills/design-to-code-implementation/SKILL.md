---
name: design-to-code-implementation
description: Use when implementing an approved design in HTML, CSS, React, Vue, Angular, native apps or another existing frontend stack.
---

# Design-to-code implementation

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Inspect the real app structure, styling conventions and component library before introducing new dependencies.
2. Convert frames and design tokens into semantic components and responsive constraints; preserve required content and states.
3. Use accessible controls with keyboard and screen-reader behavior, not click-only visual replicas.
4. Integrate routing, data loading, auth, validation and error handling without modifying business logic by accident.
5. Compare rendered output against source screens at agreed viewports, then run behavior and regression checks.

## Deliverable
Component implementation plan, visual comparison and verified test results.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
