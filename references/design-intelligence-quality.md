# DevFlowForge Design Intelligence & Quality — execution playbook

## Purpose and division of responsibilities

- `visual-direction-engine`: deliberate concepts for new work; does not prescribe specific palettes, layouts or copy.
- `design-quality-auditor`: objective issues and subjective design critique, with clear evidence levels.
- `design-preservation-verification`: compare existing interfaces before and after authorised changes, and check that they still work.
- `website-qa-auditor`: route inventories, accessibility and explicit staging-only user-journey tests.
- `design-systems-tokens`, `ui-ux-design` and `visual-design-critique`: foundations and human review, not replaced by these new skills.

## The two types of gates

**Objective checks, potentially blocking** when the acceptance criteria require them: inaccessible contrast confirmed by WCAG tools, keyboard traps, blocked primary action, unintended horizontal scrolling, lost controls, disappeared essential content, failed business tests, runtime/console errors and false claims. Machine warnings need reproduction and context.

**Craft suggestions, nonblocking**: generic-looking three-card grids, too many similar sections, unmotivated decorative gradients, weak visual emphasis, inconsistent spacing rhythm, excessive labels, repetitive placeholder illustrations, artificial screenshots and unnecessary animation. A legitimate brand style or dense enterprise dashboard can justify these patterns. Never enforce one designer's style as universal truth.

## Design direction brief

Record: visitor's one job; what content/metrics/assets are real; audience and accessibility needs; approved brand tokens; existing constraints; three distinct composition concepts; responsive first-screen; content states; image rights; implementation complexity; risks; option selected and why. Do not infer logos, testimonials, conversion rates or credentials.

## Preservation contract

Before redesigning, establish a controlled **baseline** on an authorised local/staging instance. Keep the same origin, role and synthetic test data during comparison. Capture names/destinations of links, headings, labelled inputs, buttons and form counts; record full-window screenshots only on explicit opt-in. Check every removed control and heading manually. Pixel-level differences are expected during redesign and do not independently prove success or failure.

The optional `tools/design-intelligence/` runner takes an explicit route list; it does not spider the whole site, click actions or submit forms. It restricts local/staging origins and requires explicit approval for screenshots. The browser tool does **not** know a product's business workflow; run `tools/website-qa-auditor/` plus explicit domain tests for that. Browser tests cannot guarantee all permissions, handlers or data transactions work.

**Risk management:** No active scanning of third-party sites or unapproved production pages. Keep fixture identities and secrets out of reports; avoid persistent auth states in Git. Only review authorised URLs and data. For private apps use dedicated test users and restrict local report access. Use a clean browser context and avoid submitting forms or mutating records.

## Release report

| Gate | Evidence | Status |
|---|---|---|
| First-screen clarity and hierarchy | design brief and named screenshots | Pass / Fail / Not run |
| Accessibility and responsive defects | axe/keyboard/viewport observations | Pass / Fail / Not run |
| Expected controls and critical content preserved | before/after inventories | Pass / Fail / Not run |
| Visual changes reviewed | screenshot diffs + human approval | Pass / Fail / Not run |
| Functional workflows preserved | separately run deterministic E2E tests | Pass / Fail / Not run |

If a test was not run, say **Not run**, never Pass. For isolated new designs without a baseline, mark preservation Not applicable. No autonomous browser or agent is activated by the skill files alone.
