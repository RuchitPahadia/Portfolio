"use client";

import { experiences } from "@/data/experience";
import { Briefcase, Activity, Terminal } from "lucide-react";

export default function ExperiencePanel() {
  return (
    <section id="experience" className="border border-card-border bg-card-bg rounded p-5 font-mono text-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[490px]">
      {/* Panel Header - Large Highlighted Tab */}
      <div>
        <div className="flex items-center justify-between border-b border-card-border pb-3 mb-4 select-none">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-teal/15 border border-accent-teal/30 rounded text-accent-teal font-bold text-sm tracking-wider uppercase">
            <Terminal size={14} className="animate-pulse" />
            <span>EXPERIENCE_LOGS // TIMELINE</span>
          </div>
          <div className="text-xs text-muted font-bold tracking-wider mr-1">LOG_DB.02</div>
        </div>
      </div>

      {/* Experience Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
        {experiences.map((exp, index) => (
          <div key={index} className="border border-card-border bg-background/25 rounded p-3.5 relative">
            <div className="flex items-center justify-between gap-2 border-b border-card-border/30 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5 text-foreground font-bold font-sans text-sm">
                <Briefcase size={12} className="text-accent-teal" />
                <span>{exp.role}</span>
              </div>
              <span className="text-xs text-muted font-mono">{exp.period}</span>
            </div>
            <div className="text-xs text-accent-amber font-bold mb-2">
              {exp.company} // {exp.location}
            </div>
            <div className="space-y-2 text-sm text-muted font-sans pl-2 border-l border-card-border/60">
              {exp.bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-1.5">
                  <span className="text-accent-teal font-mono text-xs mt-0.5 select-none font-bold">»</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer message */}
      <div className="border-t border-card-border/30 pt-2.5 mt-2.5 text-xs text-muted flex items-center gap-1.5 select-none">
        <Activity size={10} className="text-accent-teal animate-pulse" />
        <span className="truncate">Historical telemetry validated. Experience nodes nominal.</span>
      </div>
    </section>
  );
}
