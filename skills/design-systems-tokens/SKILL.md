---
name: design-systems-tokens
description: Use when defining visual foundations, design tokens, component libraries, theming or cross-product UI consistency.
---

# Design systems and token architecture

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Audit existing visual primitives and duplicates; preserve semantic roles instead of adding arbitrary color or size tokens.
2. Define typography, spacing, radius, elevation, color, motion, breakpoints and dark-mode semantics with named tokens.
3. Use a component inventory documenting anatomy, variant, size, state, content rules and accessibility behavior.
4. Create a versioned token and component migration strategy with deprecation guidance rather than breaking all screens at once.
5. Validate contrast, responsive scaling, reduced motion and backward compatibility in example screens.

## Deliverable
Token specification, component matrix, usage examples and migration notes.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
