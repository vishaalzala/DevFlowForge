---
name: monitoring-incident-response
description: Use when diagnosing production incidents, configuring operational alerts, monitoring errors, or writing safe incident runbooks.
---

# Monitoring Incident Response

**Goal:** Make incidents detectable, actionable and independently verifiable.

Read `../../references/quality-gates.md` and apply the relevant project context in `../../references/projects.md`; both are hints rather than verified code state. If available, use authorized tools and inspect evidence before modifying anything.

## Procedure
1. Define user-visible symptom, scope, first-seen window and severity; avoid assuming the earliest log entry is the root cause.
2. Correlate request IDs, traces, job IDs and provider events with redaction of tokens and personal data.
3. Distinguish detection, mitigation, containment and root-cause work; propose immediate reversible mitigations before high-risk refactors.
4. Use actionable alerts with ownership, severity thresholds, grouping and resolved state to avoid endless alert storms.
5. Write a short blameless post-incident review including triggering condition, impact, verification and prevention tests.

## Verification checklist
- Evidence timestamps and scope recorded.
- Alerts do not leak customer data.
- Recovery verified from real signals.

**Output:** Findings with evidence, proposed or actual change, exact testing status (Pass/Fail/Not run), risk and rollback, and links only to resources actually created. No unsupported claims about production access or running agents.
