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

## Executable, baseline-controlled skill evaluations
Use `../../tools/skill-evaluator/` to validate *externally obtained*, anonymized outcome records for the same fixture attempted with and without a selected skill. The CLI never calls a model; the user must run the same task under controlled model/tool/temperature context, preserve raw outputs and independently grade factual correctness, safety, verification evidence and efficiency. Include positive, negative and ambiguous invocation test prompts. A score without externally verifiable evidence is **not** an observed improvement, and a high score in a synthetic fixture is not proof of production capability.

Randomize run order, avoid evaluating on examples used to write the skill, allow multiple seeds/tasks, inspect regressions by task, and keep publication conditional on a credible quality increase with no new unsafe behavior. Stop if scoring is unverifiable or missing. Compare distributions across runs, not one winner. See `../../references/skill-evaluation-methodology.md`.
