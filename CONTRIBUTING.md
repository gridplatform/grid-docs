# Contributing to Grid Docs

Thank you for contributing documentation to Grid Platform.

## How to contribute

1. **Fork** [gridplatform/grid-docs](https://github.com/gridplatform/grid-docs)
2. Create a branch: `git checkout -b docs/your-topic`
3. Edit Markdown under `docs/` (and the root [README.md](README.md) if the landing TOC changes)
4. Preview on GitHub (or locally in any Markdown viewer). Optional: `npm install && npm start` if you use Docusaurus later
5. Open a **pull request** against `main`

Do not push directly to `main`.

## Where content goes

| Topic | Path |
|-------|------|
| Landing / org quick start | `README.md` |
| Install / VM / Compose / remote state | `docs/install/` |
| Org adoption | `docs/organizations.md` |
| Concepts | `docs/concepts/` |
| Admin / RBAC / approvals | `docs/admin/` |
| CLI guides | `docs/cli/` |

Install **scripts** belong in [grid-core/install](https://github.com/gridplatform/grid-core/tree/main/install) — link to them from these docs; do not duplicate shell scripts here.

## Style (GitHub-first)

- Use **relative links with `.md`** so GitHub navigates correctly (`./vm.md`, not `./vm`)
- Prefer short pages with tables and copy-pasteable commands
- Use blockquotes for callouts (`> **Tip:** …`) — avoid Docusaurus-only `:::tip` so pages render on GitHub
- Link product repos with absolute `https://github.com/gridplatform/…` URLs
- Call out lab vs production clearly (passwords, approval policies, public IPs)
- Optional YAML front matter (`title:`) is fine for a future docs site

## License

Contributions are under the MIT License (see [LICENSE](LICENSE)).
