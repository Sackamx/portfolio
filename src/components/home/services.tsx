import { Dict } from "@/dict/dict";
import { cn } from "@/lib/utils";
import { CONTAINER } from "./section";

type Props = { services: Dict["home"]["services"] };

export default function Services({ services }: Props) {
  return (
    <section id="services" className="bg-plum">
      <div className={cn(CONTAINER, "flex flex-col gap-11 pb-20 pt-16 md:pb-28 md:pt-[104px]")}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2 className="font-display text-[clamp(52px,6.7vw,96px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-night-foreground">
            {services.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="max-w-[360px] text-base leading-[1.5] text-lilac md:text-lg">
            {services.description}
          </p>
        </div>
        <ol className="grid gap-x-12 gap-y-2 md:grid-cols-2 md:gap-y-11">
          {services.items.map((service, i) => (
            <li
              key={service.title}
              className="flex gap-6 border-t border-plum-line py-[22px]"
            >
              <span className="w-12 shrink-0 font-bold text-lime">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-[22px] font-bold text-night-foreground md:text-[26px]">
                  {service.title}
                </h3>
                <p className="leading-[1.45] text-lilac">{service.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
