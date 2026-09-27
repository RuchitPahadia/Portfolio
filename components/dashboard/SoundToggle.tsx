"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSound, type SoundName } from "@/hooks/useSound";

const STORAGE_KEY = "ui-sound-enabled";
// Minimum gap between repeats of the SAME blip so rapid input doesn't
// machine-gun. Buckets are per-sound so a click-tick never masks a palette
// "open" blip that lands in the same instant.
const THROTTLE_MS = 90;

/**
 * Floating, opt-in interface-sound toggle (unit U9).
 *
 * Behaviour:
 *  - Default OFF, and the initial render matches SSR (no localStorage read
 *    during render) so there is no hydration mismatch.
 *  - The saved preference is loaded from localStorage in a mount effect.
 *  - Switching sound ON plays a short confirmation chirp, synthesized inside
 *    the click handler so it lands within the user-gesture window.
 *  - While enabled, incidental clicks on links/buttons play a subtle tick via
 *    a single delegated listener, and opening the command palette plays a
 *    brighter blip. The passive click listener is suppressed when the user
 *    prefers reduced motion.
 *
 * This component is self-contained: it owns its own state and listeners and
 * touches no other component.
 */
export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const { play } = useSound(enabled);

  const buttonRef = useRef<HTMLButtonElement>(null);
  // Per-sound throttle timestamps.
  const lastPlayRef = useRef<Partial<Record<SoundName, number>>>({});

  const throttledPlay = useCallback(
    (name: SoundName) => {
      const now = Date.now();
      if (now - (lastPlayRef.current[name] ?? 0) < THROTTLE_MS) return;
      lastPlayRef.current[name] = now;
      play(name);
    },
    [play],
  );

  // Restore saved preference after mount (never during render → SSR-safe).
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        // Deferred to a mount effect so SSR/first client render match (muted);
        // same pattern the boot-sequence restore uses in app/page.tsx.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setEnabled(true);
      }
    } catch {
      /* localStorage unavailable — stay muted. */
    }
  }, []);

  // Incidental sound effects: delegated click ticks + palette-open blip.
  // Attached only while enabled, so no work happens when muted.
  useEffect(() => {
    if (!enabled) return;

    const cleanups: Array<() => void> = [];

    // Respect reduced-motion: skip the passive whole-document click listener.
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      const onClick = (e: MouseEvent) => {
        const target = e.target as Element | null;
        // Don't double-sound our own toggle (it emits its own chirp).
        if (buttonRef.current && target && buttonRef.current.contains(target)) {
          return;
        }
        if (target && target.closest("a[href], button")) {
          throttledPlay("tick");
        }
      };
      document.addEventListener("click", onClick, true);
      cleanups.push(() =>
        document.removeEventListener("click", onClick, true),
      );
    }

    // The command palette opens via this custom event (dispatched on document
    // by the page). "open" has its own throttle bucket, so it is still heard
    // even when the same click also produced a "tick".
    const onPaletteOpen = () => throttledPlay("open");
    document.addEventListener("open-command-palette", onPaletteOpen);
    cleanups.push(() =>
      document.removeEventListener("open-command-palette", onPaletteOpen),
    );

    return () => cleanups.forEach((off) => off());
  }, [enabled, throttledPlay]);

  const handleToggle = useCallback(() => {
    const next = !enabled;
    try {
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      /* persistence unavailable — preference just won't survive reload. */
    }
    setEnabled(next);
    // Play the confirmation synchronously (in the gesture) so the AudioContext
    // is created/resumed while user activation is fresh — important on WebKit.
    if (next) play("toggle-on");
  }, [enabled, play]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleToggle}
      aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      aria-pressed={enabled}
      title={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      className="glass-panel fixed bottom-4 right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-card-border bg-card-bg/70 text-foreground shadow-lg transition-transform duration-150 hover:-translate-y-0.5 hover:text-accent-teal focus-visible:text-accent-teal"
    >
      {enabled ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}
    </button>
  );
}
