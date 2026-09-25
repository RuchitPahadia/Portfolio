"use client";

import React, { useState, useEffect } from "react";

const roles = [
  { text: "Machine Learning Engineer", color: "text-accent-teal" },
  { text: "Deep Learning Specialist", color: "text-accent-amber" },
  { text: "Computer Vision Developer", color: "text-accent-teal" },
  { text: "NLP Systems Architect", color: "text-accent-amber" }
];

export default function TypedRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const current = roles[roleIndex].text;
    const speed = deleting ? 35 : 55;

    if (!deleting && subIndex === current.length) {
      const pause = setTimeout(() => setDeleting(true), 1500);
      return () => clearTimeout(pause);
    }
    if (deleting && subIndex === 0) {
      // Pause on empty, then advance to the next role. Deferring via a timer
      // (instead of a synchronous setState here) keeps the state transition out
      // of the effect body and adds a natural beat between words.
      const nextWord = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 500);
      return () => clearTimeout(nextWord);
    }

    const t = setTimeout(() => {
      setSubIndex((i) => i + (deleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(t);
  }, [subIndex, deleting, roleIndex, reducedMotion]);

  // Reduced motion: show the first role statically, no typing loop or caret.
  if (reducedMotion) {
    return (
      <span className={`font-mono font-bold ${roles[0].color}`}>
        {roles[0].text}
      </span>
    );
  }

  return (
    <span className={`font-mono font-bold ${roles[roleIndex].color}`}>
      {roles[roleIndex].text.slice(0, subIndex)}
      <span className="animate-blink border-r-2 border-current ml-0.5" />
    </span>
  );
}
