---
title: Docker Compose
---

# Docker Compose

Compose definitions live in [`grid-core/install`](https://github.com/gridplatform/grid-core/tree/main/install):

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Build `core` and `ui` from source |
| `docker-compose.release.yml` | Run pre-built images from GHCR |

Version pins and channels: [Releases](./releases.md).

## Build from source

```bash
git clone https://github.com/gridplatform/grid-core.git
cd grid-core
cp install/.env.example install/.env
```

Set `GRID_AUTH_ADMIN_PASSWORD`. Optional pins: `GRID_CLI_REF`, `GRID_UI_REF`.

```bash
docker compose -f install/docker-compose.yml --env-file install/.env up -d --build
bash install/verify.sh
```

## Pre-built images

```bash
git clone https://github.com/gridplatform/grid-core.git
cd grid-core
cp install/.env.example install/.env
```

Set `GRID_AUTH_ADMIN_PASSWORD`. Set `GRID_RELEASE_CHANNEL` (`current` or `lts`) or `GRID_VERSION` (exact tag).

```bash
docker compose -f install/docker-compose.release.yml --env-file install/.env pull
docker compose -f install/docker-compose.release.yml --env-file install/.env up -d
bash install/verify.sh
```

## Runtime notes

- Always start detached (`-d`). Foreground Compose stops when the session ends.
- On a VM: enable Docker on boot, and optionally [`grid-compose.service`](https://github.com/gridplatform/grid-core/blob/main/install/systemd/grid-compose.service). Services use `restart: unless-stopped`.
- **core** embeds grid-cli and Terraform. **ui** serves the console and proxies `/api` to core.
- HTTP port: `GRID_HTTP_PORT` (default `80`). Open `http://<host>/`.
- Before applying infrastructure, configure remote state (`GRID_TF_*`). See [Remote Terraform state](./remote-state.md).

## Environment variables

| Variable | Purpose |
|----------|---------|
| `GRID_AUTH_ADMIN_PASSWORD` | Bootstrap admin password (required) |
| `GRID_AUTH_ADMIN_EMAIL` | Bootstrap admin email |
| `GRID_GITOPS_REPO_URL` | Desired-state repository |
| `GRID_MODULE_BANK` | Terraform module bank URL |
| `GRID_CLI_REF` | grid-cli git ref for source builds |
| `GRID_UI_REF` | grid-ui git ref for source builds |
| `GRID_UI_CONTEXT` | Override UI build context |
| `GRID_RELEASE_CHANNEL` | `lts` or `current` (release compose) |
| `GRID_VERSION` | Exact image tag (release compose) |

Full list: [Configuration](./configuration.md) and [`install/.env.example`](https://github.com/gridplatform/grid-core/blob/main/install/.env.example).

## Volumes

| Volume | Mount |
|--------|--------|
| `grid-data` | Users, releases, audit, module-bank cache |
| `grid-workspaces` | Terraform workspaces |
| `grid-desired-state` | GitOps working tree |

## Cloud credentials

Terraform runs inside the `core` container. Mount provider credentials via a Compose override, for example:

```yaml
services:
  core:
    volumes:
      - ${HOME}/.aws:/root/.aws:ro
```

Instance roles or workload identity on the host are also supported.

## Upgrades

Source build:

```bash
cd grid-core
git fetch && git checkout <tag>
docker compose -f install/docker-compose.yml --env-file install/.env up -d --build
```

Pre-built images — update `GRID_VERSION` or `GRID_RELEASE_CHANNEL` in `install/.env`, then:

```bash
docker compose -f install/docker-compose.release.yml --env-file install/.env pull
docker compose -f install/docker-compose.release.yml --env-file install/.env up -d
```

## Related

[Install on a VM](./vm.md) · [Configuration](./configuration.md) · [Releases](./releases.md)
