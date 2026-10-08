---
title: Remote Terraform state
---

# Remote Terraform state

**Before you apply real infrastructure from a Grid VM (or Compose host), create a remote state backend.**  
Local `terraform.tfstate` on the VM disk is fine for a laptop lab; it is **not** safe for shared / replaceable VMs — if the VM dies, you lose the map of what Terraform manages.

Grid generates `backend.tf` and `terraform_remote_state` for `dependsOn` from the same settings. Configure them once on the control plane (`.env` / systemd / Compose).

## Supported backends

| `GRID_TF_BACKEND` | Cloud object store | Locking |
|-------------------|--------------------|---------|
| `s3` | AWS S3 | DynamoDB table (`GRID_TF_LOCK_TABLE`) |
| `gcs` | GCP Cloud Storage | GCS native |
| `azurerm` | Azure Blob | Azure blob leases |
| `local` | VM disk | none — **development only** (`npm run dev`). Production / install refuse local state |

State object key / prefix is **per unit** (path-shaped), e.g.:

```text
grid/projects/grid-labs/aws/development/vpc/my-vpc/terraform.tfstate
```

So a VM unit can read VPC outputs via `terraform_remote_state` even when both stacks live in remote state.

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
