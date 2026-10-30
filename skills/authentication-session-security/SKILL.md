---
name: authentication-session-security
description: Use when designing login, signup, MFA, password resets, sessions, OAuth, roles or secure account recovery.
---

# Authentication and session security

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Model identities, trust boundaries, roles, sessions, token lifetimes and recovery flows; document attackers and failure scenarios.
2. Prefer established identity components, least-privilege authorization on the server and secure session storage/cookies.
3. Enforce rate limits and anti-abuse controls for login/recovery; validate OAuth redirects, state, consent and scopes.
4. Test role escalation, cross-account access, expired sessions, revoked tokens, failed MFA and recovery links.
5. Handle audit logs, incident response and privacy without exposing credentials or personal identifiers.

## Deliverable
Auth flow diagram, threat scenarios and negative-access tests.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
