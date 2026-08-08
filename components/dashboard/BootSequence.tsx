"use client";

import { useEffect, useState } from "react";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "RUCHIT_OS ver 4.8.0 booting...",
  "SECURE_GATEWAY: CONNECTED",
  "SYSTEM_RAM: 16.00 GB OK",
  "INITIALIZING TELEMETRY CONTROLLERS...",
  "STARTING MODULES...",
  "DATA_SCIENCE_MODULE: ACTIVE [READY]",
  "EDGE_AI_MODULE: ACTIVE [READY]",
  "ML_ENGINEERING_MODULE: ACTIVE [READY]",
  "RETRIEVING INTEGRITY LOGS...",
  "LOCALHOST: ONLINE [PORT 3000]",
  "SYSTEM STATUS: ONLINE — OPEN TO OPPORTUNITIES",
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      onComplete();
      return;
    }

    if (currentIndex < BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, BOOT_LOGS[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 150); // Quick sequential logs
      return () => clearTimeout(timeout);
    } else {
      const endTimeout = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(endTimeout);
    }
  }, [currentIndex, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#14161A] p-8 font-mono text-sm text-accent-teal selection:bg-accent-teal/20">
      <div className="flex-1 overflow-y-auto space-y-1">
        {logs.map((log, index) => (
          <div key={index} className="flex items-start">
            <span className="text-accent-amber mr-2 select-none">&gt;&gt;</span>
            <span>{log}</span>
          </div>
        ))}
        {currentIndex < BOOT_LOGS.length && (
          <div className="flex items-center">
            <span className="text-accent-amber mr-2 select-none">&gt;&gt;</span>
            <span className="w-2 h-4 bg-accent-teal animate-blink" />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center border-t border-card-border/30 pt-4 text-xs text-muted">
        <div>SYS_ADDR: 0x14161A · IP: 127.0.0.1</div>
        <button
          onClick={onComplete}
          className="border border-accent-teal/50 hover:bg-accent-teal/10 text-accent-teal px-3 py-1 rounded transition-colors duration-200 cursor-pointer"
        >
          [ SKIP_BOOT_SEQUENCE ]
        </button>
      </div>
    </div>
  );
}
