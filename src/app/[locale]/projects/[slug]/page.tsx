import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import getDictionary, { LOCALES } from "@/dict/dict";
import { PROJECTS } from "@/lib/const";
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
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            className="flex items-center gap-2 text-sm font-medium"
            href={`/${locale}`}
          >
            <ChevronLeft size={16} strokeWidth={3} /> {back}
          </Link>
          <time className="font-sans text-sm">{dict.dates}</time>
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl/none">
          {dict.title}
        </h1>
        <Markdown className="prose max-w-full text-pretty font-sans text-sm/relaxed text-muted-foreground dark:prose-invert">
          {dict.description}
        </Markdown>
      </section>
      <section id="showcase" className="flex gap-6">
        <Carousel className="w-full border border-border bg-muted rounded-md overflow-hidden [&_*]:h-full [&_div]:ml-0">
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
                  alt={image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex flex-col gap-4">
          {dict.images.map((image, i) => (
            <div
              className="size-24 rounded-md border border-border overflow-hidden relative"
              key={i}
            >
              <Image
                className="select-none object-cover w-full h-full"
                width={512}
                height={512}
                src={image}
                alt={image}
              />
            </div>
          ))}
        </div>
      </section>
      <section>
        <Content />
      </section>
    </div>
  );
}
