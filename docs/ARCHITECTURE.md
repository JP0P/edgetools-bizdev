# edgetools-bizdev — architecture

One BizDev site with two trust tiers on the same hostname. Outside partners use
the public intake surface; Edge staff use the private vetting surface.

## Surfaces and trust tiers

| Surface | Routes | Source | Authentication |
|---|---|---|---|
| Public | `/`, `/intake/*`, `/styles.css` | `public/` | None |
| Staff | `/staff`, `/staff/*` | `internal/` | Cloudflare Access + Google Workspace |

Internal content is never shipped in the DigitalOcean public bundle.

## Request routing

`bizdev.edgetools.app` is a proxied Cloudflare hostname whose normal origin is
the DigitalOcean static site. Two more-specific Worker Routes intercept only
`/staff` and `/staff/*`:

1. Cloudflare Access checks the `/staff/*` request and permits authenticated
   `@edge.app` Google Workspace identities.
2. `worker/index.js` strips the `/staff` prefix.
3. The Worker fetches the corresponding file from the `internal/` asset binding.
4. Every other path continues to DigitalOcean unchanged.

For example, `/staff/vetting/` maps to `internal/vetting/index.html`.
`/staff` redirects to `/staff/` before any private asset is returned.

Both `workers.dev` and Worker preview URLs are disabled. This prevents the
private asset bundle from acquiring an alternate public hostname. The
DigitalOcean origin cannot bypass Access because `internal/` is not part of its
deployment.

## Deploy model

- **Public:** GitHub `main` → DigitalOcean App Platform static site → `public/`.
- **Staff:** GitHub `main` → Cloudflare Workers Builds → `wrangler deploy`.
- **Access:** self-hosted application for `bizdev.edgetools.app/staff/*`, using
  the reusable Edge Staff policy and Google identity provider.

The provider integrations hold deployment credentials. No Cloudflare,
DigitalOcean, or Google credential belongs in the repository.

## Layout

```text
public/            world-readable DigitalOcean static site
  index.html       landing + Staff Login link
  styles.css       shared styling
  intake/          public partner intake
internal/          private Worker asset bundle
  index.html       staff landing
  vetting/         partner vetting flow
worker/            `/staff` prefix rewrite + private response headers
wrangler.jsonc     Worker assets, routes, and public-URL restrictions
.do/               public DigitalOcean static-site spec
docs/              architecture documentation
```
