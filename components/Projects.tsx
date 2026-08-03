"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { ChevronDown, ChevronUp, ExternalLink, Code } from "lucide-react";

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section id="projects" className="py-16 bg-muted-light/30 border-b border-card-border/50 relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 dark:bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

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
            <Code size={16} />
            <span>Portfolio</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-accent mt-4 rounded-full"
          />
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardVariants = {
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
    <motion.div
      variants={cardVariants}
      className="p-6 rounded-2xl bg-card-bg border border-card-border hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group h-full relative"
    >
      <div>
        {/* Header (Title, Date) */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
            {project.title}
          </h3>
          <span className="text-sm font-semibold text-muted bg-muted-light px-2.5 py-1 rounded-md shrink-0 border border-card-border/50">
            {project.period}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-muted text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((techItem) => (
            <span
              key={techItem}
              className="text-xs font-medium text-accent bg-accent/5 border border-accent/10 px-2 py-0.5 rounded-full"
            >
              {techItem}
            </span>
          ))}
        </div>

        {/* Expandable Details Container */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" as const }}
              className="overflow-hidden"
            >
              <div className="pt-2 pb-4 border-t border-card-border/50 mt-2">
                <h4 className="text-xs uppercase tracking-wider text-muted font-bold mb-2">Key Contributions:</h4>
                <ul className="space-y-2">
                  {project.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-xs text-muted flex items-start gap-2 leading-relaxed">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer (Links & Expand Toggler) */}
      <div className="flex items-center justify-between border-t border-card-border/50 pt-4 mt-4">
        {/* Social / External Links */}
        <div className="flex items-center gap-4">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Repository"
              className="text-muted hover:text-accent transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Demo"
              className="text-muted hover:text-accent transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:opacity-80 transition-opacity uppercase tracking-wider cursor-pointer"
        >
          <span>{isExpanded ? "Show Less" : "Show Details"}</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>
    </motion.div>
  );
}
