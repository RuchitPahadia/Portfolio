"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, GitPullRequest, Code, Send, Terminal } from "lucide-react";
import { contactData } from "@/data/contact";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [gitStatus, setGitStatus] = useState({
    hash: "1a0e689",
    date: "2026-08-08 18:03:56",
    msg: "Update social links and project repository URLs",
    loading: true,
  });

  // Fetch GitHub telemetry
  useEffect(() => {
    fetch("https://api.github.com/repos/RuchitPahadia/Portfolio/commits/main")
      .then((res) => {
        if (!res.ok) throw new Error("API Limit");
        return res.json();
      })
      .then((data) => {
        if (data && data.sha) {
          const dateObj = new Date(data.commit.committer.date);
          const formattedDate = dateObj.toISOString().replace("T", " ").substring(0, 19);
          setGitStatus({
            hash: data.sha.substring(0, 7),
            date: formattedDate,
            msg: data.commit.message.split("\n")[0],
            loading: false,
          });
        }
      })
      .catch(() => {
        setGitStatus((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`Inquiry from ${name} via Dashboard Portfolio`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="comms" className="border border-card-border bg-card-bg rounded p-6 font-mono text-sm shadow-sm hover:shadow-md transition-all duration-300">
      {/* Panel Header - Large Highlighted Tab */}
      <div className="flex items-center justify-between border-b border-card-border pb-3 mb-4 select-none">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-teal/15 border border-accent-teal/30 rounded text-accent-teal font-bold text-sm tracking-wider uppercase">
          <Terminal size={14} className="animate-pulse" />
          <span>COMMS_PORT // TRANSMISSION_CHANNELS</span>
        </div>
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
            <span className="text-xs text-muted tracking-wider uppercase mb-1.5 block">
              GIT_LOGS_TELEMETRY (LIVE)
            </span>
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

        {/* Right column: Transmit contact form */}
        <div className="lg:col-span-6 border-l border-card-border/30 pl-0 lg:pl-6">
          <span className="text-xs text-muted tracking-wider uppercase mb-2.5 block select-none">
            COMMS_TRANSMITTER
          </span>

          <form onSubmit={handleTransmit} className="space-y-3 font-sans">
            <div>
              <label className="block font-mono text-xs text-muted uppercase mb-1">
                TRANSMITTER_NAME
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Identified sender name..."
                className="w-full bg-background border border-card-border rounded px-3 py-2 text-sm text-foreground placeholder-muted outline-none focus:border-accent-teal transition-all duration-200 font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-muted uppercase mb-1">
                REPLY_PORT (EMAIL)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@domain.com"
                className="w-full bg-background border border-card-border rounded px-3 py-2 text-sm text-foreground placeholder-muted outline-none focus:border-accent-teal transition-all duration-200 font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-muted uppercase mb-1">
                TRANSMISSION_PAYLOAD
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter details of request..."
                className="w-full bg-background border border-card-border rounded px-3 py-2 text-sm text-foreground placeholder-muted outline-none focus:border-accent-teal transition-all duration-200 font-mono resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 bg-accent-teal hover:bg-accent-teal/90 text-[#14161A] py-2.5 rounded transition-all duration-200 cursor-pointer shadow-sm shadow-accent-teal/10"
            >
              <Send size={12} />
              <span>TRANSMIT_SIGNAL</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
