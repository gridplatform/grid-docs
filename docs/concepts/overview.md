---
title: Concepts overview
---

# Concepts overview

Short map of how Grid pieces fit together. Deep dives live under Admin and CLI.

## Desired state

Infrastructure is declared as **path-shaped JSON** units, typically:

```text
projects/<project-slug>/<cloud>/<environment>/<type>/<name>.json
```

Public samples: [grid-config](https://github.com/gridplatform/grid-config). Ownership and layout rules are documented in that repo’s README.

`metadata.dependsOn` is **reference-only** (e.g. VM → VPC via `terraform_remote_state`). Dependent units are **not** merged into the same Terraform root.

## Control plane

| Piece | Role |
|-------|------|
| **grid-ui** | Console: projects, deployments, releases, admin |
| **grid-core** | API, auth, GitOps pull, enqueue releases, spawn CLI + Terraform |
| **grid-cli** | `generate` / `plan` / `deploy` / `destroy` from unit JSON |
| **grid-terraform** | Module bank consumed by generate |

## Releases

Plan, apply, destroy (and custom) run as **releases** with live logs and audit. Infra Plan/Apply/Destroy from the console go through the same release path so history stays consistent.

## Environments

Canonical environments: `development`, `staging`, `production`. See [Admin RBAC](../admin/rbac.md) for groups, approvals, and how the website scopes writes.

## Bifurcation reminder

- **Network / VPC** units own networks (and folded subnets).  
- **Compute / VM** units reference VPC outputs; they do not own the VPC stack.
