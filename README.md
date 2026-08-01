# Ruchit Pahadia Portfolio Website

A personal portfolio website for **Ruchit Pahadia**, a final-year Computer Science Engineering student and ML/AI Engineer based in Bengaluru, India.

This project is built using a modern, performant, and developer-first design aesthetic, structured to allow easy content updates without touching layout code.

## 🚀 Tech Stack

- **Framework:** [Next.js 14+ (App Router, TypeScript)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/) (with custom inline brand marks)
- **Deployment:** [Vercel](https://vercel.com/)

## 📂 Project Structure

```
├── app/                  # Next.js App Router root
│   ├── globals.css       # Tailwind CSS import, custom variants, and themes
│   ├── layout.tsx        # Base HTML skeleton & Global providers
│   └── page.tsx          # Main Single-Page portfolio view
├── components/           # UI Component definitions
│   ├── ThemeProvider.tsx # Client-side theme provider (dark/light toggle)
│   ├── Navbar.tsx        # Fixed floating menu with active-link scroll highlighting
│   ├── Hero.tsx          # Headline, socials, CTA buttons, and ambient glow
│   ├── About.tsx         # Detailed narrative and key quick-highlight cards
│   ├── Experience.tsx    # Responsive vertical work experience & training timeline
│   ├── Projects.tsx      # Responsive grid of expandable project cards
│   ├── Skills.tsx        # Grid of skill cards categorized by specialty
│   ├── Education.tsx     # Combined columns for academic path & certs
│   ├── Contact.tsx       # Contact details, mail links, and pre-filled email form
│   └── Footer.tsx        # Copyright and technology credits
├── data/                 # Dynamic content definition (Edit to modify site text)
│   ├── hero.ts           # Hero data config (names, CTAs, links)
│   ├── about.ts          # Biography and statistics overview
│   ├── experience.ts     # Career timeline details
│   ├── projects.ts       # Project descriptions, stacks, and bullet points
│   ├── skills.ts         # Technical skills categorized
│   ├── education.ts      # University degrees and certificates
│   └── contact.ts        # Direct links, email, phone, and addresses
└── public/               # Asset folder (resume PDF, images)
```

## 🛠️ Getting Started

First, install the package dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Theme Customization

The site is configured with a **class-based dark mode strategy** (defaulting to dark mode) with a toggle switch. Custom design variables (e.g., background, cards, and accent colors) can be configured directly in [app/globals.css](file:///C:/Users/toruc/OneDrive/Desktop/Projects/Dashboard/app/globals.css):

- `:root` contains light mode theme variables.
- `.dark` contains dark mode theme variables.
- The Tailwind theme tokens are exposed via `@theme` variables.

## 📦 Deploying to Vercel

The easiest way to deploy this app is directly through the Vercel dashboard:

1. Push your code to a GitHub repository.
2. Link the repository to a new project in [Vercel](https://vercel.com/new).
3. Vercel will automatically detect Next.js settings and build the app under `npm run build`.
