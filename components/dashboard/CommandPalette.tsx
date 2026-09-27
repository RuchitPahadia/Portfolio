"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { contactData } from "@/data/contact";
import { projects } from "@/data/projects";

interface CommandPaletteProps {
  onNavigate: (id: string) => void;
}

interface PaletteItem {
  id: string;
  title: string;
  category: string;
  keywords?: string[];
  action: () => void;
}

const RECENTS_KEY = "cmd-palette:recents";
const RECENTS_MAX = 8;

// Tiny self-written fuzzy matcher (no dependency). Returns a score — higher is a
// better match — when every character of `query` appears in `text` in order (a
// subsequence), or null when it does not match at all. Match quality (runs of
// consecutive chars, word-start hits) dominates; the gap penalty is bounded so a
// clean keyword match deep in a long haystack still outranks a scattered early one.
function fuzzyScore(query: string, text: string): number | null {
  const q = query.trim().toLowerCase();
  if (q === "") return 0;
  const t = text.toLowerCase();
  let score = 0;
  let ti = 0;
  let prevMatch = -1;
  for (let qi = 0; qi < q.length; qi++) {
    const found = t.indexOf(q[qi], ti);
    if (found === -1) return null;
    let bonus = 1;
    if (found === prevMatch + 1) bonus += 8; // consecutive run
    const before = found === 0 ? " " : t[found - 1];
    if (before === " " || before === "/" || before === "-" || before === "_") bonus += 7; // word start
    bonus -= Math.min(found - ti, 4); // bounded gap penalty
    score += bonus;
    prevMatch = found;
    ti = found + 1;
  }
  return score;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CommandPalette({ onNavigate }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Recent-command history is read once, lazily, from localStorage (client only,
  // private-mode safe). The palette renders null until opened, so reading here —
  // rather than in a mount effect — creates no SSR/hydration mismatch.
  const [recents, setRecents] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(RECENTS_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.filter((x): x is string => typeof x === "string").slice(0, RECENTS_MAX);
        }
      }
    } catch {
      /* localStorage unavailable / malformed — start with no history */
    }
    return [];
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const { toggleTheme } = useTheme();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss the transient toast; the timer lives entirely in an effect so
  // no ref is read during render.
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 1600);
    return () => clearTimeout(timer);
  }, [feedback]);

  const showFeedback = useCallback((msg: string) => setFeedback(msg), []);

  // Copies the public email; keeps the palette open so feedback stays visible.
  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contactData.email);
      showFeedback(`Copied ${contactData.email}`);
    } catch {
      showFeedback("Clipboard unavailable — try Compose Mail");
    }
  }, [showFeedback]);

  // Client-side route navigation (keeps the SPA alive — no full reload). Sibling
  // units own /uses, /resume and /projects/<slug>; these may 404 until those PRs
  // merge, which is the accepted graceful-degradation behavior.
  const openRoute = useCallback(
    (path: string) => {
      router.push(path);
      setIsOpen(false);
    },
    [router]
  );

  const items: PaletteItem[] = useMemo(() => {
    const sectionJump = (id: string, title: string): PaletteItem => ({
      id: `section:${id}`,
      title,
      category: "Navigation",
      keywords: ["jump", "go", "scroll", "section"],
      action: () => {
        onNavigate(id);
        setIsOpen(false);
      },
    });

    const projectItems: PaletteItem[] = projects.map((p) => ({
      id: `project:${slugify(p.title)}`,
      title: `Open Project — ${p.title}`,
      category: "Projects",
      keywords: ["project", "case study", ...p.tech],
      action: () => openRoute(`/projects/${slugify(p.title)}`),
    }));

    return [
      {
        id: "section:hero",
        title: "Jump to Top (Hero)",
        category: "Navigation",
        keywords: ["home", "top", "hero", "intro"],
        action: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setIsOpen(false);
        },
      },
      sectionJump("projects", "Jump to Projects Panel"),
      sectionJump("skills", "Jump to Skills Panel"),
      sectionJump("experience", "Jump to Experience Panel"),
      sectionJump("education", "Jump to Education Panel"),
      sectionJump("comms", "Jump to Comms Panel (Contact)"),
      {
        id: "route:uses",
        title: "Open Uses Page",
        category: "Pages",
        keywords: ["uses", "gear", "setup", "tools", "stack"],
        action: () => openRoute("/uses"),
      },
      {
        id: "route:resume",
        title: "Open Resume Page",
        category: "Pages",
        keywords: ["resume", "cv", "page"],
        action: () => openRoute("/resume"),
      },
      ...projectItems,
      {
        id: "action:copy-email",
        title: "Copy Email to Clipboard",
        category: "Actions",
        keywords: ["email", "copy", "mail", "address", contactData.email],
        action: () => {
          void copyEmail();
        },
      },
      {
        id: "action:email",
        title: "Email Ruchit (Compose Mail)",
        category: "Actions",
        keywords: ["email", "mail", "contact", "compose"],
        action: () => {
          window.location.assign(`mailto:${contactData.email}`);
          setIsOpen(false);
        },
      },
      {
        id: "action:resume-pdf",
        title: "Download Resume PDF",
        category: "Actions",
        keywords: ["resume", "cv", "pdf", "download"],
        action: () => {
          window.open("/resume.pdf", "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "link:github",
        title: "Open GitHub Profile",
        category: "Links",
        keywords: ["github", "code", "repos"],
        action: () => {
          window.open(contactData.github, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "link:linkedin",
        title: "Open LinkedIn Profile",
        category: "Links",
        keywords: ["linkedin", "social", "network"],
        action: () => {
          window.open(contactData.linkedin, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "link:leetcode",
        title: "Open LeetCode Profile",
        category: "Links",
        keywords: ["leetcode", "dsa", "algorithms"],
        action: () => {
          window.open(contactData.leetcode, "_blank");
          setIsOpen(false);
        },
      },
      {
        id: "system:theme",
        title: "Toggle System Theme (Light/Dark)",
        category: "System",
        keywords: ["theme", "dark", "light", "mode", "toggle"],
        action: () => {
          toggleTheme();
          setIsOpen(false);
        },
      },
    ];
  }, [onNavigate, toggleTheme, copyEmail, openRoute]);

  // Ranked results: empty query keeps recents first; otherwise fuzzy score,
  // tie-broken by recency then declaration order.
  const filteredItems = useMemo(() => {
    const q = search.trim();
    const recentRank = (id: string) => {
      const idx = recents.indexOf(id);
      return idx === -1 ? Number.POSITIVE_INFINITY : idx;
    };
    if (q === "") {
      return items
        .map((item, index) => ({ item, index }))
        .sort((a, b) => {
          const ra = recentRank(a.item.id);
          const rb = recentRank(b.item.id);
          if (ra !== rb) return ra - rb;
          return a.index - b.index;
        })
        .map((entry) => entry.item);
    }
    return items
      .map((item, index) => ({ item, index, score: fuzzyScore(q, `${item.title} ${item.category} ${(item.keywords || []).join(" ")}`) }))
      .filter((e): e is { item: PaletteItem; index: number; score: number } => e.score !== null)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const ra = recentRank(a.item.id);
        const rb = recentRank(b.item.id);
        if (ra !== rb) return ra - rb;
        return a.index - b.index;
      })
      .map((entry) => entry.item);
  }, [search, items, recents]);

  // Selection can never point past the current result set.
  const activeIndex =
    filteredItems.length === 0 ? 0 : Math.min(selectedIndex, filteredItems.length - 1);

  const recordRecent = useCallback((id: string) => {
    setRecents((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, RECENTS_MAX);
      try {
        localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
      } catch {
        /* private mode / quota exceeded — keep the in-memory order only */
      }
      return next;
    });
  }, []);

  const execute = useCallback(
    (item: PaletteItem) => {
      recordRecent(item.id);
      item.action();
    },
    [recordRecent]
  );

  useEffect(() => {
    const openPalette = () => {
      setSearch("");
      setSelectedIndex(0);
      setFeedback(null);
      setIsOpen(true);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Reset query/selection here (an event handler) rather than in an
        // effect watching isOpen, so the palette always opens clean.
        setSearch("");
        setSelectedIndex(0);
        setFeedback(null);
        setIsOpen((open) => !open);
      }
    };
    // Visible trigger button (StatusBar) opens the palette via this event —
    // makes it reachable on touch / without a keyboard.
    document.addEventListener("open-command-palette", openPalette);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("open-command-palette", openPalette);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(focusTimer);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        setSelectedIndex((activeIndex + 1) % filteredItems.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        setSelectedIndex((activeIndex - 1 + filteredItems.length) % filteredItems.length);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filteredItems[activeIndex];
      if (item) execute(item);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[activeIndex] as HTMLElement | undefined;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[15vh] px-4 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-lg border border-card-border bg-card-bg shadow-2xl rounded overflow-hidden font-mono text-xs"
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-card-border/60 px-3 py-2.5">
          <span className="text-accent-teal mr-2 select-none font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            aria-label="Search commands"
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

        <div ref={listRef} role="listbox" aria-label="Commands" className="max-h-60 overflow-y-auto py-1">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-3 text-muted text-center">No terminal commands found.</div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === activeIndex;
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => execute(item)}
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
          {feedback ? (
            <span className="text-accent-teal font-bold" role="status" aria-live="polite">
              {feedback}
            </span>
          ) : (
            <span>Use ↑↓ keys to navigate, ↵ to run</span>
          )}
          <span>Cmd/Ctrl+K to close</span>
        </div>
      </div>
    </div>
  );
}
