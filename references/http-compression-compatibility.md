# Adaptive HTTP compression: research and compatibility matrix

This reference supports the `adaptive-http-compression` skill. It is a **test specification**, not a server implementation, a browser capability database or proof of live performance. Re-check current platform documentation and actual headers before editing a project.

## Protocol rules

- **Request `Accept-Encoding`** declares encodings the recipient can decode. Support negotiation for `zstd`, `br`, `gzip` only when the server/CDN really offers them; never infer solely from `User-Agent` or mobile labels.
- An absent header does **not** establish specific codec support; safest interoperability is uncompressed unless the host/CDN explicitly guarantees negotiation. An **empty** field value requests no content coding. Explicit `q=0` prohibits an encoding; `*` covers otherwise unlisted codings when allowed.
- The **uncompressed (`identity`) fallback** is internal: no UI dropdown choice named “Normal.” Under RFC 9110, identity is allowed by default except when explicitly excluded (`identity;q=0` or qualifying `*;q=0`). If every representation is unacceptable, deal with the HTTP negotiation failure rather than forcing an unsupported coding.
- Respond with the **actual** applied `Content-Encoding` (`zstd`, `br`, or `gzip`), or omit when no encoding is applied. Ensure negotiated cacheable responses use `Vary: Accept-Encoding`, including conditional/304 behavior. Don't use `Content-Encoding` to describe PNG/AVIF/ZIP *file formats*.
- Do not recompress confidential plus reflected attacker input without evaluating compression-length side channels; prefer private/no-store caching for personalized content, and preserve `no-transform` where appropriate.

## Representative GET request test matrix

| Client-advertised `Accept-Encoding` | What is acceptable / expected |
|---|---|
| `zstd, br, gzip` | Any supported advertised coding may be chosen according to q weights, performance policy and server capabilities; **not** a guaranteed Zstd result |
| `br, gzip` | Brotli or Gzip if implemented; **never** Zstd solely because the server supports it; identity is permitted unless excluded |
| `gzip` | Gzip or identity, **not** Brotli or Zstd unless a wildcard changes acceptance |
| `br;q=0, gzip;q=1` | Brotli is **prohibited**; Gzip is acceptable; identity usually remains permitted |
| `zstd;q=0.5, br;q=1, gzip;q=0.2` | Prefer higher nonzero q for comparable alternatives; do not override client preferences without reason |
| `gzip;q=0, *;q=0` | Gzip and implicit unlisted codings prohibited; `identity` is also excluded by `*;q=0` unless explicitly reallowed; handle not-acceptable response when no coding fits |
| `gzip;q=0, identity;q=1, *;q=0` | Only identity allowed among listed candidates; no `Content-Encoding` |
| *Present, empty field value* | No content coding requested; uncompressed representation |
| *Absent header* | No stated preference: do not assume mobile/desktop-specific support; use compliant default, usually identity for widest compatibility |

## Checks per asset/response class

| Response class | Typical guidance / gate |
|---|---|
| HTML, CSS, JS, SVG, JSON | Compression candidate; verify byte reduction, CPU, TTFB, cache and browser decoding |
| Authenticated API & tenant-specific HTML | Maintain `private` / `no-store` controls; evaluate secret/reflection side channels and user data isolation |
| Image/audio/video/archive | Often already compressed; skip duplicate response compression unless evidence supports it |
| Server-sent events, streamed HTML or AI streams | Confirm streaming and flush latency unchanged; avoid inadvertent buffering |
| HTTP 206/range, 304/conditional, HEAD | Check consistent validators, range behavior and header semantics |
| Static assets behind CDN | Inspect origin vs edge encoding, `Vary`, cache behavior and transformations |

## Browser/platform compatibility notes

- Chrome introduced Zstd `Content-Encoding` in its Chrome 123 release, including Chrome for Android; client-specific policies may disable it. A browser's **actual request header** is authoritative.
- Brotli/Gzip remain widely supported, but do not hardcode iOS Chrome = desktop Chrome; browser engines, versions and intermediaries differ.
- Cloudflare documents optional configurable Zstd compression plus Brotli/Gzip, selected from `accept-encoding`; this is **vendor-specific**, not general server support.
- Vercel documents that its CDN handles compression; determine offered coding from actual response headers rather than assuming Zstd is enabled. Additional custom compression code may be redundant or harmful.

## Safe diagnostic examples (authorised endpoints only)

```bash
# Request GET headers without writing private response content to the terminal.
curl -sS -D - -o /dev/null -H 'Accept-Encoding: zstd, br, gzip' 'https://example.com/sample.js'
curl -sS -D - -o /dev/null -H 'Accept-Encoding: br, gzip' 'https://example.com/sample.js'
curl -sS -D - -o /dev/null -H 'Accept-Encoding: gzip' 'https://example.com/sample.js'
curl -sS -D - -o /dev/null -H 'Accept-Encoding: br;q=0, gzip;q=1' 'https://example.com/sample.js'
```

A synthetic `curl` advertisement is **not proof** that a real Android/iOS browser supports the same encoding. Use browser DevTools/network capture and controlled GET tests to inspect actual compatibility and decoding. Ensure you have authorization before testing private or production endpoints.

## Primary research sources

- [RFC 9110 §12.5.3 — Accept-Encoding](https://www.rfc-editor.org/rfc/rfc9110.html#section-12.5.3)
- [MDN — Accept-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Encoding)
- [MDN — HTTP compression](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Compression)
- [MDN — Vary](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Vary)
- [Chrome 123 Beta — Zstd Content-Encoding](https://developer.chrome.com/blog/chrome-123-beta)
- [Chrome Enterprise — Zstd content-encoding policy](https://support.google.com/chrome/a/answer/2657289?hl=en)
- [Cloudflare — Compression Rules](https://developers.cloudflare.com/rules/compression-rules/)
- [Vercel — How Vercel CDN works](https://vercel.com/docs/how-vercel-cdn-works)
