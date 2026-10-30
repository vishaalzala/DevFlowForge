---
name: offline-first-sync
description: Use when planning a PWA or desktop app that allows offline work, local caching, conflict resolution and eventual synchronization.
---

# Offline First Sync

**Goal:** Support safe offline edits without silently overwriting another user’s changes.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Classify data by offline safety: public/reference data, sensitive customer records, financial documents and secrets; avoid caching prohibited data.
2. Choose per-record version/ETag or mutation sequence, queue local intents, and make server reconciliation idempotent.
3. Define conflict policy per field/workflow: last-write-wins only for low-risk fields, explicit resolution for invoices, stock and billing.
4. Encrypt sensitive local storage where supported, bind offline data to authenticated tenant and clear it on logout/company switch.
5. Test offline→online transitions, two devices editing one record, clock drift, expired sessions, deleted records and retry loops.

## Verification checklist
- No silent conflict loss.
- Tenant isolation offline and online.
- Resumable sync after interruption.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
