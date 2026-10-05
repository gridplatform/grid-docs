# Organizations using Grid

How a company or team typically adopts Grid without a docs website — everything is on GitHub.

## Recommended setup

1. **Fork** [grid-config](https://github.com/gridplatform/grid-config) (or create an empty desired-state repo and `grid init`). Keep it private if it holds internal layout.
2. **Create remote Terraform state** once per org/env — [install/remote-state.md](install/remote-state.md) (S3 + DynamoDB, GCS, or Azure Blob).
3. **Run the control plane** on a VM or Compose host — [install/vm.md](install/vm.md). Point:
   - `GRID_GITOPS_REPO_URL` → your desired-state repo  
   - `GRID_TF_*` → the remote state you created  
   - `GRID_AUTH_ADMIN_PASSWORD` → a strong secret (not the example)
4. **Cloud credentials** on the control plane (instance role / OIDC preferred over long-lived keys).
5. **Users & environments** — model access with groups; see [admin/rbac.md](admin/rbac.md).

## What stays public vs private

| Public (Grid OSS) | Usually private (your org) |
|-------------------|----------------------------|
| grid-core, grid-ui, grid-cli | Your fork of desired-state |
| grid-terraform (module bank) | Cloud accounts / credentials |
| grid-docs (these guides) | Production `.env`, state buckets |

## Day-2

- Pin installs with `GRID_REF=vX.Y.Z` when you cut release tags.
- Upgrades: pull tagged `grid-core` and `docker compose … up -d --build` ([install/docker-compose.md](install/docker-compose.md)).
- Contribute fixes upstream via **fork → PR** (do not push to `main`).

## Related

- [install/overview.md](install/overview.md)  
- [concepts/overview.md](concepts/overview.md)  
- [Repository README](../README.md)
