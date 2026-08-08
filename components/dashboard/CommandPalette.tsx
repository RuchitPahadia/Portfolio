"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface CommandPaletteProps {
  onNavigate: (id: string) => void;
}

interface PaletteItem {
  id: string;
  title: string;
  category: string;
  action: () => void;
}

export default function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { toggleTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items: PaletteItem[] = [
    {
      id: "skills",
      title: "Jump to Skills Panel",
      category: "Navigation",
      action: () => {
        onNavigate("skills");
        setIsOpen(false);
      },
    },
    {
      id: "experience",
      title: "Jump to Experience Panel",
      category: "Navigation",
      action: () => {
        onNavigate("experience");
        setIsOpen(false);
      },
    },
    {
      id: "education",
      title: "Jump to Education Panel",
      category: "Navigation",
      action: () => {
        onNavigate("education");
        setIsOpen(false);
      },
    },
    {
      id: "fleet",
      title: "Jump to Fleet Panel (Projects)",
      category: "Navigation",
      action: () => {
        onNavigate("fleet");
        setIsOpen(false);
      },
    },
    {
      id: "comms",
      title: "Jump to Comms Panel (Contact)",
      category: "Navigation",
      action: () => {
        onNavigate("comms");
        setIsOpen(false);
      },
    },
    {
      id: "resume",
      title: "Download Resume PDF",
      category: "Actions",
      action: () => {
        window.open("/resume.pdf", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "email",
      title: "Email Ruchit (Compose Mail)",
      category: "Actions",
      action: () => {
        window.location.href = "mailto:toruchitpahadia@gmail.com";
        setIsOpen(false);
      },
    },
    {
      id: "github",
      title: "Open GitHub Profile",
      category: "Links",
      action: () => {
        window.open("https://github.com/ruchitpahadia", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "linkedin",
      title: "Open LinkedIn Profile",
      category: "Links",
      action: () => {
        window.open("https://www.linkedin.com/in/ruchitpahadia", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "leetcode",
      title: "Open LeetCode Profile",
      category: "Links",
      action: () => {
        window.open("https://leetcode.com/u/RuchitPahadia/", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "theme",
      title: "Toggle System Theme (Light/Dark)",
      category: "System",
      action: () => {
        toggleTheme();
        setIsOpen(false);
      },
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#14161A]/80 pt-[15vh] px-4 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg border border-card-border bg-card-bg shadow-2xl rounded overflow-hidden font-mono text-xs"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center border-b border-card-border/60 px-3 py-2.5">
          <span className="text-accent-teal mr-2 select-none font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or link..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-foreground placeholder-muted outline-none border-none text-xs"
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-muted hover:text-foreground ml-2 text-[10px] border border-card-border px-1.5 py-0.5 rounded"
          >
            ESC
          </button>
        </div>

        <div ref={listRef} className="max-h-60 overflow-y-auto py-1">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-3 text-muted text-center">No terminal commands found.</div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-4 py-2 cursor-pointer select-none border-l-2 transition-colors duration-150 ${
                    isSelected
                      ? "bg-accent-teal/10 border-accent-teal text-accent-teal"
                      : "border-transparent text-foreground hover:bg-card-bg/20"
                  }`}
                >
                  <span>{item.title}</span>
                  <span className="text-[10px] opacity-50 px-2 py-0.5 border border-card-border rounded">
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>
        <div className="border-t border-card-border/50 bg-background/50 px-4 py-2 text-[10px] text-muted flex justify-between">
          <span>Use ↑↓ keys to navigate, ↵ to run</span>
          <span>Cmd/Ctrl+K to close</span>
        </div>
      </div>
    </div>
  );
}
