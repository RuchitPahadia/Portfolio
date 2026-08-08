"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";
import { contactData } from "@/data/contact";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";

interface CommandLog {
  text: string;
  type: "input" | "output" | "error" | "success";
}

const COMMAND_LIST = [
  { cmd: "get resume", desc: "Download Ruchit's Resume PDF" },
  { cmd: "get skills", desc: "Display core technical skills telemetry" },
  { cmd: "get experience", desc: "List career timeline entries" },
  { cmd: "get projects", desc: "Check projects status monitor" },
  { cmd: "get contact", desc: "Display communication sockets" },
  { cmd: "help", desc: "Show this help registry" },
  { cmd: "clear", desc: "Reset console display buffer" },
];

export default function TerminalPanel() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    { text: "Welcome to Ruchit Pahadia's Systems Shell (v4.8.0). Type 'help' to see registry.", type: "output" },
  ]);
  const [showMenu, setShowMenu] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Click outside listener for the menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const newLogs = [...logs, { text: `ruchit_os@guest:~$ ${trimmed}`, type: "input" as const }];

    const args = trimmed.toLowerCase();
    
    let output: CommandLog[] = [];

    if (args === "help") {
      output = [
        { text: "Available System Telemetry Tasks:", type: "output" },
        ...COMMAND_LIST.map((c) => ({
          text: `  ${c.cmd.padEnd(16)} - ${c.desc}`,
          type: "output" as const,
        })),
      ];
    } else if (args === "clear") {
      setLogs([]);
      setInput("");
      return;
    } else if (args === "get resume") {
      window.open("/resume.pdf", "_blank");
      output = [
        { text: "[SUCCESS] Executing download pipeline...", type: "success" },
        { text: "Resume PDF opened in a new secure browser tab.", type: "output" },
      ];
    } else if (args === "get skills") {
      output = [
        { text: "System Skills Telemetry Check:", type: "output" },
        { text: "  Languages        : Python, Java, C, SQL", type: "output" },
        { text: "  ML & Deep Learn. : PyTorch, TensorFlow, Keras, Scikit-learn", type: "output" },
        { text: "  Computer Vision  : OpenCV, Object Detection, SORT, OCR", type: "output" },
        { text: "  Edge Deployment  : ONNX, TF Lite, Raspberry Pi, Arduino", type: "output" },
        { text: "  NLP & LLMs       : Transformers, BERT, spaCy, NLTK", type: "output" },
      ];
    } else if (args === "get experience") {
      output = [
        { text: "Career History Logs:", type: "output" },
        ...experiences.map((exp) => ({
          text: `  » ${exp.role.toUpperCase()} @ ${exp.company.toUpperCase()} (${exp.period})`,
          type: "success" as const,
        })),
      ];
    } else if (args === "get projects") {
      output = [
        { text: "Fleet Project Units Monitor:", type: "output" },
        ...projects.map((proj) => ({
          text: `  [NODE] ${proj.title.padEnd(35)} - STATUS: ${proj.status}`,
          type: proj.status === "BUILT" ? ("success" as const) : ("error" as const),
        })),
      ];
    } else if (args === "get contact") {
      output = [
        { text: "Active Communication Channels:", type: "output" },
        { text: `  Email            : ${contactData.email}`, type: "output" },
        { text: `  Phone            : ${contactData.phone}`, type: "output" },
        { text: `  GitHub           : ${contactData.github}`, type: "output" },
        { text: `  LinkedIn         : ${contactData.linkedin}`, type: "output" },
        { text: `  LeetCode         : ${contactData.leetcode}`, type: "output" },
      ];
    } else {
      output = [
        { text: `System Command Error: "${trimmed}" is not registered.`, type: "error" },
        { text: "Type 'help' to review available tasks.", type: "output" },
      ];
    }

    setLogs([...newLogs, ...output]);
    setInput("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <div className="border border-card-border bg-[#0E1013] rounded overflow-hidden font-mono text-xs flex flex-col h-[320px] relative select-none">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between bg-card-bg/60 border-b border-card-border/80 px-4 py-2 select-none">
        <div className="flex items-center gap-2 font-bold text-foreground text-[11px] uppercase tracking-wider">
          <TerminalIcon size={12} className="text-accent-teal animate-pulse" />
          <span>RUCHIT_PAHADIA // INTERACTIVE_SHELL</span>
        </div>

        {/* Top-Right Menu showing available tasks */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-card-border bg-background text-[10px] text-accent-teal hover:bg-accent-teal/10 hover:border-accent-teal/50 cursor-pointer font-bold transition-all duration-200"
          >
            <span>[ AVAILABLE_TASKS ]</span>
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-1.5 z-20 w-56 border border-card-border bg-[#14161A] shadow-2xl rounded py-1.5 animate-fadeIn">
              <div className="px-3 py-1 border-b border-card-border/40 text-[9px] text-muted tracking-wider uppercase mb-1">
                Click to Execute Task
              </div>
              {COMMAND_LIST.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    executeCommand(c.cmd);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-[10px] text-foreground hover:text-accent-teal hover:bg-accent-teal/10 transition-colors duration-150 flex justify-between items-center cursor-pointer"
                >
                  <span>{c.cmd}</span>
                  <span className="text-[8px] opacity-40">RUN</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Terminal Content Buffer */}
      <div className="flex-1 p-4 overflow-y-auto space-y-1.5 text-xs text-accent-teal custom-scrollbar selection:bg-accent-teal/20">
        {logs.map((log, idx) => {
          let colorClass = "text-accent-teal";
          if (log.type === "input") colorClass = "text-foreground font-bold";
          if (log.type === "error") colorClass = "text-alert font-bold";
          if (log.type === "success") colorClass = "text-accent-amber font-bold";

          return (
            <div key={idx} className={`leading-relaxed whitespace-pre-wrap ${colorClass}`}>
              {log.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Bar */}
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center border-t border-card-border bg-card-bg/30 px-3 py-2"
      >
        <span className="text-accent-amber font-bold mr-1.5 select-none">
          ruchit_os@guest:~$
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Run a task..."
          className="flex-1 bg-transparent text-foreground placeholder-muted outline-none border-none text-xs font-mono"
        />
        <button
          type="submit"
          className="p-1 rounded text-muted hover:text-accent-teal cursor-pointer transition-colors duration-150"
        >
          <CornerDownLeft size={14} />
        </button>
      </form>
    </div>
  );
}
