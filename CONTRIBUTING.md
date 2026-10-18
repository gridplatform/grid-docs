# Contributing to Grid Docs

Thank you for improving Grid’s documentation.

## How to contribute

1. Fork [gridplatform/grid-docs](https://github.com/gridplatform/grid-docs)
2. Branch: `git checkout -b docs/your-topic`
3. Edit Markdown under `docs/`
4. Env vars → edit `data/configuration.json` then `npm run sync:config`
5. Preview: `npm ci && npm start`
6. PR against `main`

## Naming convention

Match Deep-Dive style (no numeric prefixes required):

| Kind | Pattern | Examples |
|------|---------|----------|
| Folder | `Pascal-Case-With-Hyphens` | `Getting-Started`, `Concepts`, `Install` |
| File | `Title_With_Underscores.md` | `Desired_State.md`, `Archive_And_Remote_State.md` |

## Where content goes

| Topic | Path |
|-------|------|
| About Grid | `docs/Home.md`, `docs/Architecture/` |
| Onboarding | `docs/Getting-Started/` |
| Desired state / sync / releases | `docs/Concepts/` |
| Which clouds / catalog type·subtype | `docs/Clouds/` — one MD per provider |
| How to install and run Grid | `docs/Install/` |
| Console | `docs/Console/` |
| RBAC | `docs/Admin/` |
| CLI | `docs/CLI/` |
| Upcoming work | `docs/Roadmap.md` |
| Env-var SoT | `data/configuration.json` |

**Add a cloud to the catalog docs:** create `docs/Clouds/<Provider>.md` with a type/subtype table (`supported` or `planned`), and add the doc id to `sidebars.ts`.

Do not duplicate install shell scripts here — link to [grid-core/install](https://github.com/gridplatform/grid-core/tree/main/install).

## Style

- Deep and accurate over short marketing blurbs
- Catalog support lives under **Clouds**; install / credentials / backends live under **Install**
- Prefer tables and copy-pasteable commands
- Use blockquotes for callouts so GitHub stays readable
- Absolute GitHub URLs for other repos
- Never document secrets; use placeholders

## License

MIT — same as the Grid Platform repositories.
