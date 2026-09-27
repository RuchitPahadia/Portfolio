"use client";

import { skillCategories } from "@/data/skills";
import { Radio, Layers, BarChart3 } from "lucide-react";

const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.items.length, 0);

const HIGHLIGHT_CATEGORY = "Edge AI & Deployment";

// Real derived distribution: competencies per category (no invented ratings).
const distribution = skillCategories.map((cat) => ({
  category: cat.category,
  count: cat.items.length,
  highlight: cat.category === HIGHLIGHT_CATEGORY
}));
// Guard the divisor so an empty/all-empty data set can never yield NaN widths.
const maxCount = Math.max(1, ...distribution.map((d) => d.count));

// SVG geometry (viewBox units). Widths are computed here so the final bar
// lengths are present in the server-rendered markup; the CSS animation below
// is progressive enhancement only (reduced-motion handled in globals.css).
const CHART_W = 260;
const ROW_H = 30;
const BAR_H = 7;
const TRACK_X = 4;
const TRACK_W = CHART_W - TRACK_X;
const chartHeight = distribution.length * ROW_H;

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

        {/* Competency-density chart (real derived counts per category).
            Kept outside the flex-1 scroll area so it is always visible. */}
        <div className="mb-3 select-none">
          <div className="flex items-center gap-1.5 text-xs text-accent-teal font-bold mb-2 border-b border-card-border/30 pb-1 uppercase tracking-wide">
            <BarChart3 size={11} />
            <span>[DIST_MAP{" // "}COMPETENCY_DENSITY]</span>
          </div>
          <svg
            viewBox={`0 0 ${CHART_W} ${chartHeight}`}
            width="100%"
            role="img"
            className="block w-full h-auto"
            preserveAspectRatio="xMinYMin meet"
          >
            <title>
              {`Skills per category: ${distribution
                .map((d) => `${d.category} ${d.count}`)
                .join(", ")}.`}
            </title>
            {distribution.map((d, i) => {
              const top = i * ROW_H;
              const barW = Math.round((d.count / maxCount) * TRACK_W);
              const fill = d.highlight ? "var(--accent-amber)" : "var(--accent-teal)";
              return (
                <g key={d.category}>
                  <text
                    x={TRACK_X}
                    y={top + 9}
                    fontSize="8.5"
                    fill="var(--foreground)"
                    fontWeight="600"
                  >
                    {d.category}
                  </text>
                  <text
                    x={CHART_W}
                    y={top + 9}
                    fontSize="8.5"
                    fill={fill}
                    fontWeight="700"
                    textAnchor="end"
                  >
                    {d.count}
                  </text>
                  <rect
                    x={TRACK_X}
                    y={top + 13}
                    width={TRACK_W}
                    height={BAR_H}
                    rx={3}
                    fill="var(--card-border)"
                    opacity="0.4"
                  />
                  <rect
                    className="skills-bar"
                    x={TRACK_X}
                    y={top + 13}
                    width={barW}
                    height={BAR_H}
                    rx={3}
                    fill={fill}
                    style={{ transformOrigin: `${TRACK_X}px ${top + 13 + BAR_H / 2}px` }}
                  />
                </g>
              );
            })}
          </svg>
          <style>{`
            @keyframes skillsBarGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
            .skills-bar { animation: skillsBarGrow 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
          `}</style>
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
