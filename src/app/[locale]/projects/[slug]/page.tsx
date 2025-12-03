import {
  Carousel,
  CarouselButton,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import getDictionary from "@/dict/dict";
import { LOCALES, PROJECTS } from "@/lib/const";
import { getLang } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

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

export default async function Page({
  params: { locale, slug },
}: Params<{ slug: string }>) {
  const lang = getLang(locale);
  const {
    projects: { back, items },
  } = await getDictionary(lang);

  if (!(slug in items)) notFound();

  const dict = items[slug as keyof typeof items];
  const { default: Content } = await import(
    `@/dict/markdown/${lang}/${slug}.mdx`
  );

  return (
    <div className="pt-8 sm:pt-16 flex flex-col gap-10 mb-12">
      <section id="header" className="space-y-4">
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link
            className="flex items-center gap-2 text-xs sm:text-sm font-medium"
            href={`/${locale}`}
          >
            <ChevronLeft size={16} strokeWidth={3} /> {back}
          </Link>
          <time className="font-sans text-xs sm:text-sm text-right">
            {dict.dates}
          </time>
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl/none">
          {dict.title}
        </h1>
        <Markdown className="prose max-w-full text-pretty font-sans text-sm/relaxed text-muted-foreground dark:prose-invert">
          {dict.description}
        </Markdown>
      </section>
      <section id="showcase" className="">
        <Carousel className="w-full flex flex-col gap-6">
          <div className="relative h-full w-full border border-border bg-muted rounded-md overflow-hidden [&_div]:ml-0">
            <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 w-10 !h-10 z-10" />
            <CarouselContent>
              {dict.images.map((image, i) => (
                <CarouselItem className="min-h-96 relative" key={i}>
                  <Image
                    className="select-none object-contain"
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    src={image}
                    alt={dict.title}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 w-10 !h-10 z-10" />
          </div>
          <div className="flex flex-wrap gap-4">
            {dict.images.map((image, i) => (
              <CarouselButton index={i} key={i}>
                <Image
                  className="select-none object-cover w-full h-full"
                  width={512}
                  height={512}
                  src={image}
                  alt={dict.title}
                />
              </CarouselButton>
            ))}
          </div>
        </Carousel>
      </section>
      <section id="content">
        <Content />
      </section>
    </div>
  );
}
