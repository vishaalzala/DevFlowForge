---
name: ai-evaluation-human-review
description: Use when building AI estimation, image understanding, model routing, prompt evaluation, confidence display or human-review workflows.
---

# Ai Evaluation Human Review

**Goal:** Evaluate AI assistance with real test cases and explicit human override.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Define the target task and measurable error types: hallucinations, incorrect domain entities, misinterpreted inputs, unsupported claims and unsafe assumptions.
2. Create a consented, de-identified evaluation dataset with representative edge cases and independently labelled expected outputs.
3. Compare prompts/models on accuracy, abstention, latency, token cost and stability; do not treat confidence wording as calibrated probability.
4. Keep raw model suggestions separate from verified human decisions; log model/version, prompt release, reviewer action and reason for overrides.
5. Introduce model or prompt updates behind a canary and regression evaluation; route ambiguous results for human checking.

## Verification checklist
- Human review controls preserved.
- Sensitive images protected.
- Baseline vs candidate metrics reported.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
