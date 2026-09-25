// Single source of truth for the deployed site URL.
// Override per environment with NEXT_PUBLIC_SITE_URL (see .env.example).
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ruchit-pahadia-dashboard.vercel.app";
