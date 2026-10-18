# About Grid

Product documentation for [Grid Platform](https://github.com/gridplatform) — Git-backed intent, multi-cloud Terraform orchestration, Kubernetes workload GitOps (gated), console, CLI, and install.

**Site:** [https://gridplatform.org/doc/](https://gridplatform.org/doc/)  
**Source of truth:** Markdown under [`docs/`](docs/) (also readable on GitHub).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Naming

Folders and files follow the same convention as Deep-Dive docs:

- **Folders:** `Pascal-Case-With-Hyphens` (example: `Getting-Started`, `Platform-Ops` style)
- **Files:** `Title_With_Underscores.md` (no numeric prefixes)

## Read the manual

| Section | Start here |
|---------|------------|
| About Grid | [Home](docs/Home.md) · [Architecture](docs/Architecture/Control_Plane.md) |
| Getting-Started | [Quick_Start](docs/Getting-Started/Quick_Start.md) · [Your_Intent_Repository](docs/Getting-Started/Your_Intent_Repository.md) |
| Concepts | [Desired_State](docs/Concepts/Desired_State.md) · [Unit_JSON](docs/Concepts/Unit_JSON.md) · [GitOps_Sync](docs/Concepts/GitOps_Sync.md) |
| Clouds | One MD per provider, e.g. [AWS](docs/Clouds/AWS.md) · [GCP](docs/Clouds/GCP.md) |
| Console | [Overview](docs/Console/Overview.md) |
| Install | [Overview](docs/Install/Overview.md) · [Configuration](docs/Install/Configuration.md) |
| Roadmap | [Roadmap](docs/Roadmap.md) |

Install scripts live in **[grid-core/install](https://github.com/gridplatform/grid-core/tree/main/install)** — not in this repository.

### One-line install (Compose on Ubuntu)

```bash
export GRID_AUTH_ADMIN_PASSWORD='choose-a-strong-password'
curl -fsSL https://raw.githubusercontent.com/gridplatform/grid-core/main/install/install.sh | sudo -E bash
```

## Updating configuration tables

Env-var reference tables are **generated**:

1. Edit [`data/configuration.json`](data/configuration.json)
2. Run `npm run sync:config`
3. Commit JSON + `docs/Install/Configuration.md`

CI fails if the generated file is stale.

**Cloud catalog pages** under `docs/Clouds/` are plain Markdown — edit the provider MD file directly (no JSON).

## Local docs site

```bash
npm ci
npm start          # http://localhost:3000/doc/
npm run build
```

GitHub Pages is updated by `.github/workflows/deploy-pages.yml`: it publishes the Docusaurus `build/` to **`gh-pages`** and points the Pages source at that branch.

Site: **https://gridplatform.org/doc/**

If the site ever shows a plain README again, Pages was switched back to `main` — re-run **Deploy docs** or set **Settings → Pages → Branch: `gh-pages` / (root)**.

## Documentation map

```text
docs/
  Home.md
  Roadmap.md
  Architecture/
  Getting-Started/
  Concepts/
  Clouds/          # provider catalog (type/subtype) — one MD each
  Console/
  Admin/
  CLI/
  Install/         # how to install and run Grid
data/
  configuration.json
scripts/
  render-configuration.mjs
```

## Product repositories

| Repo | Role |
|------|------|
| [grid-core](https://github.com/gridplatform/grid-core) | API, GitOps, releases, install |
| [grid-ui](https://github.com/gridplatform/grid-ui) | Console |
| [grid-cli](https://github.com/gridplatform/grid-cli) | Generate / plan / apply |
| [grid-terraform](https://github.com/gridplatform/grid-terraform) | Module bank |
| [grid-config](https://github.com/gridplatform/grid-config) | Example desired-state tree only |

## License

MIT
