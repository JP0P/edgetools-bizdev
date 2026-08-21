# internal/ — access-restricted surface

Everything in this directory is served **only behind authentication**. It is the
home for the **vetting** tool and other internal-only BizDev pages.

## Hard rule

Nothing in `internal/` may be bundled into the public static site (`public/`).
The vetting questionnaire, scoring criteria, and any partner assessments must
never be reachable without a valid staff session — a client-side "hidden route"
in the public bundle is **not** protection, because the files still ship to the
browser.

This is enforced by keeping the public and gated surfaces as **separate deploy
targets**:

- `public/`   → DigitalOcean App Platform **static site** (world-readable)
- `internal/` → Cloudflare Worker static assets on `/staff/*`, behind Access

The Worker removes the `/staff` prefix before looking up files here. For
example, `/staff/vetting/` maps to `internal/vetting/index.html`.

Do not enable `workers.dev` or preview URLs. Do not add another Worker route
that exposes this asset binding outside the Access-protected staff path.
