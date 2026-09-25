import type { Metadata } from "next";
import { Inter, Space_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteUrl } from "@/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ruchit Pahadia | ML Engineer & AI Developer",
  description: "Portfolio of Ruchit Pahadia, a final-year CSE student and ML Engineer based in Bengaluru, specializing in end-to-end ML, computer vision, and NLP systems.",
  keywords: ["Ruchit Pahadia", "ML Engineer", "AI Developer", "Data Scientist", "BNMIT", "Bengaluru", "Portfolio"],
  authors: [{ name: "Ruchit Pahadia" }],
  openGraph: {
    title: "Ruchit Pahadia | ML Engineer & AI Developer",
    description: "Portfolio of Ruchit Pahadia, a final-year CSE student and ML Engineer based in Bengaluru, specializing in end-to-end ML, computer vision, and NLP systems.",
    url: siteUrl,
    siteName: "Ruchit Pahadia Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruchit Pahadia | ML Engineer & AI Developer",
    description: "Portfolio of Ruchit Pahadia, a final-year CSE student and ML Engineer based in Bengaluru, specializing in end-to-end ML, computer vision, and NLP systems.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

// Pre-hydration theme resolution — eliminates the dark/light flash (FOUC).
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){document.documentElement.classList.add("dark");}})();`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ruchit Pahadia",
  jobTitle: "ML Engineer & AI Developer",
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
  sameAs: [
    "https://github.com/RuchitPahadia",
    "https://www.linkedin.com/in/ruchitpahadia",
    "https://leetcode.com/u/RuchitPahadia/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

