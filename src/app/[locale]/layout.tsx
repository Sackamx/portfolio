import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn, getLang } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import getDictionary, { LOCALES } from "@/dict/dict";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "./page";
import Markdown from "react-markdown";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const lang = getLang(params.locale);
  const DICT = await getDictionary(lang);
  return {
    metadataBase: new URL(DICT.url),
    title: {
      default: DICT.name,
      template: `%s | ${DICT.name}`,
    },
    description: DICT.header.description,
    openGraph: {
      title: DICT.name,
      description: DICT.header.description,
      url: `${DICT.url}/${params.locale}`,
      siteName: DICT.name,
      locale: params.locale.split("-").join("_"),
      type: "website",
      alternateLocale: LOCALES.map((locale) => locale.split("-").join("_")),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      title: `${DICT.name}`,
      card: "summary_large_image",
    },
    alternates: {
      canonical: `${DICT.url}/${params.locale}`,
      languages: LOCALES.reduce(
        (prev, locale) => ({
          ...prev,
          [locale]: `${DICT.url}/${locale}`,
        }),
        {} as Record<string, string>
      ),
    },
  };
}

interface Props extends Params {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const lang = getLang(params.locale);
  const dict = await getDictionary(lang);
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased px-6",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <main className="min-h-[100dvh] max-w-3xl mx-auto pb-24">
              {children}
              <section id="contact">
                <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
                  <BlurFade delay={BLUR_FADE_DELAY * 16}>
                    <div className="space-y-3">
                      <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                        {dict.contact.badge}
                      </div>
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        {dict.contact.title}
                      </h2>
                      <Markdown className="prose max-w-full text-pretty font-sans sm:text-lg text-muted-foreground dark:prose-invert">
                        {dict.contact.description}
                      </Markdown>
                    </div>
                  </BlurFade>
                </div>
              </section>
            </main>
            <Navbar dict={dict} />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
