import { CONTAINER } from "@/components/home/section";
import { SHOWCASE_STAGES } from "@/lib/showcase-stages";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CSSProperties } from "react";
import DeviceStage from "./device-stage";

type Picture = { image: string; w: number; h: number };
type Figure = Picture & { title: string; caption: string };

export type ShowcaseSection =
  | { type: "pair"; title: string; items: Figure[] }
  | { type: "stage"; stage: string; title: string; aside?: string }
  /** A whole Figma stage exported as one picture (e.g. brand-book spreads). */
  | ({ type: "panel"; title: string; aside?: string } & Picture)
  /** An untitled full-width stage, like a second key visual. */
  | ({ type: "visual" } & Picture)
  /** Grey panel of labelled rows; each row is one exported strip of creatives. */
  | { type: "gallery"; title: string; aside?: string; groups: (Picture & { label: string })[] }
  /** Playable reels in phone mock-ups (Figma "Mockup/Telefon - Rolka"). */
  | { type: "reels"; title: string; aside?: string; label: string; videos: { src: string; poster: string }[] };

export type Showcase = { keyVisual?: Picture; sections: ShowcaseSection[] };

type Props = {
  slug: string;
  showcase: Showcase;
  name: string;
};

const SECTION = cn(CONTAINER, "flex flex-col gap-8 pt-16 md:gap-10 md:pt-28");
const SECTION_TITLE =
  "whitespace-pre-line font-display text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[46px]";
/** Stage panels are 1280 px wide in Figma; full-width pictures are served at that size. */
const FULL_SIZES = "(min-width: 1440px) 1280px, 100vw";

function Header({ title, aside }: { title: string; aside?: string }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <h2 className={SECTION_TITLE}>{title}</h2>
      {aside && <p className="text-sm font-medium text-plum-text md:whitespace-pre">{aside}</p>}
    </div>
  );
}

function Panel({ picture, alt }: { picture: Picture; alt: string }) {
  return (
    <Image
      src={picture.image}
      alt={alt}
      width={picture.w}
      height={picture.h}
      sizes={FULL_SIZES}
      className="h-auto w-full rounded-2xl"
    />
  );
}

/**
 * Case-study blocks from the Figma "Projekt/…" frames: the key visual, then
 * pairs of captioned images, mock-up stages and galleries of campaign creatives.
 */
export default function ShowcaseSections({ slug, showcase, name }: Props) {
  const stages = SHOWCASE_STAGES[slug];
  if (!stages && !showcase.keyVisual) return null;

  return (
    <>
      <section className={CONTAINER} aria-label={name}>
        {showcase.keyVisual ? (
          <Panel picture={showcase.keyVisual} alt={name} />
        ) : (
          <DeviceStage stage={stages.keyVisual} alt={name} />
        )}
      </section>

      {showcase.sections.map((section, index) => {
        if (section.type === "pair") {
          return (
            <section key={section.title} className={SECTION}>
              <h2 className={SECTION_TITLE}>{section.title}</h2>
              <div
                className="grid gap-10 md:grid-cols-[var(--cols)] md:gap-8"
                style={{ "--cols": section.items.map((item) => `${item.w}fr`).join(" ") } as CSSProperties}
              >
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

        if (section.type === "visual") {
          return (
            <section key={section.image} className={cn(CONTAINER, "pt-16 md:pt-28")}>
              <Panel picture={section} alt={name} />
            </section>
          );
        }

        if (section.type === "panel") {
          return (
            <section key={section.image} className={SECTION}>
              <Header title={section.title} aside={section.aside} />
              <Panel picture={section} alt={`${name} - ${section.title}`} />
            </section>
          );
        }

        if (section.type === "reels") {
          return (
            <section key={`${index}-${section.title}`} className={SECTION}>
              <Header title={section.title} aside={section.aside} />
              {/* Figma stage: 1280 wide, phones 272 × 465 at x 82 / 504 / 926 with a 13 px bezel. */}
              <div className="rounded-2xl bg-[#e3e0e2] px-[6.4%] pb-[4.9%] pt-[5%]">
                <p className="text-[13px] font-medium leading-snug text-muted-ink md:text-sm">
                  {section.label}
                </p>
                <div className="mt-[2.5%] flex justify-between">
                  {section.videos.map((video) => (
                    <div
                      key={video.src}
                      className="w-[24.3%] rounded-[14.2%/8.3%] bg-[#1d1720] p-[1.16%] shadow-[0_12px_32px_rgba(28,23,33,0.18)]"
                    >
                      <video
                        src={video.src}
                        poster={video.poster}
                        controls
                        playsInline
                        preload="none"
                        aria-label={`${name} - ${section.title}`}
                        className="block aspect-[246/439] w-full rounded-[11.5%/6.5%] bg-[#5711c2] object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (section.type === "gallery") {
          return (
            <section key={`${index}-${section.title}`} className={SECTION}>
              <Header title={section.title} aside={section.aside} />
              {/* Spacing in % of the panel width mirrors the Figma stage (64 px margins on 1280). */}
              <div className="overflow-hidden rounded-2xl bg-[#e3e0e2] pb-[3.125%] pt-[5%]">
                {section.groups.map((group, i) => (
                  <figure key={group.image} className={cn(i > 0 && "mt-[1.875%]")}>
                    <figcaption className="px-[5%] text-[13px] font-medium leading-snug text-muted-ink md:text-sm">
                      {group.label}
                    </figcaption>
                    <Image
                      src={group.image}
                      alt={`${name} - ${group.label.split("  ·  ")[0]}`}
                      width={group.w}
                      height={group.h}
                      sizes={FULL_SIZES}
                      className="mt-[0.3%] h-auto w-full"
                    />
                  </figure>
                ))}
              </div>
            </section>
          );
        }

        const stage = stages?.[section.stage];
        if (!stage) return null;
        return (
          <section key={section.stage} className={SECTION}>
            <Header title={section.title} aside={section.aside} />
            <DeviceStage stage={stage} alt={`${name} - ${section.title.replace(/\n/g, " ")}`} />
          </section>
        );
      })}
    </>
  );
}
