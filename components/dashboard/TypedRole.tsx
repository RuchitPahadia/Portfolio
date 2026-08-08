"use client";

import React, { useState, useEffect } from "react";

const roles = [
  { text: "Machine Learning Engineer", color: "text-accent-teal" },
  { text: "Deep Learning Specialist", color: "text-purple-600 dark:text-purple-400" },
  { text: "Computer Vision Developer", color: "text-accent-amber" },
  { text: "NLP Systems Architect", color: "text-blue-600 dark:text-blue-400" }
];

export default function TypedRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex].text;
    const speed = deleting ? 35 : 55;

    if (!deleting && subIndex === current.length) {
      const pause = setTimeout(() => setDeleting(true), 1500);
      return () => clearTimeout(pause);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
      return;
    }

    const t = setTimeout(() => {
      setSubIndex((i) => i + (deleting ? -1 : 1));
    }, speed);
    return () => clearTimeout(t);
  }, [subIndex, deleting, roleIndex]);

  return (
    <span className={`font-mono font-bold ${roles[roleIndex].color}`}>
      {roles[roleIndex].text.slice(0, subIndex)}
      <span className="animate-blink border-r-2 border-current ml-0.5" />
    </span>
  );
}
