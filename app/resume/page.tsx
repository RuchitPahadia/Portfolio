import type { Metadata } from "next";
import Link from "next/link";
import { experiences } from "@/data/experience";
import { educationAchievements } from "@/data/education";
import { skillCategories } from "@/data/skills";
import { contactData } from "@/data/contact";

export const metadata: Metadata = {
  title: "Resume | Ruchit Pahadia",
  description:
    "Printable resume of Ruchit Pahadia — ML Engineer & AI Developer based in Bengaluru. Experience, education, skills, and contact details.",
  alternates: { canonical: "/resume" },
};

const { education, achievements, certifications } = educationAchievements;

// Print stylesheet, scoped under #resume-root so it never leaks into other
// routes and does not require editing app/globals.css. Forces black-on-white
// (overriding the dark-mode body tokens), sensible page margins, and prevents
// entries from splitting across pages.
const printCss = `
@media print {
  .no-print { display: none !important; }
  @page { margin: 16mm 14mm; }
  html, body { background: #ffffff !important; }
  #resume-root {
    background: #ffffff !important;
    color: #000000 !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
    font-size: 11pt;
  }
  #resume-root * {
    color: #000000 !important;
    background: transparent !important;
    box-shadow: none !important;
    border-color: #999999 !important;
  }
  #resume-root a { text-decoration: none !important; }
  #resume-root h1 { font-size: 22pt; }
  #resume-root h2 { font-size: 14pt; border-bottom: 1px solid #000000 !important; }
  #resume-root h3 { font-size: 11.5pt; }
  #resume-root .resume-entry,
  #resume-root li { break-inside: avoid; page-break-inside: avoid; }
}
`;

export default function ResumePage() {
  return (
    <div
      id="resume-root"
      className="mx-auto max-w-3xl bg-background px-5 py-8 text-foreground sm:px-8"
    >
      <style dangerouslySetInnerHTML={{ __html: printCss }} />

      {/* Screen-only action bar — hidden when printing */}
      <div className="no-print mb-8 flex flex-wrap items-center gap-3 text-sm">
        <Link
          href="/"
          className="rounded-lg border border-card-border bg-card-bg px-3 py-1.5 font-semibold text-foreground transition-transform hover:-translate-y-0.5"
        >
          ← Back to portfolio
        </Link>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-accent-teal px-3 py-1.5 font-bold text-background transition-transform hover:-translate-y-0.5"
        >
          Download PDF
        </a>
        <span className="text-muted">Tip: press Ctrl/Cmd + P to save this page as a PDF.</span>
      </div>

      <article>
        <header className="mb-8 border-b border-card-border pb-5">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Ruchit Pahadia
          </h1>
          <p className="mt-1 text-lg font-semibold text-accent-teal">
            ML Engineer &amp; AI Developer
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            <li>
              <a href={`mailto:${contactData.email}`} className="hover:text-accent-teal">
                {contactData.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contactData.phone.replace(/\s+/g, "")}`} className="hover:text-accent-teal">
                {contactData.phone}
              </a>
            </li>
            <li>{contactData.address}</li>
          </ul>
        </header>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-bold">Experience</h2>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={`${exp.company}-${exp.role}`} className="resume-entry">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-base font-semibold">
                    {exp.role} · {exp.company}
                  </h3>
                  <span className="font-mono text-xs text-muted">{exp.period}</span>
                </div>
                <p className="text-sm text-muted">{exp.location}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-bold">Education</h2>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.institution} className="resume-entry">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-base font-semibold">{edu.degree}</h3>
                  <span className="font-mono text-xs text-muted">{edu.period}</span>
                </div>
                <p className="text-sm text-muted">
                  {edu.institution} · {edu.grade}
                </p>
              </div>
            ))}

            {certifications.length > 0 && (
              <div className="resume-entry">
                <h3 className="mb-1 text-base font-semibold">Certifications</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {certifications.map((cert) => (
                    <li key={`${cert.name}-${cert.issuer}`}>
                      {cert.name} — {cert.issuer} ({cert.year})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {achievements.length > 0 && (
              <div className="resume-entry">
                <h3 className="mb-1 text-base font-semibold">Achievements</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {achievements.map((ach) => (
                    <li key={ach.title}>
                      <span className="font-semibold">{ach.title}</span>
                      {ach.year ? ` (${ach.year})` : ""} — {ach.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="mb-4 font-display text-xl font-bold">Skills</h2>
          <div className="space-y-3">
            {skillCategories.map((cat) => (
              <div key={cat.category} className="resume-entry">
                <h3 className="text-sm font-semibold">{cat.category}</h3>
                <p className="text-sm text-muted">{cat.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="mb-4 font-display text-xl font-bold">Contact</h2>
          <ul className="space-y-1 text-sm">
            <li>
              Email:{" "}
              <a href={`mailto:${contactData.email}`} className="text-accent-teal hover:underline">
                {contactData.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href={`tel:${contactData.phone.replace(/\s+/g, "")}`} className="text-accent-teal hover:underline">
                {contactData.phone}
              </a>
            </li>
            <li>Location: {contactData.address}</li>
            <li>
              GitHub:{" "}
              <a href={contactData.github} target="_blank" rel="noopener noreferrer" className="text-accent-teal hover:underline">
                {contactData.github}
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent-teal hover:underline">
                {contactData.linkedin}
              </a>
            </li>
            <li>
              LeetCode:{" "}
              <a href={contactData.leetcode} target="_blank" rel="noopener noreferrer" className="text-accent-teal hover:underline">
                {contactData.leetcode}
              </a>
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
