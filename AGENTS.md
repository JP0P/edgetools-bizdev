# AGENTS.md

Instructions for every AI agent or contributor working in this repository.

## Start Every Work Session by Syncing

Before reading files, planning changes, or editing anything:

1. Run `git status --short --branch`.
2. If the working tree has uncommitted changes, **stop and preserve them**. Do
   not pull, reset, overwrite, delete, or stash them without the user's clear
   approval.
3. If the working tree is clean, switch to the intended branch and run
   `git pull --ff-only` before making changes.
4. Confirm the pull succeeded. If it cannot fast-forward, stop and explain the
   conflict instead of forcing the update.

This sync check is mandatory even when the requested change seems small. Jared,
Fari, Clawdia, or another contributor may have updated the repository recently.

## Safety and Deployment

- Never use force-push, destructive resets, or overwrite another contributor's
  work.
- Everything under `public/` is publicly accessible and automatically deploys
  through DigitalOcean when pushed to `main`.
- Never commit passwords, tokens, API keys, private partner information, real
  submissions, or other sensitive data.
- The staff vetting wizard is temporarily public for testing. Use fake/test
  partner details until Cloudflare Access protects it.
- Test relevant pages locally before committing and pushing.
