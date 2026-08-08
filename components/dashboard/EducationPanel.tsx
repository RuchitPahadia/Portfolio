"use client";

import { educationAchievements } from "@/data/education";
import { GraduationCap, CheckCircle, Award, Activity } from "lucide-react";

export default function EducationPanel() {
  return (
    <section id="education" className="border border-card-border bg-card-bg rounded p-5 font-mono text-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[490px]">
      {/* Panel Header - Large Highlighted Tab */}
      <div>
        <div className="flex items-center justify-between border-b border-card-border pb-3 mb-4 select-none">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-teal/15 border border-accent-teal/30 rounded text-accent-teal font-bold text-sm tracking-wider uppercase">
            <GraduationCap size={14} className="animate-pulse" />
            <span>ACADEMIC_METRICS // STATUS</span>
          </div>
          <div className="text-xs text-muted font-bold tracking-wider mr-1">SEC_VER.01</div>
        </div>
      </div>

      {/* Education Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
        {/* Education Blocks */}
        <div className="space-y-2.5">
          <span className="text-[10px] text-muted tracking-wider uppercase select-none block font-bold">
            ACADEMIC_RECORD
          </span>
          {educationAchievements.education.map((edu, index) => (
            <div key={index} className="border border-card-border bg-background/25 rounded p-3">
              <div className="flex justify-between items-start border-b border-card-border/20 pb-1.5 mb-1.5">
                <div className="font-bold text-foreground flex items-center gap-1 text-xs font-sans">
                  <span>{edu.degree}</span>
                </div>
                <span className="text-xs text-muted font-mono">{edu.period}</span>
              </div>
              <div className="text-xs text-accent-amber font-mono">{edu.institution}</div>
              <div className="text-xs text-muted font-mono mt-0.5">SCORE: {edu.grade}</div>
            </div>
          ))}
        </div>

        {/* Certifications and Achievements */}
        <div className="border-t border-card-border/30 pt-3.5 space-y-3.5">
          {/* Certifications */}
          <div>
            <span className="text-[10px] text-muted tracking-wider uppercase mb-2 select-none block font-bold">
              CERTIFICATION_KEYS
            </span>
            <div className="space-y-2 text-xs text-muted font-sans">
              {educationAchievements.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-1.5 bg-background/25 p-2 rounded border border-card-border/40">
                  <CheckCircle size={10} className="text-accent-teal shrink-0" />
                  <div className="truncate">
                    <span className="font-bold text-foreground font-mono text-[10.5px]">{cert.name}</span>
                    <span className="opacity-75"> ({cert.issuer}, {cert.year})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <span className="text-[10px] text-muted tracking-wider uppercase mb-2 select-none block font-bold">
              SYSTEM_ACHIEVEMENTS
            </span>
            <div className="space-y-2 text-xs">
              {educationAchievements.achievements.map((ach, index) => (
                <div key={index} className="bg-background/25 p-2.5 rounded border border-card-border/40">
                  <div className="flex justify-between text-xs text-foreground font-bold font-mono border-b border-card-border/10 pb-1 mb-1">
                    <span className="flex items-center gap-1 font-sans font-bold">
                      <Award size={12} className="text-accent-amber" />
                      {ach.title}
                    </span>
                    <span className="text-accent-amber text-[10px]">{ach.year}</span>
                  </div>
                  <p className="text-xs text-muted font-sans mt-1 leading-relaxed">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer message */}
      <div className="border-t border-card-border/30 pt-2.5 mt-2.5 text-xs text-muted flex items-center gap-1.5 select-none">
        <Activity size={10} className="text-accent-teal animate-pulse" />
        <span className="truncate">Academic validation verified. Registry matches secure nodes.</span>
      </div>
    </section>
  );
}
