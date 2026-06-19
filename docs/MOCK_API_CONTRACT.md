# Mock API Contract Notes

This document describes the **mock API** that backs the pre-alpha and how it maps
to the **real API** to be built later (likely C#/.NET behind an authorization
layer). The frontend depends only on the typed `NavigatorApi` interface
(`src/types/api.ts`) — it does not care whether data comes from JSON today or a
real service tomorrow.

```
UI components / hooks
  → navigatorApi (NavigatorApi interface)   src/services/navigatorApi.ts
    → mockNavigatorApi                       src/services/mockNavigatorApi.ts
      → local JSON                           src/data/*.json
```

Every mock method is `async` with simulated latency (`src/services/latency.ts`)
and returns deep clones so callers can’t mutate fixtures. Structured logs are
emitted per call (`src/services/logger.ts`).

---

## JSON fixtures (`src/data/`)

| File | Represents | Future source |
|------|------------|---------------|
| `mockUser.json` | The authenticated principal: roles, permissions, allowed/locked modules, preferences, pinned ids | `GET /me` after SSO/SAML |
| `modules.json` | Module catalog (id, label, icon key, route key, group, visible, locked, required permission) | `GET /modules` (filtered by role) |
| `tree.configuration.json`<br>`tree.reporting.json`<br>`tree.processControl.json` | Backend-driven hierarchies per module | `GET /modules/{id}/tree` |
| `filterOptions.json` | Grouped filter options per module | `GET /modules/{id}/filters` |
| `pinnedObjects.json` | User-scoped pinned objects | `GET /users/{id}/pins` |
| `objectDetails.json` | Curated object detail payloads | `GET /objects/{id}` |
| `loadedContentRoutes.json` | Content-host routing per route key | `GET /objects/{id}/content-route` |

> Sample tree nodes and content are **examples** — dynamic, backend-driven data,
> not permanent product requirements.

---

## Mock endpoints (`NavigatorApi`)

| Function | Returns | Maps to (future) |
|----------|---------|------------------|
| `getCurrentUser()` | `CurrentUser` | `GET /me` |
| `getModulesForUser(userId)` | `ModuleDescriptor[]` — locked computed from permissions | `GET /modules` |
| `getTreeForModule(moduleId, filters?)` | `TreeNode[]` — pruned to the active filter union | `GET /modules/{id}/tree?filter=…` |
| `getFilterOptions(moduleId)` | `FilterGroup[]` | `GET /modules/{id}/filters` |
| `getPinnedObjects(userId)` | `PinnedObject[]` | `GET /users/{id}/pins` |
| `pinObject(userId, objectId)` | updated `PinnedObject[]` | `POST /users/{id}/pins` |
| `unpinObject(userId, objectId)` | updated `PinnedObject[]` | `DELETE /users/{id}/pins/{objectId}` |
| `getObjectDetails(objectId)` | `ObjectDetails \| null` (synthesized if uncurated) | `GET /objects/{id}` |
| `getLoadedContentRoute(objectId)` | `LoadedContentRoute` | `GET /objects/{id}/content-route` |
| `getActionAvailability(userId, objectId)` | actions + `enabled`/`reason` per permission | `GET /objects/{id}/actions` |

### Core model shapes (`src/types/navigator.ts`)

`TreeNode` — `id, label, type, hasChildren, children?, locked?, status?, tags?,
contentRoute?, requiredPermission?` (supports lazy children: `hasChildren` is
independent of whether `children` is populated).

`ObjectDetails` — `id, title, subtitle?, breadcrumb[], metadata[], metrics[],
activity[], contentRoute, accessLabel`.

`LoadedContentRoute` — `routeKey, viewKey, title, kind, description,
placeholderFields[]`.

---

## Security / permission model (mock)

- `mockUser.json` is **SUPER-USER** but deliberately **lacks** `object.archive`
  and `module.ncmr` to demonstrate gating:
  - NCMR renders **locked** in the rail.
  - **Archive** renders **disabled/locked** in the details blade.
- `getModulesForUser` and `getActionAvailability` resolve locked/disabled state
  from the user’s `permissions`. Components receive booleans and render gray +
  lock — they hold no access rules.

> ⚠️ UI permission checks are **convenience only**. The real API/authorization
> layer must re-check every request and filter tree nodes and actions per role
> and facility. Use **parameterized queries** in the backend — never concatenate
> SQL.

---

## Dynamic refresh

Pre-alpha simulates backend-driven updates via:

- a manual **Refresh** control in the hierarchy blade (`useNavigatorTree.refresh`),
- automatic re-fetch when the **module**, **filters**, **selection**, or
  **pinned** set change.

Production options (not built yet): polling, SignalR/WebSockets, server-sent
events, or a backend notification/event bus. The hook/service boundary is shaped
so any of these can be added without touching components.

---

## No secrets

No API keys, tokens, credentials, connection strings, or real URLs exist in this
repo. Login is a mock; `.env` is not required.
