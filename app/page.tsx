"use client";

import { useState } from "react";
import StatusBar from "@/components/dashboard/StatusBar";
import BootSequence from "@/components/dashboard/BootSequence";
import CommandPalette from "@/components/dashboard/CommandPalette";
import FleetPanel from "@/components/dashboard/FleetPanel";
import SkillsPanel from "@/components/dashboard/SkillsPanel";
import ExperiencePanel from "@/components/dashboard/ExperiencePanel";
import EducationPanel from "@/components/dashboard/EducationPanel";
import CommsPanel from "@/components/dashboard/CommsPanel";
import TypedRole from "@/components/dashboard/TypedRole";

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {isBooting ? (
        <BootSequence onComplete={() => setIsBooting(false)} />
      ) : (
        <div className="min-h-screen bg-background text-foreground font-sans bg-dot-grid transition-colors duration-300 flex flex-col justify-between">
          {/* persistent top status bar */}
          <StatusBar />

          {/* command palette shortcut navigator */}
          <CommandPalette onNavigate={handleNavigate} />

          {/* main dashboard console grid */}
          <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
            {/* Systems Welcome Banner */}
            <div className="bg-card-bg border border-card-border rounded p-5 select-none flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground font-sans uppercase">
                  Ruchit Pahadia
                </h1>
                <div className="mt-2 flex items-center gap-2 font-mono text-xs md:text-sm text-muted">
                  <span className="text-accent-teal font-bold">$ target_role:</span>
                  <TypedRole />
                </div>
              </div>
              <div className="font-mono text-[10px] text-muted space-y-1 border-t md:border-t-0 md:border-l border-card-border/50 pt-2 md:pt-0 md:pl-6 shrink-0">
                <div>HOST_NODE : RUCHIT_PAHADIA_OS</div>
                <div>SEC_SYSTEM: DECRYPT_ACTIVE</div>
                <div>IP_SOURCE: 127.0.0.1 (LOCALHOST)</div>
              </div>
            </div>

            {/* Top row: Skills, Experience, and Education side-by-side on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SkillsPanel />
              <ExperiencePanel />
              <EducationPanel />
            </div>

            {/* Middle row: Fleet panel (Projects) */}
            <div className="w-full">
              <FleetPanel />
            </div>

            {/* Bottom Console: Comms Ports */}
            <div className="w-full">
              <CommsPanel />
            </div>
          </main>

          {/* Minimal dashboard footer */}
          <footer className="border-t border-card-border/40 py-4 text-center font-mono text-[9px] text-muted select-none">
            RUCHIT_PAHADIA_PORTFOLIO_CONSOLES ver 4.8.0 // © 2026 // BUILT WITH NEXT.JS 16
          </footer>
        </div>
      )}
    </>
  );
}
