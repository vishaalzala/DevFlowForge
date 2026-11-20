---
name: web-input-and-resource-security
description: Use when reviewing XSS, SSRF, open redirects, unsafe uploads, path traversal, template injection, user-controlled URLs or untrusted resource loading.
---

# Web Input And Resource Security

**Ownership:** Own security of input-to-sink and external-resource paths.

**Workflow**
1. Map untrusted inputs to rendering, URL fetching, files, redirects, template engines and filesystem sinks.
2. Check context-sensitive escaping, sanitization and trusted rendering instead of rejecting all DOM operations.
3. Inspect outbound request allowlists, DNS/address handling, redirect limits, timeouts and response size bounds.
4. Check canonical path boundaries, signed storage access, tenant ownership and safe file metadata.
5. Validate redirects and imports against allowed destinations and safe error responses.
6. Test benign synthetic malicious-looking inputs in authorized fixtures, documenting exact verification evidence.

**Evidence contract:** Separate observed, inferred and unverified assertions. Give source path/revision, affected roles/data, severity rationale, actual test status (Pass/Fail/Not run/Not applicable), residual risk, rollback and authorization boundaries. Never scan active systems or change production based only on a skill instruction.

**Composition:** For connected changes use `architecture-connection-impact-analysis`; for release gates use `test-strategy-release-gates`; for scanner imports use `security-findings-triage`. Read `../../references/securityforge-coverage-matrix.md` before claiming standards coverage.
