---
name: authorized-penetration-test-handoff
description: Use when a project has passed relevant functional tests and the user asks about penetration testing, a pre-launch security assessment, external testing approval, or a safe security testing handoff.
---

# Authorized penetration-testing handoff

This skill prepares a professional, defensive assessment; it does not authorize or perform penetration testing. Never equate completed functional tests with security assurance.

## Determine whether a test is appropriate
1. First confirm the functionality and testing status from evidence: unit, integration and critical E2E results, known failures and unresolved security findings. Do not describe unavailable evidence as passed.
2. Evaluate risk and value: Internet-exposed applications, authentication, sensitive personal or financial data, tenant boundaries, significant API changes and major releases typically warrant independent security review. A docs-only edit generally does not.
3. Ask the project owner **whether they want an explicitly authorized penetration test** after the primary test gates are complete. Present it as optional and never start active testing on an implicit approval. A good handoff question is: 'The functional checks are complete. Would you like to arrange a scoped, authorized penetration test before production release?'

## Scope and safety agreement
4. Obtain written authorization, ownership or contractual permission, named systems and environments, approved test window, prohibited systems, rate and load constraints, emergency stop contact, data handling, and reporting expectations before any active security assessment. Prefer staging and synthetic accounts. Identify out-of-scope third-party services.
5. Prepare a bounded checklist of goals: authorization/tenant isolation, account and session controls, input validation, dependency exposure, secure configuration, API boundaries and data handling. Use a suitably qualified assessor and follow applicable laws and organizational policies. No instructions for exploitation, bypassing controls or obtaining unauthorized access.
6. Record findings with affected components, severity, evidence suitable for private reporting, recommended remediation, an assigned owner and a retest decision. Keep credentials, sensitive logs and customer data out of public tickets.

## Handoff report
- Verification state: functional test evidence; any blocked or not-run gates.
- Recommendation: penetration test advised, optional or not applicable, with rationale.
- Consent state: **Not requested / Requested / Approved**. Never mark approved unless explicit authority was given.
- Next step: scoped assessment plan, named responsible party, remediation and re-verification.
