import { Dict } from "@/dict/dict";
import { PROJECTS } from "@/lib/const";
import { cn } from "@/lib/utils";
import ProjectsGrid, { ProjectBadge, ProjectCardData } from "./projects-grid";
import { CONTAINER, DISPLAY_HEADING, SectionIntro } from "./section";

type Props = {
  locale: Locale;
  labels: Dict["home"]["projects"];
  items: Dict["projects"]["items"];
};

export default function Projects({ locale, labels, items }: Props) {
  const projects: ProjectCardData[] = PROJECTS.filter((slug) => slug in items).map((slug) => {
    const item = items[slug as keyof typeof items];
    return {
      slug,
      href: `/${locale}/projects/${slug}`,
      name: item.name,
      category: item.category,
      client: "client" in item ? item.client : undefined,
      badge: ("badge" in item ? item.badge : "concept") as ProjectBadge,
      featured: "featured" in item && item.featured,
      kind: item.kind,
      period: item.period,
      short: item.short,
      cover: "cover" in item ? item.cover : item.images[0],
      tools: item.tags.map((tag) => tag.replace(/^Adobe /, "")),
    };
  });

  return (
    <section
      id="projects"
      className={cn(CONTAINER, "flex scroll-mt-6 flex-col gap-10 pb-20 pt-16 md:pb-[104px] md:pt-24")}
    >
      <SectionIntro
        heading={
          <div className="flex flex-col gap-3">
            <p className="font-medium text-plum-text">{labels.eyebrow}</p>
            <h2 className={cn(DISPLAY_HEADING, "text-[clamp(72px,10.4vw,150px)]")}>
              {labels.title}
            </h2>
          </div>
        }
        description={labels.description}
      />
      <ProjectsGrid
        projects={projects}
        labels={{
          badges: { concept: labels.concept, commercial: labels.commercial, team: labels.team },
          cta: labels.cta,
          empty: labels.empty,
          filters: labels.filters,
          clients: labels.clients,
        }}
      />
    </section>
  );
}
