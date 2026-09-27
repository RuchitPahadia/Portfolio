import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, GitBranch, Terminal } from "lucide-react";
import { projects } from "@/data/projects";
import { siteUrl } from "@/data/site";

type PageParams = { params: Promise<{ slug: string }> };

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found | Ruchit Pahadia" };
  }

  const title = `${project.title} | Ruchit Pahadia`;
  const url = `${siteUrl}/projects/${project.slug}`;

  return {
    title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: project.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageParams) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const isBuilt = project.status === "BUILT";
  // Fall back to the real description/bullets when structured case-study depth
  // is absent OR explicitly empty (an empty array/string is not nullish, so
  // `??` alone would render a blank section).
  const problem = project.caseStudy?.problem || project.description;
  const approach = project.caseStudy?.approach?.length
    ? project.caseStudy.approach
    : project.bullets;
  const outcome = project.caseStudy?.outcome;
  const hasRepo = project.links.github && project.links.github !== "#";
  const hasLive = project.links.live && project.links.live !== "#";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans bg-dot-grid transition-colors duration-300">
      <main className="max-w-4xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* Back to fleet */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-accent-teal hover:text-accent-teal/80 transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          <span>BACK_TO_FLEET</span>
        </Link>

        {/* Header panel */}
        <section className="glass-panel p-6 md:p-8">
          <div className="flex items-center gap-2 font-mono text-xs text-muted tracking-wider uppercase mb-4 select-none">
            <Terminal size={13} className="text-accent-teal" />
            <span>CASE_STUDY // {project.slug}</span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {project.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-muted">{project.period}</span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold tracking-wider border ${
                isBuilt
                  ? "bg-accent-teal/10 border-accent-teal/30 text-accent-teal"
                  : "bg-accent-amber/10 border-accent-amber/30 text-accent-amber"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isBuilt ? "bg-accent-teal" : "bg-accent-amber animate-ping"
                }`}
              />
              {project.status}
            </span>
          </div>

          {/* Tech chips */}
          <div className="mt-5 flex flex-wrap gap-1.5 select-none">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[11px] rounded bg-muted-light/65 border border-card-border/50 text-foreground font-mono font-bold"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          {(hasRepo || hasLive) && (
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-card-border/30 pt-5">
              {hasRepo && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-accent-teal transition-colors duration-200"
                >
                  <GitBranch size={14} />
                  <span>VIEW REPOSITORY</span>
                </a>
              )}
              {hasLive && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-accent-teal transition-colors duration-200"
                >
                  <ExternalLink size={14} />
                  <span>LIVE DEPLOYMENT</span>
                </a>
              )}
            </div>
          )}
        </section>

        {/* Problem / context */}
        <section className="glass-panel p-6 md:p-8">
          <h2 className="flex items-center gap-2 px-3 py-1.5 m-0 mb-4 w-fit bg-accent-teal/15 border border-accent-teal/30 rounded text-accent-teal font-mono font-bold text-sm tracking-wider uppercase select-none">
            PROBLEM // CONTEXT
          </h2>
          <p className="text-base md:text-[17px] text-foreground/90 leading-relaxed">
            {problem}
          </p>
        </section>

        {/* Approach */}
        <section className="glass-panel p-6 md:p-8">
          <h2 className="flex items-center gap-2 px-3 py-1.5 m-0 mb-4 w-fit bg-accent-teal/15 border border-accent-teal/30 rounded text-accent-teal font-mono font-bold text-sm tracking-wider uppercase select-none">
            APPROACH
          </h2>
          <ul className="space-y-3">
            {approach.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm md:text-[15px] text-muted leading-relaxed">
                <span className="text-accent-teal font-mono text-xs mt-1 select-none font-bold shrink-0">
                  ↳ STEP_{String(idx + 1).padStart(2, "0")}:
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Outcome */}
        <section className="glass-panel p-6 md:p-8">
          <h2 className="flex items-center gap-2 px-3 py-1.5 m-0 mb-4 w-fit bg-accent-amber/15 border border-accent-amber/30 rounded text-accent-amber font-mono font-bold text-sm tracking-wider uppercase select-none">
            OUTCOME
          </h2>
          {outcome && outcome.length > 0 ? (
            <ul className="space-y-3">
              {outcome.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm md:text-[15px] text-muted leading-relaxed">
                  <span className="text-accent-amber font-mono text-xs mt-1 select-none font-bold shrink-0">
                    ↳ RESULT_{String(idx + 1).padStart(2, "0")}:
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-mono text-sm text-muted leading-relaxed">
              {/* No measured outcomes are documented in data/projects.ts yet; do
                  not fabricate metrics. */}
              TODO(ruchit): measured outcomes and impact metrics for this project
              are not yet documented. Add them to the project&apos;s{" "}
              <code className="text-accent-amber">caseStudy.outcome</code> field in{" "}
              <code className="text-accent-amber">data/projects.ts</code>.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
