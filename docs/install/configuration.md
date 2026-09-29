---
title: Configuration
---

# Configuration

Environment variables for **grid-core**. Prefer the install-oriented template:

[`grid-core/install/.env.example`](https://github.com/gridplatform/grid-core/blob/main/install/.env.example)

Developer template (same variables, more comments):

[`grid-core/.env.example`](https://github.com/gridplatform/grid-core/blob/main/.env.example)

The CLI inherits paths when Core spawns it.

## Required / commonly set

| Variable | Purpose | Typical install value |
|----------|---------|------------------------|
| `PORT` | API listen port | `3000` |
| `GRID_DATA_DIR` | JSON store (users, releases, audit) | `./data` or `/var/lib/grid/data` |
| `GRID_WORK_DIR` | Terraform workspaces | `./workspaces` or `/var/lib/grid/workspaces` |
| `GRID_CLI_ROOT` | Path to `grid-cli` package | `/opt/grid/grid-cli` |
| `GRID_CONFIG_ROOT` | Desired-state working tree | `/opt/grid/grid-config` or `./data/desired-state` |
| `GRID_MODULE_BANK` | Module bank git URL or path | `https://github.com/gridplatform/grid-terraform.git` |
| `GRID_MODULE_BANK_REF` | Branch/tag for module bank | `main` or a release tag |
| `GRID_TERRAFORM_BIN` | Terraform binary | `terraform` |
| `GRID_AUTO_APPROVE` | Pass `-auto-approve` on apply | `true` only for lab |

## Auth

| Variable | Purpose |
|----------|---------|
| `GRID_AUTH_ADMIN_EMAIL` | Bootstrap admin |
| `GRID_AUTH_ADMIN_PASSWORD` | **Must change** before any shared host |
| `GRID_AUTH_SESSION_TTL_HOURS` | Session length (default often 168) |
| `GRID_AUTH_ALLOW_REGISTER` | Public self-register (keep `false` for self-host) |
| `GRID_AUTH_DISABLED` | Dev only — never on a public VM |

## GitOps (desired-state sync)

| Variable | Purpose |
|----------|---------|
| `GRID_GITOPS_REPO_URL` | Remote desired-state repo (e.g. your fork of grid-config) |
| `GRID_GITOPS_BRANCH` | Branch to pull |
| `GRID_GITOPS_PATH` | Optional subdirectory |
| `GRID_GITOPS_SYNC_INTERVAL_SEC` | Auto-pull interval; `0` = manual |

If `GRID_GITOPS_REPO_URL` is set, Core clones/pulls into `GRID_CONFIG_ROOT`.

## Remote Terraform state (optional)

| Variable | Purpose |
|----------|---------|
| `GRID_TF_BACKEND` | e.g. `s3` |
| `GRID_TF_STATE_BUCKET` | Bucket name |
| `GRID_TF_LOCK_TABLE` | DynamoDB lock table |
| `GRID_TF_STATE_REGION` | Region |

## UI

Point the console at the API (Vite / build-time env — see **grid-ui** README), e.g. `VITE_API_URL=https://grid.example.com/api` or `http://<vm-ip>:3000`.

## Secrets hygiene

- Never commit `.env`.  
- Prefer instance roles / OIDC over long-lived keys on the VM when possible.  
- Rotate `GRID_AUTH_ADMIN_PASSWORD` after first login if the image was shared.
