import { Dict } from "@/dict/dict";
import { cn } from "@/lib/utils";
import { CONTAINER, DISPLAY_HEADING, SectionIntro } from "./section";

type Props = { experience: Dict["home"]["experience"] };

export default function Experience({ experience }: Props) {
  return (
    <section id="experience" className="border-t border-line">
      <div className={cn(CONTAINER, "flex flex-col gap-10 pb-20 pt-16 md:pb-[104px] md:pt-24")}>
        <SectionIntro
          heading={
            <h2 className={cn(DISPLAY_HEADING, "text-[clamp(52px,8.3vw,120px)] leading-none")}>
              {experience.title}
            </h2>
          }
          description={experience.description}
        />
        <div>
          {experience.items.map((job) => (
            <article
              key={job.company}
              className="grid gap-4 border-t border-rule py-8 md:grid-cols-[180px_1fr] md:gap-x-10 xl:grid-cols-[240px_460px_1fr]"
            >
              <div className="flex flex-col gap-1.5 text-[15px] font-medium text-plum-text md:items-end md:justify-center md:text-right">
                {job.periods.map((period) => (
                  <p key={period}>{period}</p>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-[32px] font-bold leading-tight tracking-[-0.02em] text-ink md:text-[40px]">
                  {job.company}
                </h3>
                {job.roles.map((role) => (
                  <p key={role} className="text-[17px] font-bold text-ink">
                    {role}
                  </p>
                ))}
                {job.note && (
                  <p className="text-sm leading-[1.45] text-muted-ink">{job.note}</p>
                )}
              </div>
              <ul className="flex flex-col gap-2.5 text-[17px] leading-[1.4] text-ink md:col-start-2 xl:col-start-auto">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span aria-hidden="true">-</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
