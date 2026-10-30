---
name: internationalization-localization
description: Use when adding multiple languages, RTL support, localized dates/currency or translation-ready interfaces.
---

# Internationalization and localization

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Identify supported locales, scripts, timezones, units, legal content and fallback behavior.
2. Externalize UI strings while preserving placeholders, pluralization, gender-neutral language and formatting metadata.
3. Use locale-aware formatters for numbers, money, calendars and date/time; do not infer locale from IP alone.
4. Test text expansion, direction changes, font coverage, accessibility and error states on real layouts.
5. Coordinate translation review, versioning and regression tests for locale-specific business logic.

## Deliverable
Localization inventory, format rules and per-locale QA matrix.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
