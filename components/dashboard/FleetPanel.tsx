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
    <section id="fleet" className="border border-card-border bg-card-bg rounded p-6 font-mono text-sm shadow-sm hover:shadow-md transition-all duration-300">
      {/* Panel Header - Large Highlighted Tab */}
      <div className="flex items-center justify-between border-b border-card-border pb-3 mb-4 select-none">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-amber/15 border border-accent-amber/30 rounded text-accent-amber font-bold text-sm tracking-wider uppercase">
          <Terminal size={14} className="animate-pulse" />
          <span>FLEET_STATUS // SYSTEM_MONITORS</span>
        </div>
        <div className="text-xs text-muted font-bold tracking-wider mr-1">
          ACTIVE_UNITS: 0{projects.length}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[...projects]
          .sort((a, b) => {
            if (a.status === "BUILT" && b.status !== "BUILT") return -1;
            if (a.status !== "BUILT" && b.status === "BUILT") return 1;
            return 0;
          })
          .map((project, index) => {
            const isExpanded = expandedIndex === index;
            const isBuilt = project.status === "BUILT";
            
            return (
              <div 
                key={index}
                className={`border rounded p-5 transition-all duration-300 ${
                  isExpanded 
                    ? "border-accent-teal/50 bg-accent-teal/[0.01]" 
                    : "border-card-border bg-background/30 hover:border-card-border/80 hover:bg-card-bg/50"
                }`}
              >
                {/* Card Title & Status Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5 select-none">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-muted bg-muted-light/45 px-2 py-0.5 rounded border border-card-border/40 font-bold">
                      NODE_0{index + 1}
                    </span>
                    <h3 className="font-bold text-foreground text-lg tracking-tight font-sans">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted font-mono">{project.period}</span>
                    <span 
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold tracking-wider border ${
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
                <p className="font-sans text-sm md:text-[15px] text-muted leading-relaxed mb-3.5">
                  {project.description}
                </p>

                {/* Collapsible Logs/Features Section */}
                <div className="border-t border-card-border/30 pt-3 mt-3">
                  <button
                    onClick={() => toggleExpand(index)}
                    className="flex items-center gap-1.5 text-xs text-accent-teal hover:text-accent-teal/80 cursor-pointer font-bold tracking-wider"
                  >
                    {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    <span>{isExpanded ? "HIDE_TELEMETRY_LOGS" : "VIEW_TELEMETRY_LOGS"}</span>
                  </button>

                  {isExpanded && (
                    <div className="mt-3 pl-2.5 border-l border-accent-teal/30 space-y-2 text-sm text-muted leading-relaxed font-sans animate-fadeIn">
                      {project.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5">
                          <span className="text-accent-teal font-mono text-xs mt-1 select-none font-bold">↳ LOG_0{bIdx}:</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer: Tech pills and links */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-card-border/30 pt-3 mt-3">
                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 max-w-[75%] select-none">
                    {project.tech.map((tech, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2 py-0.5 text-[10.5px] rounded bg-muted-light/65 border border-card-border/50 text-foreground font-mono font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center gap-3">
                    {project.links.github && project.links.github !== "#" && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-accent-teal transition-colors duration-200"
                        title="View source code on GitHub"
                      >
                        <GitBranch size={12} />
                        <span>REPO</span>
                      </a>
                    )}
                    {project.links.live && project.links.live !== "#" && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-accent-teal transition-colors duration-200"
                        title="View live deployment"
                      >
                        <ExternalLink size={12} />
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
