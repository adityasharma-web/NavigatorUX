# Sentient Navigator — Pre-Alpha UX App

A working **React + TypeScript** implementation of the finalized Sentient Navigator
UX (the *Azure Resource Navigator* direction), built over a **mock API layer** so the
team can validate the frontend structure, component model, navigation behavior,
dynamic tree, role/security behavior, filtering, pinned objects, and content-host
routing — before a real backend exists.

> This is a **pre-alpha UX app**, not the production product. There is no real
> backend, authentication, database, or SPC/reporting logic. The point is to prove
> the finalized design can become a clean, API-ready React app and to help define
> what the real backend responses should look like.

The design source of truth is the Claude Design handoff in [`project/`](./project)
(`Sentient Navigator.dc.html` + `Sentient Navigator - Design Notes.dc.html`) and the
transcript in [`chats/`](./chats).

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check (tsc -b) + production build
npm run preview    # serve the production build
npm run typecheck  # tsc -b only
npm run test       # vitest (unit + integration)
```

Requires Node 18+ (developed on Node 22).

---

## What’s implemented

- **App shell** — compact 44px header, collapsible module rail, hierarchy blade,
  content host, right details/actions blade, AI drawer.
- **Header** — app launcher, rail toggle, theme-aware logo, current module label,
  Ask Sentient, notifications, appearance menu, profile menu.
- **Module rail** — primary modules + a bottom *Sentient Workspace* (Security /
  Admin / Settings / Help) menu. Visibility & locked state come from mock user
  permissions (NCMR renders locked).
- **Object hierarchy blade** — backend-driven recursive tree (expand/collapse,
  selection, status dots, locked & pinned indicators), `Filters` + collapse-to-strip
  controls. Re-queries the API on module/filter/pin changes.
- **Compact smart filter** — grouped, multi-select chip popover (Block/Site,
  Module, Collection, Area, Object Type, Status) with active pills + Clear/Apply.
  Filters the tree only and re-queries the API.
- **Pinned objects** — user-profile-scoped, collapsible, pin/unpin (also via
  right-click on a tree node), opens directly.
- **Content host** — full-width generic placeholder for the *would-be* loaded
  module (the selected object + route appear in the example line). The Navigator
  routes content; it never owns charts/tables/dashboards.
- **Details/actions blade** — opens from the header panel toggle; shows the object
  path, metadata, access/permission context, capability metrics, permission-aware
  actions (Archive is locked for this user) and recent activity. Closed by default
  so the content host is full-width (matches the approved screenshots).
- **AI button + panel** — placeholder “Ask Sentient” drawer with suggested prompts;
  no LLM calls. Clear extension point for future LLM/MCP/tools work.
- **Theme / scale / density** — Light/Dark, 100/125/150%, Compact/Comfortable.
  Persisted to `localStorage`.
- **Login concept** — SSO-first screen establishing the (mock) role/security
  context before the shell loads.
- **Role/security-aware UI** — locked modules, disabled actions, quiet SUPER-USER
  badge, facility-scoped access labels.

---

## Architecture

```
React UI components
  → service / API client layer      (src/services/navigatorApi.ts)
    → mock API layer                (src/services/mockNavigatorApi.ts)
      → local JSON fixtures         (src/data/*.json)
```

UI components and hooks depend only on the typed `NavigatorApi` **interface**
(`src/types/api.ts`) and never import JSON directly. To go live, implement a
`realNavigatorApi` against the same interface (e.g. a C#/.NET backend behind an
authorization layer) and swap one line in `navigatorApi.ts`:

```ts
export const navigatorApi: NavigatorApi = realNavigatorApi; // was mockNavigatorApi
```

Target production shape:

```
React UI → API client → Backend API → Authorization/security → Database/config
```

### Principles applied

- **Separation of concerns** — data access (services), data model (types),
  orchestration (hooks + context), rendering (components) are distinct layers.
- **Small, focused components** — recursive `TreeNode`, single-purpose
  `ActionButton`, `FilterChip`, `MetadataList`, etc. No monolithic component.
- **Typed everywhere** — API responses and props are typed interfaces (`src/types`).
- **No hardcoded tree/permission data in the UI** — modules, tree, filters,
  pinned, details, and action availability all come from the API.
- **Graceful errors & structured logging** — `ErrorBoundary` + `createLogger`.
- **Greenfield/permissive only** — React + Vite + Vitest. No paid/proprietary UI
  controls.

---

## Folder structure

```
src/
  app/            App.tsx, NavigatorContext.tsx, routes.ts
  components/
    common/       Icon, IconButton, Segmented, AiSparkleIcon, ErrorBoundary…
    auth/         LoginScreen
    shell/        NavigatorAppShell, HeaderBar, LogoMark, SidebarCollapseButton
    navigation/   ModuleNavRail, ModuleNavItem, SentientWorkspaceMenu,
                  AdminSystemMenu, AppLauncher
    hierarchy/    ObjectHierarchyBlade, NavigatorTree, TreeNode,
                  SmartTreeFilterButton, CompactFilterPopover, FilterChip,
                  PinnedObjects
    content/      ContentHost, LoadedContentPlaceholder, Breadcrumbs
    details/      DetailsActionsBlade, PermissionBadge, ActionButton,
                  ActivityList, MetadataList
    ai/           AIChatButton, AIChatPanel
    settings/     AppearanceMenu, ThemeToggle, ScaleSelector,
                  UserProfileMenu, NotificationButton
  services/       navigatorApi, mockNavigatorApi, authService,
                  userPreferencesService, logger, latency
  data/           *.json mock backend fixtures
  types/          navigator, user, permissions, api
  hooks/          useUserContext, useNavigatorTree, useSelectedObject,
                  usePinnedObjects, useTheme, useFilterOptions, useClickOutside
  styles/         tokens.css, global.css, common.css + feature stylesheets
```

See **[docs/MOCK_API_CONTRACT.md](./docs/MOCK_API_CONTRACT.md)** for the data
model, mock endpoints, and how they map to future real API endpoints.

---

## Theming

All color and structural values are CSS variables in `src/styles/tokens.css`
(`--accent`, `--bad`, `--border`, `--header-h`, …). Components reference tokens,
never raw colors. Dark is the primary target (true-black, GitHub/Azure tone);
Light mirrors it. Palette discipline: **blue = selection/active, gray =
locked/disabled, green/red/yellow = healthy/violation/warning only.**

---

## Current limitations

- Mock data & simulated latency only — no real backend, DB, or auth.
- Content host renders **placeholders**, not real SPC charts / reports / tables.
- AI panel is inert (no LLM).
- “Dynamic refresh” is demonstrated by re-fetching the tree from the API on
  module/filter/pin changes (and details on selection) — no polling/WebSocket yet.
- Pinned state is in-memory in the mock API (resets on full reload, since the
  mock seeds from JSON each session).

## Assumptions

- **Stack & scope** were confirmed as React + Vite + TypeScript, Navigator app
  only (the companion Design-Notes doc was out of scope for this pass).
- **Palette:** the finalized mock’s CSS had drifted to near-monochrome (white
  accent in dark / dark accent in light), which contradicts the written direction
  in both briefs (“blue for selected/active, gray for locked, restrained status
  colors”). All structural/dimensional values are ported 1:1 from the mock, but a
  disciplined **blue accent + green/red/yellow status** palette is applied per the
  written spec.
- The right **details/actions blade** is reinstated (required by the design doc
  §6.8 but not shown in the screenshots): it is closed by default — keeping the
  content host full-width as in every screenshot — and toggled from the header.
  The selected-object **breadcrumb/path** lives in that blade.
- Scale is implemented with the CSS `zoom` property (as in the source mock); it
  adjusts overall density/size and is compensated so the layout still fills the
  viewport.

## Future backend integration notes

1. Implement `realNavigatorApi` against `NavigatorApi` (`src/types/api.ts`).
2. Move authorization server-side — the UI’s permission checks are convenience
   only; the API must re-check every request and filter tree/actions per role &
   facility. Use parameterized queries (never string-concatenated SQL).
3. Replace manual refresh with real updates (polling → SignalR/WebSockets/SSE).
4. Replace the AI placeholder with an LLM/MCP/tools integration at the
   `AIChatPanel` boundary (selected-path/object context is already available).
5. Provide real content modules for the content host (iframe / app route /
   embedded component — see open question #3 in the Design Notes).
