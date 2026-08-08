"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ExternalLink, GitBranch, Terminal, ChevronDown, ChevronUp } from "lucide-react";

export default function FleetPanel() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="fleet" className="border border-card-border bg-card-bg rounded p-6 font-mono text-xs shadow-sm hover:shadow-md transition-all duration-300">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-card-border pb-3 mb-4 select-none">
        <div className="flex items-center gap-2 font-bold text-foreground text-xs uppercase tracking-wider">
          <Terminal size={14} className="text-accent-teal animate-pulse" />
          <span>FLEET_STATUS // SYSTEM_MONITORS</span>
        </div>
        <div className="text-[9px] text-muted tracking-wider">
          ACTIVE_UNITS: 0{projects.length} // NOMINAL
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project, index) => {
          const isExpanded = expandedIndex === index;
          const isBuilt = project.status === "BUILT";
          
          return (
            <div 
              key={index}
              className={`border rounded p-4 transition-all duration-300 ${
                isExpanded 
                  ? "border-accent-teal/50 bg-accent-teal/[0.01]" 
                  : "border-card-border bg-background/30 hover:border-card-border/80 hover:bg-card-bg/50"
              }`}
            >
              {/* Card Title & Status Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 select-none">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-muted bg-muted-light/40 px-1 py-0.5 rounded border border-card-border/40 font-bold">
                    NODE_0{index + 1}
                  </span>
                  <h3 className="font-bold text-foreground text-[13px] tracking-tight font-sans">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-muted">{project.period}</span>
                  <span 
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider border ${
                      isBuilt 
                        ? "bg-accent-teal/10 border-accent-teal/30 text-accent-teal" 
                        : "bg-accent-amber/10 border-accent-amber/30 text-accent-amber"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${isBuilt ? "bg-accent-teal" : "bg-accent-amber animate-ping"}`}></span>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-[11px] text-muted leading-relaxed mb-3">
                {project.description}
              </p>

              {/* Collapsible Logs/Features Section */}
              <div className="border-t border-card-border/30 pt-2.5 mt-2.5">
                <button
                  onClick={() => toggleExpand(index)}
                  className="flex items-center gap-1 text-[9px] text-accent-teal hover:text-accent-teal/80 cursor-pointer font-bold tracking-wider"
                >
                  {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                  <span>{isExpanded ? "HIDE_TELEMETRY_LOGS" : "VIEW_TELEMETRY_LOGS"}</span>
                </button>

                {isExpanded && (
                  <div className="mt-2.5 pl-2 border-l border-accent-teal/30 space-y-1.5 text-[10.5px] text-muted leading-relaxed font-sans animate-fadeIn">
                    {project.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2">
                        <span className="text-accent-teal font-mono text-[8px] mt-1 select-none">↳ LOG_0{bIdx}:</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer: Tech pills and links */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-card-border/30 pt-2.5 mt-2.5">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1 max-w-[75%] select-none">
                  {project.tech.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-1.5 py-0.5 text-[8.5px] rounded bg-muted-light/60 border border-card-border/50 text-foreground font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex items-center gap-2.5">
                  {project.links.github && project.links.github !== "#" && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[9px] font-bold text-muted hover:text-accent-teal transition-colors duration-200"
                      title="View source code on GitHub"
                    >
                      <GitBranch size={10} />
                      <span>REPO</span>
                    </a>
                  )}
                  {project.links.live && project.links.live !== "#" && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[9px] font-bold text-muted hover:text-accent-teal transition-colors duration-200"
                      title="View live deployment"
                    >
                      <ExternalLink size={10} />
                      <span>LIVE</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
