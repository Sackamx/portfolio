"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Pill, { PillVariant } from "./pill";

export type ProjectCategory = "web" | "print" | "branding" | "social";
export type ProjectBadge = "concept" | "commercial" | "team";
type CategoryFilter = "featured" | ProjectCategory;
/** Category filters, or `client:<id>` for the per-client filters after the separator. */
type Filter = CategoryFilter | `client:${string}`;

export type ProjectCardData = {
  slug: string;
  href: string;
  name: string;
  category: string;
  client?: string;
  badge: ProjectBadge;
  featured: boolean;
  kind: string;
  period: string;
  short: string;
  cover?: string;
  tools: string[];
};

type Props = {
  projects: ProjectCardData[];
  labels: {
    badges: Record<ProjectBadge, string>;
    cta: string;
    empty: string;
    filters: Record<CategoryFilter, string>;
    clients: Record<string, string>;
  };
};

const CATEGORY_PILL: Record<string, PillVariant> = {
  web: "plum",
  print: "filled",
  branding: "accent",
  social: "filled",
};

// Card badges appear on hover/focus; touch screens (no hover) always show them.
const REVEAL =
  "transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100";

const FILTERS: CategoryFilter[] = ["featured", "web", "print", "branding", "social"];

function matches(project: ProjectCardData, filter: Filter) {
  if (filter === "featured") return project.featured;
  if (filter.startsWith("client:")) return project.client === filter.slice(7);
  return project.category === filter;
}

export default function ProjectsGrid({ projects, labels }: Props) {
  const [filter, setFilter] = useState<Filter>("featured");
  const visible = projects.filter((p) => matches(p, filter));

  const button = (key: Filter, label: string) => (
    <button
      key={key}
      type="button"
      aria-pressed={filter === key}
      onClick={() => setFilter(key)}
      className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-text focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <Pill variant={filter === key ? "ink" : "outline"} className="cursor-pointer transition-colors">
        {label}
      </Pill>
    </button>
  );

  return (
    <>
      <div className="flex flex-wrap items-center gap-2" role="group">
        {FILTERS.map((key) => button(key, labels.filters[key]))}
        <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />
        {Object.entries(labels.clients).map(([id, name]) => button(`client:${id}`, name))}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-lg bg-placeholder px-6 py-16 text-center text-muted-ink">
          {labels.empty}
        </p>
      ) : (
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} labels={labels} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function ProjectCard({
  project,
  labels,
}: {
  project: ProjectCardData;
  labels: Props["labels"];
}) {
  return (
    <Link href={project.href} className="group flex flex-col gap-3.5 focus-visible:outline-none">
      <div className="relative aspect-[405/316] w-full overflow-hidden rounded-lg bg-placeholder group-focus-visible:ring-2 group-focus-visible:ring-plum-text group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-paper">
        {project.cover && (
          <Image
            src={project.cover}
            alt={project.name}
            fill
            sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(29,23,32,0.6)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="rounded-full bg-lime px-[22px] py-3 text-[15px] font-bold text-night">
            {labels.cta}
          </span>
        </div>
        <span className={cn("absolute left-3.5 top-3.5 rounded-full bg-white px-2.5 py-[5px] text-[11px] font-bold leading-none tracking-[0.04em] text-night", REVEAL)}>
          {labels.badges[project.badge]}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-bold tracking-[-0.01em] text-ink">
          {project.name}
        </h3>
        <Pill
          variant={CATEGORY_PILL[project.category] ?? "filled"}
          className={cn("shrink-0 text-xs", REVEAL)}
        >
          {labels.filters[project.category as CategoryFilter] ?? project.category}
        </Pill>
      </div>
      <p className="whitespace-pre-wrap text-sm font-medium text-plum-text">
        {/* Undated projects show their tools instead, as in the Figma card. */}
        {`${project.kind}  ·  ${project.period || project.tools.join(", ")}`}
      </p>
      <p className="text-[15px] leading-[1.5] text-muted-ink">{project.short}</p>
      <ul className="flex flex-wrap gap-1.5">
        {project.tools.map((tool) => (
          <li key={tool}>
            <Pill variant="muted" className={cn("text-xs")}>
              {tool}
            </Pill>
          </li>
        ))}
      </ul>
    </Link>
  );
}
