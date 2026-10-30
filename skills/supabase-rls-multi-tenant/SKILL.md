---
name: supabase-rls-multi-tenant
description: Use when auditing or changing Supabase authentication, row-level security, storage permissions, tenant/company isolation or privileged RPCs.
---

# Supabase Rls Multi Tenant

**Goal:** Enforce authorization at every data boundary, not only in the UI.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Inspect schema, policies, grants, functions, JWT claims and actual query paths before proposing changes.
2. Build a permission matrix for anonymous, customer, staff, company admin and platform admin as relevant; use least privilege.
3. Test reads, inserts, updates, deletes, storage objects and RPC calls with synthetic users from two independent tenants.
4. Prevent user-editable profile attributes from granting elevated access; review SECURITY DEFINER code, search_path and service-role usage.
5. Roll out policies with transactional migrations when possible and a tested rollback; never disable RLS as a bug workaround.

## Verification checklist
- Cross-tenant access denied in negative tests.
- Owner/admin flows still work.
- RLS and Storage checked separately.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
