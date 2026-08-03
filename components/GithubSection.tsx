"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { contactData } from "@/data/contact";

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function GithubSection() {
  return (
    <section id="github" className="py-20 bg-muted-light/30 border-b border-card-border/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-2xl border border-card-border bg-card-bg p-8 shadow-sm hover:border-accent/40 hover:shadow-md transition-all duration-300 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/5 border border-accent/10 text-accent">
              <GithubIcon />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">
                Code lives on GitHub
              </p>
              <p className="mt-1 text-sm text-muted">
                Explore commits, READMEs, and the full source for every project above.
              </p>
            </div>
          </div>

          <a
            href={contactData.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-card-border bg-muted-light px-5 py-2.5 text-sm font-medium text-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
          >
            github.com/ruchitpahadia
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
