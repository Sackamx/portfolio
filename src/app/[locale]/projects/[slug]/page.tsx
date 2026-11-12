import Pill from "@/components/home/pill";
import { CONTAINER } from "@/components/home/section";
import Gallery from "@/components/project/gallery";
import ShowcaseSections, { Showcase } from "@/components/project/showcase";
import getDictionary from "@/dict/dict";
import { LOCALES, PROJECTS } from "@/lib/const";
import { getProjectSections } from "@/lib/project-content";
import { cn, getLang } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown, { Components } from "react-markdown";

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    PROJECTS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params: { locale, slug },
}: Params<{ slug: string }>): Promise<Metadata> {
  const lang = getLang(locale);
  const {
    url,
    name,
    projects: { items },
  } = await getDictionary(lang);

  if (!(slug in items)) return {};

  const dict = items[slug as keyof typeof items];

  return {
    title: dict.title,
    description: dict.description,
    openGraph: {
      title: dict.title,
      description: dict.description,
      url: `${url}/${locale}/projects/${slug}`,
      siteName: name,
      locale: locale.split("-").join("_"),
      type: "website",
      alternateLocale: LOCALES.map((locale) => locale.split("-").join("_")),
    },
    twitter: {
      title: `${dict.title} | ${name}`,
      card: "summary_large_image",
    },
    alternates: {
      canonical: `${url}/${locale}/projects/${slug}`,
      languages: LOCALES.reduce(
        (prev, locale) => ({
          ...prev,
          [locale]: `${url}/${locale}/projects/${slug}`,
        }),
        {} as Record<string, string>
      ),
    },
  };
}

const proseComponents: Components = {
  p: ({ node, ...props }) => <p {...props} />,
  // Source texts use hard line breaks between thoughts; give them paragraph spacing.
  br: () => <span aria-hidden="true" className="block h-5" />,
  strong: ({ node, ...props }) => <strong {...props} className="font-bold" />,
  ul: ({ node, ...props }) => (
    <ul {...props} className="flex list-none flex-col gap-2" />
  ),
  li: ({ node, ...props }) => (
    <li className="flex gap-3">
      <span aria-hidden="true" className="text-plum-text">
        —
      </span>
      <span {...props} />
    </li>
  ),
};

const BODY = "flex flex-col gap-5 text-lg leading-[1.6] text-muted-ink";
const ROW = "flex flex-col gap-5 border-t-[1.5px] border-ink pb-12 pt-8 lg:flex-row lg:gap-16";
const ROW_TITLE =
  "font-display text-[26px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[32px] lg:w-[400px] lg:shrink-0";

export default async function Page({
  params: { locale, slug },
}: Params<{ slug: string }>) {
  const lang = getLang(locale);
  const {
    home,
    projects: { labels, items },
  } = await getDictionary(lang);

  if (!(slug in items)) notFound();

  const project = items[slug as keyof typeof items];
  const sections = await getProjectSections(lang, slug);
  const categoryName =
    home.projects.filters[project.category as keyof typeof home.projects.filters] ??
    project.category;
  // The meta row may spell the category out in more detail (e.g. "Web · UX/UI").
  const categoryLabel = "categoryLabel" in project ? project.categoryLabel : categoryName;
  const tools = project.tags.map((tag) => tag.replace(/^Adobe /, ""));
  const showcase = "showcase" in project ? (project.showcase as Showcase) : null;
  const palette = "palette" in project ? project.palette : [];
  // Figma shortens some hero titles ("Artiko" for "Artiko Festival").
  const heroName = "heroName" in project ? project.heroName : project.name;

  const meta = [
    { label: labels.kind, value: "metaKind" in project ? project.metaKind : project.kind },
    { label: labels.dates, value: project.period },
    { label: labels.category, value: categoryLabel },
  ].filter((item) => item.value);

  return (
    <article>
      {/* Hero */}
      <section className={cn(CONTAINER, "flex flex-col gap-8 pb-12 pt-10 md:pb-16 md:pt-16")}>
        <Link
          href={`/${locale}#projects`}
          className="w-fit text-sm font-medium text-muted-ink transition-colors hover:text-ink"
        >
          ← {labels.back}
        </Link>
        <div className="flex flex-wrap gap-2">
          <Pill variant="plum" className="text-[13px]">
            {categoryName}
          </Pill>
          <Pill variant="filled" className="text-[13px]">
            {labels.concept}
          </Pill>
        </div>
        <h1 className="font-display text-[clamp(64px,10.4vw,150px)] font-extrabold leading-[0.86] tracking-[-0.04em] text-ink">
          {heroName}
        </h1>
        <div className="flex flex-col gap-6 pb-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <p className="max-w-[520px] whitespace-pre-line font-display text-[30px] font-bold leading-[1.05] tracking-[-0.02em] text-plum-text md:text-[44px]">
            {project.headline}
          </p>
          <Markdown
            components={{ strong: proseComponents.strong }}
            className="max-w-[620px] text-lg leading-[1.55] text-muted-ink md:text-[19px] [&_p]:m-0"
          >
            {project.description}
          </Markdown>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:gap-x-8">
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col gap-2.5 border-t-[1.5px] border-ink pt-4">
              <dt className="text-[13px] font-medium uppercase tracking-[0.06em] text-muted-ink">
                {item.label}
              </dt>
              <dd className="text-lg font-medium text-ink">{item.value}</dd>
            </div>
          ))}
          <div className="col-span-2 flex flex-col gap-2.5 border-t-[1.5px] border-ink pt-4 md:col-span-1">
            <dt className="text-[13px] font-medium uppercase tracking-[0.06em] text-muted-ink">
              {labels.tools}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Pill key={tool} variant="muted" className="text-xs">
                  {tool}
                </Pill>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      {showcase ? (
        <ShowcaseSections slug={slug} showcase={showcase} name={project.name} />
      ) : (
        <section className={CONTAINER} aria-label={project.title}>
          <Gallery
            images={project.images}
            alt={project.title}
            labels={{
              prev: labels.prev,
              next: labels.next,
              open: labels.open,
              close: labels.close,
            }}
          />
        </section>
      )}

      {/* Project details */}
      <section className={cn(CONTAINER, "pb-16 pt-16 md:pb-24 md:pt-28")}>
        {palette.length > 0 && (
          <div className={ROW}>
            <h2 className={ROW_TITLE}>{labels.palette}</h2>
            <ul className="flex min-w-0 flex-1 flex-wrap gap-4">
              {palette.map((color) => (
                <li key={color.hex} className="flex w-[104px] flex-col">
                  <span
                    aria-hidden="true"
                    className="h-[72px] rounded-xl border border-line"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="mt-2.5 text-sm font-bold text-ink">{color.name}</span>
                  <span className="text-[13px] text-muted-ink">{color.hex}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {sections.map((section) => (
          <div key={section.title} className={ROW}>
            <h2 className={ROW_TITLE}>{section.title}</h2>
            <div className="flex min-w-0 flex-1 flex-col gap-5">
              {section.body && (
                <Markdown components={proseComponents} className={BODY}>
                  {section.body}
                </Markdown>
              )}
              {section.items.map((item) => (
                <div key={item.title} className="flex flex-col gap-1 md:flex-row md:gap-6">
                  <h3 className="text-base font-bold leading-[1.8] text-ink md:w-[160px] md:shrink-0">
                    {item.title}
                  </h3>
                  <Markdown components={proseComponents} className={cn(BODY, "min-w-0 flex-1")}>
                    {item.body}
                  </Markdown>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
