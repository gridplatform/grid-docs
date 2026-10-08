---
title: Development vs production
---

# Development vs production

The **env file name is the mode** — do not put `GRID_APP_ENV` / `VITE_GRID_APP_ENV` inside the file.

| Mode | Command | Env file |
|------|---------|----------|
| **Development** | `npm run dev` | **`.env.development` only** |
| **Production** | `npm start` / `npm run prod` / `npm run build` | **`.env` only** |

`npm run dev` / `npm start` set process `GRID_APP_ENV` (or Vite `--mode`) so the loader picks that one file. The two files are never merged.

If `.env.development` is missing while running `npm run dev`, core/cli log a one-line fallback warning and load `.env` so a single-file checkout still boots — prefer a real `.env.development` for local work.

Docker Compose is optional — not the default local workflow. On a VM, put settings in `.env` and run `npm start`.

## Packages

| Package | Dev | Prod |
|---------|-----|------|
| **grid-core** | `npm run dev` → `.env.development` | `npm start` → `.env` |
| **grid-cli** | `npm run dev` → `.env.development` | `npm start` → `.env` |
| **grid-ui** | `npm run dev` → `.env.development` | `npm run build` / `prod` → `.env` |

## Where generated Terraform lives

| Unit | Path |
|------|------|
| Normal units | `<GRID_CONFIG_ROOT>/archive/projects/<app>/<cloud>/<env>/<type>/<name>/` |
| Fallback only | `GRID_WORK_DIR/<infra-id>/generated/` |
