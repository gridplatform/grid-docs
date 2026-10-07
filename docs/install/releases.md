---
title: Releases
---

# Releases

Grid publishes versioned artifacts on GitHub and GitHub Container Registry (GHCR).

| Channel | Purpose | Git tag | Image tags |
|---------|---------|---------|------------|
| **Current** | Active development line | `vX.Y.Z` | `X.Y.Z`, `current` |
| **LTS** | Long-term support line | `vX.Y.Z-lts` | `X.Y.Z`, `lts`, `current` |

Images:

- `ghcr.io/gridplatform/grid-core`
- `ghcr.io/gridplatform/grid-ui`

Pin installs with an exact version (`GRID_VERSION=X.Y.Z`) or a channel (`GRID_RELEASE_CHANNEL=current` or `lts`).

## Versioning

Versions use semver: `MAJOR.MINOR.PATCH` (example: `0.1.0`).

| Part | Meaning |
|------|---------|
| **MAJOR** | Breaking change |
| **MINOR** | Backward-compatible feature |
| **PATCH** | Backward-compatible fix |

`0.x.y` means the public API and install surface may still change. `1.0.0` marks a stability commitment.

A platform release uses the **same** version on `grid-cli`, `grid-core`, and `grid-ui`. Set `package.json` `version` to that number before tagging.

Optional: tag `grid-docs` and `grid-terraform` with the same git tag.

## Publish a release

1. Merge workflows and version bumps to `main` on each repo.
2. Tag in order: **grid-cli → grid-ui → grid-core**.
3. Confirm the **Release** workflow succeeds in GitHub Actions.
4. Set new GHCR packages to **Public** under the organization Packages settings.

Current channel:

```bash
TAG=v0.1.0

cd grid-cli
git checkout main && git pull
git tag -a "$TAG" -m "$TAG"
git push origin "$TAG"

cd ../grid-ui
git checkout main && git pull
git tag -a "$TAG" -m "$TAG"
git push origin "$TAG"

cd ../grid-core
git checkout main && git pull
git tag -a "$TAG" -m "$TAG"
git push origin "$TAG"
```

LTS channel uses the same steps with `TAG=vX.Y.Z-lts`.

## Install a release

### Pre-built images

```bash
git clone https://github.com/gridplatform/grid-core.git
cd grid-core
cp install/.env.example install/.env
```

Set `GRID_AUTH_ADMIN_PASSWORD`, then pin:

```bash
GRID_RELEASE_CHANNEL=current
# GRID_VERSION=0.1.0
```

```bash
docker compose -f install/docker-compose.release.yml --env-file install/.env pull
docker compose -f install/docker-compose.release.yml --env-file install/.env up -d
bash install/verify.sh
```

### Build from source

```bash
git clone https://github.com/gridplatform/grid-core.git
cd grid-core
git checkout v0.1.0
cp install/.env.example install/.env
```

Set `GRID_AUTH_ADMIN_PASSWORD`. Optional sibling pins:

```bash
GRID_CLI_REF=v0.1.0
GRID_UI_REF=v0.1.0
```

```bash
docker compose -f install/docker-compose.yml --env-file install/.env up -d --build
bash install/verify.sh
```

## Support policy

| Channel | Policy |
|---------|--------|
| **Current** | Newest features; shorter support; may change between minors |
| **LTS** | Longer support; fixes and security backports; minimal breaking churn |

## Related

[Docker Compose](./docker-compose.md) · [Configuration](./configuration.md) · [VM install](./vm.md)
