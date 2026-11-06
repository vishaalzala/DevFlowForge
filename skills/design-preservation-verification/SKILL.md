---
name: design-preservation-verification
description: Use when redesigning, restyling or polishing an existing interface and checking that controls, headings, actions, content, navigation, responsiveness and user flows remain intact.
---

# Design preservation and before/after verification

Use the existing `browser-e2e-visual-regression` and `website-qa-auditor` skills rather than duplicating functional QA. The optional inspector at `../../tools/design-intelligence/` can record local/staging screenshots and structural snapshots; read `../../references/design-intelligence-quality.md`.

1. Confirm **scope**: polish (surface detail), restyle (tokens/components) or redesign (layout and hierarchy). Record specifically authorised changes and elements that must remain unchanged.
2. Collect a **before snapshot** on the same approved environment, test role, fixtures, route and viewport: headings, navigation destinations, actionable buttons, labelled inputs, forms, visible key content and optional screenshots. Never capture production customer information without explicit permission and safe handling.
3. Implement on a feature branch with minimal changes; preserve real content, working routing, handlers, validation, permissions, responsive interaction states, analytics identifiers and accessibility semantics. No speculative replacement of business flows or hard-coded demo data.
4. Collect an **after snapshot** under identical account, seed, URL, viewport, font and browser conditions. Diff structural identifiers and screenshots; classify removals as *authorised*, *intentional migration* or *unexpected regression*. An image delta is evidence of change, not automatically a failure.
5. Verify key user journeys with actual Playwright assertions and API or database checks when changes affect behaviour. Check focus, overflow, zoom, reduced motion, long/error/empty content, responsive layout and links. A DOM inventory cannot prove a button still works.
6. Require review of every unexpected removed control or important content element and every failing test before claiming the redesign safe. Keep Pass / Fail / Not run / Not applicable with links to observed artifacts. No automatic production deployment.

**Output:** Before/after evidence, comparison matrix, approved change list, unexpected regressions, functional test results and explicit sign-off criteria.
