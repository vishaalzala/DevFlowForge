---
name: figma-design-handoff
description: Use when reviewing Figma files, translating designs to implementation, or coordinating designer/developer handoff.
---

# Figma and design-to-engineering handoff

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Confirm access to the actual design file and page/version; do not invent layouts or claim access to private files.
2. Extract design tokens, frames, reusable components, grids, type styles, assets, spacing and responsive constraints.
3. Annotate interactive states, content rules, focus handling, empty/error variants and asset licensing.
4. Map design components to the existing frontend library; track intentional deviations and feasibility tradeoffs.
5. Check screenshots or visual diffs at agreed viewport sizes and secure design approval before high-risk changes.

## Deliverable
Design-to-component map, missing-state checklist and implementable handoff notes.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
