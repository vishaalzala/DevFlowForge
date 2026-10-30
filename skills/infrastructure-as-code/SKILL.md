---
name: infrastructure-as-code
description: Use for Terraform, Pulumi, CloudFormation, configuration management or reproducible environment provisioning.
---

# Infrastructure as code and provisioning

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Identify target accounts, environments, state ownership, IAM boundaries and drift before proposing changes.
2. Model least-privilege roles, networking, secrets, cost controls and dependency ordering in versioned code.
3. Run format/validate/plan or equivalent read-only checks; review destructive diffs and require approval for apply.
4. Use remote locked state, credential isolation and drift detection appropriate to the provider.
5. Test rollback and disaster-recovery paths, documenting which resources cannot be recreated without data.

## Deliverable
Reviewed IaC plan, security/cost implications and deployment gates.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
