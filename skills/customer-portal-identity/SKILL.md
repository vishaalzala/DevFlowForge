---
name: customer-portal-identity
description: Use when implementing customer portal invitations, automatic account creation, password recovery, access linking or role-based portal journeys.
---

# Customer Portal Identity

**Goal:** Make onboarding convenient without granting unauthorized access.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Map the distinction between CRM customer records, verified email identity, app users, tenant membership and workshop relationship.
2. Create invited/verified/active states as required; avoid emailing default passwords and never grant access solely on unverified email matching.
3. Use one-time expiring links and least-privilege roles; prevent customer impersonation and cross-workshop record exposure.
4. Handle duplicate email, multiple vehicles, multiple workshops, changed contact details, bounced invitations and account recovery.
5. Test end-to-end onboarding and revocation with synthetic records without exposing private customer information in logs.

## Verification checklist
- No duplicate accounts from retries.
- Customer sees only authorized records.
- Invitations expire and are auditable.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
