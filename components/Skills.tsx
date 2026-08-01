"use client";

import React from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { Terminal, Brain, Eye, MessageSquare, Cpu, Database, Layers, Sparkles } from "lucide-react";

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case "languages":
        return <Terminal size={20} />;
      case "ml / deep learning":
        return <Brain size={20} />;
      case "computer vision":
        return <Eye size={20} />;
      case "nlp":
        return <MessageSquare size={20} />;
      case "edge ai & deployment":
        return <Cpu size={20} />;
      case "databases & tools":
        return <Database size={20} />;
      case "core concepts":
      default:
        return <Layers size={20} />;
    }
  };

  return (
    <section id="skills" className="py-28 bg-background border-b border-card-border/50 relative overflow-hidden">
      {/* Decorative details */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/5 dark:bg-indigo-900/3 rounded-full blur-[100px] pointer-events-none" />

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
            <span>Expertise</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Technical Skills
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-accent mt-4 rounded-full"
          />
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((cat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-card-bg border border-card-border hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-start"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-card-border/50">
                <div className="p-2.5 rounded-lg bg-accent/5 border border-accent/10 text-accent group-hover:bg-accent/10 transition-colors">
                  {getCategoryIcon(cat.category)}
                </div>
                <h3 className="font-bold text-foreground text-lg group-hover:text-accent transition-colors">
                  {cat.category}
                </h3>
              </div>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-semibold text-muted bg-muted-light border border-card-border/60 hover:border-accent/30 hover:text-accent hover:bg-accent/5 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
