---
name: stripe-billing-integrity
description: Use when modifying Stripe subscriptions, trials, discounts, add-ons, metered usage, webhooks, entitlement gates or billing reconciliation.
---

# Stripe Billing Integrity

**Goal:** Maintain a consistent and auditable relationship between payment events and application entitlements.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Confirm product/price IDs only through authorized config and provider results; use test mode for new scenarios.
2. Map each state: trial, active, grace, past_due, canceled, card update, upgrade/downgrade, admin exception and add-on eligibility.
3. Treat webhooks as at-least-once and potentially out of order: verify signatures, persist event IDs and reconcile canonical Stripe state.
4. Keep invoice totals and money handling in decimal/minor units with explicit tax and rounding rules; distinguish estimates from posted charges.
5. Test duplicate and delayed events, entitlement expiration, unauthorized overrides, refunds/credits and usage aggregation before release.

## Verification checklist
- Idempotent event processing.
- Unauthorized access remains blocked.
- Audit trail and reconciliation plan exist.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
