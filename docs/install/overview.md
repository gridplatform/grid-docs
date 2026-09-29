---
title: Install overview
---

# Install overview

Pick how you want to run Grid. Install **scripts and Compose files** live in [grid-core](https://github.com/gridplatform/grid-core) (versioned with releases). **These docs** explain which path to use and the exact commands.

## Choose a path

| Path | Best for | Guide |
|------|----------|--------|
| **Single VM** (Ubuntu) | Lab / first self-host / cheap AWS EC2 | [Install on a VM](./vm) |
| **Docker Compose** | Same host, isolated services, easy upgrades | [Docker Compose](./docker-compose) |
| **Dev from source** | Contributors hacking on core/ui/cli | Clone the three repos + `npm run dev` (see each README) |

## What gets installed

A minimal Grid control plane needs:

1. **grid-core** — HTTP API, releases, GitOps sync, Terraform runner  
2. **grid-ui** — browser console (static build or Vite preview)  
3. **grid-cli** — invoked by core (not usually called by end users on the VM)  
4. **Terraform** ≥ 1.5 on `PATH` (or inside the core container)  
5. **Desired-state** — usually a clone of [grid-config](https://github.com/gridplatform/grid-config) (or your own fork) at `GRID_CONFIG_ROOT`  
6. **Module bank** — [grid-terraform](https://github.com/gridplatform/grid-terraform) via `GRID_MODULE_BANK`

## Version pinning

Prefer a **release tag** (`v0.1.0`, …) for both the install script URL and Compose image tags. Do not run unreviewed `main` in anything that looks like production.

## Next

- New empty VM → **[Install on a VM](./vm)**  
- Already have Docker → **[Docker Compose](./docker-compose)**  
- Then set env vars → **[Configuration](./configuration)**
