import { Dict } from "@/dict/dict";
import { cn } from "@/lib/utils";
import Pill, { PillVariant } from "./pill";
import { CONTAINER, DISPLAY_HEADING } from "./section";

type Props = { about: Dict["home"]["about"] };

const TOOL_STYLE: Record<string, PillVariant> = {
  filled: "filled",
  outline: "outline",
  accent: "accent",
};

export default function About({ about }: Props) {
  return (
    <section
      id="about"
      className={cn(CONTAINER, "flex flex-col gap-12 pb-20 pt-16 md:pb-[104px] md:pt-28 lg:flex-row lg:gap-20")}
    >
      <div className="flex shrink-0 flex-col gap-5 lg:w-[440px]">
        <h2 className={cn(DISPLAY_HEADING, "text-[clamp(52px,8.3vw,120px)] leading-none")}>
          {about.title}
        </h2>
        <div className="flex flex-col gap-4 rounded-2xl border-[1.5px] border-ink bg-surface p-6">
          <p className="text-xs font-bold tracking-[0.08em] text-plum-text">
            {about.educationLabel}
          </p>
          {about.education.map((item, i) => (
            <div
              key={item.school}
              className={cn("flex flex-col gap-1", i > 0 && "border-t border-surface-line pt-4")}
            >
              <p className="font-display text-[22px] font-bold leading-[1.2] text-ink">
                {item.school}
              </p>
              <p className="whitespace-pre-wrap text-[15px] text-muted-ink">{item.details}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <p className="font-display text-[32px] font-bold leading-[1.08] tracking-[-0.02em] text-ink md:text-5xl">
          {about.headline}
        </p>
        {about.paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className={cn("text-lg leading-[1.6]", i === 0 ? "text-ink" : "text-muted-ink")}
          >
            {paragraph}
          </p>
        ))}
        {about.tools.map((group) => (
          <div key={group.title} className="flex flex-col gap-2.5">
            <h3 className="font-display text-xl font-bold text-ink">{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((tool) => (
                <li key={tool}>
                  <Pill variant={TOOL_STYLE[group.style] ?? "outline"}>{tool}</Pill>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
