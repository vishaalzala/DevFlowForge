---
name: oauth-oidc-and-token-security
description: Use when reviewing OAuth 2.0, OpenID Connect, JWTs, SAML assertions, API bearer tokens, issuer and audience checks, delegated authorization or login federation.
---

# Oauth Oidc And Token Security

**Ownership:** Own identity federation and self-contained bearer-token trust; coordinate basic sessions with authentication-session-security.

**Workflow**
1. Identify token issuers, intended audiences, clients, resource servers, expiry, key sources and trust boundaries from real configuration.
2. Verify signature and expected algorithms, issuer, audience, token type, nbf/exp, key rotation and replay controls.
3. Inspect OAuth/OIDC redirect allowlists, grant types, PKCE and state as applicable, scopes, consent and safe token storage.
4. Verify service-credential forwarding never sends a bearer token to the wrong tool or MCP resource.
5. Build synthetic expired, wrong-issuer, wrong-audience and valid-token tests without accessing unauthorized accounts.
6. Map checked controls to ASVS V9/V10 using official IDs and avoid publishing any actual tokens.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
