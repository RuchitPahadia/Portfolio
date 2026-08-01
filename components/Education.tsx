"use client";

import React from "react";
import { motion } from "framer-motion";
import { educationAchievements } from "@/data/education";
import { GraduationCap, Award, Trophy, Calendar, Sparkles } from "lucide-react";

export default function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="education" className="py-28 bg-muted-light/30 border-b border-card-border/50 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/5 dark:bg-purple-900/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column: Education */}
          <div className="lg:col-span-6 flex flex-col h-full">
            <div className="mb-10">
              <div className="flex items-center gap-2 text-accent font-semibold tracking-wider text-sm uppercase mb-3">
                <GraduationCap size={16} />
                <span>Academic Path</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Education</h2>
              <div className="h-1 bg-accent mt-4 w-12 rounded-full" />
            </div>

            <div className="relative pl-6 border-l border-card-border/80 space-y-12 flex-1 py-2">
              {educationAchievements.education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Bullet Node */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-background group-hover:bg-accent transition-colors" />

                  <div className="p-5 rounded-2xl bg-card-bg border border-card-border hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-1.5 text-xs text-muted mb-2 font-medium">
                      <Calendar size={12} className="text-accent" />
                      <span>{edu.period}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-semibold text-muted mt-1">
                      {edu.institution}
                    </p>
                    <div className="mt-3 inline-flex items-center text-xs font-bold text-accent bg-accent/5 border border-accent/15 px-2.5 py-1 rounded-md">
                      {edu.grade}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Achievements & Certifications */}
          <div className="lg:col-span-6 flex flex-col h-full">
            <div className="mb-10">
              <div className="flex items-center gap-2 text-accent font-semibold tracking-wider text-sm uppercase mb-3">
                <Trophy size={16} />
                <span>Recognition</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Achievements & Certs</h2>
              <div className="h-1 bg-accent mt-4 w-12 rounded-full" />
            </div>

            <div className="space-y-8 flex-1 flex flex-col justify-start">
              {/* Achievements block */}
              <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="text-xs uppercase tracking-widest text-muted font-bold flex items-center gap-1.5">
                  <Award size={14} className="text-accent" />
                  Key Achievements
                </h3>
                
                {educationAchievements.achievements.map((ach, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-2xl bg-card-bg border border-card-border hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                        {ach.title}
                      </h4>
                      {ach.year && (
                        <span className="text-xs text-muted font-medium bg-muted-light px-2 py-0.5 rounded border border-card-border/50">
                          {ach.year}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Certifications block */}
              <motion.div variants={itemVariants} className="space-y-4 flex-1">
                <h3 className="text-xs uppercase tracking-widest text-muted font-bold flex items-center gap-1.5">
                  <Sparkles size={14} className="text-accent" />
                  Certifications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {educationAchievements.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-card-bg border border-card-border hover:border-accent/40 shadow-sm transition-all duration-200"
                    >
                      <h4 className="text-sm font-bold text-foreground leading-tight line-clamp-1">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-muted mt-1 leading-tight line-clamp-1">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-muted/80 mt-3 font-medium">
                        <Calendar size={10} />
                        <span>{cert.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
