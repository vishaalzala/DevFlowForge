# Project discovery and adaptation guide

These are universal engineering questions, not claims about any existing application. Do not assume a language, framework, vendor, repository path or infrastructure provider. Observe the actual project before choosing a relevant skill.

## Establish the working context
1. Identify user goal, target project, repository and branch, read/write permissions, environment and explicit non-goals.
2. Discover stack and execution model: language, package manager, runtime, UI, API, databases, services, deployment and CI.
3. Trace the concrete feature through current routes, modules, state, tests, data stores and logs. Separate verified facts from hypotheses.
4. Confirm expected behaviour with acceptance criteria and baseline evidence. Preserve existing workflows and compatibility boundaries.
5. Select only skills that match the project. A repository without subscriptions does not need Stripe rules; a repository without web crawlers does not need indexing rules.

## Common project patterns
- **Frontend / mobile / desktop:** interaction states, accessibility, state management, performance, cross-platform tests and offline behaviour when applicable.
- **Backend / APIs / libraries:** contracts, input validation, versioning, resource limits, tests and backwards compatibility.
- **Databases and multi-tenancy:** schema migration, authorization, transaction integrity, backup/rollback and negative-access tests if relevant.
- **Data / AI / search:** reproducible evaluations, data provenance, privacy, queue safety and human oversight where needed.
- **Infrastructure / DevOps:** environment separation, least-privilege secrets, CI, deployment observability and rollback.
- **Static sites / content:** accessibility, SEO where relevant, delivery budgets and content integrity.

## Project-specific information belongs with the project
Keep private operational docs, customer data, non-public endpoints, credentials and logs out of this public package. Use a local excluded file, private team docs or an approved secret manager rather than committing them. Cite live evidence instead of relying on a remembered project profile.
