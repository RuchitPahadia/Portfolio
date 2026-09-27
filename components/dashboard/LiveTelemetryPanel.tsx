"use client";

import { useState, useEffect } from "react";
import { Activity, GitBranch, Star, Users, Trophy } from "lucide-react";

type Source = "live" | "cache" | "stale";

interface LanguageStat {
  name: string;
  count: number;
}

interface GithubStats {
  repos: number | null;
  stars: number | null;
  followers: number | null;
  topLanguages: LanguageStat[];
  updatedAt: string | null;
  source: Source;
}

interface LeetcodeStats {
  total: number | null;
  easy: number | null;
  medium: number | null;
  hard: number | null;
  updatedAt: string | null;
  source: Source;
}

interface FeedState<T> {
  data: T | null;
  loading: boolean;
  source: Source;
}

const POLL_MS = 5 * 60 * 1000;

// Status badge mirrors CommsPanel: LIVE=teal, CACHED=amber, STALE=alert, SYNC=muted.
function feedBadge(loading: boolean, source: Source) {
  if (loading)
    return { label: "SYNC", dot: "bg-muted", text: "text-muted", pulse: true };
  if (source === "live")
    return { label: "LIVE", dot: "bg-accent-teal", text: "text-accent-teal", pulse: true };
  if (source === "cache")
    return { label: "CACHED", dot: "bg-accent-amber", text: "text-accent-amber", pulse: false };
  return { label: "STALE", dot: "bg-alert", text: "text-alert", pulse: false };
}

// Render a genuinely-fetched number, or an em dash when unavailable — never a
// fabricated value.
function fmt(n: number | null | undefined): string {
  return typeof n === "number" ? n.toLocaleString("en-US") : "—";
}

function Badge({ loading, source }: { loading: boolean; source: Source }) {
  const b = feedBadge(loading, source);
  return (
    <span className={`flex items-center gap-1.5 text-xs font-bold tracking-wider ${b.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${b.dot} ${b.pulse ? "animate-pulse" : ""}`} />
      {b.label}
    </span>
  );
}

function StatTile({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded border border-card-border bg-background/30 p-2.5">
      <div className="flex items-center gap-1.5 text-accent-teal">{icon}</div>
      <div className="mt-1 font-display text-xl font-bold text-foreground">{value}</div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{label}</div>
    </div>
  );
}

export default function LiveTelemetryPanel() {
  const [github, setGithub] = useState<FeedState<GithubStats>>({
    data: null,
    loading: true,
    source: "stale",
  });
  const [leetcode, setLeetcode] = useState<FeedState<LeetcodeStats>>({
    data: null,
    loading: true,
    source: "stale",
  });

  useEffect(() => {
    let active = true;

    const load = () => {
      fetch("/api/github-stats")
        .then((res) => {
          if (!res.ok) throw new Error("API Error");
          return res.json();
        })
        .then((data: GithubStats) => {
          if (!active) return;
          setGithub({ data, loading: false, source: data.source ?? "stale" });
        })
        .catch(() => {
          if (!active) return;
          setGithub((prev) => ({ ...prev, loading: false, source: "stale" }));
        });

      fetch("/api/leetcode-stats")
        .then((res) => {
          if (!res.ok) throw new Error("API Error");
          return res.json();
        })
        .then((data: LeetcodeStats) => {
          if (!active) return;
          setLeetcode({ data, loading: false, source: data.source ?? "stale" });
        })
        .catch(() => {
          if (!active) return;
          setLeetcode((prev) => ({ ...prev, loading: false, source: "stale" }));
        });
    };

    load();
    const interval = setInterval(load, POLL_MS);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const gh = github.data;
  const lc = leetcode.data;
  const hasLanguages = !!gh?.topLanguages?.length;

  return (
    <section id="telemetry" className="glass-panel p-6 font-mono text-sm transition-all duration-300">
      {/* Panel Header - Large Highlighted Tab */}
      <div className="flex items-center justify-between border-b border-card-border pb-3 mb-4 select-none">
        <h2 className="flex items-center gap-2 px-3 py-1.5 m-0 bg-accent-teal/15 border border-accent-teal/30 rounded text-accent-teal font-bold text-sm tracking-wider uppercase">
          <Activity size={14} />
          <span>LIVE_TELEMETRY // ACTIVITY</span>
        </h2>
        <div className="text-xs text-muted tracking-wider">FEED: PUBLIC_APIS // POLL_5M</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GitHub feed */}
        <div className="border border-card-border bg-background/45 rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs text-muted tracking-wider uppercase">
              <GitBranch size={12} className="text-accent-teal" />
              GITHUB // RuchitPahadia
            </span>
            <Badge loading={github.loading} source={github.source} />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <StatTile icon={<GitBranch size={13} />} value={fmt(gh?.repos)} label="Public repos" />
            <StatTile icon={<Star size={13} />} value={fmt(gh?.stars)} label="Total stars" />
            <StatTile icon={<Users size={13} />} value={fmt(gh?.followers)} label="Followers" />
          </div>

          <div className="mt-3">
            <span className="text-[10px] text-muted tracking-wider uppercase block mb-1.5 select-none">
              TOP_LANGUAGES
            </span>
            {hasLanguages ? (
              <div className="flex flex-wrap gap-1.5">
                {gh!.topLanguages.map((l) => (
                  <span
                    key={l.name}
                    className="px-2 py-0.5 rounded text-xs font-mono border bg-muted-light/65 border-card-border/70 text-foreground"
                  >
                    {l.name}
                    <span className="text-muted"> · {l.count}</span>
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-xs text-muted">
                {github.loading ? "Syncing…" : "Unavailable"}
              </span>
            )}
          </div>
        </div>

        {/* LeetCode feed */}
        <div className="border border-card-border bg-background/45 rounded p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs text-muted tracking-wider uppercase">
              <Trophy size={12} className="text-accent-teal" />
              LEETCODE // RuchitPahadia
            </span>
            <Badge loading={leetcode.loading} source={leetcode.source} />
          </div>

          <div className="rounded border border-card-border bg-background/30 p-3 mb-2">
            <div className="font-display text-3xl font-bold text-accent-teal">
              {fmt(lc?.total)}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Problems solved
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded border border-card-border/70 bg-background/20 p-2 text-center">
              <div className="text-base font-bold text-accent-teal">{fmt(lc?.easy)}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Easy</div>
            </div>
            <div className="rounded border border-card-border/70 bg-background/20 p-2 text-center">
              <div className="text-base font-bold text-accent-amber">{fmt(lc?.medium)}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Medium</div>
            </div>
            <div className="rounded border border-card-border/70 bg-background/20 p-2 text-center">
              <div className="text-base font-bold text-alert">{fmt(lc?.hard)}</div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Hard</div>
            </div>
          </div>

          {!leetcode.loading && lc?.total == null && (
            <div className="mt-2 text-xs text-muted">Feed unavailable — showing no data.</div>
          )}
        </div>
      </div>
    </section>
  );
}
