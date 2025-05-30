type Lang = "pl" | "en";

type Locale = `${Lang}-${string}`;

type Params = {
  params: {
    locale: Locale;
  };
};
