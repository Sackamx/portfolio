import { cn } from "@/lib/utils";

/** Shared page gutter: 1440px canvas with 80px side padding on desktop. */
export const CONTAINER = "mx-auto w-full max-w-[1440px] px-6 md:px-10 xl:px-20";

/** Big section heading in Funnel Display (Projekty, Doświadczenie, O mnie). */
export const DISPLAY_HEADING =
  "font-display font-extrabold text-ink leading-[0.95] tracking-[-0.04em]";

export function SectionIntro({
  heading,
  description,
  className,
}: {
  heading: React.ReactNode;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10",
        className
      )}
    >
      {heading}
      {description && (
        <p className="max-w-[380px] text-base leading-[1.5] text-muted-ink md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
