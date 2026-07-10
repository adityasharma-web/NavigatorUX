# Sentient Navigator — Project Plan

**Project:** Sentient Navigator Reimagination
**Current stage:** Pre-Alpha UX App complete (Phase 1)
**Purpose:** Phased roadmap from the delivered pre-alpha UX shell through to a
production, API-backed, security-enforced Navigator.

> Sizes are relative complexity (S/M/L), **not** committed timelines — real dates
> depend on team size and the decisions made in Phase 2.

---

## Phase overview

| Phase | Name | Status | Size | Depends on |
|:-----:|------|:------:|:----:|:----------:|
| 0 | Design Spike | ✅ Done | — | — |
| 1 | Pre-Alpha UX App | ✅ Done | — | 0 |
| 2 | Review & API Contract Finalization | ▶ Next | S | 1 |
| 3 | Backend API Layer (.NET) | Planned | L | 2 |
| 4 | Authorization & Security Layer | Planned | M | 2 |
| 5 | Frontend ↔ Real API Integration | Planned | M | 3, 4 |
| 6 | Content Host Integration | Planned | M–L | 2, 5 |
| 7 | Dynamic / Real-time Updates | Planned | M | 5 |
| 8 | Sentient AI (separate story) | Optional | L | 5 |
| 9 | Hardening & Production Readiness | Planned | M | 5, 6 |

**Parallelization:** Phases 3 and 4 can largely run in parallel. Phase 5 is small
because Phase 1 already built the swap-ready API seam.

```
0 ─ 1 ─ 2 ─┬─ 3 ─┐
           └─ 4 ─┴─ 5 ─┬─ 6 ─┐
                       ├─ 7 ──┼─ 9
                       └─ 8 ──┘
```

---

## Phase 0 — Design Spike ✅ Done
Finalized the Azure-style Navigator direction plus the handoff document and
approved screenshots.

- **Deliverable:** approved UX design (`Sentient_Navigator_Final_UX_Design_1.docx`).

---

## Phase 1 — Pre-Alpha UX App ✅ Done *(current deliverable)*
A working React implementation of the finalized design over a mock API layer.

- **Stack:** React 18, TypeScript, Vite, plain CSS (design tokens), Vitest.
- **Delivered:** app shell, compact header, module rail, backend-driven object
  tree (expand/collapse, selection, status, locked & pinned states), compact
  smart filter, pinned objects, content host, right details/actions blade,
  "Ask Sentient" AI placeholder, light/dark + scale + density, login concept,
  security-aware UI states.
- **Architecture:** `React components → hooks → navigatorApi (interface) →
  mockNavigatorApi → local JSON`. No direct DB access; no hardcoded tree/permissions.
- **Quality:** typed interfaces, structured logging, error boundary, 9 passing tests.
- **Exit criteria (met):** runs locally, matches the approved screenshots, tests green.

---

## Phase 2 — Review & API Contract Finalization ▶ Next
Low effort, high leverage — mostly decisions. Review the pre-alpha with Abeer and
lock the backend contract derived from the mock API.

**Resolve the five open confirmations (from the design doc):**
1. **Content loading approach** — iframe, route, or embedded module?
2. **Tree data source** — current DB/config source for the Navigator tree.
3. **Security model** — how module/tree/action permissions are represented today.
4. **Pinned-objects persistence** — where user pins are stored long-term.
5. **AI panel scope** — remains a placeholder or becomes a separate story.

- **Deliverable:** signed-off API contract (`docs/MOCK_API_CONTRACT.md` promoted to
  the real contract) + decisions log.
- **Exit criteria:** all five confirmations answered; downstream phases unblocked.

---

## Phase 3 — Backend API Layer (C#/.NET) — L
Implement the real service behind the `NavigatorApi` contract.

- Implement the 10 endpoints (get user, modules, tree, filters, pins ×3, details,
  content route, action availability) against the real DB/config source.
- Use **parameterized queries** throughout — no string-concatenated SQL.
- Define response DTOs matching the mock shapes so the frontend is unchanged.
- **Exit criteria:** endpoints return live data conforming to the documented contract.

---

## Phase 4 — Authorization & Security Layer — M *(parallel with Phase 3)*
"Security after login, not only at login."

- Real authentication (SSO/SAML).
- **Server-side** enforcement of module / tree-node / action / facility permissions.
- Role model (e.g. SUPER-USER, Engineer, Operator, Viewer).
- **Exit criteria:** every request re-checks permissions server-side; UI locked/
  disabled states reflect real roles.

---

## Phase 5 — Frontend ↔ Real API Integration — M
Go live on real data.

- Swap `mockNavigatorApi → realNavigatorApi` (one line in `navigatorApi.ts`).
- Harden real loading / error / empty states and real network latency.
- Wire real pinned-object persistence.
- **Exit criteria:** the existing UI runs entirely on live backend data with no
  component/hook changes.

---

## Phase 6 — Content Host Integration — M–L
Make the content host load real module views.

- Implement the chosen content-loading method (Phase 2 decision).
- Wire real module views (SPC, reporting, records, configuration) into the host.
- Navigator routes; each module owns its own view.
- **Exit criteria:** selecting an object loads its real module content.

---

## Phase 7 — Dynamic / Real-time Updates — M
Replace mock refresh with live updates.

- Polling first, then SignalR / WebSockets / SSE for status changes & violations.
- The hook/service seam already anticipates this.
- **Exit criteria:** tree/status update from backend events without manual refresh.

---

## Phase 8 — Sentient AI — L *(optional, separate story)*
Only if Phase 2 promotes it from placeholder.

- Real LLM / MCP / tools integration at the existing `AIChatPanel` boundary.
- Object-aware assistant using the selected path/context.
- No secrets or external keys committed to the frontend.

---

## Phase 9 — Hardening & Production Readiness — M
- Accessibility audit (keyboard, ARIA, contrast).
- Large-tree performance (virtualization).
- Cross-browser QA; end-to-end tests.
- CI/CD, structured-logging sink, security review.
- Deployment + monitoring.
- **Exit criteria:** production-grade and deployable.

---

## How to frame it
- **Phases 0–1 are done** — de-risks the effort; the design is proven buildable and
  the frontend seam is ready.
- **Phase 2 is the immediate ask** — a review plus five decisions; low cost.
- **Phases 3–4 are the real investment** (backend + security) and can run in parallel.
- **Phase 5 is deliberately small** — clean architecture makes "go live" a one-line
  swap plus hardening.

---

## Related documents
- `README.md` — how to run, architecture, assumptions, limitations.
- `docs/MOCK_API_CONTRACT.md` — mock endpoints and how they map to real API endpoints.
