---
name: backup-recovery-drills
description: Use when designing backups, database restores, RPO/RTO, disaster recovery plans or recovery testing.
---

# Backup, restore and disaster recovery

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Inventory critical services, data, configuration and dependencies; assign RPO and RTO with business owners.
2. Verify backup coverage, retention, geographic separation, encryption and access controls.
3. Create a tested restore sequence that includes identities, integrations, schema and job-queue consistency.
4. Perform safe restoration drills in isolated environments and measure actual recovery time and data loss.
5. Document rollback, incident communications and evidence of backup validity without exposing secrets.

## Deliverable
Recovery runbook, restore test record and remaining gaps.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
