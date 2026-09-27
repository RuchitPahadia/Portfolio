"use client";

import { useEffect, useState } from "react";
import { Download, Terminal, Mail, Sun, Moon, Command } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface StatusBarProps {
  onOpenPalette?: () => void;
}

// Static accent-preset options. Swatch colors are the light-mode token values,
// used as stable visual identifiers for each preset.
const presetSwatches: { id: "teal" | "amber" | "matrix"; label: string; color: string }[] = [
  { id: "teal", label: "Teal", color: "#0f766e" },
  { id: "amber", label: "Amber", color: "#b45309" },
  { id: "matrix", label: "Matrix green", color: "#15803d" },
];

export default function StatusBar({ onOpenPalette }: StatusBarProps) {
  const [time, setTime] = useState("");
  const { theme, toggleTheme, preset, setPreset } = useTheme();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-card-border bg-card-bg/95 backdrop-blur font-mono text-sm select-none">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3">
        {/* Left: Name & Target Role */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Terminal size={14} className="text-accent-teal" />
            <span>RUCHIT_PAHADIA //</span>
          </div>
          <span className="hidden md:inline text-muted text-xs">
            SYS_ROLE: ML_ENGINEER / AI_DEV
          </span>
        </div>

        {/* Center: System Status */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-amber opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-amber"></span>
          </span>
          <span className="text-xs tracking-wide text-foreground font-bold uppercase">
            STATUS: ONLINE — OPEN TO OPPORTUNITIES
          </span>
        </div>

        {/* Right: Telemetry Clock, Theme, Actions */}
        <div className="flex items-center gap-4">
          {/* Monospace Clock */}
          <div className="hidden sm:block text-xs font-medium text-foreground bg-muted-light/35 px-2 py-0.5 rounded border border-card-border/50 tabular-nums">
            SYS_TIME: {time || "00:00:00"}
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-2">
            <div
              role="group"
              aria-label="Accent theme preset"
              className="flex items-center gap-1.5 pr-1 mr-0.5 border-r border-card-border/60"
            >
              {presetSwatches.map((swatch) => (
                <button
                  key={swatch.id}
                  onClick={() => setPreset(swatch.id)}
                  aria-label={`Set ${swatch.label} accent`}
                  aria-pressed={preset === swatch.id}
                  title={`${swatch.label} accent`}
                  className="p-1 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105"
                >
                  <span
                    style={{ backgroundColor: swatch.color }}
                    className={`block h-4 w-4 rounded-full border transition-all duration-200 ${
                      preset === swatch.id
                        ? "border-foreground ring-2 ring-accent-teal ring-offset-1 ring-offset-card-bg"
                        : "border-card-border"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              aria-pressed={theme === "dark"}
              className="p-1.5 rounded border border-card-border hover:bg-muted-light text-muted hover:text-foreground cursor-pointer transition-all duration-200"
            >
              {theme === "dark" ? <Sun size={12} /> : <Moon size={12} />}
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded border border-card-border bg-background text-foreground hover:bg-accent-teal/10 hover:text-accent-teal hover:border-accent-teal/50 transition-all duration-200 font-medium"
            >
              <Download size={12} />
              <span>RESUME</span>
            </a>
            <a
              href="#comms"
              className="flex items-center gap-1.5 px-3 py-1 rounded border border-card-border bg-background text-foreground hover:bg-accent-teal/10 hover:text-accent-teal hover:border-accent-teal/50 transition-all duration-200 font-medium"
            >
              <Mail size={12} />
              <span className="hidden sm:inline">CONTACT</span>
            </a>
            <button
              onClick={onOpenPalette}
              aria-label="Open command palette"
              className="flex items-center gap-1.5 px-2 py-1 rounded border border-card-border bg-background text-muted hover:bg-accent-teal/10 hover:text-accent-teal hover:border-accent-teal/50 transition-all duration-200 font-medium cursor-pointer"
            >
              <Command size={12} />
              <span className="hidden sm:inline text-[10px]">⌘K</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
