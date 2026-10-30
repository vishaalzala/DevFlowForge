---
name: security-permissions-billing
description: Use for roles, protected admin routes, RLS, permissions, Auth, reset emails, customer data access, subscription/trial gating, Stripe billing, audit logs, secrets, data leaks, or security reviews.
---

# Security, access and billing safeguards

For legitimate authorized code review and defensive testing; do not perform unapproved active scans or access other tenants' data.

1. Inventory actors, roles, tenants, sensitive resources, money movements, server routes, background jobs and policies. Build a permission matrix including default-deny cases.
2. Verify every sensitive operation on the SERVER and in database RLS where relevant. UI hiding is not authorization. Make least privilege and tenant isolation explicit; avoid trusting client-provided role/company IDs.
3. Inspect auth session handling, reset/invitation flows, CSRF/XSS, input validation, secret exposure, rate limiting, impersonation and audit trails. Keep MFA/admin controls intact.
4. For subscription/plan access (Stripe or another provider): model trial, active, cancelled, expired, enterprise exceptions, add-ons, card requirements, webhook replay and entitlements; test the entire matrix. Do not silently bypass billing checks to make a page load.
5. For invoicing: confirm tax rounding, jurisdiction-specific taxes and currency display and discount calculation, credits, refund semantics, idempotency and charge reconciliation. Preserve ledger integrity and avoid double charging.
6. For emails: keep internal/provider storage URLs out of customer-facing content where appropriate; assess custom domain, signed access, expiry and privacy without merely cosmetically hiding insecure resources.
7. Produce prioritized findings with evidence, exact exposure, test cases, minimal change proposal, verification status and rollout/rollback risks.

Never share actual credentials or customer secrets in outputs. Do not claim a security audit passes without inspecting relevant code and test evidence.
