import { CONTAINER } from "@/components/home/section";
import { SHOWCASE_STAGES } from "@/lib/showcase-stages";
import { cn } from "@/lib/utils";
import Image from "next/image";
import DeviceStage from "./device-stage";

type Figure = { image: string; w: number; h: number; title: string; caption: string };

export type ShowcaseSection =
  | { type: "pair"; title: string; items: Figure[] }
  | { type: "stage"; stage: string; title: string; aside?: string };

export type Showcase = { sections: ShowcaseSection[] };

type Props = {
  slug: string;
  showcase: Showcase;
  name: string;
};

const SECTION = cn(CONTAINER, "flex flex-col gap-8 pt-16 md:gap-10 md:pt-28");
const SECTION_TITLE =
  "whitespace-pre-line font-display text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[46px]";

/**
 * Case-study blocks from the Figma "Projekt/…" frames: the key visual stage, then
 * pairs of captioned images and mock-up stages (scrollable screens or photo grids).
 */
export default function ShowcaseSections({ slug, showcase, name }: Props) {
  const stages = SHOWCASE_STAGES[slug];
  if (!stages) return null;

  return (
    <>
      <section className={CONTAINER} aria-label={name}>
        <DeviceStage stage={stages.keyVisual} alt={name} />
      </section>

      {showcase.sections.map((section) => {
        if (section.type === "pair") {
          return (
            <section key={section.title} className={SECTION}>
              <h2 className={SECTION_TITLE}>{section.title}</h2>
              <div className="grid gap-10 md:grid-cols-2 md:gap-8">
                {section.items.map((step) => (
                  <figure key={step.image} className="flex flex-col gap-4">
                    <Image
                      src={step.image}
                      alt={`${name} - ${step.title}`}
                      width={step.w}
                      height={step.h}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-auto w-full rounded-lg border border-line"
                    />
                    <figcaption className="flex flex-col gap-1">
                      <span className="text-base font-bold text-ink">{step.title}</span>
                      <span className="text-[15px] text-muted-ink">{step.caption}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          );
        }

        const stage = stages[section.stage];
        if (!stage) return null;
        return (
          <section key={section.stage} className={SECTION}>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className={SECTION_TITLE}>{section.title}</h2>
              {section.aside && (
                <p className="text-sm font-medium text-plum-text md:whitespace-pre">{section.aside}</p>
              )}
            </div>
            <DeviceStage stage={stage} alt={`${name} - ${section.title.replace(/\n/g, " ")}`} />
          </section>
        );
      })}
    </>
  );
}
