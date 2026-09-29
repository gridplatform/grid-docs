---
title: Admin, environments & approvals
---

# Grid Admin, Environments & Approvals

Product design for the Grid website (console) — the contract for UI + API work. The CLI is environment-agnostic: it deploys whatever path-shaped unit JSON you hand it with local cloud credentials.

## Goals

1. Every deployment belongs to exactly one **environment**.
2. Access to environments is granted through **groups**, not ad-hoc per-user flags.
3. Groups carry **read** and/or **write** permissions per environment.
4. **Write** actions (plan apply, destroy, GitOps sync-apply) can require an **approval** before they run.
5. A **root user** is created at Grid setup time and owns the Admin Center.

---

## Environments

Grid’s primary bifurcation matches how teams already think about cloud. There are **three** canonical environments:

| Environment   | Typical use                         | Default write posture                          |
|---------------|-------------------------------------|------------------------------------------------|
| `development` | Day-to-day engineering              | Self-approve or light approval                 |
| `staging`     | Pre-prod validation                 | Require approval from env owners / leads       |
| `production`  | Customer-facing / revenue systems   | Require approval; tighter read/write defaults  |

Experiments and throwaways are **ephemeral clones** of a canonical env (e.g. `grid env clone development --name try-x --ttl 24h`), not a fourth environment. Clones live under `.ephemeral/<env>--<name>/` with isolated names and a TTL.

Selecting **Staging** in the UI and clicking deploy must create a deployment **in staging only** — same infra name in another env is a different resource identity (e.g. `staging/demo-vpc` ≠ `production/demo-vpc`).

### Identity rule

```
organization → environment → infrastructure (desired-state JSON) → deployment / workspace
```

Desired state is **path-shaped**: `<cloud>/<environment>/<infra-type>/<name>.json` (or under `projects/<slug>/…`). `metadata.environment` on each unit must match the path env the UI/API binds the write to. Mismatch = reject.

---

## Bootstrap: root user

When an organization first creates a Grid setup:

1. Exactly one **root user** is provisioned (the creator / bootstrap identity).
2. Root is permanently in the built-in **`admins`** group.
3. Root can:
   - open **Admin Center**
   - create users and groups
   - map users → groups
   - grant group → environment → `{read, write}`
   - configure approval policies per environment
4. Root cannot be removed from `admins` while they are the last admin (safety rail).

SSO / SAML mappings can also place people into groups; root remains the break-glass path.

---

## Admin Center (website)

Admin-only surface. The model below is what Admin Center pages bind to.

### Users

- Create / invite users (email, status: Active | Pending | Disabled).
- Assign each user to one or more **groups**.
- Optional: login methods (password, Google, SAML) — orthogonal to RBAC.

### Groups

Groups are the permission carriers. Examples:

| Group             | Example intent                                      |
|-------------------|-----------------------------------------------------|
| `admins`          | Full Admin Center + all envs read/write             |
| `developers`      | Full-time eng: read/write on development/staging; read (or read/write) on production per org policy |
| `intern-hire`     | Development only (use ephemeral clones for throwaways) |
| `infra-ops`       | Staging + production with write; may be approvers   |
| `readonly-auditors` | Read across envs, never write                     |

Admins can create arbitrary groups; built-ins above are defaults, not a closed set.

### Group → environment permissions

For each group × environment pair, set:

| Capability | Meaning |
|------------|---------|
| **none**   | Env hidden in UI; API returns 403 |
| **read**   | List infra, view JSON, view plans/logs, see drift — no apply/destroy |
| **write**  | Implies read + request plan/apply/destroy (subject to approval) |

A user with membership in multiple groups gets the **union** of permissions (most permissive wins per env). Ephemeral clone access follows the **base** environment’s ACL.

### Example mapping

| Group         | development | staging | production |
|---------------|-------------|---------|------------|
| `intern-hire` | write       | none    | none       |
| `developers`  | write       | write   | read+write*|
| `infra-ops`   | read        | write   | write      |
| `admins`      | write       | write   | write      |

\*Org policy may force production write through approval even for `developers`.

---

## Authentication vs authorization

| Layer | Responsibility |
|-------|----------------|
| **AuthN** | Who is this principal? (session, API key, SSO) |
| **AuthZ** | Given groups + env + action, allow or deny |

Read-only means AuthZ denies write verbs even if AuthN succeeds. Enforcement must live in **grid-core** (not only UI hiding buttons): every plan/apply/destroy/sync endpoint checks env ACL.

Suggested verbs:

- `infrastructure:read`
- `infrastructure:write`
- `deployment:plan`
- `deployment:apply`
- `deployment:destroy`
- `approval:decide`
- `admin:users`
- `admin:groups`
- `admin:policies`

---

## Approval flow

### When required

Per-environment (and optionally per-action) policy, e.g.:

| Environment   | Apply / destroy        |
|---------------|------------------------|
| development   | auto (optional)        |
| staging       | 1 approval from `infra-ops` or `admins` |
| production    | 1–2 approvals; requester cannot self-approve |

Ephemeral clones inherit the base env’s approval posture unless org policy tightens them.

### Lifecycle

```
request write → pending_approval → (approved → execute) | (rejected → no-op) | (expired → no-op)
```

- No approval → **no cloud change**. Desired-state JSON may still be saved as a draft.
- Approvers are users whose groups include `approval:decide` for that environment.
- Audit log records requester, approver(s), env, infra id, action, timestamps.

### UI / CLI note

- **Website**: click-to-deploy in staging enters the approval queue when policy says so.
- **CLI**: bypasses Grid AuthZ by design (local creds). Org policy for “CLI to prod” (OIDC-bound runners, etc.) is out of scope for v1 Admin Center.

---

## Wiring checklist (UI → backend)

1. Persist org bootstrap + root user id at setup.
2. CRUD APIs: users, groups, memberships, env ACLs, approval policies.
3. Middleware on lifecycle routes: resolve user → groups → env ACL → allow/deny; if write + approval required → create approval request instead of applying.
4. Admin Center pages bind to those APIs (replace mock data).
5. Environment selector in Deployments / Infrastructure scopes list + create to the selected env.
6. Feature flags stay UI-only; they never replace AuthZ.

---

## Relation to demos & CLI

| Asset | Role |
|-------|------|
| [grid-config](https://github.com/gridplatform/grid-config) / demo fixtures | Sample unit JSON (`<cloud>/<env>/<type>/<name>.json`), three envs |
| `grid-cli` | Generate / plan / deploy / destroy for AWS & GCP with cloud credentials; `grid env clone` for ephemeral copies |
| `grid-core` + `grid-ui` | Enforce this model on website lifecycle routes |

Until Admin Center enforces ACLs, treat environment path segments in desired-state JSON as **intent labels**, not enforced policy.
