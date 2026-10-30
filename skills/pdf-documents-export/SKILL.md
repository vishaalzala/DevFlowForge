---
name: pdf-documents-export
description: Use when generating printable quotes, invoices, statements, service records, repair reports or branded PDFs and exports.
---

# Pdf Documents Export

**Goal:** Ensure generated documents faithfully reflect approved source records.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Locate source data and render pipeline; distinguish editable draft, approved financial record and generated snapshot.
2. Check NZ date and locale rules where relevant, currency rounding, tax breakdown, page numbering, long descriptions and branding.
3. Validate authorization for downloads and links, signed URL expiry, attachment sizes and filename sanitization.
4. Compare output to on-screen numbers and original data; avoid re-querying mutable state mid-render without version controls.
5. Test representative large and small documents plus missing images, Unicode, multi-page tables and accessibility where feasible.

## Verification checklist
- Totals identical across UI and document.
- No cross-customer download access.
- Output tested on multiple pages.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
