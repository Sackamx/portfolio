import BlurFade from "@/components/magicui/blur-fade";
import { Dict } from "@/dict/dict";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Pill from "./pill";
import { CONTAINER } from "./section";

type Props = {
  hero: Dict["home"]["hero"];
  whatsappUrl: string;
};

const BUTTON =
  "inline-flex items-center rounded-full border-[1.5px] px-7 py-[18px] text-base font-bold leading-none transition-transform hover:-translate-y-0.5";

export default function Hero({ hero, whatsappUrl }: Props) {
  return (
    <section
      id="hero"
      className={cn(
        CONTAINER,
        "flex flex-col items-center gap-12 pb-20 pt-10 md:pt-14 lg:flex-row lg:pb-[104px]"
      )}
    >
      <BlurFade className="flex min-w-0 flex-1 flex-col items-start gap-[26px]">
        <Pill variant="filled" className="whitespace-pre">
          {hero.greeting}
        </Pill>
        <h1 className="font-display text-[clamp(84px,13.2vw,190px)] font-extrabold leading-[0.86] tracking-[-0.04em] text-ink">
          <span className="block">{hero.firstName}</span>
          <span className="block text-plum-text">{hero.lastName}</span>
        </h1>
        <p className="font-display text-[22px] font-bold tracking-[-0.01em] text-ink md:text-[28px]">
          {hero.tagline}
        </p>
        <p className="max-w-[600px] text-lg leading-[1.5] text-ink md:text-[21px]">
          {hero.intro}
        </p>
        <ul className="flex flex-wrap gap-2">
          {hero.chips.map((chip) => (
            <li key={chip}>
              <Pill>{chip}</Pill>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <a href="#projects" className={cn(BUTTON, "border-ink bg-ink text-paper")}>
            {hero.primaryCta}
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(BUTTON, "border-ink text-ink")}
          >
            {hero.secondaryCta}
          </a>
        </div>
      </BlurFade>

      <BlurFade delay={0.1} className="w-full max-w-[460px] shrink-0 lg:w-[38%]">
        <div className="relative aspect-[460/560] w-full">
          {/* Polaroid-style photo card, tilted 4° */}
          <div className="absolute left-[7%] top-[5%] w-[85%] rotate-[4deg] border-[1.5px] border-night bg-white px-[3.6%] pb-[14.3%] pt-[3.6%] shadow-[0_24px_48px_-24px_rgba(29,23,32,0.35)]">
            <div className="relative aspect-[360/440] w-full overflow-hidden bg-[#e3e0e2]">
              <div className="absolute left-[-4.58%] top-[-7.95%] h-[115.9%] w-[109.2%] rotate-[-0.28deg]">
                <div className="absolute left-[-132.73%] top-0 h-[145.34%] w-[282.87%]">
                  <Image
                    src="/hero-photo.jpg"
                    alt={hero.photoAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 1100px, 260vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* "design x marketing" sticker */}
          <div className="absolute left-[71.8%] top-[67.5%] flex aspect-square w-[33.9%] -rotate-12 items-center justify-center rounded-full border-[1.5px] border-night bg-lime">
            <p className="text-center font-display text-[15px] font-bold leading-[1.05] text-night sm:text-xl">
              {hero.sticker.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
