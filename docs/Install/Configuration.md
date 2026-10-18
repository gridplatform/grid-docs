---
title: Configuration
---

# Configuration

Environment variables for **grid-core**, install Compose, and the console.

> **How to update this page**  
> Edit [`data/configuration.json`](https://github.com/gridplatform/grid-docs/blob/main/data/configuration.json), then run `npm run sync:config`.  
> Do not hand-edit the tables below — CI checks that the generated file matches the JSON.

Canonical templates in product repos:

- Install: [`grid-core/install/.env.example`](https://github.com/gridplatform/grid-core/blob/main/install/.env.example)
- Core (local / native): [`grid-core/.env.example`](https://github.com/gridplatform/grid-core/blob/main/.env.example)
- Console: [`grid-ui/.env.example`](https://github.com/gridplatform/grid-ui/blob/main/.env.example)

**Required** = needed for production / install boot (`npm run prod`, Compose `check-env.sh`).

## Paths & process

Core process paths. Install Compose uses defaults inside the container; override only when you know the layout.

| Variable | Required | Purpose | Typical |
|----------|----------|---------|---------|
| `PORT` |  | API listen port (inside the process / container) | `3000` |
| `GRID_HTTP_PORT` |  | Host port published by Compose for the UI/proxy | `80` |
| `GRID_DATA_DIR` |  | JSON store (users, sessions, audit, releases) | `./data` or `/var/lib/grid/data` |
| `GRID_WORK_DIR` |  | Terraform workspaces fallback root | `./workspaces` or `/var/lib/grid/workspaces` |
| `GRID_CLI_ROOT` |  | Path to the `grid-cli` package | `../grid-cli` or `/opt/grid/grid-cli` |
| `GRID_CONFIG_ROOT` |  | Desired-state working tree (GitOps checkout target) | `./data/desired-state` |
| `GRID_TERRAFORM_BIN` |  | Terraform binary name or path | `terraform` |
| `GRID_CORS_ORIGIN` |  | Optional CORS allow-list (comma-separated origins). Empty = library default | `https://grid.example.com` |

## Auth

Bootstrap creates one superadmin. Change the password before any shared host.

| Variable | Required | Purpose | Typical |
|----------|----------|---------|---------|
| `GRID_AUTH_ADMIN_EMAIL` | yes | Bootstrap superadmin email | `admin@example.com` |
| `GRID_AUTH_ADMIN_PASSWORD` | yes | Bootstrap superadmin password (no placeholders). Keep in sync after `grid admin superadmin` rotates it | (strong secret) |
| `GRID_AUTH_ADMIN_NAME` |  | Optional display name for the bootstrap user | `Grid Admin` |
| `GRID_AUTH_SESSION_TTL_HOURS` |  | API session length in hours | `168` |
| `GRID_AUTH_ALLOW_REGISTER` |  | Public self-register (`true`/`1`). Keep off for self-host | `false` |
| `GRID_AUTH_DISABLED` |  | Bypass auth — **dev only**, never on a public VM | `false` |

## GitOps (intent sync)

When `GRID_GITOPS_REPO_URL` is set, Core clones/pulls into `GRID_CONFIG_ROOT`. Works with any Git host. Prefer a clean URL. **Production (`npm run prod`) hard-fails HTTPS remotes without username + host token + expiry** (env or Admin → Sources). SSH remotes use host deploy keys instead.

| Variable | Required | Purpose | Typical |
|----------|----------|---------|---------|
| `GRID_GITOPS_REPO_URL` | yes | Intent repo URL (HTTPS or SSH) — any Git provider | `https://git.example.com/org/intent.git` |
| `GRID_GITOPS_BRANCH` |  | Branch to pull | `main` |
| `GRID_GITOPS_PATH` |  | Optional subdirectory under the clone (relative, no `..`) | (empty = repo root) |
| `GRID_GITOPS_SYNC_INTERVAL_SEC` |  | Auto pull + reconcile interval. Default `600` when a repo URL is set; `0` = manual only | `600` |
| `GRID_GITOPS_USERNAME` | yes | Required for HTTPS intent remotes in production (`git`, GitLab `oauth2`, Bitbucket `x-token-auth`, …). Also stored in `gitops-secrets.json` via Admin → Sources. Not required for SSH remotes. | `git` |
| `GRID_GITOPS_TOKEN` | yes | Required for HTTPS intent remotes in production (host-issued PAT/deploy token; Grid does not generate it). Also accepted from `GRID_DATA_DIR/gitops-secrets.json` after Admin → Sources. Not required for SSH remotes. | `ghp_…` / deploy token (or unset once secrets file is populated) |
| `GRID_GITOPS_TOKEN_EXPIRES_AT` | yes | Required with HTTPS auth in production (`YYYY-MM-DD` from your Git host). Also stored via Sources as authExpiresAt / secrets `tokenExpiresAt`. | `2027-01-15` |
| `GRID_USE_DEMO` |  | Force demo-infra fixture path (local labs). Do not use in production | `false` |

## Module bank

Terraform modules consumed by generate. Prefer a **release tag**, not `main`.

| Variable | Required | Purpose | Typical |
|----------|----------|---------|---------|
| `GRID_MODULE_BANK` |  | Module bank git URL or local path | `https://github.com/gridplatform/grid-terraform.git` |
| `GRID_MODULE_BANK_REF` |  | Branch or tag for the module bank | `v0.1.0` |
| `GRID_MODULE_BANK_SYNC_INTERVAL_SEC` |  | Auto-refresh local module-bank checkout (seconds). `0` = manual. Default `20` when unset | `20` |
| `GRID_MODULE_SOURCE` |  | Optional: force `remote` module sources in generated HCL | `remote` |

## Remote Terraform state

Required for production / install. Create the store before the first apply — see [Remote state](./Remote_State.md). The same bucket also stores the generated archive mirror.

| Variable | Required | Purpose | Typical |
|----------|----------|---------|---------|
| `GRID_TF_BACKEND` | yes | Backend kind | `s3` \\| `gcs` \\| `azurerm` \\| `oci` \\| `oss` \\| `cos` \\| `s3compat` |
| `GRID_TF_STATE_BUCKET` |  | Bucket / container name (s3, gcs, oci, oss, cos, s3compat) | `mycompany-grid-tfstate` |
| `GRID_TF_LOCK_TABLE` |  | DynamoDB lock table (AWS S3 backend) | `mycompany-grid-tflock` |
| `GRID_TF_STATE_REGION` |  | Region for S3 / OSS / COS / s3compat | `us-east-1` |
| `GRID_TF_S3_ENDPOINT` |  | S3-compatible endpoint (OCI, Huawei OBS, Aliyun OSS, MinIO, …) | `https://obs.cn-north-1.myhuaweicloud.com` |
| `GRID_TF_S3_FORCE_PATH_STYLE` |  | Force path-style S3 addressing when the vendor requires it | `true` |
| `GRID_TF_AZURE_RESOURCE_GROUP` |  | Azure resource group (`azurerm`) | `grid-tfstate-rg` |
| `GRID_TF_AZURE_STORAGE_ACCOUNT` |  | Azure storage account (`azurerm`) | `gridtfstate` |
| `GRID_TF_AZURE_CONTAINER` |  | Azure blob container (`azurerm`) | `grid-tfstate` |
| `GRID_TF_OCI_NAMESPACE` |  | OCI Object Storage namespace | `<tenancy-namespace>` |

## Monitoring

Prometheus + Alertmanager run on the **host** (systemd or local binaries), not inside Grid Compose. Required for production boot. See [Monitoring](./Monitoring.md).

| Variable | Required | Purpose | Typical |
|----------|----------|---------|---------|
| `GRID_PROMETHEUS_URL` | yes | Prometheus query API base URL | `http://127.0.0.1:9090` or `http://host.docker.internal:9090` |
| `GRID_ALERTMANAGER_URL` | yes | Alertmanager API base URL | `http://127.0.0.1:9093` or `http://host.docker.internal:9093` |
| `GRID_MONITORING_CONFIG_DIR` |  | Dir for alert `rules/` + `alertmanager.yml` written by the API | `./install/monitoring` or `/etc/prometheus` |
| `GRID_MONITORING_HOST_DIR` |  | Host path bind-mounted for Compose → systemd Prometheus config | `/etc/prometheus` |
| `GRID_PROMETHEUS_BEARER_TOKEN` |  | Optional bearer token for Prometheus | (secret) |
| `GRID_PROMETHEUS_BASIC_USER` |  | Optional basic-auth user for Prometheus |  |
| `GRID_PROMETHEUS_BASIC_PASSWORD` |  | Optional basic-auth password for Prometheus | (secret) |
| `GRID_PROMETHEUS_TIMEOUT_MS` |  | Prometheus HTTP timeout | `8000` |
| `GRID_PROMETHEUS_CACHE_TTL_MS` |  | In-process metrics cache TTL | `20000` |
| `GRID_ALERTMANAGER_TIMEOUT_MS` |  | Alertmanager HTTP timeout | `8000` |

## Argo CD / OpenShift GitOps

Optional Kubernetes workload reconciler (Application CRD). Off by default.

| Variable | Required | Purpose | Typical |
|----------|----------|---------|---------|
| `GRID_ARGO_ENABLED` |  | Enable Argo / OpenShift GitOps integration (`true`/`1`) | `false` |
| `GRID_ARGO_KUBECONFIG` |  | kubeconfig for the cluster where Argo runs (falls back to `KUBECONFIG`) | `/path/to/kubeconfig` |
| `GRID_ARGO_CONTEXT` |  | Optional kubectl context name |  |
| `GRID_ARGO_NAMESPACE` |  | Namespace for Application CRs | `argocd` |
| `GRID_KUBECTL_BIN` |  | kubectl binary | `kubectl` |

## Install / Compose pins

Used by `install/.env` and Compose. Not all apply to a bare `npm run prod` on a local machine.

| Variable | Required | Purpose | Typical |
|----------|----------|---------|---------|
| `GRID_RELEASE_CHANNEL` |  | GHCR channel when using release Compose (`current` or `lts`) | `current` |
| `GRID_VERSION` |  | Exact image tag (overrides channel), e.g. `0.1.0` | `0.1.0` |
| `GRID_CORE_IMAGE` |  | Override core image reference | `ghcr.io/gridplatform/grid-core:0.1.0` |
| `GRID_UI_IMAGE` |  | Override UI image reference | `ghcr.io/gridplatform/grid-ui:0.1.0` |
| `GRID_CLI_REF` |  | Git ref when building CLI into the core image from source | `main` or `v0.1.0` |
| `GRID_UI_REF` |  | Git ref when building the UI image from source | `main` or `v0.1.0` |
| `TERRAFORM_VERSION` |  | Terraform version baked into the core image | `1.9.8` |

## Console (grid-ui)

Build-time Vite env. Production builds refuse to proceed without `VITE_GRID_API_URL`.

| Variable | Required | Purpose | Typical |
|----------|----------|---------|---------|
| `VITE_GRID_API_URL` | yes | Browser → API base path or absolute URL | `/api/v1` (Compose) or `http://localhost:3000/api/v1` (dev) |

## Secrets hygiene

- Never commit `.env` or `install/.env`.
- Prefer instance roles / OIDC over long-lived keys on the VM when possible.
- Rotate `GRID_AUTH_ADMIN_PASSWORD` after first login if the image was shared.
- Keep bootstrap env vars in sync when you rotate the superadmin via CLI.

## Related

- [Remote state](./Remote_State.md)
- [Monitoring](./Monitoring.md)
- [Development vs production](./Dev_Vs_Prod.md)
- [Releases](./Releases.md)
