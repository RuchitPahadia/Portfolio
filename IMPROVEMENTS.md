# Improvement Action Plan

Prioritized backlog for **Presonal_Dashboard**, from a full read of the codebase. Each item lists the
problem, evidence, the fix, impact, and rough effort. Priorities: **P0** = quick correctness/hygiene wins,
**P1** = dead code & content drift, **P2** = robustness/polish that touches the customized Next.js internals.

> ⚠️ Before any framework-level code change, read the relevant guide in `node_modules/next/dist/docs/`
> (`AGENTS.md`: this is not stock Next.js 16).

---

## P0 — correctness / hygiene

### 0.1 Commit the untracked feature pair
- **Problem:** `app/api/git-commit/route.ts` (new, untracked) and `components/dashboard/CommsPanel.tsx`
  (modified) are a matched unit — CommsPanel was rewired from calling GitHub directly in the browser to
  calling this new server route. They're currently uncommitted.
- **Fix:** Review the diff and commit both together.
- **Impact:** Prevents losing the change / a half-committed state. **Effort:** trivial.

### 0.2 Centralize the site URL — ✅ DONE
- **Problem:** `https://ruchit-pahadia-dashboard.vercel.app` is hardcoded in three files:
  `app/layout.tsx` (`metadataBase` + OpenGraph), `app/sitemap.ts`, `app/robots.ts`. Changing domains means
  editing three places.
- **Fix:** Introduce `NEXT_PUBLIC_SITE_URL` and read it in all three (with the current value as fallback).
- **Done:** Added `data/site.ts` exporting `siteUrl` (`process.env.NEXT_PUBLIC_SITE_URL ?? <prod URL>`); all
  three files now import it. Single source of truth for both the env read and the fallback.
- **Impact:** Single source of truth; safe domain changes. **Effort:** small.

### 0.3 Add `.env.example` — ✅ DONE
- **Problem:** No `.env.example` exists. The app silently expects `GITHUB_TOKEN` (optional — raises GitHub's
  60 req/hr unauthenticated limit) and, after 0.2, `NEXT_PUBLIC_SITE_URL`. Easy to miss when deploying.
- **Fix:** Add `.env.example` documenting both vars by name (no secrets), with comments.
- **Done:** Added `.env.example` (documents both vars) and a `!.env.example` negation in `.gitignore` so it
  can be committed despite the `.env*` ignore rule.
- **Impact:** Deployment clarity. **Effort:** trivial.

---

## P1 — dead code & content drift

### 1.1 Remove or archive the legacy component set — ✅ DONE (deleted)
- **Problem:** Two generations of components shipped in the repo. Only `components/dashboard/*` (+ `ThemeProvider`)
  was rendered. Unused: 11 top-level components (`Navbar`, `Hero`, `About`, `Skills`, `Experience`,
  `Education`, `Projects`, `GithubSection`, `Contact`, `Footer`, `ResumeModal`) and `dashboard/SignalPanel.tsx`
  (superseded by the split panels). `data/hero.ts` + `data/about.ts` were consumed only by those dead components.
- **Done:** Verified no live imports (grep across `**/*.{ts,tsx}` — the only references were among the dead
  files themselves), then deleted all 14 files. Git retains history for recovery.
- **Impact:** Smaller surface, less confusion, faster onboarding. **Effort:** small.

### 1.2 Kill hardcoded content that duplicates `data/` — ✅ DONE
- **Problem:** Content drift risk. `TerminalPanel.tsx` hardcoded the skills list instead of importing
  `data/skills.ts`; `CommandPalette.tsx` hardcoded the contact email + GitHub/LinkedIn/LeetCode URLs instead
  of `data/contact.ts`. Editing `data/` wouldn't update these.
- **Done:** `TerminalPanel` now builds `get skills` output from `skillCategories`; `CommandPalette`'s email +
  social actions now read from `contactData`.
- **Impact:** One source of truth for content. **Effort:** small.

---

## P2 — robustness / polish (review `next/dist/docs` first)

### 2.1 Rethink the commit-cache strategy
- **Problem:** `route.ts` uses a module-level in-memory cache (5-min TTL). On Vercel this is per-serverless-
  instance, so it isn't shared across lambdas — real GitHub call volume can exceed the "~12/hr" assumption in
  the code comment, and freshness is inconsistent between instances.
- **Fix:** Evaluate Next.js data-cache / `revalidate` (or `unstable_cache`) — **confirm the exact API in the
  customized docs before changing.** Combined with the client's 5-min poll, a route-level revalidate is likely
  enough and removes the manual cache.
- **Impact:** Predictable freshness, fewer upstream calls. **Effort:** medium.

### 2.2 Surface live-vs-stale data to the user — ✅ DONE
- **Problem:** `route.ts` returned `source: "live"` even on upstream failure (serving stale/seed), and the
  client ignored the `source` field entirely, so the UI couldn't tell the user the data was stale.
- **Done:**
  - `route.ts` now tracks a `fetchedLive` flag: `source` is `"cache"` (within the 5-min TTL), `"live"` (just
    refreshed from GitHub), or `"stale"` (upstream call failed — serving previous cache/seed). No longer
    mislabels a failed fetch as live.
  - `CommsPanel` reads `source` and renders a status badge in the `GIT_LOGS_TELEMETRY` header — a colored dot +
    label: **SYNC** (initial load), **LIVE** (teal, pulsing), **CACHED** (amber), **STALE** (red) when the
    route is unreachable. Stale keeps showing the last known commit rather than blanking.
- **Impact:** Honest telemetry that fits the dashboard theme. **Effort:** small.
- **Note:** This is UX + a plain response-field fix; it does **not** touch Next.js caching APIs (that's 2.1).

### 2.3 Add a minimal test setup
- **Problem:** No test runner or tests exist.
- **Fix:** Add a lightweight runner (e.g. Vitest) and a smoke test for the git-commit parsing (SHA→7-char,
  date format, message first-line) and any pure helpers.
- **Impact:** Regression safety on the one piece of real logic. **Effort:** medium.

### 2.4 Fix ESLint errors — ✅ DONE
- **Problem:** After the legacy-file deletion, `npm run lint` reported **7 errors** (exit 1): React 19's
  `react-hooks/set-state-in-effect` (`ThemeProvider.tsx:21`, `CommandPalette.tsx:146`, `SkillsPanel.tsx:13`,
  `TypedRole.tsx:26`), `react-hooks/immutability` (`CommandPalette.tsx:86`, assigning `window.location.href`),
  and `react/jsx-no-comment-textnodes` (`SkillsPanel.tsx:70`, `ExperiencePanel.tsx:32` — raw `//` in JSX children).
- **Done (genuine fixes, no blanket disables):**
  - `SkillsPanel` — bar heights now use a deterministic lazy `useState(() => Array(24).fill(5))` initializer
    (SSR-safe); the effect only sets up the animation interval (setState in a callback is allowed).
  - `TypedRole` — the empty-string→next-role transition moved out of the effect body into a `setTimeout`
    (adds a natural beat between words; setState in the timer callback is allowed).
  - `CommandPalette` — `mailto` now uses `window.location.assign(...)` (method call, not a mutation); search/
    selection reset moved from the `isOpen` effect into the Ctrl+K key handler, leaving the effect to only
    focus the input.
  - `ThemeProvider` — collapsed to a single resolved `setTheme` with a scoped `eslint-disable-next-line` +
    comment: the deferred localStorage read after mount is intentional (keeps SSR markup and first client
    render identical, avoiding a hydration mismatch).
  - JSX `//` textnodes (`SkillsPanel`, `ExperiencePanel`) wrapped as `{" // "}`.
- **Verified:** `npm run lint` → exit 0, 0 problems; `npm run build` → exit 0 (TypeScript clean, all 6 routes).
- **Remaining idea:** make lint failures fail CI (not wired yet). **Impact:** clean lint gate, fewer cascading
  renders. **Effort:** small.

### 2.5 PII awareness (informational — no change unless requested)
- **Note:** Real email/phone live in `data/contact.ts`. Expected for a public portfolio; flagged only so it's
  a conscious choice. No action taken without your say-so.

---

## Status

- ✅ **Done:** 0.2 (centralize site URL via `data/site.ts` + `NEXT_PUBLIC_SITE_URL`), 0.3 (`.env.example` +
  `.gitignore` negation), 1.1 (deleted 14 legacy files), 1.2 (wired `TerminalPanel` + `CommandPalette` to
  `data/`), 2.2 (live/cached/stale badge in `CommsPanel` + honest `source` in `route.ts`), 2.4 (fixed all 7
  ESLint errors — genuine refactors, `lint` now exits 0). Verified: `npm run build` passes (compile +
  TypeScript + all 6 routes) and `npm run lint` is clean.
- ⏳ **Remaining:** 0.1 (commit the untracked `/api/git-commit` + `CommsPanel` pair — **not committed**, per
  your "don't commit"), 2.1 (caching — touches the customized Next.js cache APIs; needs a `next/dist/docs/`
  review first), 2.3 (tests).

**Verification for future code changes:** `npm run build` + `npm run lint` pass; `npm run dev` and confirm the
dashboard boots, all panels render, the GitHub commit box + polling work, and terminal `get skills` / the
command-palette contact links reflect `data/*`. Grep for imports of any removed files.
