"use client";

import { useEffect, useState } from "react";
import { FileText, FolderGit2, GitBranch } from "lucide-react";
import StatusBar from "@/components/dashboard/StatusBar";
import BootSequence from "@/components/dashboard/BootSequence";
import CommandPalette from "@/components/dashboard/CommandPalette";
import FleetPanel from "@/components/dashboard/FleetPanel";
import SkillsPanel from "@/components/dashboard/SkillsPanel";
import ExperiencePanel from "@/components/dashboard/ExperiencePanel";
import EducationPanel from "@/components/dashboard/EducationPanel";
import CommsPanel from "@/components/dashboard/CommsPanel";
import TypedRole from "@/components/dashboard/TypedRole";
import { contactData } from "@/data/contact";

// Real, data-backed telemetry — every figure traces to data/experience.ts or
// data/education.ts. No invented performance numbers.
const heroMetrics = [
  { value: "~85%", label: "Model accuracy", sub: "supervised ML" },
  { value: "50K+", label: "Records modeled", sub: "E2E pipelines" },
  { value: "120+", label: "Hrs · Samsung AI", sub: "Innovation Campus" },
  { value: "8.03", label: "CGPA / 10", sub: "B.E. CSE" },
];

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Boot sequence plays once per browser session; skip it on subsequent
    // navigations. Deferred to an effect so SSR/first client render match.
    try {
      if (sessionStorage.getItem("booted") === "1") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsBooting(false);
      }
    } catch {
      /* sessionStorage unavailable — just play the boot sequence */
    }
  }, []);

  const handleBootComplete = () => {
    try {
      sessionStorage.setItem("booted", "1");
    } catch {
      /* ignore */
    }
    setIsBooting(false);
  };

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Boot sequence is an overlay on top of the fully-rendered dashboard, so
          all content + the <h1> stay in the server-rendered DOM for crawlers. */}
      {isBooting && <BootSequence onComplete={handleBootComplete} />}

      <div className="min-h-screen bg-background text-foreground font-sans bg-dot-grid transition-colors duration-300 flex flex-col justify-between">
        <StatusBar onOpenPalette={() => document.dispatchEvent(new CustomEvent("open-command-palette"))} />
        <CommandPalette onNavigate={handleNavigate} />

        <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
          {/* Hero — positioning headline, bio, real metric tiles */}
          <section className="glass-panel p-6 md:p-8 animate-fadeUp">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                  Ruchit Pahadia
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-sm text-muted">
                  <span className="text-accent-teal font-bold">$ target_role:</span>
                  <TypedRole />
                </div>
                <p className="mt-4 text-base md:text-lg text-foreground/90 leading-relaxed">
                  Final-year CS engineer building end-to-end ML systems — computer vision,
                  NLP, and edge AI that ships to real hardware.
                </p>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  From federated clinical NLP to real-time vision pipelines on embedded
                  devices. Currently in an IoT &amp; Advanced AI internship and Samsung&apos;s
                  Innovation Campus AI cohort.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-accent-teal px-4 py-2 text-sm font-bold text-background transition-transform hover:-translate-y-0.5"
                  >
                    <FileText size={15} /> Resume
                  </a>
                  <button
                    onClick={() => handleNavigate("projects")}
                    className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm font-bold text-foreground transition-transform hover:-translate-y-0.5"
                  >
                    <FolderGit2 size={15} /> View projects
                  </button>
                  <a
                    href={contactData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2 text-sm font-bold text-foreground transition-transform hover:-translate-y-0.5"
                  >
                    <GitBranch size={15} /> GitHub
                  </a>
                </div>
              </div>

              {/* Real metric tiles */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
                {heroMetrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-card-border bg-card-bg/70 px-4 py-3 min-w-[8.5rem]"
                  >
                    <div className="font-display text-2xl md:text-3xl font-bold text-accent-teal">
                      {m.value}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-foreground">{m.label}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{m.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects — above the fold, the #1 recruiter signal */}
          <FleetPanel />

          {/* Supporting panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillsPanel />
            <ExperiencePanel />
            <EducationPanel />
          </div>

          {/* Contact */}
          <CommsPanel />
        </main>

        <footer className="border-t border-card-border/40 py-4 text-center font-mono text-[9px] text-muted select-none">
          RUCHIT_PAHADIA_PORTFOLIO_CONSOLES ver 4.8.0 // © 2026 // BUILT WITH NEXT.JS 16
        </footer>
      </div>
    </>
  );
}
