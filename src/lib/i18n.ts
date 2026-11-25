export type Locale = "de-DE" | "en";

export type TranslationKey =
  | "navigation"
  | "legal"
  | "home"
  | "impressum"
  | "more"
  | "learnMore"
  | "localResponsibilityGlobalPerspective"
  | "webdesignBy";

const translations: Record<Locale, Record<TranslationKey, string>> = {
  "de-DE": {
    navigation: "Navigation",
    legal: "Rechtliches",
    home: "Startseite",
    impressum: "Impressum",
    more: "Mehr",
    learnMore: "Erfahren Sie mehr",
    localResponsibilityGlobalPerspective: "Lokale Verantwortung mit globaler Perspektive",
    webdesignBy: "Webdesign von",
  },
  en: {
    navigation: "Navigation",
    legal: "Legal",
    home: "Home",
    impressum: "Imprint",
    more: "More",
    learnMore: "Learn more",
    localResponsibilityGlobalPerspective: "Local Responsibility with Global Perspective",
    webdesignBy: "Webdesign by",
  },
};

export function normalizeLocale(locale: string): Locale {
  if (locale === "en" || locale.startsWith("en-")) {
    return "en";
  }
  return "de-DE";
}

export function t(key: TranslationKey, locale: string): string {
  const normalizedLocale = normalizeLocale(locale);
  return translations[normalizedLocale]?.[key] ?? translations["de-DE"][key] ?? key;
}

export function getDefaultLocale(): Locale {
  return "de-DE";
}
