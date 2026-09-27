"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Opt-in interface sound effects, synthesized entirely with the Web Audio API.
 *
 * Design constraints (see unit U9):
 *  - No audio files, zero new dependencies — every blip is an oscillator.
 *  - The AudioContext is created lazily INSIDE `play()`, so it only ever comes
 *    into existence on a real user gesture (the caller only invokes `play`
 *    while sounds are enabled). That makes browser autoplay blocking a
 *    non-issue by construction.
 *  - When sound is switched off the shared context is suspended, so nothing can
 *    leak through even if a stray `play` slips in.
 *  - Every Web Audio call is wrapped in try/catch, so browsers without support
 *    (or with the API disabled) degrade silently to no sound rather than
 *    throwing.
 *
 * `play` is a stable reference for the lifetime of the component, so callers
 * can subscribe/unsubscribe listeners without churn. Gating is the caller's
 * job: it should only call `play` while sound is enabled.
 */
export type SoundName = "tick" | "open" | "toggle-on";

// Low master gain — these are subtle UI accents, never attention-grabbing.
const MASTER_GAIN = 0.05;

interface SoundSpec {
  /** Start frequency in Hz. */
  freq: number;
  /** Optional end frequency for a pitch glide (ramps freq -> endFreq). */
  endFreq?: number;
  /** Total blip duration in seconds. */
  duration: number;
  type: OscillatorType;
}

const SPECS: Record<SoundName, SoundSpec> = {
  // Soft mid blip for incidental clicks.
  tick: { freq: 660, duration: 0.06, type: "sine" },
  // Brighter blip when a panel/palette opens.
  open: { freq: 880, duration: 0.09, type: "sine" },
  // Rising confirmation chirp when sounds are switched on.
  "toggle-on": { freq: 520, endFreq: 780, duration: 0.16, type: "triangle" },
};

interface UseSoundResult {
  play: (name: SoundName) => void;
}

/**
 * @param enabled  Controls the shared context's lifecycle: when it flips to
 *                 false the context is suspended. Callers should still avoid
 *                 calling `play` while disabled.
 */
export function useSound(enabled: boolean): UseSoundResult {
  // A single shared AudioContext, created on first use.
  const ctxRef = useRef<AudioContext | null>(null);

  // Suspend the context when sound is muted (and resume happens inside `play`,
  // which only runs during a user gesture). This keeps `enabled` authoritative
  // over whether audio can be heard, without coupling `play`'s identity to it.
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    try {
      if (!enabled && ctx.state === "running") {
        void ctx.suspend();
      }
    } catch {
      /* suspend unsupported — harmless. */
    }
  }, [enabled]);

  const play = useCallback((name: SoundName) => {
    try {
      // Lazily construct the context on the first gesture-driven call.
      if (!ctxRef.current) {
        const Ctor =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (!Ctor) return; // Web Audio unsupported -> silence.
        ctxRef.current = new Ctor();
      }

      const ctx = ctxRef.current;
      // If the context was suspended (autoplay policy or a prior mute), resume
      // it — this runs inside a user gesture, so it is permitted.
      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      const spec = SPECS[name];
      const now = ctx.currentTime;
      const end = now + spec.duration;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = spec.type;
      osc.frequency.setValueAtTime(spec.freq, now);
      if (spec.endFreq !== undefined) {
        osc.frequency.exponentialRampToValueAtTime(spec.endFreq, end);
      }

      // Click-free envelope: quick attack, smooth exponential release.
      // exponentialRamp can't target 0, so ramp to a tiny epsilon.
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(MASTER_GAIN, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, end);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(end);
      // Release nodes once the blip has finished to avoid leaks.
      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {
          /* already torn down */
        }
      };
    } catch {
      /* Web Audio unavailable or blocked — degrade to silence. */
    }
  }, []);

  return { play };
}
