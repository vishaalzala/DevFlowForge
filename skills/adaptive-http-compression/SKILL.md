---
name: adaptive-http-compression
description: Use for HTTP response compression, Brotli, Zstd, Gzip, CDN/browser compatibility, Accept-Encoding negotiation, compressed asset delivery, response caching and transfer-size performance audits.
---

# Adaptive HTTP compression and delivery

**Goal:** Reduce meaningful network transfer cost without breaking any client, cache, authentication boundary, streaming endpoint or server budget. This skill supplies engineering instructions, **not** a compression runtime or browser-detection service. Choose a specific project only after verifying its hosting and existing response headers.

## 1. Investigate before enabling anything

1. Map the actual delivery chain: browser or app → CDN/proxy → framework/server → API/asset storage. Determine who currently applies compression and whether any intermediary decompresses/recompresses. On managed CDNs, prefer existing platform negotiation; do not install a second middleware layer without evidence.
2. Capture **GET** response/request headers on representative public HTML, JS, CSS, JSON, authenticated API and streaming endpoints. Inspect `Accept-Encoding`, `Content-Encoding`, `Vary`, `Content-Type`, `Cache-Control`, `ETag`, `Content-Length`, response size and response timings; GET behavior can differ from HEAD. Never collect or print authentication tokens or sensitive response bodies.
3. Establish a baseline: compressed and original transfer bytes, TTFB, p50/p95 latency, CPU/memory overhead, cache hit ratio, LCP and relevant real-user or lab metrics. Record test network conditions and avoid claiming that compression fixes slow DB queries, render blocking or CLS.

## 2. Negotiate per request, not by browser or device labels

- Respect the browser/client-provided **`Accept-Encoding`** request header. Do **not** infer codec support from `User-Agent`, operating system, screen size, mobile/desktop labels or client-side JavaScript. Mobile Chrome can support the same encodings as desktop Chrome; versions, policies, embedded engines and intermediaries can differ.
- Offer **`zstd` (Zstandard), `br` (Brotli), and `gzip`** only where the actual server/CDN implements them. Content codings are independent from data formats like AVIF/WebP, and from stored-file compression. Do not hardcode `zstd > br > gzip` as a speed or size ranking.
- Honor explicit `q` weights, wildcard handling and `q=0` exclusions under RFC 9110. A listed encoding with quality zero must not be selected. Among acceptable choices, consider q priority, origin CPU budget, transfer savings, CDN constraints and response type. Never send `Content-Encoding: zstd` to a client that did not accept it.
- **Remove “Normal” as a selectable algorithm** from the public options. Preserve `identity` (uncompressed) as an internal standards-compliant fallback when acceptable, even if the header is empty, a response is too small/already compressed or the server is resource-constrained. If *all* available representations are prohibited, use correct HTTP error negotiation rather than an unsupported coding. Do not emit `Content-Encoding: identity`.
- Send the actual applied encoding in `Content-Encoding` (or omit for identity). For negotiated/cacheable representations, configure `Vary: Accept-Encoding`, ensuring 304 responses follow the same variation rule. Use CDN-specific cache-key normalization only when verified. Preserve `Cache-Control: private` / `no-store` for personalized content, including multi-tenant, payment and identity data. Do not make authenticated responses public-cacheable merely to speed delivery.

## 3. Choose appropriate payloads and boundaries

- Text-like HTML, JS, CSS, SVG, JSON and text APIs are candidates. Evaluate minimum response sizes and CPU cost; do not blindly recompress already compressed media (JPEG, PNG, WebP, AVIF, MP4, ZIP, most WOFF2) or double-compress upstream responses.
- Check `Cache-Control: no-transform`, precompressed assets, content range/206, ETag validity, content length, content streaming, SSE and streaming API semantics; avoid buffering latency-critical streams just to compress. Preserve binary payloads, downloads and clients that require byte exactness.
- Compression of secret-bearing output mixed with attacker-influenced text may expose response-length side channels (BREACH-style risk). Review such routes and use safer separation or disable compression where appropriate; do not leak tokens through timing or size diagnostics.
- Prefer precompression for stable static files and measured fast compression settings for dynamic responses. Do not introduce Zstd into a CDN that does not actually support Zstd response delivery. Dictionary-based codecs (`dcb`, `dcz`) are **not** the same as ordinary Brotli/Zstd and require an independent compatibility/security review.

## 4. Verify compatibility, correctness and real impact

Use the complete [HTTP compression test matrix](../../references/http-compression-compatibility.md) alongside existing `web-vitals-performance-audit`, `performance-engineering`, `test-driven-development`, and `test-strategy-release-gates` guidance.

1. Test GET (not merely HEAD) with advertised `zstd, br, gzip`, `br, gzip`, `gzip` only, restricted q-values (`br;q=0, gzip;q=1`), empty/no header and `identity` negotiation. The result must be an acceptable coding, or uncompressed when allowed. Actual browser clients need not support a codec merely because a synthetic request advertised it.
2. Verify response body **correctness after decompression**, `Content-Encoding`, `Vary`, CDN cache isolation, conditional/304 requests, streaming endpoints, static assets and authenticated/private responses. Include old/embedded/mobile browsers when the product serves them; measure their **actual** request header instead of guessing.
3. Run side-by-side transfer/TTFB/CPU and real-page measurements under comparable conditions. Do not claim a page-speed win without observed evidence; compression can improve bytes without improving LCP or INP.
4. Where the platform already negotiates compression correctly, record **no change needed** rather than adding duplicate middleware. Report any infrastructure limitations and require approval for live configuration changes, especially on production or regulated endpoints.

## Output contract

Return: delivery-chain owner, observed headers, measured baseline, supported/unsupported encodings by endpoint, codec and fallback decision, security/cache implications, implementation/rollback plan and test matrix with **Pass/Fail/Not run/Not applicable** statuses. Name exact tools/routes changed only when verified. No automatic deployment or unapproved production testing.
