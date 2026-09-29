# Grid Docs

![Grid Banner](readme-assets/banner.png)

> Canonical documentation for **Grid Platform** — install, operate, and extend the infrastructure orchestration stack.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Docs site](https://img.shields.io/badge/docs-docs.gridplatform.org-4CAF50)](https://docs.gridplatform.org)

## Source of truth

All human-facing guides live in this repository under `docs/`. The same tree feeds the future Docusaurus site (`docs.gridplatform.org`).

```text
docs/
  intro.md                 # Landing
  install/
    overview.md            # Choose VM vs Compose vs source
    vm.md                  # Command list for a fresh VM
    docker-compose.md      # Compose-based install
    configuration.md       # Env vars & secrets
  concepts/
    overview.md
  admin/
    rbac.md                # Environments, groups, approvals
  cli/
    aws-gcp.md             # CLI generate → plan → apply
```

**Install scripts / Compose files** version with product code in [grid-core](https://github.com/gridplatform/grid-core) (`install/`). This repo documents how to use them.

The org [`.github`](https://github.com/gridplatform/.github) repo is for profile/branding only — not product docs.

## Local preview

```bash
git clone https://github.com/gridplatform/grid-docs.git
cd grid-docs
npm install
npm start
```

Open the URL printed by Docusaurus (usually `http://localhost:3000`).

```bash
npm run build    # production build → build/
npm run serve    # serve the build
```

## Contributing

Fork → branch → pull request against `main`. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

**Built with ❤️ by the Grid Platform team**
