---
title: Remote Terraform state
---

# Remote Terraform state

**Before you apply real infrastructure from a Grid VM (or Compose host), create a remote state backend.**  
Local `terraform.tfstate` on the VM disk is fine for a laptop lab; it is **not** safe for shared / replaceable VMs — if the VM dies, you lose the map of what Terraform manages.

Grid generates `backend.tf` and `terraform_remote_state` for `dependsOn` from the same settings. Configure them once on the control plane (`.env` / systemd / Compose).

## Supported backends

Grid targets **global** control planes — not only AWS/GCP/Azure. Every mode
below also mirrors generated Terraform under `archive/` in the same store.

**Important:** the *module bank provider* (where you deploy VPC/VM/…) is
independent of where you store state. One Grid install picks **one** remote
store for all units. You can deploy Tencent modules while keeping state on AWS
S3 — or host state on the same cloud as the modules.

### Backend modes

| `GRID_TF_BACKEND` | Cloud object store | Locking / notes |
|-------------------|--------------------|-----------------|
| `s3` | AWS S3 | DynamoDB (`GRID_TF_LOCK_TABLE`) |
| `gcs` | GCP Cloud Storage | GCS native |
| `azurerm` | Azure Blob | Azure blob leases |
| `oci` | Oracle Object Storage | Native `oci` backend; archive via S3-compat (`GRID_TF_S3_ENDPOINT`) |
| `oss` | Alibaba Cloud OSS | Native `oss` backend; archive via S3-compat endpoint |
| `cos` | Tencent Cloud COS | Native `cos` backend; archive defaults to `https://cos.<region>.myqcloud.com` |
| `s3compat` | Huawei OBS, OVH, OTC, IBM COS, CtrlS, Yotta, MinIO, … | Terraform `backend "s3"` + **required** `GRID_TF_S3_ENDPOINT` |
| `local` | VM disk | none — **development only** (`npm run dev`). Production refuses local state |

### Module bank → suggested state store

Folders in [grid-terraform](https://github.com/gridplatform/grid-terraform) and
the usual place operators put remote state / `archive/` when they want state
**on that cloud**:

| Module bank folder | Suggested `GRID_TF_BACKEND` | Object store |
|--------------------|----------------------------|--------------|
| `aws` | `s3` (alias `aws`) | AWS S3 + lock table |
| `gcp` | `gcs` (alias `gcp`) | GCS |
| `azure` | `azurerm` (alias `azure`) | Azure Blob |
| `oracle` | `oci` (alias `oracle`) | OCI Object Storage |
| `alibaba` | `oss` (alias `alibaba`) | Alibaba OSS |
| `tencent` | `cos` (alias `tencent`) | Tencent COS |
| `huawei` | `s3compat` (alias `huawei` / `obs`) | Huawei OBS (S3 API) |
| `ovh` | `s3compat` (alias `ovh`) | OVH Object Storage (S3) |
| `deutsche-telekom` | `s3compat` (alias `dt` / `otc`) | OTC OBS (S3 API) |
| `ibm` | `s3compat` (alias `ibm`) | IBM Cloud Object Storage (S3 API) — or use another cloud’s bucket |
| `ctrls` | `s3compat` (alias `ctrls`) | Vendor object store via S3 endpoint |
| `yotta` | `s3compat` (alias `yotta`) | Vendor object store via S3 endpoint |
| `openshift`, `rancher`, `confluent-cloud`, `redis-enterprise` | same as the **underlying** cloud (often `s3` / `gcs` / `azurerm`) | Platform overlays — no separate TF state backend |

Example OVH / Huawei:

```bash
# OVH
GRID_TF_BACKEND=ovh          # → s3compat
GRID_TF_STATE_BUCKET=my-tfstate
GRID_TF_STATE_REGION=gra
GRID_TF_S3_ENDPOINT=https://s3.gra.io.cloud.ovh.net/

# Huawei
GRID_TF_BACKEND=huawei       # → s3compat
GRID_TF_STATE_BUCKET=my-tfstate
GRID_TF_STATE_REGION=cn-north-1
GRID_TF_S3_ENDPOINT=https://obs.cn-north-1.myhuaweicloud.com
```

State object key / prefix is **per unit** (path-shaped), e.g.:

```text
grid/projects/grid-labs/aws/development/vpc/my-vpc/terraform.tfstate
```

So a VM unit can read VPC outputs via `terraform_remote_state` even when both stacks live in remote state.

### Generated Terraform mirror (`archive/`)

The **same** bucket/container also stores a durable copy of instance Terraform
(`.tf` + `.grid-generated`) under:

```text
archive/projects/grid-labs/aws/development/vpc/my-vpc/main.tf
archive/projects/grid-labs/aws/development/vpc/my-vpc/.grid-generated
…
```

Grid still writes `GRID_CONFIG_ROOT/archive/` on the control plane disk. Production
**mirrors** that folder to object storage so you keep a plain-Terraform exit path
without GitHub write-back. Modules are **not** uploaded (remote `git::` module bank).

| Event | Mirror behavior |
|-------|-----------------|
| Successful **plan** | Replace that unit’s `archive/<unit>/` objects |
| Successful **apply** with infra changes | Replace that unit’s `archive/<unit>/` objects |
| Successful **apply** with no changes | Skip upload |
| Successful **destroy** | Delete only that unit’s `archive/<unit>/` prefix |

Production boot **refuses to start** unless the store is reachable and the `archive/`
prefix is writable (probe put + delete). Grant the Grid host List/Get/Put/Delete on
both `grid/` and `archive/` prefixes.

| `GRID_TF_BACKEND` | Notes for archive mirror |
|-------------------|--------------------------|
| `s3` | AWS credentials / instance role |
| `gcs` | ADC / service account |
| `azurerm` | Azure identity on the host |
| `oci` | `GRID_TF_OCI_NAMESPACE` + `GRID_TF_S3_ENDPOINT` |
| `oss` | `GRID_TF_S3_ENDPOINT` (OSS S3 API) |
| `cos` | Tencent credentials; optional `GRID_TF_S3_ENDPOINT` (defaults from region) |
| `s3compat` | **Required** `GRID_TF_S3_ENDPOINT` (Huawei OBS / MinIO / custom) |

## 1. Create the store (once per org / env)

### AWS (`s3`)

```bash
# Pick unique names
BUCKET=mycompany-grid-tfstate
TABLE=mycompany-grid-tflock
REGION=us-east-1

aws s3api create-bucket --bucket "$BUCKET" --region "$REGION" \
  --create-bucket-configuration LocationConstraint="$REGION"   # omit LocationConstraint for us-east-1

aws s3api put-bucket-versioning --bucket "$BUCKET" \
  --versioning-configuration Status=Enabled

aws s3api put-bucket-encryption --bucket "$BUCKET" \
  --server-side-encryption-configuration \
  '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'

aws dynamodb create-table \
  --table-name "$TABLE" \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region "$REGION"
```

Then on the Grid host:

```bash
GRID_TF_BACKEND=s3
GRID_TF_STATE_BUCKET=mycompany-grid-tfstate
GRID_TF_LOCK_TABLE=mycompany-grid-tflock
GRID_TF_STATE_REGION=us-east-1
```

Grant the Grid VM / container role `s3:ListBucket` / `GetObject` / `PutObject` / `DeleteObject` on the bucket and DynamoDB lock permissions on the table.

### GCP (`gcs`)

```bash
BUCKET=mycompany-grid-tfstate
PROJECT=my-gcp-project
gcloud storage buckets create "gs://${BUCKET}" --project="$PROJECT" --location=US
gcloud storage buckets update "gs://${BUCKET}" --versioning
```

```bash
GRID_TF_BACKEND=gcs
GRID_TF_STATE_BUCKET=mycompany-grid-tfstate
```

Use a service account / ADC on the Grid host with access to that bucket.

### Azure (`azurerm`)

```bash
RG=grid-tfstate-rg
SA=mycompanygridtfstate   # globally unique, lowercase
CONTAINER=grid-tfstate
LOCATION=eastus

az group create -n "$RG" -l "$LOCATION"
az storage account create -n "$SA" -g "$RG" -l "$LOCATION" --sku Standard_LRS
az storage container create -n "$CONTAINER" --account-name "$SA"
```

```bash
GRID_TF_BACKEND=azurerm
GRID_TF_AZURE_RESOURCE_GROUP=grid-tfstate-rg
GRID_TF_AZURE_STORAGE_ACCOUNT=mycompanygridtfstate
GRID_TF_AZURE_CONTAINER=grid-tfstate
```

Authenticate the Grid host with Azure CLI / managed identity that can read/write the container.

### Tencent Cloud (`cos`)

Create a COS bucket (name usually includes your AppId), then:

```bash
GRID_TF_BACKEND=cos
GRID_TF_STATE_BUCKET=mycompany-grid-tfstate-1234567890
GRID_TF_STATE_REGION=ap-guangzhou
# optional override; default archive endpoint: https://cos.<region>.myqcloud.com
# GRID_TF_S3_ENDPOINT=https://cos.ap-guangzhou.myqcloud.com
```

Export `TENCENTCLOUD_SECRET_ID` / `TENCENTCLOUD_SECRET_KEY` (or use a CVM CAM role) on the Grid host.

### Huawei OBS / MinIO / other S3-compatible (`s3compat`)

Terraform has no separate “OBS” backend — Grid emits `backend "s3"` pointed at your endpoint:

```bash
GRID_TF_BACKEND=s3compat   # aliases: obs | huawei | minio
GRID_TF_STATE_BUCKET=mycompany-grid-tfstate
GRID_TF_STATE_REGION=cn-north-1
GRID_TF_S3_ENDPOINT=https://obs.cn-north-1.myhuaweicloud.com
GRID_TF_S3_FORCE_PATH_STYLE=true
```

Use the store’s access key / secret as AWS-style credentials (`AWS_ACCESS_KEY_ID` /
`AWS_SECRET_ACCESS_KEY`) or the vendor’s documented env vars.

### Alibaba OSS (`oss`) / Oracle (`oci`)

```bash
# Alibaba
GRID_TF_BACKEND=oss
GRID_TF_STATE_BUCKET=mycompany-grid-tfstate
GRID_TF_STATE_REGION=cn-hangzhou
GRID_TF_S3_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com

# Oracle
GRID_TF_BACKEND=oci
GRID_TF_STATE_BUCKET=mycompany-grid-tfstate
GRID_TF_OCI_NAMESPACE=<tenancy-namespace>
GRID_TF_STATE_REGION=us-ashburn-1
GRID_TF_S3_ENDPOINT=https://<namespace>.compat.objectstorage.us-ashburn-1.oraclecloud.com
```

## 2. Put the vars on the control plane

| Install path | Where |
|--------------|--------|
| Compose | `grid-core/install/.env` |
| VM (`install.sh`) | `/etc/grid/grid.env` |
| Dev | `grid-core/.env` |

Restart core (or recreate the Compose stack) after changing them. Core injects these into every CLI / Terraform child.

## 3. Then install / apply

Order that avoids pain:

1. **Create remote state** (this page)  
2. **Install Grid** on the VM ([VM](./vm.md) / [Compose](./docker-compose.md))  
3. Point GitOps at your desired-state  
4. Plan → apply releases  

Switching from `local` → remote later means a careful `terraform init -migrate-state` per unit — do it on day one instead.

## Lab exception

Leave `GRID_TF_BACKEND` unset (local) only when you accept losing state if the disk is wiped. Never use local for a shared team control plane.
