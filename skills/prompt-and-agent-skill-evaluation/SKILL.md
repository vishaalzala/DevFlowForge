---
name: prompt-and-agent-skill-evaluation
description: Use when writing a new SKILL.md, improving agent instructions, auditing skills, or measuring whether a skill helps.
---

# Authoring and evaluating agent skills

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Define narrow invocation conditions and an outcome the agent can verify; avoid one broad skill triggering for everything.
2. Write short, explicit actions and references with clear tool/precondition dependencies; preserve portable frontmatter.
3. Create positive, negative and ambiguous test prompts to check when the skill activates and when it should not.
4. Evaluate task quality against a baseline without the skill, including correctness, efficiency, safety and overreach.
5. Version changes, record failures and keep only improvements supported by observed outcomes.

## Deliverable
Portable skill, activation test cases and evaluation notes.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
