"use client";

import { experiences } from "@/data/experience";
import { Briefcase, Activity, Terminal } from "lucide-react";

export default function ExperiencePanel() {
  return (
    <section id="experience" className="border border-card-border bg-card-bg rounded p-5 font-mono text-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[480px]">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between border-b border-card-border pb-2.5 mb-3 select-none">
          <div className="flex items-center gap-2 font-bold text-foreground text-xs uppercase tracking-wider">
            <Terminal size={14} className="text-accent-teal animate-pulse" />
            <span>EXPERIENCE_LOGS // TIMELINE</span>
          </div>
          <div className="text-[10px] text-muted tracking-wider">LOG_DB.02</div>
        </div>
      </div>

      {/* Experience Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 custom-scrollbar">
        {experiences.map((exp, index) => (
          <div key={index} className="border border-card-border bg-background/25 rounded p-3 relative">
            <div className="flex items-center justify-between gap-2 border-b border-card-border/30 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5 text-foreground font-bold font-sans text-xs">
                <Briefcase size={12} className="text-accent-teal" />
                <span>{exp.role}</span>
              </div>
              <span className="text-[10px] text-muted">{exp.period}</span>
            </div>
            <div className="text-[10.5px] text-accent-amber font-bold mb-2">
              {exp.company} // {exp.location}
            </div>
            <div className="space-y-1.5 text-xs text-muted font-sans pl-1.5 border-l border-card-border/60">
              {exp.bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-1.5">
                  <span className="text-accent-teal font-mono text-[10px] mt-0.5 select-none font-bold">»</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer message */}
      <div className="border-t border-card-border/30 pt-2.5 mt-2.5 text-[10px] text-muted flex items-center gap-1.5 select-none">
        <Activity size={10} className="text-accent-teal animate-pulse" />
        <span className="truncate">Historical telemetry validated. Experience nodes nominal.</span>
      </div>
    </section>
  );
}
