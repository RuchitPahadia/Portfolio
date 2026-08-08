"use client";

import { useState } from "react";
import StatusBar from "@/components/dashboard/StatusBar";
import BootSequence from "@/components/dashboard/BootSequence";
import CommandPalette from "@/components/dashboard/CommandPalette";
import FleetPanel from "@/components/dashboard/FleetPanel";
import SignalPanel from "@/components/dashboard/SignalPanel";
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Console: Fleet panel (Projects) */}
              <div className="lg:col-span-6 xl:col-span-7">
                <FleetPanel />
              </div>

              {/* Right Console: Signal spectrum (Skills/Experience/Academics) */}
              <div className="lg:col-span-6 xl:col-span-5">
                <SignalPanel />
              </div>
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
