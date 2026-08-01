"use client";

import React from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { Calendar, MapPin, Sparkles, Briefcase, Cpu } from "lucide-react";

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="experience" className="py-28 bg-background border-b border-card-border/50 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/3 left-0 w-[350px] h-[350px] bg-accent/5 dark:bg-accent/3 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-accent font-semibold tracking-wider text-sm uppercase mb-3"
          >
            <Briefcase size={16} />
            <span>Journey</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Work Experience & Training
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-accent mt-4 mx-auto rounded-full"
          />
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical connecting line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent/50 via-purple-500/30 to-transparent -translate-x-1/2 pointer-events-none hidden md:block" />
          <div className="absolute left-8 top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent/50 via-purple-500/30 to-transparent pointer-events-none md:hidden" />

          {/* Experience Cards container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-16"
          >
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isHighlight = exp.isHighlight;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row md:justify-between items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-4 border-background bg-card-bg flex items-center justify-center -translate-x-1/2 z-20 shadow-md md:block hidden">
                    <div className={`w-3.5 h-3.5 rounded-full ${isHighlight ? "bg-purple-500 animate-pulse" : "bg-accent"}`} />
                  </div>

                  <div className="absolute left-8 w-8 h-8 rounded-full border-4 border-background bg-card-bg flex items-center justify-center -translate-x-1/2 z-20 shadow-md md:hidden">
                    <div className={`w-3.5 h-3.5 rounded-full ${isHighlight ? "bg-purple-500 animate-pulse" : "bg-accent"}`} />
                  </div>

                  {/* Left/Right Card Spacer for Desktop Grid alignment */}
                  <div className="w-full md:w-[45%] hidden md:block" />

                  {/* Experience Card */}
                  <div className="w-full md:w-[47%] pl-12 md:pl-0">
                    <div
                      className={`p-6 rounded-2xl bg-card-bg border transition-all duration-300 group hover:shadow-lg relative overflow-hidden ${
                        isHighlight
                          ? "border-purple-500/30 hover:border-purple-500/50 shadow-purple-500/5"
                          : "border-card-border hover:border-accent/40"
                      }`}
                    >
                      {/* Ambient corner highlights */}
                      <div
                        className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full pointer-events-none opacity-20 transition-opacity group-hover:opacity-30 ${
                          isHighlight ? "bg-purple-500/20" : "bg-accent/20"
                        }`}
                      />

                      {/* Header details */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                            {exp.role}
                          </h3>
                          <div className="text-base font-semibold text-accent mt-1 flex items-center gap-1.5">
                            {isHighlight ? (
                              <Cpu size={16} className="text-purple-400" />
                            ) : (
                              <Briefcase size={16} />
                            )}
                            <span>{exp.company}</span>
                          </div>
                        </div>

                        {isHighlight && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                            <Sparkles size={12} />
                            Select
                          </span>
                        )}
                      </div>

                      {/* Date / Location Info row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted mb-4 border-b border-card-border/50 pb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-accent/70" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-accent/70" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Bullet points list */}
                      <ul className="space-y-2.5">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-muted flex items-start gap-2 leading-relaxed">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${isHighlight ? "bg-purple-400" : "bg-accent"}`} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
