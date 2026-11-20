# Evidence-led data lifecycle and cross-output regression playbook

Use with `workflow-data-lifecycle-debugging`, `root-cause-debugging` and `architecture-connection-impact-analysis` when a field or business state is inconsistent across surfaces. This playbook is reusable across stacks; the examples are synthetic, not claims about an inspected project.

## 1. Minimum investigation artifact

Record: task wording (check-only or fix-and-test), environment/commit, the exact record state and authorization, actual vs expected behavior, reproduction steps, first divergent boundary, evidence-qualified impact graph, affected roles and consumers, change scope, and test evidence or explicit Not run.

Trace only relevant stages; indicate Not applicable with a reason: input/default -> frontend state -> save/autosave and navigation -> API/service -> DB mutation/constraint -> reopened record -> conversions -> print/PDF/download -> email attachment -> lists/filters/ledger/webhook side effects.

For every observed stage show: **origin path or log/request, source value, target value, transform, authority to write, evidence strength, status**. If a data field exists at origin but disappears at output, find the first projection/transform that loses it. Do not add an unrelated database column without proof of a schema mismatch.

## 2. Synthetic regression matrix

| Symptom | First likely boundaries to inspect | Required negative/positive examples |
| --- | --- | --- |
| Existing value missing in editor | DB query -> API projection -> initialization -> rendering | existing/new records, null, blank, zero, nonzero, refresh/reopen |
| New value does not persist | blur/change handlers -> autosave -> mutation -> DB -> refresh | explicit Save, blur, navigation, concurrent edit, API failure, locked-state restrictions |
| Field missing in PDF | persisted document -> shared export model -> PDF template -> print and email paths | populated/empty field, printed PDF vs actual emailed PDF bytes, old documents |
| Print/email fails on locked document | action handler -> implicit save -> document-state guard | paid and unpaid print/email succeed without mutation; explicit allowed metadata edit still works |
| Wrong total / payment badge / filter | ledger/charge rules -> aggregate -> status -> UI/list/filter/PDF | paid, genuinely partial, waived fee, refund/overpayment, rounding boundary, old records |
| Duplicate document | handler, retries, parallel API requests, idempotency key, transaction, unique constraint | simultaneous submissions, failed/retried requests, one intended record, no cross-tenant conflict |
| Field lost in conversion | source persisted object -> mapping -> create target -> target reload -> output | quote->invoice, job->invoice, zero/blank values, tenant ownership, statuses |
| Vehicle missing from document | customer/vehicle association -> API filter -> selector -> save -> reload | valid related vehicle, unlinked vehicle, wrong tenant, stale selection |

These are prompts for **investigation**, not pre-verified source paths. Examine the actual repository before naming owning modules.

## 3. Controlled checks

- Compare two existing read paths without mutating customer data; use staging/disposable fixtures for writes.
- Reproduce with saved record IDs in a safe fixture; capture the same version before and after reload, not a mutable live row.
- Treat `0`, `false`, `null`, `undefined` and empty string according to field semantics; test all meaningful states.
- Separate calculated balances from display/status caches; confirm list filters use the same authoritative semantics or a reconciled derived state.
- Verify the customer email's **actual attachment** (artifact hash or parsed content) against the downloadable/printed artifact; do not send a test email to a real customer.
- For concurrent writes, check idempotency at the server and DB boundaries, not merely a disabled Submit button.
- Model role, company, financial lock, paid document, and cross-tenant denial on both reads and writes.

## 4. Closure and release criteria

- **Check-only:** return findings, evidence map, first divergence, affected consumers, recommended repair, gaps; no changes.
- **Fix-and-test:** preserve existing functionality, make the smallest fix, verify previously failing test plus affected consumers; compare changed files with impact map.
- A missing or unsuccessful required check is **Fail** or **Not run**, not Pass; record source and test command/artifact where possible. Unknown consumers remain a review risk.
- Paid/locked financial data, tenant isolation, permissions, migrations, notifications and production release require their own explicit authorization.
- The optional JSON report checker only checks required evidence fields and status consistency. It does not connect to GitHub, databases, browsers or email providers.
