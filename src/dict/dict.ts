import "server-only";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  pl: () => import("./pl.json").then((module) => module.default),
};

const getDictionary = async (locale: Lang) => dictionaries[locale]();

export const LOCALES: Locale[] = ["pl-PL", "en-US", "en-GB"];

export type Dict = Awaited<ReturnType<typeof getDictionary>>;

export default getDictionary;
