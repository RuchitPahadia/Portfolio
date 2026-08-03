"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText, Monitor } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Prevent page scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        duration: 0.5,
        bounce: 0.15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 15,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-5xl h-[85vh] flex flex-col rounded-2xl bg-card-bg border border-card-border shadow-2xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-card-border/60 bg-muted-light/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg text-accent">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground leading-tight">Ruchit Pahadia — Resume</h3>
                  <p className="text-xs text-muted">ML Engineer / Full-Stack Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Download Button */}
                <a
                  href="/resume.pdf"
                  download="Ruchit_Pahadia_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors shadow-sm"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Open in new tab (External) */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted-light border border-card-border text-foreground hover:text-accent hover:bg-accent/5 transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink size={16} />
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-muted-light border border-card-border text-foreground hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-colors cursor-pointer"
                  title="Close modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body / Viewer */}
            <div className="flex-grow w-full bg-slate-900/5 dark:bg-black/20 overflow-hidden relative">
              {/* Desktop PDF Iframe (Hidden on mobile) */}
              <div className="hidden md:block w-full h-full">
                <iframe
                  src="/resume.pdf#toolbar=0"
                  className="w-full h-full border-none"
                  title="Ruchit Pahadia Resume PDF"
                />
              </div>

              {/* Mobile View Placeholder & Quick Actions (Hidden on desktop) */}
              <div className="md:hidden flex flex-col items-center justify-center text-center p-8 h-full">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4 animate-bounce">
                  <FileText size={32} />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">Resume Preview</h4>
                <p className="text-sm text-muted max-w-sm mb-6 leading-relaxed">
                  Interactive PDF viewing is optimized for larger displays. Tap below to download or open the resume in a new tab.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                  <a
                    href="/resume.pdf"
                    download="Ruchit_Pahadia_Resume.pdf"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent/90 transition-colors shadow-sm"
                  >
                    <Download size={18} />
                    <span>Download PDF</span>
                  </a>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-muted-light border border-card-border text-foreground font-medium hover:bg-card-border transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span>Open in New Tab</span>
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs text-muted">
                  <Monitor size={14} />
                  <span>Interactive preview requires a larger screen</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
