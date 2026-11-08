# Evidence-based agent skill evaluations

## Controlled A/B experiment
1. Write objective tasks, expected outcomes, failure/forbidden actions and activation criteria *before* assessing a skill. Use synthetic open-source fixtures and no real customer data.
2. Run a baseline without the skill and a candidate with the skill. Keep the same model version, context budget, tools, permissions, environment and task inputs; alternate run order and include repeated samples where possible.
3. Require external evidence: tests/CI, linked diffs, rubric rationale and logs. Penalize unsupported claims, invented access, unauthorized actions and secrets leakage; any critical unsafe outcome is an explicit release blocker regardless of average score.
4. Grade correctness, evidence, safety and efficiency independently on fixed 0–5 scales. Save grades for baseline and candidate and whether activation happened when appropriate. Use at least positive/negative/ambiguous activation prompts and held-out cases.
5. Use `tools/skill-evaluator/` to validate the JSON input and compute per-task deltas and overall summary; this **does not invoke or independently evaluate an LLM**. Scores come from the provided grading evidence, not the tool itself. Avoid claiming statistical significance from few tests.
6. Track regressions, baseline drift and model differences. Publish only when improvements persist and critical safety gates pass.

## Structure
`fixtureId`, `scenario` (`positive`, `negative`, `ambiguous`), `baseline` and `candidate` each with `correctness`, `evidence`, `safety`, `efficiency` (0–5 integer), `activation` boolean, `reference` nonempty external evidence string; optional `notes`. `expectedActivation` is `true`, `false` or `null`. No secrets, PII or model transcripts required.

## References
- DevFlowForge's `prompt-and-agent-skill-evaluation` skill and TDD/release gates.
- Prefer the host's documented skill loader and evaluator when it exists; do not install expensive external providers implicitly.
