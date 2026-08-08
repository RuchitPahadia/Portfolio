export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}

export interface CTAButton {
  label: string;
  href: string;
  primary: boolean;
}

export interface HeroData {
  name: string;
  title: string;
  location: string;
  socials: SocialLink[];
  ctas: CTAButton[];
}

export const heroData: HeroData = {
  name: "Ruchit Pahadia",
  title: "Final-year CSE student and ML Engineer — ships end-to-end ML, deep learning, computer vision, and NLP systems from data pipeline to edge deployment",
  location: "Bengaluru, Karnataka",
  socials: [
    { platform: "GitHub", url: "https://github.com/ruchitpahadia", iconName: "github" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/ruchitpahadia", iconName: "linkedin" },
    { platform: "LeetCode", url: "https://leetcode.com/u/RuchitPahadia/", iconName: "code" }
  ],
  ctas: [
    { label: "View Projects", href: "#projects", primary: true },
    { label: "Resume", href: "/resume.pdf", primary: false },
    { label: "Contact", href: "#contact", primary: false }
  ]
};
