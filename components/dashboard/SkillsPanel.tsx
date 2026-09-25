"use client";

import { skillCategories } from "@/data/skills";
import { Radio, Layers } from "lucide-react";

const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.items.length, 0);

export default function SkillsPanel() {
  return (
    <section id="skills" className="glass-panel p-5 font-mono text-sm transition-all duration-300 flex flex-col justify-between lg:h-[560px]">
      {/* Panel Header - Large Highlighted Tab */}
      <div>
        <div className="flex items-center justify-between border-b border-card-border pb-3 mb-4 select-none">
          <h2 className="flex items-center gap-2 px-3 py-1.5 m-0 bg-accent-teal/15 border border-accent-teal/30 rounded text-accent-teal font-bold text-sm tracking-wider uppercase">
            <Radio size={14} />
            <span>SKILLS_SPECTRUM</span>
          </h2>
          <div className="text-xs text-muted font-bold tracking-wider mr-1">CH_808.5</div>
        </div>

        {/* Real inventory readout (replaces the former random equalizer) */}
        <div className="bg-background/40 border border-card-border/60 rounded p-3 mb-3 select-none flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-1.5">
            <Layers size={11} className="text-accent-teal" />
            <span>{skillCategories.length} CATEGORIES · {totalSkills} COMPETENCIES</span>
          </div>
          <span className="text-accent-teal font-bold">FOCUS: EDGE_AI</span>
        </div>
      </div>

      {/* Categories Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="border border-card-border/60 bg-background/10 rounded p-3">
            <div className="text-xs text-accent-teal font-bold mb-2 border-b border-card-border/30 pb-1 select-none uppercase tracking-wide">
              [SIG_CH.{String(idx).padStart(2, "0")}{" // "}{cat.category}]
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((skill, sIdx) => {
                const isTarget = [
                  "TensorFlow Lite",
                  "ONNX",
                  "Edge AI & Deployment",
                  "Model Optimisation",
                  "On-Device Inference",
                  "Raspberry Pi",
                  "PyTorch",
                  "CI/CD Pipelines",
                  "Anomaly Detection"
                ].includes(skill);

                return (
                  <span
                    key={sIdx}
                    className={`px-2 py-0.5 rounded text-xs font-sans border transition-all duration-250 ${
                      isTarget
                        ? "bg-accent-amber/10 border-accent-amber/50 text-accent-amber font-bold font-mono shadow-sm"
                        : "bg-muted-light/65 border-card-border/70 text-foreground"
                    }`}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer message */}
      <div className="border-t border-card-border/30 pt-2.5 mt-2.5 text-xs text-muted flex items-center gap-1.5 select-none">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
        <span className="truncate">Focus: Edge AI &amp; deep learning.</span>
      </div>
    </section>
  );
}
