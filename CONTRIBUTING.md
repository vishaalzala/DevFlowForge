# Contributing

Thank you for helping improve DevFlowForge, created by Vishaal Zala.

1. Open an issue describing the problem or enhancement. Explain why it helps more than one project or stack.
2. Add or modify one focused `skills/<slug>/SKILL.md` with YAML frontmatter (`name` matching the folder and `description` identifying when to invoke it).
3. Provide actionable investigation steps, failure scenarios, verification and rollback guidance. Avoid one-off assumptions or product-specific hardcoding except in clearly labelled specialist skills.
4. Do not copy third-party code, skill text, or copyrighted instructions without the required licence and attribution. Keep the package original and respect dependencies' licences.
5. Exclude private logs, credentials, secrets and customer data. Use synthetic examples.
6. Run `python scripts/validate_plugin.py`, update `CHANGELOG.md` when appropriate and open a PR.

The maintainer may request additional tests or revisions before accepting changes.

## Before proposing another skill
1. Search [SKILLS.md](SKILLS.md) for overlap; prefer improving an existing skill when it has the same outcome.
2. Write a narrow `description` trigger, actionable workflow and observable deliverable; avoid filler and duplicating instructions from another repo.
3. Include one positive, one negative and one ambiguous usage example, and explain how the result would be checked.
4. Update the catalog, routing guidance and tests, run `python scripts/validate_plugin.py`, and document limitations in the PR.
