import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface LanguageStat {
  name: string;
  count: number;
}

interface GithubStatsCache {
  repos: number | null;
  stars: number | null;
  followers: number | null;
  topLanguages: LanguageStat[];
  updatedAt: string | null;
  timestamp: number;
}

// In-memory cache. Seeded with NO fabricated numbers — nulls until a genuine
// fetch succeeds, so a cold failure renders an empty state, never invented counts.
let cachedStats: GithubStatsCache = {
  repos: null,
  stars: null,
  followers: null,
  topLanguages: [],
  updatedAt: null,
  timestamp: 0,
};

// 5 minutes between live refreshes. Note: this cache is per-process, so it is a
// best-effort throttle + graceful-fallback layer (mirrors app/api/git-commit),
// not a global rate-limit guarantee across serverless instances.
const CACHE_DURATION = 5 * 60 * 1000;

const GITHUB_USER = "RuchitPahadia";

// Cap pagination so a runaway account can't fan out unbounded GitHub calls.
const MAX_REPO_PAGES = 5;
const PER_PAGE = 100;

interface GithubRepo {
  stargazers_count?: number;
  language?: string | null;
}

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
};

export async function GET() {
  const now = Date.now();

  // Serve cache within TTL, but only once a real fetch has populated it.
  if (
    cachedStats.timestamp !== 0 &&
    now - cachedStats.timestamp < CACHE_DURATION
  ) {
    return NextResponse.json(
      { ...cachedStats, source: "cache" },
      { headers: NO_STORE_HEADERS }
    );
  }

  let fetchedLive = false;

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "ruchitpahadia-portfolio-dashboard",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers,
      cache: "no-store",
    });

    if (!userRes.ok) {
      throw new Error(`GitHub user API responded with status ${userRes.status}`);
    }

    const user = await userRes.json();

    // Paginate repos so stars/languages cover every public repo (not just the
    // first page), keeping those tallies consistent with the profile repo count.
    const allRepos: GithubRepo[] = [];
    for (let page = 1; page <= MAX_REPO_PAGES; page++) {
      const reposRes = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=${PER_PAGE}&page=${page}&sort=updated`,
        { headers, cache: "no-store" }
      );
      if (!reposRes.ok) {
        throw new Error(`GitHub repos API responded with status ${reposRes.status}`);
      }
      const batch: GithubRepo[] = await reposRes.json();
      if (!Array.isArray(batch)) {
        throw new Error("Unexpected GitHub repos payload");
      }
      allRepos.push(...batch);
      if (batch.length < PER_PAGE) break; // last page reached
    }

    // Total stars across all public repos.
    const stars = allRepos.reduce(
      (sum, r) => sum + (r.stargazers_count ?? 0),
      0
    );

    // Tally primary language across all public repos.
    const langCounts = new Map<string, number>();
    for (const r of allRepos) {
      const lang = r.language;
      if (lang) langCounts.set(lang, (langCounts.get(lang) ?? 0) + 1);
    }
    const topLanguages: LanguageStat[] = Array.from(langCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    cachedStats = {
      repos: typeof user.public_repos === "number" ? user.public_repos : null,
      stars,
      followers: typeof user.followers === "number" ? user.followers : null,
      topLanguages,
      updatedAt: new Date(now).toISOString(),
      timestamp: now,
    };
    fetchedLive = true;
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    // Silent fallback — serve the previous cache (or the null seed) as stale.
  }

  return NextResponse.json(
    { ...cachedStats, source: fetchedLive ? "live" : "stale" },
    { headers: NO_STORE_HEADERS }
  );
}
