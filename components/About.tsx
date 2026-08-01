"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Cpu, Sparkles } from "lucide-react";
import { aboutData } from "@/data/about";

export default function About() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="about" className="py-28 bg-muted-light/30 border-b border-card-border/50 relative overflow-hidden">
      {/* Decorative details */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/5 dark:bg-purple-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-accent font-semibold tracking-wider text-sm uppercase mb-3"
          >
            <Sparkles size={16} />
            <span>Introduction</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-accent mt-4 rounded-full"
          />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative Paragraphs */}
          <div className="lg:col-span-7 space-y-6">
            {aboutData.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-lg text-muted leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Quick Highlight Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Internships Stat Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card-bg border border-card-border/80 hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between min-h-[180px]"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-accent/5 border border-accent/10 text-accent group-hover:bg-accent/10 transition-colors">
                  <Briefcase size={22} />
                </div>
                <span className="text-4xl font-extrabold text-accent group-hover:scale-105 transition-transform">
                  {aboutData.internshipsCount}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-base font-semibold text-foreground">Industry Internships</h3>
                <p className="text-sm text-muted mt-1 leading-snug">
                  Hands-on industrial experience in IoT, ML models, and edge hardware deployment.
                </p>
              </div>
            </motion.div>

            {/* Samsung Program Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-card-bg border border-card-border/80 hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between min-h-[180px] sm:col-span-2"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                  <Cpu size={22} />
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full">
                  Samsung Cohort
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-base font-semibold text-foreground">Advanced AI Program</h3>
                <p className="text-sm text-muted mt-1 leading-snug">
                  {aboutData.samsungProgramDetails} Rigorous in-person screening and neural network architectural study.
                </p>
              </div>
            </motion.div>

            {/* University Stat Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-card-bg border border-card-border/80 hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between min-h-[180px]"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                  <GraduationCap size={22} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-base font-semibold text-foreground">BNM IT</h3>
                <p className="text-sm text-muted mt-1 leading-snug">
                  Final year Computer Science & Engineering candidate in Bengaluru.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
