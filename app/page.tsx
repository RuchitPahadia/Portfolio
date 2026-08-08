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
