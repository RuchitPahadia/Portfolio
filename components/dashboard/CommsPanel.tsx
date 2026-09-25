"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, GitPullRequest, Code, Terminal } from "lucide-react";
import { contactData } from "@/data/contact";
import TerminalPanel from "./TerminalPanel";

const LinkedinIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function CommsPanel() {
  const [gitStatus, setGitStatus] = useState<{
    hash: string;
    date: string;
    msg: string;
    loading: boolean;
    source: "live" | "cache" | "stale";
  }>({
    hash: "1a0e689",
    date: "2026-08-08 18:03:56",
    msg: "Update social links and project repository URLs",
    loading: true,
    source: "stale",
  });

  // Fetch GitHub telemetry
  useEffect(() => {
    const fetchGitStatus = () => {
      fetch("/api/git-commit")
        .then((res) => {
          if (!res.ok) throw new Error("API Error");
          return res.json();
        })
        .then((data) => {
          if (data && data.hash) {
            setGitStatus({
              hash: data.hash,
              date: data.date,
              msg: data.msg,
              loading: false,
              source:
                data.source === "live"
                  ? "live"
                  : data.source === "stale"
                  ? "stale"
                  : "cache",
            });
          }
        })
        .catch(() => {
          // Upstream unreachable — keep showing the last known commit, flagged stale.
          setGitStatus((prev) => ({ ...prev, loading: false, source: "stale" }));
        });
    };

    fetchGitStatus();

    // Poll every 5 minutes; commits change rarely and the API layer caches anyway
    const interval = setInterval(fetchGitStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Feed status badge: live (fresh from GitHub), cached (route's in-memory copy),
  // or stale (upstream unreachable — showing last known / seed commit).
  const feed = gitStatus.loading
    ? { label: "SYNC", dot: "bg-muted", text: "text-muted", pulse: true }
    : gitStatus.source === "live"
    ? { label: "LIVE", dot: "bg-accent-teal", text: "text-accent-teal", pulse: true }
    : gitStatus.source === "cache"
    ? { label: "CACHED", dot: "bg-accent-amber", text: "text-accent-amber", pulse: false }
    : { label: "STALE", dot: "bg-red-500", text: "text-red-500", pulse: false };

  return (
    <section id="comms" className="glass-panel p-6 font-mono text-sm transition-all duration-300">
      {/* Panel Header - Large Highlighted Tab */}
      <div className="flex items-center justify-between border-b border-card-border pb-3 mb-4 select-none">
        <h2 className="flex items-center gap-2 px-3 py-1.5 m-0 bg-accent-teal/15 border border-accent-teal/30 rounded text-accent-teal font-bold text-sm tracking-wider uppercase">
          <Terminal size={14} />
          <span>COMMS_PORT // CONTACT</span>
        </h2>
        <div className="text-xs text-muted tracking-wider">
          SOCKET: COMMS_8080 // ESTABLISHED
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Sockets and GitHub Telemetry */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <span className="text-xs text-muted tracking-wider uppercase mb-1 block select-none">
              SOCKET_CHANNELS
            </span>

            {/* Email Port */}
            <a
              href={`mailto:${contactData.email}`}
              className="flex items-center gap-3 p-2.5 rounded border border-card-border bg-background/30 hover:border-accent-teal/50 hover:bg-accent-teal/5 text-foreground transition-all duration-200"
            >
              <div className="h-7 w-7 rounded bg-accent-teal/10 flex items-center justify-center text-accent-teal">
                <Mail size={14} />
              </div>
              <div>
                <div className="text-xs text-muted font-mono">SOCKET_00 // EMAIL</div>
                <div className="font-bold text-sm font-mono">{contactData.email}</div>
              </div>
            </a>

            {/* Phone Port */}
            <a
              href={`tel:${contactData.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 p-2.5 rounded border border-card-border bg-background/30 hover:border-accent-teal/50 hover:bg-accent-teal/5 text-foreground transition-all duration-200"
            >
              <div className="h-7 w-7 rounded bg-accent-teal/10 flex items-center justify-center text-accent-teal">
                <Phone size={14} />
              </div>
              <div>
                <div className="text-xs text-muted font-mono">SOCKET_01 // VOICE</div>
                <div className="font-bold text-sm font-mono">{contactData.phone}</div>
              </div>
            </a>

            {/* Social channels */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={contactData.github}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 p-2 rounded border border-card-border bg-background/20 hover:border-accent-teal/50 hover:bg-accent-teal/5 text-foreground text-center transition-all duration-200"
              >
                <GitPullRequest size={14} className="text-accent-teal" />
                <span className="text-xs text-muted font-mono">SOCKET_02</span>
                <span className="font-bold text-xs font-mono">GITHUB</span>
              </a>

              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 p-2 rounded border border-card-border bg-background/20 hover:border-accent-teal/50 hover:bg-accent-teal/5 text-foreground text-center transition-all duration-200"
              >
                <LinkedinIcon size={14} className="text-accent-teal" />
                <span className="text-xs text-muted font-mono">SOCKET_03</span>
                <span className="font-bold text-xs font-mono">LINKEDIN</span>
              </a>

              <a
                href={contactData.leetcode}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 p-2 rounded border border-card-border bg-background/20 hover:border-accent-teal/50 hover:bg-accent-teal/5 text-foreground text-center transition-all duration-200"
              >
                <Code size={14} className="text-accent-teal" />
                <span className="text-xs text-muted font-mono">SOCKET_04</span>
                <span className="font-bold text-xs font-mono">LEETCODE</span>
              </a>
            </div>
          </div>

          {/* GitHub Live Telemetry */}
          <div className="border border-card-border bg-background/45 rounded p-3 select-none">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted tracking-wider uppercase">
                GIT_LOGS_TELEMETRY
              </span>
              <span className={`flex items-center gap-1.5 text-xs font-bold tracking-wider ${feed.text}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${feed.dot} ${feed.pulse ? "animate-pulse" : ""}`} />
                {feed.label}
              </span>
            </div>
            <div className="space-y-1 text-xs text-muted">
              <div>
                <span className="text-accent-teal font-bold">REPO:</span> RuchitPahadia/Portfolio
              </div>
              <div>
                <span className="text-accent-teal font-bold">COMMIT_SHA:</span>{" "}
                <span className="bg-muted-light/60 px-1 py-0.2 rounded text-foreground font-mono text-xs">
                  {gitStatus.hash}
                </span>
              </div>
              <div className="truncate">
                <span className="text-accent-teal font-bold">MESSAGE:</span> {gitStatus.msg}
              </div>
              <div>
                <span className="text-accent-teal font-bold">DATE:</span> {gitStatus.date}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Telemetry Terminal */}
        <div className="lg:col-span-6 border-l border-card-border/30 pl-0 lg:pl-6">
          <TerminalPanel />
        </div>
      </div>
    </section>
  );
}
