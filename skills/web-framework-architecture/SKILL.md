---
name: web-framework-architecture
description: Use for React, Next.js, Vue, Nuxt, SvelteKit, Astro, Angular or server-rendered web app architecture.
---

# Web application framework architecture

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Confirm framework and version, routing, rendering modes, data-fetching APIs, cache boundaries and deployment runtime.
2. Map server/client responsibilities and auth boundaries; prevent secret leakage and duplicated data work.
3. Identify hydration risks, dependency waterfalls, route-level code splitting and cache invalidation conflicts.
4. Use framework documentation relevant to the exact version and preserve legacy deployment behavior during migration.
5. Test direct deep links, refresh, streaming/loading transitions, error routes, permissions and builds.

## Deliverable
Version-aware architecture recommendations and verification matrix.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
