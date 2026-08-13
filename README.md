# edgetools-bizdev

Umbrella site for Edge BizDev tools.

- **Public preview:** landing page + partner **intake** placeholder + Fari's
  draft vetting wizard (`public/`). The wizard is temporarily public for team
  testing and must move behind Cloudflare Access before real partner use.
- **Staff-only:** partner **vetting** and other internal tools (`internal/`),
  served behind a login.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the design, trust tiers,
and deploy model.

## Run locally

```bash
npm install
cp .env.example .env   # set STAFF_PASSWORD + SESSION_SECRET
npm start              # http://localhost:8080
```

Public pages are open; `/staff/` redirects to `/login` until you sign in.

## Deploy modes

- **Static site** — `.do/app.static.yaml`. Serves `public/` only: landing and
  placeholders, no running process and no real login. Internal vetting content
  must remain outside `public/` until Cloudflare Access is active.
- **Node service** — `.do/app.service.yaml`. Serves both surfaces and enables
  the gated `/staff` area.
