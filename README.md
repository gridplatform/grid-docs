# Grid Docs

![Grid Banner](readme-assets/banner.png)

> **Read these docs on GitHub.** This repo is Markdown-first so organizations can browse, fork, and PR without a separate website. The same `docs/` tree can power a future docs site later.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Start here (organizations)

| Step | Guide |
|------|--------|
| 0. Org adoption overview | [docs/organizations.md](docs/organizations.md) |
| 1. Create remote Terraform state (S3 / GCS / Azure) | [docs/install/remote-state.md](docs/install/remote-state.md) |
| 2. Install Grid (Compose on a VM — default) | [docs/install/vm.md](docs/install/vm.md) · [docs/install/docker-compose.md](docs/install/docker-compose.md) |
| 3. Configure env / auth / GitOps | [docs/install/configuration.md](docs/install/configuration.md) |
| 4. Org model (envs, groups, approvals) | [docs/admin/rbac.md](docs/admin/rbac.md) |
| 5. Concepts (desired-state, releases, dependsOn) | [docs/concepts/overview.md](docs/concepts/overview.md) |
| 6. CLI path (AWS / GCP) | [docs/cli/aws-gcp.md](docs/cli/aws-gcp.md) |

**Install scripts & Dockerfiles** live with the product: [grid-core/install](https://github.com/gridplatform/grid-core/tree/main/install) (not in this repo).

### One-line install (Compose on Ubuntu)

```bash
export GRID_AUTH_ADMIN_PASSWORD='choose-a-strong-password'
curl -fsSL https://raw.githubusercontent.com/gridplatform/grid-core/main/install/install.sh | sudo -E bash
```

Then open `http://<host>/`. Full path: [docs/install/overview.md](docs/install/overview.md).

## Documentation map

```text
docs/
  README.md
  intro.md
  organizations.md         ← org adoption
  install/
    README.md
    overview.md
    remote-state.md
    vm.md
    docker-compose.md
    configuration.md
  concepts/overview.md
  admin/rbac.md
  cli/aws-gcp.md
```

Browse folders on GitHub — every link uses a `.md` path so it opens correctly in the GitHub UI.

## Product repositories

| Repo | Role |
|------|------|
| [grid-core](https://github.com/gridplatform/grid-core) | API + `install/` (Compose, `install.sh`, Dockerfiles) |
| [grid-ui](https://github.com/gridplatform/grid-ui) | Console |
| [grid-cli](https://github.com/gridplatform/grid-cli) | Generate / plan / apply / destroy |
| [grid-config](https://github.com/gridplatform/grid-config) | Sample desired-state (GitOps) |
| [grid-terraform](https://github.com/gridplatform/grid-terraform) | Module bank |

## GitHub-first, website-later

- **Today:** read and contribute via GitHub (this README + `docs/**/*.md`).
- **Later:** optional Docusaurus (`npm start` / `npm run build`) using the same files — config is kept under the hood; you do **not** need to deploy a docs site to use Grid.
- Org profile [`.github`](https://github.com/gridplatform/.github) is branding only — not product docs.

## Contributing

Fork → branch → pull request against `main`. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

**Built with ❤️ by the Grid Platform team**
