# Consolidated browser QA report (optional)

Combines **existing** read-only Website QA Auditor and Design Intelligence JSON reports. No browser, model API or remote network call is made by this tool. It does not claim unvisited routes are tested.

Requirements: Node.js 22+ (no npm dependencies).

```bash
node tools/qa-report-aggregator/src/cli.mjs --qa ./qa-results/report.json --design ./design-results/report.json --out ./private-results/combined
node --test tools/qa-report-aggregator/tests/*.test.mjs
```

`--qa` and `--design` are optional individually; at least one is required. The output includes both `.json` and `.md`. Keep outputs out of Git and never upload reports with real customer data. A genuine `@playwright/test` suite can separately enable the Playwright 1.65 `failures` reporter; this utility does **not** pretend to read test-runner traces or classify retries that were not recorded.
