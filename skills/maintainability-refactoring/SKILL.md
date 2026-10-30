---
name: maintainability-refactoring
description: Use when safely simplifying legacy code, removing duplication, reducing technical debt, modularizing code, or improving maintainability without unintended behaviour changes.
---

# Safe refactoring and maintainability

**Goal:** Improve long-term maintainability while preserving observable behaviour.

1. Establish current contracts and representative tests; capture baseline before refactoring.
2. Identify duplication, high complexity, dead code, tight coupling, surprising side effects and unowned modules.
3. Rank changes by measurable impact and risk. Separate pure refactors from features and migrations.
4. Refactor incrementally in small changes with tests and review; avoid unbounded directory reorganizations.
5. Check public APIs, events, persistence, performance, error handling, accessibility and compatibility.
6. Document major changes with rationale and follow-up issues; remove only provably unused code.

**Verification:** Equivalent behavior on the existing test matrix; report coverage gaps instead of claiming certainty.
