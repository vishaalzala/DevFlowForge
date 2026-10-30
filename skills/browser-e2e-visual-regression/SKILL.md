---
name: browser-e2e-visual-regression
description: Use for Playwright/Cypress/browser automation, screenshot comparisons or verifying real user journeys.
---

# Browser E2E and visual regression testing

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Select critical user paths, browsers, screen sizes and expected states; use deterministic fixtures and test accounts.
2. Prefer accessible selectors and event/state waits over fragile DOM positions or arbitrary sleeps.
3. Cover navigation, auth, forms, permissions, network failures, keyboard use, mobile layouts and accessibility checks.
4. Capture screenshots with stable fonts/data/environment; review expected changes before updating baselines.
5. Run tests in isolated environments; document pass/fail/skipped and links to actual artifacts rather than inventing them.

## Deliverable
E2E scenario plan, visual baseline policy and reproducible run results.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
