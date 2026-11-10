# Changelog

## [0.11.0] - 2026-11-11
- Added `architecture-connection-impact-analysis` (85 → 86 skills), a required Connected/Isolated triage for existing-project engineering tasks and evidence-based upstream/downstream dependency mapping.
- Updated CTO orchestration, onboarding, architecture audit, debugging, implementation review and test-release gates to check shared callers, data contracts, tenant/role permissions, consumers, conversions and side effects before proposed fixes.
- Added original architecture-impact playbook and optional dependency-map evidence checker with synthetic unit tests and CI integration. The checker validates *report completeness*, not actual graph correctness or tests; it never touches customer systems.
- Preserved change authorization, small scoped fixes and honest Not run/Not inspected status. No external application or production data changed.


## [0.10.0] - 2026-11-09
- Implemented five evidence-based weekly recommendations as upgrades to existing skills, retaining **85 independently authored skills** (no duplicate skills added).
- Expanded framework advisory/Next.js tenant isolation checks, Playwright QA reporting, controlled AI skill evaluation, MCP 2026-07-28 compatibility and background-job observability.
- Added offline `tools/skill-evaluator/` and `tools/qa-report-aggregator/` with deterministic unit tests and CI checks. These do not call external LLMs or assert real project coverage.
- Declared Playwright 1.65 for the two optional browser tools and Node.js 22+; compatibility must pass actual CI before release.
- Added four source-linked review references, updated routing, quality gates, docs and fixed duplicated changelog history.
- No customer website, staging, production or live provider integrations were modified.

## [0.9.0] - 2026-11-06
- Added three independently written skills: `design-quality-auditor`, `visual-direction-engine` and `design-preservation-verification` (82 → 85).
- Added original design quality/preservation playbook distinguishing objective defects from discretionary style critiques, with explicit brand and approval boundaries.
- Added opt-in local/staging Playwright browser inspector: responsive viewport captures, semantic control/content inventories, reviewable craft findings, before/after comparisons and optional PNG screenshot diffing. Separate deterministic concept brief tool provides three distinct starting directions.
- Added policy/unit tests and a real local-fixture Chromium smoke test to GitHub Actions; updated routing, metadata, catalog, README and structural validation.
- No third-party themes, images or scripts copied; no hosted browser agent, no production website changes, and no claim of automated aesthetic certification.

## [0.8.0] - 2026-11-06
- Added original `website-qa-auditor` skill (81 → 82), cross-route/control coverage guidance and staging-only business scenario test design.
- Included an optional local Playwright + axe-core CLI that inventories accessible links, buttons, fields, forms, browser errors and viewport-specific issues; produces JSON/Markdown reports.
- Added host/path restrictions, route-depth budgets, opt-in screenshots, staging-origin approval and high-risk action gates to prevent unsafe automatic interactions.
- Added policy unit tests, an optional local-browser smoke fixture and GitHub CI coverage; updated routing, quality gates, manifests, README and catalog. No production website modified.
- This adds a local runner, **not** a hosted MCP browser or autonomous AI agent; browser support and actual target-site coverage require separate setup and measured testing.

## [0.7.0] - 2026-11-03
- Added `adaptive-http-compression`, a project-independent HTTP content negotiation skill (80 → 81).
- Documented Zstd, Brotli, Gzip, RFC 9110 q-values, `identity` fallback, cache/security constraints and mobile compatibility.
- Added source-linked compatibility/test matrix; routed compression investigations through performance and Web Vitals skills.
- Updated manifests, validator, skill catalog, guidance and README. No hosted runtime or production site was changed.

## [0.6.0] - 2026-10-30
- Introduced explicit Red-Green-Refactor test-driven development guidance for behavior changes.
- Expanded risk-based unit, integration, contract, E2E, accessibility and performance test gates with evidence reporting.
- Added an opt-in, permission-scoped penetration-testing handoff after functional verification; no scans run automatically.
- Added three independent skills (77 → 80), and updated routing, quality gates, manifests and skill catalog.

## [0.5.0] - 2026-10-30
- Added 47 independently written skills (30 → 77), especially product/design, UX research, Figma handoff, accessibility, web/mobile, backend, distributed systems, observability, infrastructure, AI and quality workflows.
- Added a complete linkable skill catalog, skill selection guide and research/coverage audit.
- Reworked the README to describe design and engineering workflows, installation, usage, limits and evidence requirements.
- Updated version metadata, test validation and project-agnostic legacy wording.


## 0.4.0 — 2026-10-30
- Renamed the public toolkit to **DevFlowForge** with independent branding.
- Updated the repository marketplace, manifests, documentation, examples and install instructions.
- Retained all 30 project-agnostic engineering skills and public MIT licensing.
