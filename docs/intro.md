---
sidebar_position: 1
slug: /
title: Grid Platform Docs
---

# Grid Platform Docs

Canonical documentation for **Grid** — the open-source infrastructure orchestration platform.

This repository (`grid-docs`) is the single source of truth for human-facing guides. The same Markdown tree powers local browsing today and the future site at [docs.gridplatform.org](https://docs.gridplatform.org).

## Start here

| Goal | Page |
|------|------|
| Create remote Terraform state (do this first) | [Remote state](./install/remote-state) |
| Run Grid on a fresh VM | [Install on a VM](./install/vm) |
| Run with Docker Compose | [Docker Compose](./install/docker-compose) |
| Environment variables & secrets | [Configuration](./install/configuration) |
| How desired-state / releases work | [Concepts](./concepts/overview) |
| Admin, environments, approvals | [Admin RBAC](./admin/rbac) |
| CLI on AWS / GCP | [CLI: AWS & GCP](./cli/aws-gcp) |

## Product repositories

| Repo | Role |
|------|------|
| [grid-core](https://github.com/gridplatform/grid-core) | API + install scripts / Compose |
| [grid-ui](https://github.com/gridplatform/grid-ui) | Console |
| [grid-cli](https://github.com/gridplatform/grid-cli) | Generate / plan / apply / destroy |
| [grid-config](https://github.com/gridplatform/grid-config) | Public sample desired-state |
| [grid-terraform](https://github.com/gridplatform/grid-terraform) | Module bank |

**Contributions:** fork → branch → pull request. Do not push straight to `main`.
