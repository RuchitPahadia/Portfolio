import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-card-border/50 bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-muted text-center md:text-left">
          © {currentYear} Ruchit Pahadia. All rights reserved.
        </div>
        <div className="text-xs text-muted/80 text-center md:text-right">
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent font-medium transition-colors"
          >
            Next.js
          </a>{" "}
          &{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent font-medium transition-colors"
          >
            Tailwind CSS
          </a>
        </div>
      </div>
    </footer>
  );
}
