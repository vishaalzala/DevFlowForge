# SecurityForge v0.12.0 — repository integration

Integrated into DevFlowForge from the reviewed SecurityForge overlay, on top of the current 87-skill v0.11.1 baseline. **21 previously missing security skills added; 108 total.** Existing SKILL.md files are deliberately unchanged.

Coverage: source security, ASVS mapping, OAuth/JWT, cryptography, data handling, fail-safe behavior, logging, agentic/MCP trust, secrets, CI/supply chain, cloud, New Zealand privacy, web inputs, safe DAST planning, abuse limiting, webhooks and reviewable remediations.

Included helper: `tools/securityforge/triage.py` is an offline findings normalizer. It does not scan live websites, call Aikido, inspect repositories, or automatically remediate anything. It consumes supplied JSON only.

Documentation: `references/securityforge-coverage-matrix.md`, `references/securityforge-findings-and-release-gates.md`, `references/securityforge-evaluation-cases.md`.

**Status:** GitHub review-branch work; no changes to customer databases or production deployments. Passing static/fixture tests does not certify any website as secure.

Source links and applicability guidance are in the coverage matrix. All security changes require evidence, scoped authorizations, tested regressions and separate deployment approval.
