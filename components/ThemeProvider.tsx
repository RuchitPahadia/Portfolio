"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";
type Preset = "teal" | "amber" | "matrix";

const PRESETS: readonly Preset[] = ["teal", "amber", "matrix"];

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  preset: Preset;
  setPreset: (preset: Preset) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark"); // Dark mode default
  const [preset, setPreset] = useState<Preset>("teal"); // Teal base default (SSR)
  const presetApplied = useRef(false);

  useEffect(() => {
    // The inline pre-hydration script in layout.tsx has already resolved and
    // applied the theme class + data-preset attribute before paint (no FOUC).
    // Sync React state to that source of truth after mount so the controls
    // match what's rendered. Deferring to an effect (not a lazy initializer)
    // keeps SSR and the first client render identical ("dark"/"teal"),
    // avoiding a hydration mismatch.
    const root = window.document.documentElement;
    const isDark = root.classList.contains("dark");
    const attr = root.getAttribute("data-preset");
    const resolvedPreset = PRESETS.includes(attr as Preset)
      ? (attr as Preset)
      : "teal";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(isDark ? "dark" : "light");
    setPreset(resolvedPreset);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* localStorage unavailable (private mode, blocked) — ignore */
    }
  }, [theme]);

  useEffect(() => {
    // The inline pre-hydration script already applied the correct data-preset
    // before paint. Skip the first run (initial SSR default "teal") so we don't
    // clobber it and re-flash; the mount-sync effect above then updates `preset`
    // to the real value, and this effect applies + persists every change after.
    if (!presetApplied.current) {
      presetApplied.current = true;
      return;
    }
    const root = window.document.documentElement;
    root.setAttribute("data-preset", preset);
    try {
      localStorage.setItem("theme-preset", preset);
    } catch {
      /* localStorage unavailable (private mode, blocked) — ignore */
    }
  }, [preset]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, preset, setPreset }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
