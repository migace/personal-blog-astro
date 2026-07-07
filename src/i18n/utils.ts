import { defaultLang, localeMeta, ui, type Lang, type UIKey } from "./ui";

const LOCALES = Object.keys(ui) as Lang[];

/** Returns a translator bound to the given language, falling back to English. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Strip the locale prefix from a pathname so we can re-localize it.
 * "/pl/blog/foo/" → "/blog/foo/", "/blog/foo/" → "/blog/foo/".
 */
export function stripLangPrefix(pathname: string): string {
  for (const locale of LOCALES) {
    if (locale === defaultLang) continue;
    if (pathname === `/${locale}` || pathname === `/${locale}/`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(`/${locale}`.length);
    }
  }
  return pathname;
}

/**
 * Build a path for a target language. The default language has no prefix;
 * other languages are served under "/<lang>/...".
 */
export function localizePath(pathname: string, lang: Lang): string {
  const base = stripLangPrefix(pathname);
  if (lang === defaultLang) return base;
  if (base === "/") return `/${lang}/`;
  return `/${lang}${base}`;
}

// The services landing page uses a localized path segment, so it cannot be
// derived with localizePath like pages that share one path across locales.
const SERVICES_PATHS: Record<Lang, string> = {
  en: "/services/",
  pl: "/pl/uslugi/",
};

export function servicesPath(lang: Lang): string {
  return SERVICES_PATHS[lang];
}

export function getLocaleMeta(lang: Lang) {
  return localeMeta[lang];
}

export { defaultLang, LOCALES };
export type { Lang };
