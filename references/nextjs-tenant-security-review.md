# Version-aware Next.js security and tenant-isolation review

**Status:** defensive checklist, not an exploitation guide or assertion about a particular deployment. Research checked 9 November 2026. Verify updates again at use time.

## Evidence collection
1. Read `package.json`, relevant lockfile, deployed build metadata and framework adapter to establish exact Next.js version and production execution mode. Record 15.x/16.x vs other versions; consult the *current* official advisory, not a remembered version number.
2. Map App Router/Pages Router, `use cache`, Cache Components, `unstable_cache`, `fetch` options, Vercel/CDN configuration, image optimisation, Edge handlers and reverse proxies. Mark **Not applicable** for absent features.
3. For caching, identify every tenant/company/user and authorization input. Verify cache key and invalidation include security-significant identity or avoid sharing protected responses entirely. Look for nested caches whose outer key is less specific.
4. For cookies, assert that client-visible headers do not reveal protected internal cookie values; preserve `HttpOnly`, `Secure` and `SameSite` semantics. Do not include actual cookie values in logs.
5. Validate two synthetic tenants, one anonymous identity, and a wrong-role identity. Test cold/warm reads and concurrency; compare responses for forbidden cross-tenant access. Never use real customer records for cross-tenant checks.
6. Patch only to a supported *stable* release after reviewing affected features, package/adapter compatibility and current upstream advisories; test build, SSR, API, auth, payment, PDFs, caching and rollback before deployment approval.

## Release research
- Next.js November 2026 security announcement: https://nextjs.org/blog/november-2026-security-release
- Next.js support policy: https://nextjs.org/support-policy
- Next.js security advisories: https://github.com/vercel/next.js/security/advisories
- Published 3 November 2026 patch versions: 16.4.5 and 15.5.29; **do not** consider these evergreen latest versions or assume every issue affects 15.x.

## Reporting template
`Resolved version | runtime/provider | affected feature evidence | applicable advisory | observed/not run | patch proposal | staging tests | rollback | deployment approval`. Never claim a security exposure from only a package name.
