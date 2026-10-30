---
name: project-knowledge-handoff
description: Use when the user asks to remember engineering lessons, document decisions, create runbooks, hand off a fix, track ongoing architectural context, or standardize development knowledge across projects.
---

# Verified lessons, project documentation and handoff

1. Distinguish observed facts from guesses and future plans. Record only decisions and verified implementations, with repo/path/PR and date if known.
2. Store durable team knowledge in the project's existing docs structure when editing access is available. Avoid duplicating the same knowledge in many documents or adding a new top-level file without reason.
3. Track ADRs for architecture decisions (context, options, tradeoffs, decision, risks, rollback); runbooks for operational incidents; PR notes for fixes and tests.
4. Avoid passwords, personal records, customer data and security-sensitive tokens in documentation or prompts. Keep links to trusted issue/PR sources when available.
5. This plugin does not grant automatic, cross-chat learning or persistent memory. For lasting updates use actual authorized repositories/files and confirm a write succeeded; otherwise return a suggested note ready to save.
6. At task end, capture 'what changed, why, evidence, tests, next step'. Do not imply background monitoring or future action unless an actual scheduling tool was used.
