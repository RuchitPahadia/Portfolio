"use client";

import { useState, useEffect } from "react";
import { skillCategories } from "@/data/skills";
import { educationAchievements } from "@/data/education";
import { experiences } from "@/data/experience";
import { Radio, Cpu, Activity, Briefcase, GraduationCap, CheckCircle } from "lucide-react";

type ActiveTab = "skills" | "experience" | "academics";

export default function SignalPanel() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("skills");
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0].category);
  const [barHeights, setBarHeights] = useState<number[]>([]);

  // Equalizer visualizer setup
  useEffect(() => {
    // Initialize 28 spectral bars
    setBarHeights(Array.from({ length: 28 }, () => Math.floor(Math.random() * 40) + 10));

    const interval = setInterval(() => {
      setBarHeights((prev) =>
        prev.map((height) => {
          const change = Math.floor(Math.random() * 16) - 8;
          return Math.max(5, Math.min(60, height + change));
        })
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="signal" className="border border-card-border bg-card-bg rounded p-6 font-mono text-xs shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[500px]">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between border-b border-card-border pb-3 mb-4 select-none">
          <div className="flex items-center gap-2 font-bold text-foreground text-xs uppercase tracking-wider">
            <Radio size={14} className="text-accent-teal animate-pulse" />
            <span>SIGNAL_SPECTRUM // TELEMETRY_FEED</span>
          </div>
          <div className="text-[9px] text-muted tracking-wider">
            CHANNEL: CH_808.5 // GAIN: +12dB
          </div>
        </div>

        {/* Live Equalizer Visualizer */}
        <div className="bg-background/40 border border-card-border/60 rounded p-4 mb-4 select-none">
          <div className="flex items-center justify-between text-[8px] text-muted mb-2">
            <span>0.1 Hz</span>
            <span>SPECTRUM ANALYZER (LIVE_FEED)</span>
            <span>12.5 kHz</span>
          </div>
          
          {/* Equalizer Bars */}
          <div className="flex items-end justify-between h-12 gap-[2px] px-1 border-b border-card-border/30">
            {barHeights.map((height, idx) => (
              <div 
                key={idx}
                className="w-full rounded-t-sm transition-all duration-150"
                style={{
                  height: `${height}px`,
                  backgroundColor: idx % 2 === 0 ? "var(--accent-teal)" : "var(--accent-amber)",
                  opacity: 0.85
                }}
              />
            ))}
          </div>

          <div className="flex justify-between items-center text-[8.5px] text-muted mt-2">
            <div className="flex items-center gap-1.5">
              <Cpu size={10} className="text-accent-amber animate-spin" style={{ animationDuration: "3s" }} />
              <span>MOD: QAM-64 // DEV_LEVEL: OPTIMAL</span>
            </div>
            <div>FEED_SOURCE: {activeTab.toUpperCase()}</div>
          </div>
        </div>

        {/* Sub-Panel Selectors (Tabs) */}
        <div className="flex items-center gap-1.5 border-b border-card-border/50 pb-2 mb-4 select-none">
          <button
            onClick={() => setActiveTab("skills")}
            className={`px-3 py-1 rounded-sm text-[10px] font-bold border transition-all duration-200 cursor-pointer ${
              activeTab === "skills"
                ? "bg-accent-teal/10 border-accent-teal/50 text-accent-teal"
                : "bg-background/10 border-transparent text-muted hover:text-foreground"
            }`}
          >
            CH_00: SKILLS_SPECTRUM
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-3 py-1 rounded-sm text-[10px] font-bold border transition-all duration-200 cursor-pointer ${
              activeTab === "experience"
                ? "bg-accent-teal/10 border-accent-teal/50 text-accent-teal"
                : "bg-background/10 border-transparent text-muted hover:text-foreground"
            }`}
          >
            CH_01: EXPERIENCE_LOGS
          </button>
          <button
            onClick={() => setActiveTab("academics")}
            className={`px-3 py-1 rounded-sm text-[10px] font-bold border transition-all duration-200 cursor-pointer ${
              activeTab === "academics"
                ? "bg-accent-teal/10 border-accent-teal/50 text-accent-teal"
                : "bg-background/10 border-transparent text-muted hover:text-foreground"
            }`}
          >
            CH_02: EDUCATION_METRICS
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto mb-4">
        {/* SKILLS TAB */}
        {activeTab === "skills" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Category triggers */}
            <div className="md:col-span-5 flex flex-col gap-1.5 border-r border-card-border/30 pr-0 md:pr-4">
              <span className="text-[9px] text-muted tracking-wider uppercase mb-1 border-b border-card-border/30 pb-1 select-none">
                SIG_CHANNELS
              </span>
              {skillCategories.map((cat, idx) => {
                const isActive = cat.category === activeCategory;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(cat.category)}
                    className={`flex items-center justify-between w-full text-left px-2 py-1 rounded text-[10px] transition-all duration-200 cursor-pointer border ${
                      isActive 
                        ? "bg-accent-teal/10 border-accent-teal/50 text-accent-teal" 
                        : "bg-background/25 border-card-border/50 text-muted hover:text-foreground hover:bg-card-bg/40"
                    }`}
                  >
                    <span>{cat.category}</span>
                    <span className="text-[8px] opacity-60">
                      {isActive ? "LIVE" : `0x0${idx}`}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right pills */}
            <div className="md:col-span-7 flex flex-col gap-2">
              <span className="text-[9px] text-muted tracking-wider uppercase mb-1 border-b border-card-border/30 pb-1 select-none">
                DECODED_TELEMETRY
              </span>
              
              <div className="flex flex-wrap gap-1.5">
                {skillCategories
                  .find((cat) => cat.category === activeCategory)
                  ?.items.map((skill, sIdx) => {
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
                        className={`px-1.5 py-0.5 rounded text-[10.5px] font-sans border transition-all duration-200 ${
                          isTarget
                            ? "bg-accent-amber/10 border-accent-amber/55 text-accent-amber font-bold font-mono shadow-sm"
                            : "bg-muted-light/65 border-card-border/70 text-foreground"
                        }`}
                      >
                        {isTarget && <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-amber mr-1 animate-pulse"></span>}
                        {skill}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === "experience" && (
          <div className="space-y-4">
            <span className="text-[9px] text-muted tracking-wider uppercase mb-1 border-b border-card-border/30 pb-1 block select-none">
              HISTORICAL_TIMELINE_LOGS
            </span>

            {experiences.map((exp, index) => (
              <div key={index} className="border border-card-border bg-background/20 rounded p-3 relative">
                <div className="flex items-center justify-between gap-2 border-b border-card-border/30 pb-1.5 mb-2">
                  <div className="flex items-center gap-1.5 text-foreground font-bold font-sans">
                    <Briefcase size={12} className="text-accent-teal" />
                    <span>{exp.role}</span>
                  </div>
                  <span className="text-[9.5px] text-muted">{exp.period}</span>
                </div>
                <div className="text-[9.5px] text-accent-amber font-bold mb-2">
                  {exp.company} // {exp.location}
                </div>
                <div className="space-y-1.5 text-[10.5px] text-muted font-sans pl-1.5 border-l border-card-border/60">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-1.5">
                      <span className="text-accent-teal font-mono text-[8px] mt-1 select-none">»</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACADEMICS TAB */}
        {activeTab === "academics" && (
          <div className="space-y-4">
            {/* Education section */}
            <div>
              <span className="text-[9px] text-muted tracking-wider uppercase mb-1 border-b border-card-border/30 pb-1 block select-none">
                ACADEMIC_RECORD
              </span>
              <div className="space-y-2.5">
                {educationAchievements.education.map((edu, index) => (
                  <div key={index} className="border border-card-border/70 bg-background/10 rounded p-2.5">
                    <div className="flex justify-between items-start border-b border-card-border/20 pb-1 mb-1">
                      <div className="font-bold text-foreground flex items-center gap-1">
                        <GraduationCap size={12} className="text-accent-teal" />
                        <span>{edu.degree}</span>
                      </div>
                      <span className="text-[9px] text-muted font-mono">{edu.period}</span>
                    </div>
                    <div className="text-[9.5px] text-accent-amber font-mono">{edu.institution}</div>
                    <div className="text-[9.5px] text-muted font-mono mt-0.5">SCORE: {edu.grade}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications and Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-card-border/30 pt-3">
              {/* Left Column: Certifications */}
              <div>
                <span className="text-[9px] text-muted tracking-wider uppercase mb-1.5 block select-none">
                  CERTIFICATION_KEYS
                </span>
                <div className="space-y-1 text-[10px] text-muted font-sans">
                  {educationAchievements.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-1.5 bg-background/20 p-1.5 rounded border border-card-border/40">
                      <CheckCircle size={10} className="text-accent-teal shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-foreground font-mono">{cert.name}</span>
                        <span className="opacity-75"> ({cert.issuer}, {cert.year})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Achievements */}
              <div>
                <span className="text-[9px] text-muted tracking-wider uppercase mb-1.5 block select-none">
                  SYSTEM_ACHIEVEMENTS
                </span>
                <div className="space-y-1.5">
                  {educationAchievements.achievements.map((ach, index) => (
                    <div key={index} className="bg-background/20 p-1.5 rounded border border-card-border/40">
                      <div className="flex justify-between text-[10px] text-foreground font-bold font-mono">
                        <span>{ach.title}</span>
                        <span className="text-accent-amber text-[9px]">{ach.year}</span>
                      </div>
                      <p className="text-[9.5px] text-muted font-sans mt-0.5">{ach.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer message */}
      <div className="border-t border-card-border/30 pt-3 text-[9px] text-muted flex items-center gap-1.5 select-none">
        <Activity size={10} className="text-accent-teal animate-pulse" />
        <span>
          {activeTab === "skills" && "Telemetry decoded. Focus centered on high-throughput ML pipelines & edge hardware optimization."}
          {activeTab === "experience" && "Historical telemetry files mapped. Experience validated in enterprise AI & embedded architectures."}
          {activeTab === "academics" && "Academic keys checked. Verified by BNMIT & external certification gateways."}
        </span>
      </div>
    </section>
  );
}
