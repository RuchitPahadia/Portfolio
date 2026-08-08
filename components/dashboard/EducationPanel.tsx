"use client";

import { educationAchievements } from "@/data/education";
import { GraduationCap, CheckCircle, Award, Activity } from "lucide-react";

export default function EducationPanel() {
  return (
    <section id="education" className="border border-card-border bg-card-bg rounded p-5 font-mono text-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[480px]">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between border-b border-card-border pb-2.5 mb-3 select-none">
          <div className="flex items-center gap-2 font-bold text-foreground text-xs uppercase tracking-wider">
            <GraduationCap size={14} className="text-accent-teal animate-pulse" />
            <span>ACADEMIC_METRICS // STATUS</span>
          </div>
          <div className="text-[10px] text-muted tracking-wider">SEC_VER.01</div>
        </div>
      </div>

      {/* Education Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 custom-scrollbar">
        {/* Education Blocks */}
        <div className="space-y-2">
          <span className="text-[9px] text-muted tracking-wider uppercase select-none block">
            ACADEMIC_RECORD
          </span>
          {educationAchievements.education.map((edu, index) => (
            <div key={index} className="border border-card-border bg-background/25 rounded p-2.5">
              <div className="flex justify-between items-start border-b border-card-border/20 pb-1 mb-1">
                <div className="font-bold text-foreground flex items-center gap-1 text-[11px] font-sans">
                  <span>{edu.degree}</span>
                </div>
                <span className="text-[9.5px] text-muted font-mono">{edu.period}</span>
              </div>
              <div className="text-[10px] text-accent-amber font-mono">{edu.institution}</div>
              <div className="text-[10px] text-muted font-mono mt-0.5">SCORE: {edu.grade}</div>
            </div>
          ))}
        </div>

        {/* Certifications and Achievements */}
        <div className="border-t border-card-border/30 pt-3 space-y-3">
          {/* Certifications */}
          <div>
            <span className="text-[9px] text-muted tracking-wider uppercase mb-1.5 select-none block">
              CERTIFICATION_KEYS
            </span>
            <div className="space-y-1 text-[10.5px] text-muted font-sans">
              {educationAchievements.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-background/25 p-1.5 rounded border border-card-border/40">
                  <CheckCircle size={10} className="text-accent-teal shrink-0" />
                  <div className="truncate">
                    <span className="font-bold text-foreground font-mono text-[10px]">{cert.name}</span>
                    <span className="opacity-75"> ({cert.issuer}, {cert.year})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <span className="text-[9px] text-muted tracking-wider uppercase mb-1.5 select-none block">
              SYSTEM_ACHIEVEMENTS
            </span>
            <div className="space-y-1 text-xs">
              {educationAchievements.achievements.map((ach, index) => (
                <div key={index} className="bg-background/25 p-2 rounded border border-card-border/40">
                  <div className="flex justify-between text-[10px] text-foreground font-bold font-mono">
                    <span className="flex items-center gap-1 font-sans">
                      <Award size={12} className="text-accent-amber" />
                      {ach.title}
                    </span>
                    <span className="text-accent-amber text-[9px]">{ach.year}</span>
                  </div>
                  <p className="text-[10.5px] text-muted font-sans mt-1">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer message */}
      <div className="border-t border-card-border/30 pt-2.5 mt-2.5 text-[10px] text-muted flex items-center gap-1.5 select-none">
        <Activity size={10} className="text-accent-teal animate-pulse" />
        <span className="truncate">Academic validation verified. Registry matches secure nodes.</span>
      </div>
    </section>
  );
}
