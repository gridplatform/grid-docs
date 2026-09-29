---
title: Install on a VM
---

# Install on a VM

Target: Ubuntu 22.04 / 24.04, outbound HTTPS. Installer lives in **[grid-core/install](https://github.com/gridplatform/grid-core/tree/main/install)**.

:::warning Remote state first
Whether this VM is on AWS, GCP, or Azure, **create a remote Terraform state backend before applying real infra**.  
Local state on the VM is lab-only. See **[Remote Terraform state](./remote-state)** (`s3` / `gcs` / `azurerm`), then set `GRID_TF_*` in `/etc/grid/grid.env` or Compose `.env`.
:::

## One-liner (recommended)

```bash
export GRID_AUTH_ADMIN_PASSWORD='choose-a-strong-password'
curl -fsSL https://raw.githubusercontent.com/gridplatform/grid-core/main/install/install.sh | sudo -E bash
```

What it does:

1. Installs Node 20 + Terraform  
2. Clones `grid-core`, `grid-cli`, `grid-ui` into `/opt/grid`  
3. Builds all three  
4. Starts **grid-core** via systemd  
5. Configures **nginx** on port 80 (UI + `/api` proxy)

Open `http://<vm-ip>/` and sign in with `admin@grid.local` (or `GRID_AUTH_ADMIN_EMAIL`) and your password.

### Compose on the VM instead

```bash
export GRID_USE_COMPOSE=1 GRID_AUTH_ADMIN_PASSWORD='choose-a-strong-password'
curl -fsSL https://raw.githubusercontent.com/gridplatform/grid-core/main/install/install.sh | sudo -E bash
```

See also [Docker Compose](./docker-compose).

## Prerequisites (manual path)

| Need | Notes |
|------|--------|
| CPU / RAM | 2 vCPU, 4 GB RAM minimum; 8 GB preferred |
| Disk | ≥ 20 GB |
| Ports | `80` (nginx), `3000` (API, localhost) |
| Cloud creds | On the VM if this host will **apply** Terraform |

## Manual steps (same end state)

```bash
sudo apt-get update
sudo apt-get install -y curl git ca-certificates build-essential nginx

# Node 20+ and Terraform ≥ 1.5 on PATH — then:
sudo mkdir -p /opt/grid && sudo chown "$USER":"$USER" /opt/grid
cd /opt/grid
git clone https://github.com/gridplatform/grid-core.git
git clone https://github.com/gridplatform/grid-cli.git
git clone https://github.com/gridplatform/grid-ui.git

cd grid-cli && npm ci && npm run build
cd ../grid-core && npm ci && npm run build
cd ../grid-ui && VITE_GRID_API_URL=/api/v1 npm ci && npm run build
```

Copy env from [`install/.env.example`](https://github.com/gridplatform/grid-core/blob/main/install/.env.example), install [`systemd/grid-core.service`](https://github.com/gridplatform/grid-core/blob/main/install/systemd/grid-core.service) and [`nginx-host.conf`](https://github.com/gridplatform/grid-core/blob/main/install/nginx-host.conf), then:

```bash
sudo systemctl enable --now grid-core nginx
```

## Configuration

See [Configuration](./configuration). Defaults pull desired-state from [grid-config](https://github.com/gridplatform/grid-config) and modules from [grid-terraform](https://github.com/gridplatform/grid-terraform).

## Smoke check

1. `curl -fsS http://127.0.0.1/health` → `{"status":"ok"}`  
2. UI loads; admin login works  
3. Create a **plan** release for a cheap unit — confirm Releases + live logs  
4. Apply only when you accept cloud cost

## Pin a release

```bash
export GRID_REF=v0.1.0   # when tags exist
curl -fsSL https://raw.githubusercontent.com/gridplatform/grid-core/${GRID_REF}/install/install.sh | sudo -E bash
```
