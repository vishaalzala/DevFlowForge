# SecurityForge security standards and ownership map

Standards are **coverage targets, not compliance certificates**. Check official source release and requirement IDs at audit time. Use pinned versions and verified scope; do not assert that a skill automatically enforces controls.

## OWASP Top 10:2025

| Category | Owner |
|---|---|
| A01 Broken Access Control | Existing `security-permissions-billing`; `supabase-rls-multi-tenant` for Supabase-specific review |
| A02 Security Misconfiguration | `cloud-infrastructure-security` |
| A03 Software Supply Chain Failures | `ci-supply-chain-security` for provenance/build; existing `dependency-vulnerability-upgrades` for CVE patches |
| A04 Cryptographic Failures | `cryptography-and-data-protection` |
| A05 Injection | `web-input-and-resource-security` |
| A06 Insecure Design | `application-threat-modeling` |
| A07 Authentication Failures | Existing `authentication-session-security`, `oauth-oidc-and-token-security` for federation |
| A08 Software or Data Integrity Failures | `ci-supply-chain-security`, `webhook-and-third-party-integration-security` |
| A09 Security Logging and Alerting Failures | `security-logging-and-alerting` |
| A10 Mishandling of Exceptional Conditions | `error-handling-and-fail-safe` |

## OWASP ASVS 5.0.0 applicability

- V1 encoding/sanitization, V3 web frontend, V5 files: `web-input-and-resource-security`.
- V2 validation/business logic: `abuse-and-rate-limiting` and existing authorization specialist.
- V4 API/web services: `webhook-and-third-party-integration-security` with existing API contract skills.
- V6 authentication and V7 sessions: existing `authentication-session-security`.
- V8 authorization: existing `security-permissions-billing`, with `supabase-rls-multi-tenant` when applicable.
- V9 self-contained tokens and V10 OAuth/OIDC: `oauth-oidc-and-token-security`.
- V11 cryptography, V12 secure communication, V14 data protection: `cryptography-and-data-protection`.
- V13 configuration: `cloud-infrastructure-security`.
- V15 secure coding/architecture: `secure-code-analysis`, `application-threat-modeling`.
- V16 logging/error handling: `security-logging-and-alerting`, `error-handling-and-fail-safe`.
- V17 WebRTC: **Not applicable unless WebRTC is actually used**.

`asvs-requirement-mapper` must verify every specific requirement ID and level from the official pinned release. No invented IDs or blanket certification.

## AI/agentic and secure development

- `agentic-orchestrator-security` handles tool authority, goal hijacking, untrusted scanner content and memory provenance.
- `ai-and-mcp-integration-security` handles MCP and AI provider trust, prompt injection, scopes and data boundaries.
- NIST SP 800-218 SSDF groups: PO (prepare), PS (protect), PW (produce secure software), RV (respond to vulnerabilities).

## New Zealand privacy

A scanner warning is not a privacy breach. A notifiable breach requires the applicable serious-harm assessment under the Privacy Act 2020. Report as soon as practicable; the OPC's 72-hour expectation is guidance rather than an absolute statutory deadline. Verify current OPC advice before action.

## Primary references

- https://top10.owasp.org/2025/0x00_2025-Introduction/
- https://asvs.owasp.org/downloads/
- https://github.com/OWASP/ASVS/tree/v5.0.0/5.0
- https://genai.owasp.org/
- https://csrc.nist.gov/pubs/sp/800/218/final
- https://www.privacy.org.nz/responsibilities/poupou-matatapu-doing-privacy-well/breach-management/
