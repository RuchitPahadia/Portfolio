import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface LeetcodeStatsCache {
  total: number | null;
  easy: number | null;
  medium: number | null;
  hard: number | null;
  updatedAt: string | null;
  timestamp: number;
}

// In-memory cache. Seeded with NO fabricated numbers — nulls until a genuine
// fetch succeeds, so a cold failure renders an empty state, never invented counts.
let cachedStats: LeetcodeStatsCache = {
  total: null,
  easy: null,
  medium: null,
  hard: null,
  updatedAt: null,
  timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000;

const LEETCODE_USER = "RuchitPahadia";

const QUERY = `query userStats($username: String!) {
  matchedUser(username: $username) {
    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}`;

interface AcSubmission {
  difficulty: string;
  count: number;
}

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
};

export async function GET() {
  const now = Date.now();

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
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "ruchitpahadia-portfolio-dashboard",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: LEETCODE_USER },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`LeetCode API responded with status ${response.status}`);
    }

    const json = await response.json();
    const submissions: AcSubmission[] | undefined =
      json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;

    if (!Array.isArray(submissions) || submissions.length === 0) {
      // matchedUser was null (unknown user) or the shape changed — treat as failure.
      throw new Error("Unexpected LeetCode payload or unknown user");
    }

    const byDifficulty = (key: string): number | null => {
      const entry = submissions.find(
        (s) => s.difficulty?.toLowerCase() === key
      );
      return entry && typeof entry.count === "number" ? entry.count : null;
    };

    cachedStats = {
      total: byDifficulty("all"),
      easy: byDifficulty("easy"),
      medium: byDifficulty("medium"),
      hard: byDifficulty("hard"),
      updatedAt: new Date(now).toISOString(),
      timestamp: now,
    };
    fetchedLive = true;
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    // Silent fallback — serve the previous cache (or the null seed) as stale.
  }

  return NextResponse.json(
    { ...cachedStats, source: fetchedLive ? "live" : "stale" },
    { headers: NO_STORE_HEADERS }
  );
}
