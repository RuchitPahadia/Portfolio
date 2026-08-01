# Antigravity Prompt — Ruchit Pahadia Portfolio Website (Phased Build)

Paste each phase into Antigravity one at a time, letting it finish and verify before moving to the next. Phase 0 sets the shared context so later phases don't need repeating.

---

## Phase 0 — Project Context & Setup

```
Set up a new personal portfolio website project for Ruchit Pahadia, a final-year 
CSE student and ML/AI engineer based in Bengaluru, India.

STACK:
- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS for styling
- Framer Motion for subtle animations
- Deploy target: Vercel

STRUCTURE:
- Single-page portfolio with smooth-scroll sections: Hero, About, Experience, 
  Projects, Skills, Education, Achievements, Contact
- Fully responsive (mobile-first)
- Dark mode as default, with light/dark toggle
- Clean, modern, developer-portfolio aesthetic — not templated-looking. Avoid 
  generic Bootstrap-card look; use intentional typography, spacing, and a 
  restrained color palette (e.g. deep navy/charcoal background with one accent 
  color)

Scaffold the Next.js project with TypeScript, Tailwind, and ESLint. Set up the 
folder structure with a components/ directory for each section, a data/ 
directory for content (so content can be edited without touching component 
code), and set up the base layout, fonts (a modern sans-serif like Inter or 
Geist), and global Tailwind theme (colors, spacing) in tailwind.config.

Do not build any section content yet — just the scaffold, theme, and empty 
section components wired into the page.
```

---

## Phase 1 — Hero & About Section

```
Build the Hero and About sections.

HERO:
- Name: Ruchit Pahadia
- Title/tagline: Final-year CSE student and ML Engineer — ships end-to-end ML, 
  deep learning, computer vision, and NLP systems from data pipeline to edge 
  deployment
- Location: Bengaluru, Karnataka
- CTA buttons: "View Projects" (scrolls to projects), "Resume" (opens resume 
  PDF in new tab — link to /resume.pdf placeholder), "Contact" (scrolls to 
  contact)
- Social links: GitHub, LinkedIn, LeetCode (use icon links, placeholder hrefs 
  for now — I'll fill in exact URLs)
- Subtle entrance animation on load (fade/slide in)

ABOUT:
- Short narrative: final-year Computer Science Engineering student at BNM 
  Institute of Technology, Bengaluru, targeting ML Engineer / Data Science / 
  AI Developer roles
- Mention: two industry internships, a Samsung-led 6-month Advanced AI 
  program, and hands-on execution-oriented approach to building real systems
- Keep tone factual and confident, not overly salesy

Store this content in the data/ directory as structured objects, not hardcoded 
in JSX, so it's easy for me to edit text later without touching layout code.
```

---

## Phase 2 — Experience Section

```
Build the Experience section as a vertical timeline (or clean stacked cards — 
your call on which looks better with the existing theme).

Entries, most recent first:

1. IoT & Advanced AI Intern — Ganaka Praudyogikee Tech Solutions, Bengaluru, 
   Karnataka | Mar 2026 – Present
   - Building AI-integrated IoT pipelines for real-world automation, reducing 
     manual intervention in operational processes
   - Designing and testing deep learning models for sensor-data interpretation 
     and anomaly detection on edge hardware
   - Deploying optimised models to embedded systems (Raspberry Pi) with custom 
     preprocessing pipelines and on-device inference tuning

2. Data Science Intern — BNMIT in association with E2E Technologies, 
   Bengaluru, Karnataka (On-site) | Jun 2025 – Jul 2025
   - Built and fine-tuned supervised ML models (Random Forest, XGBoost), 
     achieving ~85% accuracy on classification tasks
   - Engineered end-to-end preprocessing pipelines (imputation, normalisation, 
     feature selection) on datasets of 50,000+ records
   - Evaluated models using cross-validation, precision-recall, and AUC-ROC 
     metrics; presented findings to senior stakeholders

3. Advanced AI Program — Samsung Innovation Campus (On-Site) | Aug 2025 – Feb 2026
   - Exclusive 6-Month Offline Program by Samsung officials — highly selective 
     intake, 120+ hours
   - Selected through competitive screening for Samsung's flagship 6-month 
     Advanced AI cohort — 120+ hours of in-person ML, Deep Learning, neural 
     networks, and production-grade model architectures, taught by Samsung 
     R&D officials

Store entries as a typed array in data/experience.ts so new roles can be added 
easily.
```

---

## Phase 3 — Projects Section

```
Build the Projects section as a responsive grid of project cards. Each card: 
title, short description, tech stack tags, and links (GitHub/live demo — use 
placeholder hrefs for now). Clicking a card (or an "expand" affordance) can 
reveal the fuller bullet points — your call on interaction pattern, keep it 
clean.

Projects (most recent first):

1. DealerXP | React, FastAPI, PostgreSQL, Redis, Docker | 2026
   - Full-stack gamification layer for automotive dealership CRM/DMS 
     pipelines, mapping lead-to-delivery event data into XP, streaks, badges, 
     and department leaderboards via a FastAPI backend and React/Vite frontend
   - Engineered a scoring and anti-gaming engine that filters 2,000+ raw 
     operational events into 20 milestone-based actions, applying 
     rate-capping, collusion gating, and behavioral anomaly detection to block 
     point manipulation
   - Built for the Carverse Mobility Technologies Dealership Gamification 
     Hackathon

2. Enterprise Authentication & Authorization System | Java, Spring Boot, 
   PostgreSQL, Spring Security, JWT, Hibernate | 2026
   - Spring Boot backend providing user registration, authentication, profile 
     management, and Role-Based Access Control (RBAC) via stateless JWT
   - BCrypt password hashing, USER/ADMIN/MODERATOR roles, layered 
     controller-service-repository architecture, Swagger/OpenAPI docs

3. Patient Handoff System (Ongoing) | Python, Hugging Face Transformers, 
   spaCy, Flask | 2025 – Present
   - Architecting an end-to-end clinical-handoff platform with a 
     transformer-based NLP summary generator and interactive chatbot, plus 
     full data pipelines (ingestion, entity extraction, summarisation, 
     dialogue) producing structured handoff reports from raw clinical notes

4. AI-Based Traffic Violation Detection System | Python, PyTorch, OpenCV, SORT 
   Tracker, Custom OCR | 2025
   - Built an end-to-end computer vision and deep learning pipeline detecting 
     multiple violations — helmet absence, triple riding, and wrong-lane 
     driving — from live traffic video footage
   - Integrated SORT-based vehicle tracking and a custom OCR model to link 
     violations to licence plates, logging plate/type/timestamp — achieving 
     ~91% vehicle-detection, ~87% plate-recognition accuracy, and cutting 
     false positives by 30%

Store project data in data/projects.ts as a typed array so new projects can be 
added without touching the card component.
```

---

## Phase 4 — Skills Section

```
Build the Skills section, grouped by category, using a clean tag/pill layout 
or icon grid (your call — avoid a boring bullet list).

Categories:
- Languages: Python, Java, C, SQL
- ML / Deep Learning: TensorFlow, TensorFlow Lite, PyTorch, Keras, 
  Scikit-learn, NumPy, Pandas, Matplotlib, Seaborn, CI/CD Pipelines
- Computer Vision: OpenCV, Deep Learning Object Detection, SORT Tracker, ONNX, 
  OCR
- NLP: Hugging Face Transformers, BERT, spaCy, NLTK
- Edge AI & Deployment: Model Optimisation, On-Device Inference, TensorFlow 
  Lite, ONNX, Raspberry Pi, Arduino
- Databases & Tools: MySQL, Git, GitHub, VS Code, REST APIs, Unity, Blender
- Core Concepts: Supervised Learning, Feature Engineering, Model Deployment, 
  Anomaly Detection, IoT Systems

Store in data/skills.ts.
```

---

## Phase 5 — Education & Achievements Section

```
Build the Education and Achievements sections (can be combined into one 
section with two columns, or kept separate — your call based on visual 
balance).

EDUCATION:
- B.E. in Computer Science Engineering — BNM Institute of Technology | 
  2023 – Present | CGPA: 8.03 / 10
- Senior Secondary, CBSE (PCM + CS) — Presidency School Bangalore South | 
  2021 – 2023 | Aggregate: 83%

ACHIEVEMENTS & CERTIFICATIONS:
- 2nd Place, BNMIT Ideathon (2024) — presented a voice assistant project 
  against college-wide competition
- Certifications: NPTEL — AI & ML (2024), MongoDB University (2024), IoT 
  Using Python (IIT Bombay, 2024)

Store in data/education.ts.
```

---

## Phase 6 — Contact & Footer

```
Build the Contact section and footer.

CONTACT:
- Heading inviting recruiters/collaborators to reach out
- Email: toruchitpahadia@gmail.com (mailto link)
- Phone: +91 93808 69641 (tel link)
- Social icons repeated: GitHub, LinkedIn, LeetCode (placeholder hrefs)
- Optional: a simple contact form (name, email, message) — if you add one, it 
  only needs to open a mailto: with the filled content prefilled, no backend 
  needed for now

FOOTER:
- Small footer with © year, name, and a "Built with Next.js" or similar 
  credit line

Wire up smooth-scroll navigation (a fixed/sticky navbar with links to each 
section, active-section highlighting on scroll) if not already done in Phase 0.
```

---

## Phase 7 — Polish, Responsiveness & Deploy Prep

```
Final polish pass:

1. Audit responsiveness across mobile, tablet, and desktop breakpoints for 
   every section built so far — fix any overflow, spacing, or font-scaling 
   issues
2. Verify dark/light mode toggle applies consistently across all sections
3. Add page metadata (title, description, Open Graph tags) for SEO/link 
   previews
4. Add a favicon
5. Run a Lighthouse-style check mentally for performance — lazy-load images 
   if any are added, ensure no layout shift
6. Add scroll-triggered fade-in animations for each section (consistent 
   timing/easing) if not already present
7. Do a final pass confirming there's no hardcoded content left in components 
   — everything should be pulling from the data/ files
8. Prepare the project for Vercel deployment: confirm build runs clean with 
   `npm run build`, add a README with setup/deploy instructions

Do not invent or add any metrics, project details, or claims beyond what's in 
the data files — flag anything unclear instead of guessing.
```

---

### Notes for you (not part of the prompt)
- Zenith and the IPL Score Predictor were dropped from the projects list per your resume updates (DealerXP and the Enterprise Auth System replace them) — Phase 3 reflects that.
- Placeholder hrefs (GitHub/LinkedIn/LeetCode/resume PDF) need your actual links filled in after Phase 1.
- Feel free to run phases back-to-back if Antigravity handles context well, but reviewing after each phase catches drift early.
