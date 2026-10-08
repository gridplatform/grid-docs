---
title: AWS & GCP with Grid CLI
---

# AWS & GCP with Grid CLI

How to take a desired-state JSON from generate → plan → deploy → destroy on **AWS** and **GCP**. Feature flags and Admin RBAC do not apply to the CLI; you need valid cloud credentials and modules from **grid-terraform**.

## Prerequisites

| Need | Notes |
|------|--------|
| Node 24+ | `cd grid-cli && npm install` |
| Terraform ≥ 1.5 | on `PATH` |
| Module bank | Sibling `../grid-terraform` or `export GRID_MODULE_BANK=/abs/path/to/grid-terraform` |
| AWS | `aws` CLI / env credentials with rights for VPC, EC2, S3 as needed |
| GCP | `gcloud auth application-default login` (or SA JSON); set project id + VM service account email |

Canonical demos live under path-shaped desired-state (see [grid-config](https://github.com/gridplatform/grid-config) or a local `demo-infra` fixture):

```text
<config-root>/<cloud>/<environment>/<infra-type>/<name>.json
<config-root>/archive/<cloud>/<environment>/<infra-type>/<name>/   # Terraform buffer
```

`grid generate` writes under **`archive/`** by default. When `GRID_MODULE_BANK` is
a **git URL**, modules are referenced remotely (`git::…//aws/vpc?ref=…`) and are
**not** copied into `archive/…/modules`. Use `GRID_MODULE_SOURCE=copy` (or
`--module-source copy`) for a self-contained vendor tree. Commit or sync the thin
`archive/` HCL with your JSON as the exit path if Grid is removed. Use
`-o /tmp/...` only for scratch.

## Supported paths

| Provider | Types | Path |
|----------|-------|------|
| AWS | `vpc`, `subnet`, `vm` / `ec2`, `s3` | generate → validate → plan/apply |
| GCP | `vpc`, `subnet`, `vm`, `gcs` | generate → validate → plan/apply |

Other catalog types may generate HCL when a module folder exists; prefer the demos above for reliable deploys.

## AWS — VPC (+ optional EC2)

VPC and EC2 are split units; EC2 declares `metadata.dependsOn` on the VPC file. Dependencies are **reference-only** (remote state) — they are not merged into one root.

```bash
cd grid-cli
export GRID_CONFIG_ROOT="$(pwd)/../demo-infra"
export GRID_MODULE_BANK="$(pwd)/../grid-terraform"

# Writes demo-infra/archive/aws/development/vpc/dev-demo-vpc/
npm run grid -- generate \
  -c ../demo-infra/aws/development/vpc/dev-demo-vpc.json \
  --config-dir "$GRID_CONFIG_ROOT" \
  --format terraform

npm run grid -- plan \
  -c ../demo-infra/aws/development/vpc/dev-demo-vpc.json \
  --config-dir "$GRID_CONFIG_ROOT"

# Live apply (costs money / creates resources) — uses same archive/ buffer:
npm run grid -- deploy \
  -c ../demo-infra/aws/development/vpc/dev-demo-vpc.json \
  --config-dir "$GRID_CONFIG_ROOT" \
  --auto-approve

# Optional app VM (references VPC via dependsOn):
npm run grid -- generate \
  -c ../demo-infra/aws/development/ec2/dev-demo-app.json \
  --config-dir "$GRID_CONFIG_ROOT" \
  --format terraform

npm run grid -- destroy \
  -c ../demo-infra/aws/development/vpc/dev-demo-vpc.json \
  --config-dir "$GRID_CONFIG_ROOT" \
  --auto-approve
```

## GCP — VPC (+ optional VM)

Edit `demo-infra/gcp/development/vpc/dev-demo-vpc.json` and
`demo-infra/gcp/development/vm/dev-demo-app.json`:

- `project` → your GCP project id  
- `metadata.serviceAccountEmail` on the VM unit (or export `GRID_GCP_SERVICE_ACCOUNT_EMAIL`)

```bash
cd grid-cli
export GRID_CONFIG_ROOT="$(pwd)/../demo-infra"
export GRID_MODULE_BANK="$(pwd)/../grid-terraform"
OUT=/tmp/grid-gcp-vpc

npm run grid -- generate \
  -c ../demo-infra/gcp/development/vpc/dev-demo-vpc.json \
  --config-dir "$GRID_CONFIG_ROOT" \
  -o "$OUT" --format terraform

npm run grid -- plan \
  -c ../demo-infra/gcp/development/vpc/dev-demo-vpc.json \
  --config-dir "$GRID_CONFIG_ROOT" \
  -o "$OUT"

npm run grid -- deploy \
  -c ../demo-infra/gcp/development/vpc/dev-demo-vpc.json \
  --config-dir "$GRID_CONFIG_ROOT" \
  -o "$OUT" --auto-approve

npm run grid -- generate \
  -c ../demo-infra/gcp/development/vm/dev-demo-app.json \
  --config-dir "$GRID_CONFIG_ROOT" \
  -o /tmp/grid-gcp-vm --format terraform

npm run grid -- destroy -o "$OUT" --auto-approve
```

## Object storage (catalog)

```bash
# AWS S3 — change bucket to a globally unique name first
npm run grid -- generate \
  -c ../demo-infra/aws/development/s3/logs.json \
  --config-dir ../demo-infra \
  -o /tmp/grid-aws-s3 --format terraform

# GCP GCS — set project; change names[] to unique bucket names
npm run grid -- generate \
  -c ../demo-infra/gcp/development/gcs/logs.json \
  --config-dir ../demo-infra \
  -o /tmp/grid-gcp-gcs --format terraform
```

## Validate without credentials

```bash
../demo-infra/scripts/smoke-cli.sh
```

Runs generate + `terraform validate` for AWS/GCP VPC and storage demos (no apply).

## Commands cheat sheet

| Command | Effect |
|---------|--------|
| `grid generate` | JSON → Terraform under `-o` or default `archive/` |
| `grid plan` | generate (unless `--skip-generate`) + `terraform plan` |
| `grid deploy` | generate + init/plan/apply |
| `grid destroy` | `terraform destroy` on an existing workspace |
| `grid validate` | schema check only |

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Module bank not found | Set `GRID_MODULE_BANK` to absolute path of `grid-terraform` |
| GCP VM generate fails on SA | Set `metadata.serviceAccountEmail` or `GRID_GCP_SERVICE_ACCOUNT_EMAIL` |
| `terraform validate` on GCP network | Ensure bank has the fixed `gcp/network` module (no unsupported route/firewall args) |
| Apply fails auth | Refresh AWS creds / `gcloud auth application-default login` |
| Staging/prod samples | Env is path-encoded; CLI does not enforce website approvals |
