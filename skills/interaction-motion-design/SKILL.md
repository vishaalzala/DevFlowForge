---
name: interaction-motion-design
description: Use when adding transitions, microinteractions, scroll effects, onboarding animation or feedback states.
---

# Interaction and motion design

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Define the purpose of each motion: feedback, hierarchy, continuity or system status; avoid decorative animation without meaning.
2. Choose duration/easing for interaction context and prioritize transform/opacity to reduce jank.
3. Provide reduced-motion behavior and avoid motion that obscures actions, focus or input.
4. Coordinate state timing with async operations and prevent double-clicks or stale UI states.
5. Inspect interaction latency, mobile battery/performance and keyboard/pointer parity.

## Deliverable
Motion specification, reduced-motion fallback and interaction QA checklist.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
