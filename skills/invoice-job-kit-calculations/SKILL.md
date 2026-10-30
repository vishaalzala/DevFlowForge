---
name: invoice-job-kit-calculations
description: Use when debugging quotes, invoices, job kits, GST-inclusive prices, discounts, duplicate line items, conversion from jobs or PDF totals.
---

# Invoice Job Kit Calculations

**Goal:** Keep one source of truth for financial calculations and item identity.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Identify source-of-truth amounts, currency precision, whether each price is tax-inclusive, and current document lifecycle state.
2. Trace selection events, optimistic updates, autosave and API inserts; diagnose double-insert through request IDs, state events and DB constraints.
3. Use stable item IDs and idempotency guards; never deduplicate by arbitrary description alone.
4. Specify order of operations for quantity, line-level discounts, document-level discounts, tax, rounding and customer defaults.
5. Validate editor totals against persisted documents, emailed representations, PDFs and downstream ledger/billing where applicable.

## Verification checklist
- Single item selection creates one item.
- GST and rounding examples reconcile.
- No edit silently changes historical amounts.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
