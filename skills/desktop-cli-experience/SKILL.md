---
name: desktop-cli-experience
description: Use when building desktop apps, terminals, CLIs, local tools or command-driven workflows.
---

# Desktop and command-line developer experience

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Determine target OS, packaging runtime, terminal/shell expectations, accessibility and local data lifecycle.
2. Design discoverable commands, helpful help output, consistent exit codes, dry-run behavior and non-destructive defaults.
3. Handle filesystem permission, path encoding, concurrency and cross-platform differences with explicit tests.
4. Make errors actionable and logs redacted; avoid leaking config/secrets in CLI output.
5. Verify install, upgrade, uninstall, argument parsing, interactive and noninteractive modes on supported environments.

## Deliverable
Command UX contract, compatibility matrix and release checklist.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
