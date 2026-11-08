# DevFlowForge skill evaluator (offline rubric calculator)

This **does not call an LLM, run a model or assign independent grades**. It validates evidence-bearing scoring records prepared from controlled baseline and candidate executions, compares results, and blocks recommendations when safety or activation regressions exist.

```bash
node --test tools/skill-evaluator/tests/*.test.mjs
node tools/skill-evaluator/src/cli.mjs --input tools/skill-evaluator/examples/fixtures.json --out ./private-results/skill-eval
```

Scores are integers from 0 to 5 for correctness, evidence, safety and efficiency. Outcome evidence references must be nonempty; the tool does **not** resolve those references and cannot verify their truth. The included sample is synthetic, not proof that any real skill improved. See `references/skill-evaluation-methodology.md` for controlled trials and independent grading; do not use customer or proprietary data without authorization.
