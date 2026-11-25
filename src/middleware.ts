import { defineMiddleware } from "astro:middleware";

function preferredLocale(header: string | null): string {
  const languages = (header || "").split(",").map((part, index) => {
    const [language, ...parameters] = part.trim().split(";");
    const quality = parameters.find((parameter) => parameter.trim().startsWith("q="));
    return { language: language.toLowerCase(), quality: quality ? Number(quality.trim().slice(2)) : 1, index };
  });
  languages.sort((a, b) => b.quality - a.quality || a.index - b.index);
  const match = languages.find(({ language, quality }) => quality > 0 && (language === "*" || language.startsWith("en") || language.startsWith("de")));
  return match?.language.startsWith("en") ? "en" : "de-DE";
}

export const onRequest = defineMiddleware((context, next) => {
  const { pathname, search } = context.url;
  if (/^\/(?:en|de|de-DE)(?:\/|$)/.test(pathname) || /\.[\w]+$/.test(pathname) || pathname.startsWith("/_")) {
    return next();
  }
  const locale = preferredLocale(context.request.headers.get("accept-language"));
  return context.redirect(`/${locale}${pathname === "/" ? "" : pathname}${search}`, 307);
});
