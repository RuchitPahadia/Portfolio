"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Menu, Sun, Moon, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background blur effect
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section highlighting
      const sections = navItems.map((item) => item.href.substring(1));
      let currentSection = "hero";
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-card-border/50 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          Ruchit<span className="text-accent">.</span>Pahadia
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeSection === item.href.substring(1)
                      ? "text-accent font-semibold"
                      : "text-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg bg-muted-light border border-card-border text-foreground hover:bg-card-border transition-colors cursor-pointer"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg bg-muted-light border border-card-border text-foreground hover:bg-card-border transition-colors cursor-pointer"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg bg-muted-light border border-card-border text-foreground hover:bg-card-border transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-card-border/80 px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block py-2 text-base font-medium transition-colors hover:text-accent ${
                    activeSection === item.href.substring(1)
                      ? "text-accent font-semibold"
                      : "text-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
