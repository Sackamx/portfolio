type Lang = "pl" | "en";

type Locale = `${Lang}-${string}`;

type Params<T = {}> = {
  params: T & {
    locale: Locale;
  };
};
