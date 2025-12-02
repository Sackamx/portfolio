"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getLang } from "@/lib/utils";
import { LOCALES } from "@/lib/const";

export default function LanguageSelect() {
  const { replace } = useRouter();
  const { locale } = useParams() as Readonly<{ locale: Locale }>;
  const pathname = usePathname();

  const onValueChange = (lang: string) => {
    const locale = LOCALES.find((locale) => locale.startsWith(lang));
    if (!locale) return;
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = locale;
    replace("/" + segments.join("/"));
  };

  return (
    <Select value={getLang(locale)} onValueChange={onValueChange}>
      <SelectTrigger className="border-0 p-0 shadow-none">
        <SelectValue className="mb-0.5" />
      </SelectTrigger>
      <SelectContent>
        {Array.from(
          new Set(LOCALES.map((locale) => getLang(locale))),
          (lang) => (
            <SelectItem value={lang} key={locale}>
              {lang.toUpperCase()}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}
