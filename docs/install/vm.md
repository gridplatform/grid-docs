---
title: Install on a VM
---

# Install on a VM

Target: Ubuntu 22.04 / 24.04 (or similar), public or private IP, outbound HTTPS. This is the path for the lab VM you create with Grid (or any cheap cloud VM).

:::info Packaging status
Install artifacts (`install/install.sh`, systemd units) ship from **grid-core**. Until the first tagged release is published, use the **manual steps** below (same end state the script will automate).
:::

## Prerequisites

| Need | Notes |
|------|--------|
| CPU / RAM | 2 vCPU, 4 GB RAM minimum; 8 GB preferred if Terraform + UI + API share the box |
| Disk | ≥ 20 GB |
| Ports | `80`/`443` (UI reverse proxy) and/or `3000` (API), `5173` or static UI — tighten with a firewall later |
| Cloud creds | On the VM only if this host will **apply** Terraform (AWS/GCP keys or instance role) |

## 1. System packages

```bash
sudo apt-get update
sudo apt-get install -y curl git ca-certificates build-essential
```

Install **Node.js 20+** (NodeSource or your preferred method) and **Terraform ≥ 1.5**.

```bash
# Example: Terraform via HashiCorp apt (or download a release zip)
terraform version
node -v
npm -v
```

## 2. Clone product repos

```bash
sudo mkdir -p /opt/grid && sudo chown "$USER":"$USER" /opt/grid
cd /opt/grid

git clone https://github.com/gridplatform/grid-core.git
git clone https://github.com/gridplatform/grid-ui.git
git clone https://github.com/gridplatform/grid-cli.git
git clone https://github.com/gridplatform/grid-config.git
# module bank is usually pulled by core from GitHub; optional local clone:
# git clone https://github.com/gridplatform/grid-terraform.git
```

Pin to a tag when releases exist:

```bash
cd /opt/grid/grid-core && git checkout v0.1.0
# repeat for ui / cli as needed
```

## 3. Configure grid-core

```bash
cd /opt/grid/grid-core
cp -n .env.example .env
```

Edit `.env` at least:

| Variable | Suggested lab value |
|----------|---------------------|
| `GRID_CLI_ROOT` | `/opt/grid/grid-cli` |
| `GRID_CONFIG_ROOT` | `/opt/grid/grid-config` (or `./data/desired-state` if syncing from Git) |
| `GRID_MODULE_BANK` | `https://github.com/gridplatform/grid-terraform.git` |
| `GRID_MODULE_BANK_REF` | `main` (or a tag) |
| `GRID_AUTH_ADMIN_EMAIL` | your email |
| `GRID_AUTH_ADMIN_PASSWORD` | **change from the example** |
| `GRID_GITOPS_REPO_URL` | optional; set if Core should pull desired-state |

See [Configuration](./configuration) for the full list.

## 4. Install & start API

```bash
cd /opt/grid/grid-core
npm ci
npm run build   # if a build script exists; else use npm run dev for lab
npm start       # or: npm run dev
```

API default: `http://0.0.0.0:3000` (bind address depends on your start script / reverse proxy).

## 5. Install & start UI

```bash
cd /opt/grid/grid-ui
npm ci
# point the UI at the API (see UI .env / Vite env — typically VITE_API_URL)
npm run build && npm run preview
# or for lab: npm run dev -- --host 0.0.0.0
```

Open the UI in a browser at the VM’s public IP (and port). Log in with the admin credentials from `.env`.

## 6. Optional: systemd (production-ish)

Once `install/systemd/*.service` exists in **grid-core**, enable them:

```bash
sudo cp /opt/grid/grid-core/install/systemd/*.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now grid-core grid-ui
```

Until then, use `tmux`/`screen` or Compose ([Docker Compose](./docker-compose)).

## 7. Smoke check

1. UI loads; admin login works.  
2. Admin → Sources / GitOps (or config root) shows your desired-state.  
3. Create a **plan** release for a cheap unit (e.g. VPC in `grid-labs`) — confirm a Release row + live logs.  
4. Apply only when you accept cloud cost.

## One-liner (future)

When published:

```bash
curl -fsSL https://raw.githubusercontent.com/gridplatform/grid-core/v0.1.0/install/install.sh | sudo bash
```

This page remains the narrative; the script only automates steps 1–6.
