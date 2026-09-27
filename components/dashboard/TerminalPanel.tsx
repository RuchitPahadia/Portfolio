"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";
import { contactData } from "@/data/contact";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { useTheme } from "@/components/ThemeProvider";

interface CommandLog {
  text: string;
  type: "input" | "output" | "error" | "success";
}

interface CommandSpec {
  cmd: string; // canonical form shown in help (may include an <arg> placeholder)
  desc: string;
  run: boolean; // true = zero-arg command safe to click-execute from the menu
}

const COMMAND_LIST: CommandSpec[] = [
  { cmd: "whoami", desc: "Print operator identity bio line", run: true },
  { cmd: "ls", desc: "List all project unit titles", run: true },
  { cmd: "cat <project>", desc: "Print a project's full dossier", run: false },
  { cmd: "socials", desc: "List social / contact links", run: true },
  { cmd: "theme", desc: "Print the active UI theme", run: true },
  { cmd: "get resume", desc: "Download Ruchit's Resume PDF", run: true },
  { cmd: "get skills", desc: "Display core technical skills telemetry", run: true },
  { cmd: "get experience", desc: "List career timeline entries", run: true },
  { cmd: "get projects", desc: "Check projects status monitor", run: true },
  { cmd: "get contact", desc: "Display communication sockets", run: true },
  { cmd: "help", desc: "Show this help registry", run: true },
  { cmd: "clear", desc: "Reset console display buffer", run: true },
];

// Menu shows only runnable (zero-arg) commands; `cat` needs an argument.
const MENU_COMMANDS = COMMAND_LIST.filter((c) => c.run);

// Autocomplete tokens: strip any "<arg>" placeholder (e.g. "cat <project>" -> "cat").
const AUTOCOMPLETE = COMMAND_LIST.map((c) => c.cmd.replace(/\s*<.*?>/, ""));

// Derive a url-ish slug from a project title for case-insensitive `cat` matching.
const toSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Longest common prefix across autocomplete candidates (bash-style completion).
const longestCommonPrefix = (items: string[]): string => {
  if (items.length === 0) return "";
  let prefix = items[0];
  for (const item of items.slice(1)) {
    while (!item.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
};

export default function TerminalPanel() {
  const { theme } = useTheme();
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    { text: "Welcome to Ruchit Pahadia's Systems Shell (v4.8.0). Type 'help' to see registry.", type: "output" },
  ]);
  const [showMenu, setShowMenu] = useState(false);
  // Command history for ArrowUp / ArrowDown recall. `historyIndex` walks the
  // range [0, history.length]; the sentinel value `history.length` is the
  // fresh, blank prompt line (nothing recalled yet).
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
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

    // Record every entered command for ArrowUp/ArrowDown recall and reset the
    // pointer to the blank-line sentinel.
    const nextHistory = [...history, trimmed];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length);

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
    } else if (args === "whoami") {
      const current = experiences[0];
      output = [
        { text: `Ruchit Pahadia :: ${current.role} @ ${current.company}`, type: "success" },
        { text: `Based in ${contactData.address}.`, type: "output" },
      ];
    } else if (args === "ls") {
      output = [
        { text: "Project Units:", type: "output" },
        ...projects.map((proj) => ({
          text: `  ${proj.title}`,
          type: "output" as const,
        })),
      ];
    } else if (args === "cat" || args.startsWith("cat ")) {
      const query = trimmed.slice(3).trim().toLowerCase();
      if (!query) {
        output = [
          { text: "Usage: cat <project>", type: "error" },
          { text: "Run 'ls' to list available project units.", type: "output" },
        ];
      } else {
        const match =
          projects.find(
            (p) => p.title.toLowerCase() === query || toSlug(p.title) === query
          ) ??
          projects.find(
            (p) => p.title.toLowerCase().includes(query) || toSlug(p.title).includes(query)
          );

        if (!match) {
          output = [
            { text: `cat: no project unit matches "${trimmed.slice(3).trim()}".`, type: "error" },
            { text: "Run 'ls' to list available project units.", type: "output" },
          ];
        } else {
          output = [
            { text: `» ${match.title}  [${match.status}]`, type: "success" },
            { text: `  Period : ${match.period}`, type: "output" },
            { text: `  ${match.description}`, type: "output" },
            { text: `  Tech   : ${match.tech.join(", ")}`, type: "output" },
            ...match.bullets.map((b) => ({ text: `  - ${b}`, type: "output" as const })),
            ...(match.links.github
              ? [{ text: `  GitHub : ${match.links.github}`, type: "output" as const }]
              : []),
            ...(match.links.live && match.links.live !== "#"
              ? [{ text: `  Live   : ${match.links.live}`, type: "output" as const }]
              : []),
          ];
        }
      }
    } else if (args === "socials") {
      output = [
        { text: "Social Sockets:", type: "output" },
        { text: `  GitHub   : ${contactData.github}`, type: "output" },
        { text: `  LinkedIn : ${contactData.linkedin}`, type: "output" },
        { text: `  LeetCode : ${contactData.leetcode}`, type: "output" },
        { text: `  Email    : ${contactData.email}`, type: "output" },
      ];
    } else if (args === "theme") {
      output = [
        { text: `Active UI theme: ${theme.toUpperCase()}`, type: "success" },
      ];
    } else if (args === "get resume") {
      window.open("/resume.pdf", "_blank");
      output = [
        { text: "[SUCCESS] Executing download pipeline...", type: "success" },
        { text: "Resume PDF opened in a new secure browser tab.", type: "output" },
      ];
    } else if (args === "get skills") {
      output = [
        { text: "System Skills Telemetry Check:", type: "output" },
        ...skillCategories.map((cat) => ({
          text: `  ${cat.category.padEnd(20)}: ${cat.items.join(", ")}`,
          type: "output" as const,
        })),
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

  // Walk the command history. dir = -1 moves toward older entries (ArrowUp),
  // dir = +1 toward newer / the blank prompt (ArrowDown).
  const navigateHistory = (dir: -1 | 1) => {
    if (history.length === 0) return;
    const next = Math.min(history.length, Math.max(0, historyIndex + dir));
    setHistoryIndex(next);
    setInput(next === history.length ? "" : history[next]);
  };

  // Tab-complete the current input against the known command tokens.
  const handleAutocomplete = () => {
    const prefix = input.toLowerCase().replace(/^\s+/, "");
    if (!prefix) return;
    const matches = AUTOCOMPLETE.filter((c) => c.startsWith(prefix));
    if (matches.length === 0) return;
    if (matches.length === 1) {
      setInput(matches[0]);
      return;
    }
    // Multiple candidates: extend to the longest common prefix and echo the
    // available options, mirroring a real shell.
    const lcp = longestCommonPrefix(matches);
    if (lcp.length > prefix.length) setInput(lcp);
    setLogs((prev) => [...prev, { text: matches.join("    "), type: "output" }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      navigateHistory(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      navigateHistory(1);
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleAutocomplete();
    }
  };

  return (
    <div className="border border-card-border bg-background rounded overflow-hidden font-mono text-xs flex flex-col h-[320px] relative">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between bg-card-bg/60 border-b border-card-border/80 px-4 py-2 select-none">
        <div className="flex items-center gap-2 font-bold text-foreground text-[11px] uppercase tracking-wider">
          <TerminalIcon size={12} className="text-accent-teal" />
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
            <div className="absolute right-0 mt-1.5 z-20 w-56 border border-card-border bg-card-bg shadow-2xl rounded py-1.5 animate-fadeIn">
              <div className="px-3 py-1 border-b border-card-border/40 text-[9px] text-muted tracking-wider uppercase mb-1">
                Click to Execute Task
              </div>
              {MENU_COMMANDS.map((c, idx) => (
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
      <div className="flex-1 p-4 overflow-y-auto space-y-1.5 text-xs text-accent-teal custom-scrollbar selection:bg-accent-teal/20 select-text">
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
          onKeyDown={handleKeyDown}
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
