# Contributing to Grid Docs

Thank you for contributing documentation to Grid Platform.

## How to contribute

1. **Fork** [gridplatform/grid-docs](https://github.com/gridplatform/grid-docs)
2. Create a branch: `git checkout -b docs/your-topic`
3. Edit Markdown under `docs/`
4. Preview: `npm install && npm start`
5. Open a **pull request** against `main`

Do not push directly to `main`. Branch protection + review is the open-source path.

## Where content goes

| Topic | Path |
|-------|------|
| Install / VM / Compose | `docs/install/` |
| Concepts | `docs/concepts/` |
| Admin / RBAC / approvals | `docs/admin/` |
| CLI guides | `docs/cli/` |

Install **scripts** belong in [grid-core/install](https://github.com/gridplatform/grid-core/tree/main/install) — link to them from these docs; do not duplicate shell scripts here.

## Style

- Prefer short pages with tables and copy-pasteable commands
- Link to GitHub repos with absolute URLs
- Call out lab vs production clearly (passwords, `GRID_AUTO_APPROVE`, public IPs)
- Keep Docusaurus front matter (`title`) accurate for the sidebar

## License

Contributions are under the MIT License (see [LICENSE](LICENSE)).
