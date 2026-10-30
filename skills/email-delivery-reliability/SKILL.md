---
name: email-delivery-reliability
description: Use when any application has missing emails, SMTP or AWS SES failures, password-reset mail issues, logs without delivery evidence, duplicate reminders, webhook bounces, or communication incidents.
---

# Reliable email and communication system

1. Trace event → enqueue → template → provider → response → delivery/bounce webhook → communications log. Identify distinct failure stages instead of assuming 'provider problem'.
2. Verify DNS domain identity, sender address, SES region/sandbox, credentials, suppression/bounce rules, network restrictions and error messages using current provider docs/tool observations. Never print credentials or send test mail to unknown recipients.
3. Log provider message ID, tenant, template ID, correlation ID, timestamp, status transitions and redacted errors. Distinguish accepted by provider from delivered to inbox.
4. Guarantee one logical email per idempotency key; bound retries with exponential backoff; dead-letter repeated failures; suppress duplicates and protect user privacy.
5. Inspect all sending paths: manual messages, user invitations, password resets, reminders, invoices, statements and admin notices. Verify auth-provider templates and links separately where needed.
6. For hosted provider URLs in email, design safe branded routes and email-confirmation flows; do not break token validation or expose storage assets accidentally.
7. Report failing stage, concrete provider logs/repro steps, smallest fix, test matrix and monitoring/rollback. Do not claim delivery success based only on an HTTP 200 response.
