"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, FileText } from "lucide-react";
import { heroData } from "@/data/hero";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth"
        });
      }
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return (
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
      case "linkedin":
        return (
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
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        );
      case "leetcode":
        return (
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a3.758 3.758 0 0 0 .002 5.314c.084.083.17.163.26.24l-3.02 3.021a1.242 1.242 0 0 0 1.758 1.758l3.02-3.02c.078.09.158.176.24.26a3.758 3.758 0 0 0 5.317-.002l9.778-9.778A1.374 1.374 0 0 0 24 6.741c0-.363-.141-.71-.393-.962L17.659.414A1.361 1.361 0 0 0 16.697 0h-3.214zm.014 2.766h2.955l4.896 4.897-8.318 8.318a1.008 1.008 0 0 1-1.424 0 1.008 1.008 0 0 1 0-1.426l5.77-5.77a1.008 1.008 0 1 0-1.426-1.426l-5.77 5.77a3.024 3.024 0 0 0 0 4.276 3.024 3.024 0 0 0 4.276 0l8.318-8.318-2.956-2.956-6.425 6.425a1.008 1.008 0 1 0 1.426 1.426l6.425-6.425z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-background"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 dark:bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-purple-500/10 dark:bg-purple-900/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Location badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted-light border border-card-border/80 text-sm font-medium text-muted mb-6"
          >
            <MapPin size={14} className="text-accent" />
            <span>{heroData.location}</span>
          </motion.div>

          {/* Main Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">{heroData.name}</span>
          </motion.h1>

          {/* Subtitle/Tagline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg sm:text-xl md:text-2xl text-muted leading-relaxed max-w-3xl mx-auto"
          >
            {heroData.title}
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-4"
          >
            {heroData.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target={social.url.startsWith("#") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                title={social.platform}
                className="p-3 rounded-full bg-muted-light border border-card-border text-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 transform hover:-translate-y-1"
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {heroData.ctas.map((cta) => {
              const isAnchor = cta.href.startsWith("#");
              const isResume = cta.label.toLowerCase() === "resume";

              if (cta.primary) {
                return (
                  <a
                    key={cta.label}
                    href={cta.href}
                    onClick={isAnchor ? (e) => handleScroll(e, cta.href) : undefined}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent text-white font-medium hover:bg-accent/90 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-all duration-300 cursor-pointer"
                  >
                    <span>{cta.label}</span>
                    <ArrowRight size={18} />
                  </a>
                );
              }

              return (
                <a
                  key={cta.label}
                  href={cta.href}
                  onClick={isAnchor ? (e) => handleScroll(e, cta.href) : undefined}
                  target={isResume ? "_blank" : undefined}
                  rel={isResume ? "noopener noreferrer" : undefined}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-muted-light border border-card-border text-foreground font-medium hover:bg-card-border hover:border-muted transition-all duration-300 cursor-pointer"
                >
                  {isResume && <FileText size={18} className="text-accent" />}
                  <span>{cta.label}</span>
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-widest text-muted/60 font-medium">Scroll Down</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted/30 flex justify-center p-1.5">
          <motion.div
            animate={{
              y: [0, 12, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
