"use client";

import { useState, useEffect } from "react";
import { skillCategories } from "@/data/skills";
import { Radio, Cpu, Activity } from "lucide-react";

export default function SkillsPanel() {
  const [barHeights, setBarHeights] = useState<number[]>([]);

  // Equalizer visualizer setup
  useEffect(() => {
    // Initialize 24 spectral bars
    setBarHeights(Array.from({ length: 24 }, () => Math.floor(Math.random() * 30) + 5));

    const interval = setInterval(() => {
      setBarHeights((prev) =>
        prev.map((height) => {
          const change = Math.floor(Math.random() * 12) - 6;
          return Math.max(5, Math.min(45, height + change));
        })
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills" className="border border-card-border bg-card-bg rounded p-5 font-mono text-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[480px]">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between border-b border-card-border pb-2.5 mb-3 select-none">
          <div className="flex items-center gap-2 font-bold text-foreground text-xs uppercase tracking-wider">
            <Radio size={14} className="text-accent-teal animate-pulse" />
            <span>SKILLS_SPECTRUM // TELEMETRY</span>
          </div>
          <div className="text-[10px] text-muted tracking-wider">CH_808.5</div>
        </div>

        {/* Live Equalizer Visualizer */}
        <div className="bg-background/40 border border-card-border/60 rounded p-3 mb-3 select-none">
          <div className="flex items-end justify-between h-10 gap-[2px] px-1 border-b border-card-border/30">
            {barHeights.map((height, idx) => (
              <div 
                key={idx}
                className="w-full rounded-t-sm transition-all duration-150"
                style={{
                  height: `${height}px`,
                  backgroundColor: idx % 2 === 0 ? "var(--accent-teal)" : "var(--accent-amber)",
                  opacity: 0.8
                }}
              />
            ))}
          </div>

          <div className="flex justify-between items-center text-[9px] text-muted mt-1.5">
            <div className="flex items-center gap-1">
              <Cpu size={9} className="text-accent-amber animate-spin" style={{ animationDuration: "4s" }} />
              <span>MOD: QAM-64</span>
            </div>
            <div>STATUS: OPTIMAL</div>
          </div>
        </div>
      </div>

      {/* Categories Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 custom-scrollbar">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="border border-card-border/60 bg-background/10 rounded p-2.5">
            <div className="text-[10px] text-accent-teal font-bold mb-1.5 border-b border-card-border/30 pb-0.5 select-none uppercase">
              [SIG_CH.0{idx} // {cat.category}]
            </div>
            <div className="flex flex-wrap gap-1">
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
                    className={`px-1.5 py-0.5 rounded text-[10.5px] font-sans border transition-all duration-250 ${
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
      <div className="border-t border-card-border/30 pt-2.5 mt-2.5 text-[10px] text-muted flex items-center gap-1.5 select-none">
        <Activity size={10} className="text-accent-teal animate-pulse" />
        <span className="truncate">Telemetry decoded. Focus: Edge AI & deep learning.</span>
      </div>
    </section>
  );
}
