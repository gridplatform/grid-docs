---
title: Install overview
---

# Install overview

Install **scripts and Compose** live in [grid-core/install](https://github.com/gridplatform/grid-core/tree/main/install). These docs explain which path to use.

## Choose a path

| Path | Best for | Guide |
|------|----------|--------|
| **Remote state first** | Any real / replaceable VM | [Remote Terraform state](./remote-state) |
| **VM installer** (`install.sh`) | Lab EC2 / any Ubuntu host | [Install on a VM](./vm) |
| **Docker Compose** | Docker already on the host | [Docker Compose](./docker-compose) |
| **Dev from source** | Contributors | Clone core + ui + cli; `npm run dev` (each README) |

:::tip Order of operations
1. Create an **S3 / GCS / Azure** state backend ([Remote state](./remote-state))  
2. Install Grid on the VM  
3. Set `GRID_TF_BACKEND=…` in the control-plane `.env`  
4. Plan / apply  

Skipping remote state is OK only for a disposable laptop lab.
:::

## What gets installed

1. **grid-core** — HTTP API, releases, GitOps, Terraform runner  
2. **grid-ui** — console (nginx serves static build)  
3. **grid-cli** — invoked by core (bundled in the core image / cloned on VM)  
4. **Terraform** ≥ 1.5  
5. **Desired-state** — [grid-config](https://github.com/gridplatform/grid-config) (or your fork) via GitOps  
6. **Module bank** — [grid-terraform](https://github.com/gridplatform/grid-terraform)

## Version pinning

Prefer a **release tag** when published (`GRID_REF=v0.1.0`). Until then, `main` is the integration branch — protect it with PR + CI.

## Next

- [Install on a VM](./vm)  
- [Docker Compose](./docker-compose)  
- [Configuration](./configuration)
