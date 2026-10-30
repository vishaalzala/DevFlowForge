---
name: database-migrations-import
description: Use when changing database schema, importing external spreadsheets, migrating data, mapping legacy records or planning rollback and backups.
---

# Database Migrations Import

**Goal:** Preserve data and allow safe repeated imports and schema evolution.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Snapshot the observed schema and identify dependencies, tenant ownership, existing constraints and migration toolchain.
2. Prepare expand→migrate→contract steps when deployed code may overlap; test compatibility with current and next application versions.
3. For imports: map columns, normalize dates/currencies, preview results, detect duplicates and invalid foreign keys before write.
4. Use batches, checkpointing and idempotent upserts where appropriate; record imported IDs and enable scoped rollback rather than destructive global deletes.
5. Test with representative synthetic records and backups, including partial failure and retry recovery.

## Verification checklist
- Rollback tested or explicitly blocked.
- Tenant scope preserved.
- Import preview and reconciliation totals provided.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
