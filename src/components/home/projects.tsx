import { Dict } from "@/dict/dict";
import { cn } from "@/lib/utils";
import ProjectsGrid, { ProjectCardData } from "./projects-grid";
import { CONTAINER, DISPLAY_HEADING, SectionIntro } from "./section";

type Props = {
  locale: Locale;
  labels: Dict["home"]["projects"];
  items: Dict["projects"]["items"];
};

export default function Projects({ locale, labels, items }: Props) {
  const projects: ProjectCardData[] = Object.entries(items).map(
    ([slug, item]) => ({
      slug,
      href: `/${locale}/projects/${slug}`,
      name: item.name,
      category: item.category,
      kind: item.kind,
      period: item.period,
      short: item.short,
      cover: "cover" in item ? item.cover : item.images[0],
      tools: item.tags.map((tag) => tag.replace(/^Adobe /, "")),
    })
  );

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
          concept: labels.concept,
          cta: labels.cta,
          empty: labels.empty,
          filters: labels.filters,
        }}
      />
    </section>
  );
}
