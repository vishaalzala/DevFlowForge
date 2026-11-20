---
name: secure-code-analysis
description: Use when configuring static security analysis (SAST), interpreting CodeQL/Semgrep rules, reviewing source injection paths or validating code-scanner findings.
---

# Secure Code Analysis

**Ownership:** Own source-code data-flow and security-scanner findings, not blind keyword matching.

**Workflow**
1. Confirm language, frameworks, existing scanners and authorized CI scope before choosing an analyzer.
2. Inspect source-to-sink data flow, permission checks, input transformations and actual vulnerable-feature usage.
3. Use trusted SAST tools and narrowly relevant rules; do not install unreviewed remote rules or scripts.
4. Deduplicate results with provider IDs and code evidence, and classify possible versus confirmed exposure.
5. Propose smallest safe fixes with meaningful regression tests and affected-architecture review.
6. Refer verified findings to security-findings-triage and sensitive patches to remediation-pr-review.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
