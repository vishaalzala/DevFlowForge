---
name: workflow-data-lifecycle-debugging
description: Use when a field, payment, status, document, export or converted record is missing, stale, incorrectly persisted, duplicated or inconsistent across edit, autosave, reopen, lists, filters, PDFs, printing or email. Trace the complete data lifecycle, not just the reported screen; distinguish investigation-only from authorized fixes.
---

# Workflow data-lifecycle debugging

**Objective:** Find the first evidence-backed point where the value or workflow diverges, fix its owning layer only when authorized, and verify all affected representations. This specializes `root-cause-debugging`; use `architecture-connection-impact-analysis` for upstream/downstream connections. Read `../../references/workflow-data-lifecycle-playbook.md` for scenario-specific tests.

## Request intent and safety
1. Treat **"check / investigate / audit this issue"** as **read-only investigation**: reproduce safely, trace and report; never edit code, create a PR as a fix, change a database or trigger side effects. Treat **"fix / implement and test"** as permission for scoped code changes and tests on an isolated branch, not production data writes, merges, spending, permission changes, or production deployment.
2. Identify the real repository, branch, environment, affected role/company, record lifecycle state and exact reported symptom. Record observable expected/actual values; distinguish user testimony, source evidence and executed tests. Use synthetic tenants, accounts and records for behavioral checks; respect permission boundaries, particularly with financial documents.
3. Classify Connected vs Isolated with source evidence. Trace connections for every shared producer, state owner, endpoint, persistence mutation, authorization boundary, converter, output renderer, notification, consumer list/filter and job/queue as relevant. Mark edges **Confirmed / Suspected / Not inspected**; scope searches rather than rewriting every page.

## Mandatory evidence trail for relevant stages
4. For each affected field or state transition, build a lifecycle table: **input and default value -> frontend state -> submit/autosave/navigation -> API/service and validation -> database/transaction -> reload/reopen -> downstream conversions and outputs**. For each stage record source path or request/log evidence, observed value, discrepancy and *Pass / Fail / Not run / Not applicable*. A stage may be irrelevant but requires a reason. Do not equate a screenshot with a persisted record.
5. Test edge values separately: `0` versus absent, `false`, empty string, `null`, `undefined`, whitespace, existing/legacy records, same-field races and stale caches. Inspect `||`, `??`, coercion, JSON omission, selective updates, form dirty flags and data-model projections only where evidence points. Do not overwrite valid historical data to correct rendering.
6. For document actions, distinguish **read-only print / download / email** from explicit permitted edits. Trace unintended saves and paid/locked state transitions; ensure an approved metadata-only edit cannot mutate financial fields. Compare the **actual generated PDF bytes/content** used by print and the actual email attachment, not only their preview models.
7. For financial states, start from the authoritative ledger/payment and surcharge semantics. Reconcile recorded charge, applied payments, balance, rounding tolerance and flags; compare editor, list badge, stored status, list filters, PDF and email. Verify genuinely partial, paid, waived-surcharge, overpaid and zero/negative adjustment cases as relevant. Never silently modify payments or totals in production.
8. For duplicate writes, inspect UI double-submit, autosave, navigation, retries, workers and webhooks, plus **server-side idempotency**, transaction boundaries and uniqueness; verify concurrent attempts against isolated fixtures. For conversions, map every expected field from source -> target -> persistent record -> reopened target -> downstream output, retaining authorization and tenant linkage.

## From finding to release gate
9. Identify the **first divergence**, causal owner and other confirmed consumers. Separate **root cause proved** from **plausible hypothesis**, with evidence for each. If a dependency is inaccessible, mark it Not inspected and state what verification is needed.
10. Investigation-only output: symptom, reproduction evidence, lifecycle/impact map, probable or confirmed cause, affected surfaces, suggested smallest fix, tests not run and next approval. **Do not create code changes.**
11. Authorized fix: write a failing regression assertion where feasible; change only proven impacted paths; run targeted and cross-workflow tests on synthetic fixtures; review diff and rollback. Never treat passing UI tests as proof that email attachments, filters or persisted state match. If downstream risks remain untested, do not claim Ready.
12. Report in four sections: **Found / Changed (or No changes) / Tested (Pass, Fail, Not run, N/A with evidence) / Remains**. If a structured evidence report is needed, use the optional `tools/workflow-lifecycle-checker` to validate report completeness. The checker does not inspect code, execute browser tests or prove that claims are true.

## Example triggers and non-triggers
- Triggers: "odometer disappeared after reopening", "PO number missing from emailed PDF", "paid badge says Paid but filter excludes it", "print paid invoice fails", "duplicate invoice after quick save", "job to invoice lost a field".
- Not a lifecycle audit by default: "change button color" or "rewrite the FAQ"; use ordinary frontend/content skills and lightweight regression checks.
