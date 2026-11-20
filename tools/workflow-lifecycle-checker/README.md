# Workflow Lifecycle Report Checker

This optional, offline, dependency-free CLI validates the **structure and consistency** of human- or agent-authored lifecycle investigation reports. It does **not** inspect source code, check databases, execute browsers, email customers, evaluate model output or verify that evidence is truthful.

Run with Node.js 22+:

```bash
npm test --prefix tools/workflow-lifecycle-checker
node tools/workflow-lifecycle-checker/src/cli.mjs --input tools/workflow-lifecycle-checker/examples/check-only.json
```

A report records mode (`check`/`fix`), environment, symptom, expected/actual, first divergence, connection classification, all seven lifecycle stage statuses, affected consumers and tests. Check-only mode must not claim edits. Release-ready fix mode requires executed tests with evidence and no unverified applicable stages/consumers. Use synthetic/authorized fixtures and redact all tokens and customer information.
