# Architecture Impact Checker (optional, offline)

The **architecture-connection-impact-analysis** skill introduces mandatory Connected/Isolated triage for DevFlowForge's CTO workflow. This small **Node.js 22+ / no-dependency** checker validates the completeness and internal consistency of an explicitly authored JSON impact manifest. It **does not read source code or the database**, discover dependencies, check actual test execution, or prove an evidence link. Those tasks require separately authorized repository access and real tests.

## Use

```sh
node tools/architecture-impact-checker/src/cli.mjs --input tools/architecture-impact-checker/examples/connected-release.json
npm --prefix tools/architecture-impact-checker test
```

The supplied examples use **synthetic** paths and fake evidence solely to exercise the validator; never present them as real findings. For a real project create a separate, private/approved JSON file describing actual source-backed connections and tests. Never include secrets, personal data or internal tokens.

## Fields

- `task`, `repository` and `stage`: `plan` or `release`.
- `classification`: `kind` (`connected` or `isolated`) and a substantive `reason`.
- `approvedPaths`, `changePaths`: repository-relative approved scope and actual modified paths; directories end with `/`. Out-of-scope edits fail.
- `nodes`: identified architecture components, services, routes and boundary nodes with source evidence.
- `edges`: verified producer/consumer relationships with source evidence.
- `surfaces`: known affected consumers as `nodeId` entries and rationale.
- `riskChecks`: `authorization`, `tenantIsolation`, `dataIntegrity`, `downstreamEffects`, with status and evidence or N/A reason.
- `tests`: explicitly associated `surfaceIds`, actual status and execution evidence.
- `unknownConnections`: uninspected links. A release-ready claim fails while unknowns remain.

The `plan` stage can contain unrun checks, with warnings. At `release` stage every known impacted consumer needs a passing assertion and unresolved tests/risks block readiness. A passing JSON gate **is not a substitute** for code review, user permission, real test execution or a mandatory deployment approval.

## Integration

If a target repository wants hard CI enforcement, add a step to run this checker on its maintained manifest. DevFlowForge itself does **not** automatically install such a gate into external repositories. Never auto-merge or deploy based solely on a passing impact manifest.
