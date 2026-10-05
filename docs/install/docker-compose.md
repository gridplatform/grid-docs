---
title: Docker Compose
---

# Docker Compose

Compose file: [`grid-core/install/docker-compose.yml`](https://github.com/gridplatform/grid-core/blob/main/install/docker-compose.yml).

## Run

```bash
git clone https://github.com/gridplatform/grid-core.git
cd grid-core
cp install/.env.example install/.env
# set GRID_AUTH_ADMIN_PASSWORD (required)

docker compose -f install/docker-compose.yml --env-file install/.env up -d --build
bash install/verify.sh
```

> **Always detached (`-d`).** Foreground `docker compose up` (no `-d`) stops when you close SSH.  
> On a VM, also: `sudo systemctl enable --now docker` and optionally enable [`grid-compose.service`](https://github.com/gridplatform/grid-core/blob/main/install/systemd/grid-compose.service) so the stack returns after reboot. Containers use `restart: unless-stopped`.

- **core** — builds from `grid-core/Dockerfile` (embeds **grid-cli** + Terraform from GitHub)  
- **ui** — builds from public **grid-ui** (`Dockerfile` + nginx; proxies `/api` → `core:3000`)  
- Publish port: `GRID_HTTP_PORT` (default **80**)

Open `http://<host>/`.

> **Remote state**  
> Before applying infrastructure, create an S3 / GCS / Azure state store and set `GRID_TF_*` in `install/.env`. See [Remote Terraform state](./remote-state.md).

## Env highlights

| Variable | Purpose |
|----------|---------|
| `GRID_AUTH_ADMIN_PASSWORD` | **Required** — bootstrap admin |
| `GRID_AUTH_ADMIN_EMAIL` | Default `admin@grid.local` |
| `GRID_GITOPS_REPO_URL` | Desired-state repo (default grid-config) |
| `GRID_MODULE_BANK` | Module bank git URL (default grid-terraform) |
| `GRID_CLI_REF` | Branch/tag of grid-cli cloned into the core image |
| `GRID_UI_CONTEXT` | Override UI build context (default GitHub URL) |

Full list: [Configuration](./configuration.md) and [`install/.env.example`](https://github.com/gridplatform/grid-core/blob/main/install/.env.example).

## Volumes

| Volume | Mount |
|--------|--------|
| `grid-data` | users, releases, audit, module-bank cache |
| `grid-workspaces` | Terraform workspaces |
| `grid-desired-state` | GitOps working tree |

## Cloud credentials for apply

Terraform runs **inside** the `core` container. Mount provider creds, for example:

```yaml
# add under services.core in an override file
volumes:
  - ${HOME}/.aws:/root/.aws:ro
```

Or use an instance role / workload identity on the host VM.

## Upgrades

```bash
cd grid-core
git fetch && git checkout v0.x.y   # when tagged
docker compose -f install/docker-compose.yml --env-file install/.env pull
docker compose -f install/docker-compose.yml --env-file install/.env up -d --build
```

Pre-built registry images are optional later; today installs **build from source** on the host.

## Next

[Install on a VM](./vm.md) · [Configuration](./configuration.md)
