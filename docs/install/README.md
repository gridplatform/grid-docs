# Install

Self-host Grid on a VM or with Docker Compose. Scripts live in **[grid-core/install](https://github.com/gridplatform/grid-core/tree/main/install)**.

| Guide | Description |
|-------|-------------|
| [overview.md](overview.md) | Choose Compose vs native; what gets installed |
| [remote-state.md](remote-state.md) | **Do this first** for any real / shared VM (S3 / GCS / Azure) |
| [vm.md](vm.md) | Ubuntu VM — Compose default, native optional |
| [docker-compose.md](docker-compose.md) | Compose-only path |
| [releases.md](releases.md) | Version channels, tags, and install pins |
| [configuration.md](configuration.md) | Env vars, auth, GitOps, `GRID_TF_*` |

**Typical org path:** [remote-state.md](remote-state.md) → [vm.md](vm.md) → [configuration.md](configuration.md) → [../admin/rbac.md](../admin/rbac.md).
