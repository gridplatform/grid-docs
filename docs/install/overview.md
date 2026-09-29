---
title: Install overview
---

# Install overview

Install **scripts and Compose** live in [grid-core/install](https://github.com/gridplatform/grid-core/tree/main/install). These docs explain which path to use.

## Choose a path

| Path | What runs on the VM | Guide |
|------|---------------------|--------|
| **Remote state first** | (cloud object store — not on the VM) | [Remote Terraform state](./remote-state) |
| **Compose on the VM** *(recommended)* | Docker: `core` + `ui` containers | [Docker Compose](./docker-compose) / `GRID_USE_COMPOSE=1` |
| **Native VM** (`install.sh` default) | Node processes + systemd + host nginx | [Install on a VM](./vm) |
| **Dev from source** | `npm run dev` on your laptop | Each repo README |

:::tip How does a VM actually run Grid?
Two supported modes — pick one:

1. **Compose (recommended for most VMs)** — Docker runs `grid-core` (API + CLI + Terraform inside the image) and `grid-ui` (nginx). One `docker compose up`.  
2. **Native** — `install.sh` installs Node + Terraform on the host, runs **grid-core** under systemd, serves the UI via **nginx** (no Compose).

You do **not** need both. Compose is usually simpler to upgrade; native avoids Docker if you prefer.
:::

:::tip Order of operations
1. Create an **S3 / GCS / Azure** state backend ([Remote state](./remote-state))  
2. Install Grid on the VM (Compose **or** native)  
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
