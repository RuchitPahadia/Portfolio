import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Code2,
  BrainCircuit,
  Cpu,
  Database,
  Layers,
  Palette,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import { siteUrl } from "@/data/site";
import { usesSections, usesIntro } from "@/data/uses";

export const metadata: Metadata = {
  title: "Uses | Ruchit Pahadia",
  description:
    "The tools, languages, ML/AI stack, hardware, and services Ruchit Pahadia actually uses to build end-to-end machine learning and web systems.",
  alternates: { canonical: "/uses" },
  openGraph: {
    title: "Uses | Ruchit Pahadia",
    description:
      "Editor, languages, ML/AI stack, hardware, and services behind Ruchit Pahadia's projects.",
    url: `${siteUrl}/uses`,
    siteName: "Ruchit Pahadia Portfolio",
    locale: "en_US",
    type: "website",
  },
};

// Map each section title to a non-brand lucide icon (lucide-react 1.28 has no
// brand icons). Falls back to Layers for any unmapped section.
const sectionIcons: Record<string, LucideIcon> = {
  "Editor & Tooling": Wrench,
  Languages: Code2,
  "ML / AI Stack": BrainCircuit,
  Hardware: Cpu,
  "Data Stores & Services": Database,
  "Web & App Frameworks": Layers,
  "Creative & 3D": Palette,
};

const totalItems = usesSections.reduce((sum, s) => sum + s.items.length, 0);

export default function UsesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans bg-dot-grid transition-colors duration-300">
      <main className="max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* Header panel — single <h1> for the page */}
        <section className="glass-panel p-6 md:p-8 animate-fadeUp">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-muted hover:text-accent-teal transition-colors duration-200"
          >
            <ArrowLeft size={13} />
            <span>BACK_TO_DASHBOARD</span>
          </Link>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Uses — Tools &amp; Stack
          </h1>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-foreground/90 leading-relaxed">
            {usesIntro}
          </p>
          <div className="mt-5 inline-flex items-center gap-1.5 rounded border border-card-border/60 bg-background/40 px-3 py-1.5 font-mono text-xs text-muted">
            <Layers size={11} className="text-accent-teal" />
            <span>
              {usesSections.length} SECTIONS · {totalItems} ENTRIES
            </span>
          </div>
        </section>

        {/* One glass panel per section, each headed by an <h2> */}
        {usesSections.map((section) => {
          const Icon = sectionIcons[section.title] ?? Layers;
          return (
            <section
              key={section.title}
              className="glass-panel p-5 md:p-6 font-mono text-sm animate-fadeUp"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-card-border pb-3 mb-4 select-none">
                <h2 className="flex items-center gap-2 px-3 py-1.5 m-0 bg-accent-teal/15 border border-accent-teal/30 rounded text-accent-teal font-bold text-sm tracking-wider uppercase">
                  <Icon size={14} />
                  <span>{section.title}</span>
                </h2>
                <span className="text-xs text-muted font-bold tracking-wider mr-1">
                  {String(section.items.length).padStart(2, "0")}_ITEMS
                </span>
              </div>

              {section.caption && (
                <p className="font-sans text-sm text-muted leading-relaxed mb-4">
                  {section.caption}
                </p>
              )}

              <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 list-none p-0 m-0">
                {section.items.map((item) => {
                  const todoMatch = item.note?.match(/^TODO\(ruchit\):\s*(.*)$/);
                  return (
                    <li
                      key={item.name}
                      className="border border-card-border/60 bg-background/10 rounded p-3"
                    >
                      <span className="inline-flex items-center gap-1.5 flex-wrap">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-sans font-bold bg-muted-light/65 border border-card-border/70 text-foreground">
                          {item.name}
                        </span>
                        {todoMatch && (
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-accent-amber/10 border border-accent-amber/40 text-accent-amber">
                            Pending
                          </span>
                        )}
                      </span>
                      {item.note &&
                        (todoMatch ? (
                          <p className="mt-2 font-sans text-xs text-muted/80 italic leading-relaxed">
                            {todoMatch[1]}
                          </p>
                        ) : (
                          <p className="mt-2 font-sans text-xs text-muted leading-relaxed">
                            {item.note}
                          </p>
                        ))}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </main>

      <footer className="border-t border-card-border/40 py-4 text-center font-mono text-[9px] text-muted select-none">
        RUCHIT_PAHADIA_PORTFOLIO_CONSOLES // USES_MANIFEST // © 2026
      </footer>
    </div>
  );
}
