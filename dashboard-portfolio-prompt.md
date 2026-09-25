# Personal Dashboard Portfolio — Prompt for Antigravity

## Brief
Recruiter-facing personal portfolio for Ruchit Pahadia — final-year CS Engineering student (BNM Institute of Technology, Bengaluru) targeting entry-level Data Science / ML Engineer roles. Visual direction: bold and unconventional — not another templated AI-generated site.

## Core concept
Don't build a scrolling marketing page. Build a **live systems dashboard that monitors "Ruchit" as a system** — the same conceptual language as the IoT carbon-footprint dashboard built during his internship (sensor nodes → MQTT → live dashboard). Skills, projects, and status get treated like telemetry: panels, status tags, timestamps. The aesthetic itself should read as "this person works with real-time embedded/data systems," without a line of copy needing to say so.

Avoid the three most common AI-generated-portfolio tells:
1. Cream background + serif display + terracotta/clay accent
2. Near-black background + one lone neon accent
3. Broadsheet layout — hairline rules, zero border-radius, newspaper columns

## Design tokens (starting point — refine freely)

**Color**
- Base: `#14161A` — deep graphite, not pure black
- Panel surface: `#1D2026`
- Primary accent — indicator amber: `#FFB238` (active/status states)
- Secondary accent — signal teal: `#4FD1C5` (data lines, charts, links)
- Alert, used sparingly: `#FF5C5C`
- Text: `#EDEAE3` full opacity, ~60% for secondary text

**Type**
- Headers, labels, data: a distinct monospace (IBM Plex Mono / Space Mono / JetBrains Mono), tabular figures for numbers
- Body copy: a clean humanist sans (Inter / General Sans) — keep actual paragraphs readable
- Mono face stays for structure and data only, never long-form text

**Panel chrome**
Each panel gets a visible border, a small header label, slight elevation — reads as dashboard software (Grafana / mission-control style), not editorial hairlines. Small radius (2–4px): not brutalist zero-radius, not soft SaaS rounding.

## Signature moment
On first load: a short (1.5–2s), skippable boot/diagnostics sequence — `RUCHIT_OS booting…`, modules loading (`DATA_SCIENCE`, `EDGE_AI`, `ML_ENGINEERING`), landing on `STATUS: ONLINE — OPEN TO OPPORTUNITIES`. This is the one orchestrated animation moment; keep everything else restrained (subtle hover states only). Respect `prefers-reduced-motion` — jump straight to the end state, no sequence.

## Layout — panel grid, not a scroll page

```
┌──────────────────────────────────────────────────────┐
│ STATUS BAR — name · target role · status · clock ·   │  ← persistent,
│ resume download · contact                             │    not just top-of-page
├────────────────────────────┬───────────────────────────┤
│  FLEET PANEL (projects)    │  SIGNAL PANEL (skills)    │
│  status-tagged tiles       │  waveform/spectrum bars   │
├────────────────────────────┴───────────────────────────┤
│  COMMS PANEL — resume · GitHub · LinkedIn · email       │
└──────────────────────────────────────────────────────┘
```

- **Status bar**: always visible, not just a hero. This is the recruiter's 10-second scan path — keep it legible no matter how bold the rest gets.
- **Fleet panel**: real projects as monitored units. Status tags below are my best guess — confirm or correct before this goes live:
  - `Carbon Footprint Monitoring System` — IN PROGRESS — ESP32 + Raspberry Pi 5 + MQTT + React/Tailwind dashboard, campus CO2/energy/water tracking (internship)
  - `DealerXP` — BUILT — gamification layer (XP, streaks, anomaly detection) for dealership CRM/DMS — React/Vite, FastAPI, PostgreSQL, Redis (hackathon)
  - `Drive_Orchestrator` — IN PROGRESS — unified search/storage pooling across Google Drive accounts — Next.js, Postgres+pgvector, Redis+BullMQ (solo)
  - `Enterprise Auth System` — BUILT — JWT auth + RBAC backend — Java, Spring Boot, Spring Security, PostgreSQL
  - `Clinical Decision Support System` — IN PROGRESS — AI-augmented patient handoff with federated learning — Next.js, FastAPI, Flower/flwr (final-year, 3-person team)
- **Signal panel**: skills as waveform/spectrum bars instead of progress bars — weight toward actual target-role keywords (ONNX, TensorFlow Lite, Edge AI, on-device inference, agentic AI) plus core DS/ML stack.
- **Comms panel**: resume, GitHub, LinkedIn, email — framed as "channels," not a generic contact form.

## Interaction
- `Cmd/Ctrl+K` command palette for quick nav between panels/projects — signals technical fluency without saying so
- Any "live" touch (clock, a real last-commit timestamp if wired to the GitHub API) must be real. No fabricated numbers, fake activity feeds, or invented stats anywhere on the page.

## Constraints
- Fully responsive to mobile; visible keyboard-focus states; motion-reduced fallback for the boot sequence
- Suggested stack: Next.js + TypeScript + Tailwind CSS + Framer Motion — matches the stack already used on other Antigravity-built projects; swap if a simpler stack fits better
- Copy: plain, specific, written from the recruiter's side of the screen — no filler, no invented achievements
