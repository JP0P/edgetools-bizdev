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
- This is an open-source public website, so normal site copy, images, and other
  intended public content should not be blocked or treated as unusually risky.
- Before publishing anything that could reasonably be HR-only, internal Edge
  information, private partner information, a real form submission, personal
  information, or a credential such as a password, token, or API key, make the
  site builder aware and confirm that they intend it to be public. If uncertain,
  ask about the specific content rather than blocking the rest of the update.
- The staff vetting wizard is temporarily public for testing. Use fake/test
  partner details until Cloudflare Access protects it.
- Test relevant pages locally before committing and pushing.
