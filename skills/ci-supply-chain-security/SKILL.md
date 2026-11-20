---
name: ci-supply-chain-security
description: Use when securing GitHub Actions, CI/CD identities, build provenance, artifact integrity, package publishing, software bills of materials and dependency trust.
---

# Ci Supply Chain Security

**Ownership:** Own build identity, CI security and provenance; leave individual dependency patching to dependency-vulnerability-upgrades.

**Workflow**
1. Inventory branch policies, workflow triggers, reusable actions, package registries, runners, credentials and deployment identities.
2. Minimize workflow token permissions, scope secrets by environment and verify third-party action provenance/pinning.
3. Inspect fork pull-request trust, script installation, artifact handling, SBOM generation, attestations and protected releases.
4. Coordinate CVE and package upgrades with dependency-vulnerability-upgrades; avoid duplicate owners and scanners.
5. Test harmless CI fixtures for forks, missing secrets, rejected merges and failed deployment gates.
6. Recommend incremental controls and disclose platform or subscription dependencies without silently changing production CI.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
