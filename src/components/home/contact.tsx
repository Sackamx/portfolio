import { Dict } from "@/dict/dict";
import { cn } from "@/lib/utils";
import { CONTAINER } from "./section";

type Props = { contact: Dict["home"]["contact"] };

export default function Contact({ contact }: Props) {
  return (
    <section id="contact" className={cn(CONTAINER, "pb-16 pt-6 md:pb-24")}>
      <div className="flex flex-col gap-10 rounded-[24px] bg-night p-7 dark:border dark:border-night-line md:rounded-[32px] md:p-12 xl:p-[72px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h2 className="font-display text-[clamp(32px,5.6vw,80px)] font-extrabold leading-none tracking-[-0.03em] text-night-foreground">
            {contact.titleLines.map((line) => (
              <span key={line} className="block md:whitespace-nowrap">
                {line}
              </span>
            ))}
          </h2>
          <p className="max-w-[320px] text-base leading-[1.5] text-lilac md:text-lg lg:min-w-[220px]">
            {contact.description}
          </p>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {contact.cards.map((card, i) => (
            <li key={card.label}>
              <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={cn(
                  "group flex h-full flex-col gap-2 rounded-2xl border-[1.5px] p-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime",
                  i === 0
                    ? "border-lime bg-lime text-night"
                    : "border-night-line text-night-foreground hover:border-lime"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-bold tracking-[0.08em]",
                    i === 0 ? "text-night" : "text-lime"
                  )}
                >
                  {card.label}
                </span>
                <span className="break-words text-lg font-medium">{card.value}</span>
                <span
                  aria-hidden="true"
                  className="text-lg font-bold transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
