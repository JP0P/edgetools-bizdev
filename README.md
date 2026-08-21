# edgetools-bizdev

Umbrella site for Edge BizDev tools, with one hostname and two isolated deploy
targets:

- **Public:** landing page and partner intake (`public/`), served by
  DigitalOcean at `bizdev.edgetools.app`.
- **Staff-only:** partner vetting and other internal tools (`internal/`), served
  by a Cloudflare Worker at `bizdev.edgetools.app/staff/*` and protected by
  Cloudflare Access with Google Workspace login.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the design, trust tiers,
and deploy model.

## Run locally

```bash
npm install
npx serve public -l 8080  # public site at http://localhost:8080
npm run staff:dev         # staff Worker at the URL Wrangler prints
```

Wrangler's local server does not reproduce the Cloudflare Access login screen;
Access is enforced on the deployed `/staff/*` route.

## Deploy modes

- **DigitalOcean static site** — `.do/app.static.yaml` deploys `public/` only.
- **Cloudflare Worker** — `wrangler.jsonc` deploys `internal/` only, rewrites
  `/staff/*` to the matching private asset, and disables `workers.dev` and
  preview URLs.

Run `npm run staff:check` before deploying the Worker. Never move staff assets
into `public/`; the DigitalOcean origin is intentionally public.
