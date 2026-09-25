import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface CommitCache {
  hash: string;
  date: string;
  msg: string;
  timestamp: number;
}

// Simple in-memory cache to prevent rate-limiting and act as fallback
let cachedCommit: CommitCache = {
  hash: "1a0e689",
  date: "2026-08-08 18:03:56",
  msg: "Update social links and project repository URLs",
  timestamp: 0,
};

// 5 minutes: at most ~12 GitHub calls/hour per instance, well under the
// 60 req/hr unauthenticated limit so we don't get throttled into stale fallback.
const CACHE_DURATION = 5 * 60 * 1000;

export async function GET() {
  const now = Date.now();
  
  // Return cached result if it's within cache duration
  if (now - cachedCommit.timestamp < CACHE_DURATION && cachedCommit.timestamp !== 0) {
    return NextResponse.json(
      { ...cachedCommit, source: "cache" },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
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

    const response = await fetch(
      "https://api.github.com/repos/RuchitPahadia/Portfolio/commits/main",
      {
        headers,
        cache: "no-store", // Bypass standard fetch cache to manage freshness in-memory
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (data && data.sha) {
      const dateObj = new Date(data.commit.committer.date);
      const formattedDate = dateObj.toISOString().replace("T", " ").substring(0, 19);

      cachedCommit = {
        hash: data.sha.substring(0, 7),
        date: formattedDate,
        msg: data.commit.message.split("\n")[0],
        timestamp: now,
      };
      fetchedLive = true;
    }
  } catch (error) {
    console.error("Error fetching latest commit from GitHub:", error);
    // Silent catch - we will return the previously cached or default values
  }

  // "live" only when this request actually refreshed from GitHub; "stale" when the
  // upstream call failed and we're serving the previous cache / seed commit.
  return NextResponse.json(
    { ...cachedCommit, source: fetchedLive ? "live" : "stale" },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
}
