import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn, getLang } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import getDictionary from "@/dict/dict";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const lang = getLang(locale);
  const DICT = await getDictionary(lang);
  return {
    metadataBase: new URL(DICT.url),
    title: {
      default: DICT.name,
      template: `%s | ${DICT.name}`,
    },
    description: DICT.description,
    openGraph: {
      title: `${DICT.name}`,
      description: DICT.description,
      url: DICT.url,
      siteName: `${DICT.name}`,
      locale: "en_US",
      type: "website",
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
    verification: {
      google: "",
      yandex: "",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar dict={dict} />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
