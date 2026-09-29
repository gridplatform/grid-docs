---
title: Docker Compose
---

# Docker Compose

Preferred when Docker is already on the host. Compose files will live under **grid-core** as `install/docker-compose.yml` (and optional overrides).

:::info Packaging status
Until that file is merged and tagged, you can still follow [Install on a VM](./vm) with Node on the host, or draft Compose locally against published images once GHCR/Docker Hub publishes them.
:::

## Intended layout

```text
grid-core/install/
  docker-compose.yml      # core + ui (+ optional reverse proxy)
  .env.example            # copied to /etc/grid or install/.env
  install.sh              # optional wrapper: pulls tag + compose up
```

## Planned usage

```bash
git clone https://github.com/gridplatform/grid-core.git
cd grid-core
git checkout v0.1.0   # when available

cp install/.env.example install/.env
# edit admin password, GRID_CONFIG_ROOT / GitOps URL, cloud provider env if apply runs in-container

docker compose -f install/docker-compose.yml --env-file install/.env up -d
```

## Volumes (recommended)

| Mount | Purpose |
|-------|---------|
| `grid-data` | `GRID_DATA_DIR` — users, releases, audit |
| `grid-workspaces` | Terraform workspaces |
| `grid-config` or Git sync | Desired-state tree |
| `module-bank` cache | Clone of grid-terraform |

## Networking

- Publish UI on `80`/`443` (or `8080` in lab).  
- Keep API internal to the Compose network when a reverse proxy fronts both.  
- Do **not** expose Terraform state or `.env` via the UI.

## Upgrades

```bash
cd grid-core
git fetch && git checkout v0.x.y
docker compose -f install/docker-compose.yml pull
docker compose -f install/docker-compose.yml up -d
```

Always read the release notes before jumping major versions.

## Next

[Configuration](./configuration) · [Install on a VM](./vm) (non-Docker)
