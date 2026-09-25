# Architecture

A visual map of **Presonal_Dashboard** — a single-page portfolio for Ruchit Pahadia, built as a
"mission-control telemetry dashboard."

**Stack:** Next.js 16.2.12 (App Router) · React 19.2.4 · Tailwind CSS v4 · Framer Motion 12 · lucide-react ·
TypeScript 5.

**Shape:** one client-rendered page (`app/page.tsx`) gated behind a boot animation, composed of ~10 dashboard
panels. One API route (`/api/git-commit`) proxies the GitHub API for live commit telemetry. All content lives
in seven static, typed `data/*.ts` modules. A single React context (`ThemeProvider`) drives light/dark.

> Diagrams below are [Mermaid](https://mermaid.js.org/) and render inline on GitHub and in Mermaid-aware editors.

---

## 1. System overview

Server / client / external boundaries, and the one dynamic data path.

```mermaid
flowchart TB
    subgraph EXT["External"]
        GH["GitHub REST API<br/>repos/RuchitPahadia/Portfolio"]
    end

    subgraph SERVER["Server (Next.js)"]
        LAYOUT["app/layout.tsx<br/>root layout · fonts · SEO metadata"]
        ROUTE["app/api/git-commit/route.ts<br/>GET · force-dynamic · 5-min in-memory cache"]
        SITEMAP["app/sitemap.ts"]
        ROBOTS["app/robots.ts"]
        OG["app/opengraph-image.tsx<br/>edge runtime"]
    end

    subgraph CLIENT["Client (browser)"]
        PAGE["app/page.tsx<br/>'use client' · dashboard root"]
    end

    LAYOUT --> PAGE
    PAGE -->|"fetch /api/git-commit (poll 5 min)"| ROUTE
    ROUTE -->|"fetch (token optional)"| GH

    classDef server fill:#1e3a5f,stroke:#4a90d9,color:#e6f0fa;
    classDef client fill:#3d2f5c,stroke:#a78bda,color:#f0e9fa;
    classDef ext fill:#4a3a1e,stroke:#d9a94a,color:#faf2e6;
    class LAYOUT,ROUTE,SITEMAP,ROBOTS,OG server;
    class PAGE client;
    class GH ext;
```

---

## 2. Component tree

What `app/page.tsx` mounts, plus the legacy code that ships in the repo but is never rendered.

```mermaid
flowchart TB
    LAYOUT["app/layout.tsx"] --> TP["ThemeProvider"]
    TP --> PAGE["app/page.tsx<br/>owns isBooting"]

    PAGE -->|"gate until complete"| BOOT["BootSequence"]
    PAGE --> SB["StatusBar"]
    PAGE --> CP["CommandPalette"]
    PAGE --> BANNER["welcome banner"]
    BANNER --> TR["TypedRole"]
    PAGE --> SK["SkillsPanel"]
    PAGE --> EX["ExperiencePanel"]
    PAGE --> ED["EducationPanel"]
    PAGE --> FL["FleetPanel"]
    PAGE --> CM["CommsPanel"]
    CM --> TERM["TerminalPanel"]

    classDef live fill:#1e3a5f,stroke:#4a90d9,color:#e6f0fa;
    class LAYOUT,TP,PAGE,BOOT,SB,CP,BANNER,TR,SK,EX,ED,FL,CM,TERM live;
```

> The repo previously carried a second, unused generation of components (a scrolling-page portfolio:
> `Hero`, `About`, `Navbar`, `Contact`, `Footer`, `ResumeModal`, the old `Skills`/`Experience`/`Education`/
> `Projects`/`GithubSection`, and the unwired `dashboard/SignalPanel.tsx`). These — plus the orphaned
> `data/hero.ts` and `data/about.ts` — were removed during cleanup (see `IMPROVEMENTS.md` P1.1). Everything
> above is now the entire live component set.

---

## 3. Data flow

All content is static, typed TypeScript in `data/*.ts`, imported by panels at build time. The only runtime
data path is the GitHub commit telemetry.

```mermaid
flowchart LR
    subgraph DATA["data/*.ts (static, typed)"]
        SKILLS["skills.ts"]
        EXP["experience.ts"]
        EDU["education.ts"]
        PROJ["projects.ts"]
        CONTACT["contact.ts"]
        SITE["site.ts (siteUrl)"]
    end

    SKILLS --> SkillsPanel
    SKILLS --> TerminalPanel
    EXP --> ExperiencePanel
    EXP --> TerminalPanel
    EDU --> EducationPanel
    PROJ --> FleetPanel
    PROJ --> TerminalPanel
    CONTACT --> CommsPanel
    CONTACT --> TerminalPanel
    CONTACT --> CommandPalette
    SITE --> Meta["layout.tsx · sitemap.ts · robots.ts"]

    CommsPanel -->|"fetch /api/git-commit"| ROUTE["/api/git-commit<br/>5-min server cache"]
    ROUTE -->|"fetch"| GH["GitHub API"]
    CommsPanel -.->|"poll every 5 min"| CommsPanel

    classDef data fill:#2f4a2f,stroke:#5faa5f,color:#e9fae9;
    classDef ext fill:#4a3a1e,stroke:#d9a94a,color:#faf2e6;
    class SKILLS,EXP,EDU,PROJ,CONTACT,SITE data;
    class GH,ROUTE ext;
```

> Content is single-sourced from `data/`: `TerminalPanel` reads `skills.ts` and `CommandPalette` reads
> `contact.ts` (both previously hardcoded — fixed in `IMPROVEMENTS.md` P1.2). `site.ts` centralizes the
> deployed URL, overridable via `NEXT_PUBLIC_SITE_URL`.

---

## 4. Theme context

One provider, two consumers.

```mermaid
flowchart LR
    TP["ThemeProvider<br/>theme · toggleTheme · localStorage · prefers-color-scheme"]
    TP -->|"useTheme()"| SB["StatusBar<br/>(light/dark toggle)"]
    TP -->|"useTheme()"| CP["CommandPalette<br/>(theme-toggle action)"]

    classDef ctx fill:#3d2f5c,stroke:#a78bda,color:#f0e9fa;
    class TP,SB,CP ctx;
```

---

## Notes

- **Single live component set.** `components/` now holds only `dashboard/*` and top-level `ThemeProvider`.
  The earlier unused scrolling-page generation and the superseded `SignalPanel` were removed during cleanup.
- **No `lib/` `utils/` `hooks/` `types/` dirs.** Shared types are co-located inside the `data/*.ts` modules.
- **Tailwind v4 has no config file** — theme tokens live in `app/globals.css`; PostCSS uses `@tailwindcss/postcss`.
- **Customized Next.js.** Per `AGENTS.md`, this is not stock Next.js 16 — consult `node_modules/next/dist/docs/`
  before changing framework-level code.


