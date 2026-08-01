import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ruchit Pahadia | ML Engineer & AI Developer",
  description: "Portfolio of Ruchit Pahadia, a final-year CSE student and ML Engineer based in Bengaluru, specializing in end-to-end ML, computer vision, and NLP systems.",
  keywords: ["Ruchit Pahadia", "ML Engineer", "AI Developer", "Data Scientist", "BNMIT", "Bengaluru", "Portfolio"],
  authors: [{ name: "Ruchit Pahadia" }],
  openGraph: {
    title: "Ruchit Pahadia | ML Engineer & AI Developer",
    description: "Portfolio of Ruchit Pahadia, a final-year CSE student and ML Engineer based in Bengaluru, specializing in end-to-end ML, computer vision, and NLP systems.",
    url: "https://ruchitpahadia.vercel.app",
    siteName: "Ruchit Pahadia Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruchit Pahadia | ML Engineer & AI Developer",
    description: "Portfolio of Ruchit Pahadia, a final-year CSE student and ML Engineer based in Bengaluru, specializing in end-to-end ML, computer vision, and NLP systems.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

