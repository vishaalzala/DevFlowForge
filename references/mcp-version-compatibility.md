# MCP compatibility and safe-tool integration matrix

Research baseline: 9 November 2026; verify the negotiated specification revision with the actual client/server. Primary specification: https://modelcontextprotocol.io/specification/2026-07-28 ; announcement: https://blog.modelcontextprotocol.io/posts/2026-07-28/

| Case | Safe requirement | Negative test |
|---|---|---|
| Version negotiation | Track supported and negotiated version; degrade or stop gracefully if feature missing | Server only accepts older revision |
| Transport | Distinguish STDIO environment credentials from HTTP transport auth | HTTP OAuth metadata sent into STDIO wrongly |
| Protected resource | Validate discovered metadata, HTTPS, exact resource URI and trusted issuer; never follow unapproved auth endpoints | Malicious redirect/issuer mismatch |
| Token audience | Send only resource-audience-bound token to corresponding MCP server; no bearer in query string | Token for server A presented to B |
| Scope | Least-privilege; 401 vs 403 handled; step-up bounded and user-approved | Infinite retry / silently elevated scope |
| Discovery cache | Honor returned TTL and `cacheScope`, partition by tenant/user and invalidate after permission change | Tenant A tool list shown to B |
| Tool schema | Validate JSON-RPC 2.0 structures, advertised schemas and explicit tool affordances | Malformed parameters, unknown tool |
| Tool output | Prompt injection and private data are not trusted control instructions | Tool response asks to ignore approvals |
| High-impact actions | Require explicit user authorization and separately scoped targets; log evidence without secrets | A README tells agent to deploy or delete |

Compatibility is a matrix, not a certification. Never collect real tokens as evidence, never run active security checks against unauthorised servers, and separate **Observed / Not run / Not applicable**.
