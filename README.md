# Ruchit Pahadia — Portfolio

A personal portfolio for **Ruchit Pahadia**, a final-year Computer Science Engineering
student and ML/AI Engineer based in Bengaluru, India.

The site is built as a **"mission-control" telemetry dashboard**: a single-page console of
panels (projects, skills, experience, education, contact) with a premium dark-first aesthetic,
a boot sequence, a command palette, and a live GitHub commit feed. All content is driven from
plain data files so text can be updated without touching layout code.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router, Turbopack, TypeScript)](https://nextjs.org/)
- **UI:** React 19
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) — no config file; tokens live in the
  `@theme` block of `app/globals.css`, with class-based dark mode (`.dark`).
- **Fonts:** `next/font/google` — Space Grotesk (display), Inter (body), Space Mono (mono).
- **Icons:** [Lucide React](https://lucide.dev/) (plus a custom inline LinkedIn mark).
- **Deployment:** [Vercel](https://vercel.com/)

> ⚠️ **This project pins a customized build of Next.js.** APIs and conventions may differ from
> upstream. Before changing framework-level code (metadata, fonts, images, caching, routing),
> read the matching guide in `node_modules/next/dist/docs/`. See `AGENTS.md`.

## 📂 Project Structure

```
├── app/
│   ├── globals.css              # Tailwind import, design tokens, glass panels, a11y rules
│   ├── layout.tsx               # HTML shell, fonts, metadata, JSON-LD, pre-hydration theme script
│   ├── page.tsx                 # Single-page dashboard: hero → projects → panels → contact
│   └── api/git-commit/route.ts  # GitHub commit proxy (in-memory cache; live/cache/stale)
├── components/
│   ├── ThemeProvider.tsx        # Dark/light context, synced to the pre-hydration theme class
│   └── dashboard/
│       ├── StatusBar.tsx        # Sticky header: clock, theme toggle, resume/contact, palette
│       ├── BootSequence.tsx     # One-per-session boot overlay (respects reduced-motion)
│       ├── CommandPalette.tsx   # ⌘K / button launcher for navigation + quick actions
│       ├── TypedRole.tsx        # Rotating role headline (static under reduced-motion)
│       ├── FleetPanel.tsx       # Projects grid (the above-the-fold signal)
│       ├── SkillsPanel.tsx      # Skill categories + inventory readout
│       ├── ExperiencePanel.tsx  # Career timeline (highlights the Samsung cohort)
│       ├── EducationPanel.tsx   # Degrees, certifications, achievements
│       ├── CommsPanel.tsx       # Contact sockets + live GitHub telemetry + shell
│       └── TerminalPanel.tsx    # Interactive shell that queries the same data files
├── data/                        # Edit these to change site content
│   ├── projects.ts   experience.ts   education.ts
│   ├── skills.ts     contact.ts      site.ts
└── public/                      # resume.pdf, favicon, static assets
```

## 🛠️ Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (Turbopack)
npm run lint     # ESLint (next/core-web-vitals)
npm run start    # serve the production build
```

## ✍️ Editing Content

All copy lives in `data/*.ts`. To update projects, edit `data/projects.ts`; each project has a
`title`, `description`, `tech[]`, `period`, `bullets[]`, `status`, and `links` (`github`/`live`).
Links equal to `"#"` are treated as placeholders and are not rendered. The hero metric tiles in
`app/page.tsx` are derived from real figures in `data/experience.ts` and `data/education.ts`.

## 🎨 Theming & Accessibility

- **Design tokens** are defined on `:root` (light) and `.dark` (dark) in `app/globals.css` and
  exposed to Tailwind via the `@theme` block. Light-mode accent colors are tuned to meet WCAG 2.2
  AA contrast.
- **No flash of the wrong theme:** an inline script in `layout.tsx` applies the stored/system
  theme before paint; `ThemeProvider` syncs React state to it after mount.
- **Motion** is gated globally on `prefers-reduced-motion: reduce`.
- Panels use semantic headings, the command palette exposes dialog/listbox roles, and interactive
  elements have visible focus rings.

## 📦 Deploying to Vercel

1. Push to a GitHub repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Vercel detects Next.js and builds with `npm run build`.
