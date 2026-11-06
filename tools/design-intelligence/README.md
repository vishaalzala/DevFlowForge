# Design Intelligence — local visual QA and preservation toolkit

Part of **DevFlowForge**, alongside the three `design-*` / `visual-*` skills. This is an **opt-in local CLI**, not a hosted browser agent or a ChatGPT UI. It reads pre-approved local/staging URLs; it never clicks controls, fills forms, logs in or modifies an app.

## Setup and run

```bash
cd tools/design-intelligence
npm install
npx playwright install chromium
cp config/audit.example.json config/audit.json
# Update exact local/staging baseUrl, explicit paths, viewports and outputDir.
npm run audit -- --config config/audit.json
```

For non-local staging HTTPS, also set `DQ_APPROVED_ORIGIN` to the exact authorized origin, e.g. `https://staging.example.test`. Production targets are rejected by this runner. Routes must be explicit; there is no autonomous crawl.

To capture screenshots, set `"screenshots":true` in the approved config and `DQ_SCREENSHOTS=1`. Use **synthetic data** and private output directories; screenshots may contain sensitive content. To compare a redesign under the **same origin, role and fixtures**:

```bash
DQ_SCREENSHOTS=1 npm run audit -- --config config/audit.json
# Save the path to results/report.json as your baseline. Implement the approved redesign in staging.
DQ_SCREENSHOTS=1 npm run audit -- --config config/audit-after.json --baseline /path/to/baseline/report.json
```

The report lists removed headings, links, controls, fields and forms, and optional screenshot pixel changes. The latter are **review only**; a changed visual is not necessarily a defect, and unchanged controls don't prove buttons work. The output includes `report.json` and `report.md` in the configured outputDir. Do not reuse baseline and after output directories when comparing screenshots.

For three **original concept briefs** from user-provided context, run:

```bash
npm run directions -- --brief config/brief.example.json
```

These are structured direction prompts, **not** ready-to-publish designs, screenshots, AI-generated images or borrowed themes.

## Validation

```bash
npm test
node tests/browser-smoke.mjs
```

Browser smoke requires installed Chromium. The fixture test creates a local test site, records a baseline, changes its DOM, and verifies that an unexpected removed control is detected. No third-party website is contacted.

For real workflows, authenticated roles, actions, database state, axe accessibility and wide route coverage, use the separate `tools/website-qa-auditor` with a configured safe environment. The design tool is a complementary visual/preservation layer.
