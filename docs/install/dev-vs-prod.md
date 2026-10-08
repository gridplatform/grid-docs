---
title: Development vs production
---

# Development vs production

The **env file name is the mode** — do not put `GRID_APP_ENV` inside the file.

| Mode | Command | Env file |
|------|---------|----------|
| **Development** | `npm run dev` | **`.env.development` only** |
| **Production** | `npm start` / `npm run prod` / `npm run build` | **`.env` only** |

The two files are never mixed. There is **no override flag** for production.

## Who owns the hard production gate?

| Package | Hard gate? | Notes |
|---------|------------|--------|
| **grid-core** | **Yes** | API boot refuses incomplete production `.env` / injected env |
| **grid-ui** | **Yes** | `npm run build` / `prod` requires `.env` + `VITE_GRID_API_URL` |
| **install / Compose** | **Yes** | `check-env.sh` + `compose-up.sh`; Compose is **production-only** |
| **grid-cli** | **No** | Add-on: Core validates then injects env via `cliChildEnv()`. `npm run build` is compile-only. Generate still errors if remote state vars are incomplete. |

Local / laptop: **`npm run dev`** + `.env.development`.

Released module bank: `https://github.com/gridplatform/grid-terraform.git` @ **`v0.1.0`**.

See [remote-state.md](./remote-state.md).

## Compose (production only)

```bash
cp install/.env.example install/.env   # fill every required value
bash install/compose-up.sh             # check-env.sh then docker compose up
bash install/compose-up.sh release     # GHCR images
```

No development Compose profile and no skip flags.

## Where generated Terraform lives

| Unit | Path |
|------|------|
| Normal units | `<GRID_CONFIG_ROOT>/archive/projects/<app>/<cloud>/<env>/<type>/<name>/` |
| Fallback only | `GRID_WORK_DIR/<infra-id>/generated/` |
