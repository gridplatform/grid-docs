---
sidebar_position: 1
slug: /
title: Grid Platform Docs
---

# Grid Platform Docs

Canonical documentation for **Grid** — open-source, self-hosted infrastructure orchestration.

**Primary reading surface:** GitHub ([grid-docs README](https://github.com/gridplatform/grid-docs#readme)). You do not need a docs website to install or operate Grid.

## Start here

| Goal | Page |
|------|------|
| Org adoption path | [Organizations](./organizations.md) |
| Create remote Terraform state (do this first) | [Remote state](./install/remote-state.md) |
| Run Grid on a fresh VM | [Install on a VM](./install/vm.md) |
| Run with Docker Compose | [Docker Compose](./install/docker-compose.md) |
| Environment variables & secrets | [Configuration](./install/configuration.md) |
| How desired-state / releases work | [Concepts](./concepts/overview.md) |
| Admin, environments, approvals | [Admin RBAC](./admin/rbac.md) |
| CLI on AWS / GCP | [CLI: AWS & GCP](./cli/aws-gcp.md) |

## Product repositories

| Repo | Role |
|------|------|
| [grid-core](https://github.com/gridplatform/grid-core) | API + install scripts / Compose |
| [grid-ui](https://github.com/gridplatform/grid-ui) | Console |
| [grid-cli](https://github.com/gridplatform/grid-cli) | Generate / plan / apply / destroy |
| [grid-config](https://github.com/gridplatform/grid-config) | Public sample desired-state |
| [grid-terraform](https://github.com/gridplatform/grid-terraform) | Module bank |

**Contributions:** fork → branch → pull request. Do not push straight to `main`.
