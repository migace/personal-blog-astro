export const languages = {
  en: "English",
  pl: "Polski",
} as const;

export const defaultLang = "en";

export type Lang = keyof typeof languages;

export const localeMeta: Record<Lang, { htmlLang: string; ogLocale: string; dateLocale: string }> = {
  en: { htmlLang: "en", ogLocale: "en_US", dateLocale: "en-US" },
  pl: { htmlLang: "pl", ogLocale: "pl_PL", dateLocale: "pl-PL" },
};

// Shared, repeated UI strings. Page-specific marketing copy lives in
// src/i18n/content/*. Keep these human and idiomatic, not literal.
export const ui = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.ariaMain": "Main navigation",
    "brand.tagline": "Michał Gacek",

    "lang.switch": "Language",

    "theme.toggle": "Switch between dark and light mode",

    "beta.badge": "AI beta",
    "beta.notice": "This Polish version was machine-translated by AI (beta) and may contain inaccuracies.",
    "beta.viewOriginal": "Read the English original",

    "footer.kicker": "Michał Gacek / Tiptopdesign",
    "footer.copy": "Full-stack AI consulting for business problems that need real execution.",
    "footer.rights": "All rights reserved.",
    "footer.rss": "RSS feed",

    "post.readingTime": "min read",
    "post.lastUpdated": "Last updated on",
    "post.related": "Related articles",
    "post.moreArticles": "More articles",
    "post.prev": "Previous",
    "post.next": "Next",

    "code.copy": "Copy",
    "code.copied": "Copied",
    "code.lines": "Lines",
    "code.toggleLines": "Toggle line numbers",
    "code.copyToClipboard": "Copy to clipboard",
    "code.collapse": "Collapse",
    "code.expand": "Expand",
    "code.expandLines": "lines",

    "cta.eyebrow": "Work with the author",
    "cta.title": "Michał Gacek - full-stack & AI consulting",
    "cta.body":
      "I help founders and product teams turn complex workflows and AI ideas into maintainable systems that reach production. If this post maps to a problem you are facing, describe it in two sentences and I will reply within 24 hours.",
    "cta.primary": "Discuss a project problem",
    "cta.secondary": "See how I work",

    "newsletter.eyebrow": "Newsletter",
    "newsletter.title": "Get the next engineering note by email",
    "newsletter.body":
      "The newsletter is warming up - the first issue ships in a few months. Leave your email now and new posts and case studies will land in your inbox as they are published.",
    "newsletter.emailLabel": "Email address",
    "newsletter.placeholder": "you@company.com",
    "newsletter.button": "Sign me up",
    "newsletter.note": "No obligations, no spam - one click to unsubscribe.",
    "newsletter.success": "Thanks! You're on the list.",
    "newsletter.invalid": "Please enter a valid email address.",
    "newsletter.error":
      "Could not sign you up right now. Please try again later.",
    "newsletter.honeypot": "Leave this field empty",

    "notFound.eyebrow": "Error 404",
    "notFound.title": "This page took a wrong turn.",
    "notFound.lead": "The link is broken or the page has moved. Here is where to go next.",
    "notFound.home": "Go to home",
    "notFound.blog": "Read the blog",
    "notFound.contact": "Contact",
    "notFound.metaTitle": "Page not found",
    "notFound.metaDescription":
      "The page you were looking for does not exist. Head back to the blog or get in touch.",

    "a11y.allArticles": "All articles",
    "a11y.contactSection": "Contact form and direct channels",
    "a11y.trackRecord": "Track record",
    "a11y.engagementMeta": "Engagement format and availability",
    "a11y.breadcrumb": "Breadcrumb",
    "a11y.skipToContent": "Skip to content",
  },
  pl: {
    "nav.home": "Start",
    "nav.services": "Usługi",
    "nav.blog": "Blog",
    "nav.about": "O mnie",
    "nav.contact": "Kontakt",
    "nav.ariaMain": "Nawigacja główna",
    "brand.tagline": "Michał Gacek",

    "lang.switch": "Język",

    "theme.toggle": "Przełącz między trybem ciemnym a jasnym",

    "beta.badge": "AI beta",
    "beta.notice": "Ta wersja polska została przetłumaczona maszynowo przez AI (beta) i może zawierać nieścisłości.",
    "beta.viewOriginal": "Przeczytaj oryginał po angielsku",

    "footer.kicker": "Michał Gacek / Tiptopdesign",
    "footer.copy":
      "Konsulting full-stack i AI dla problemów biznesowych, które trzeba realnie dowieźć.",
    "footer.rights": "Wszelkie prawa zastrzeżone.",
    "footer.rss": "Kanał RSS",

    "post.readingTime": "min czytania",
    "post.lastUpdated": "Aktualizacja",
    "post.related": "Powiązane artykuły",
    "post.moreArticles": "Więcej artykułów",
    "post.prev": "Poprzedni",
    "post.next": "Następny",

    "code.copy": "Kopiuj",
    "code.copied": "Skopiowano",
    "code.lines": "Numery",
    "code.toggleLines": "Przełącz numery linii",
    "code.copyToClipboard": "Kopiuj do schowka",
    "code.collapse": "Zwiń",
    "code.expand": "Rozwiń",
    "code.expandLines": "linii",

    "cta.eyebrow": "Współpraca z autorem",
    "cta.title": "Michał Gacek - konsulting full-stack i AI",
    "cta.body":
      "Pomagam founderom i zespołom produktowym zamieniać złożone procesy i pomysły na AI w utrzymywalne systemy, które trafiają na produkcję. Jeśli ten wpis dotyka problemu, z którym się mierzysz, opisz go w dwóch zdaniach, a odpowiem w ciągu 24 godzin.",
    "cta.primary": "Opowiedz mi o problemie",
    "cta.secondary": "Zobacz, jak pracuję",

    "newsletter.eyebrow": "Newsletter",
    "newsletter.title": "Kolejne notatki inżynierskie prosto na maila",
    "newsletter.body":
      "Newsletter dopiero się rozkręca - pierwsze wydanie za kilka miesięcy. Zostaw adres już teraz, a nowe wpisy i case studies trafią do Ciebie od razu po publikacji.",
    "newsletter.emailLabel": "Adres e-mail",
    "newsletter.placeholder": "ty@firma.pl",
    "newsletter.button": "Zapisz mnie",
    "newsletter.note": "Bez zobowiązań i bez spamu - wypisujesz się jednym kliknięciem.",
    "newsletter.success": "Dzięki! Jesteś na liście.",
    "newsletter.invalid": "Podaj poprawny adres e-mail.",
    "newsletter.error": "Nie udało się zapisać. Spróbuj ponownie później.",
    "newsletter.honeypot": "Zostaw to pole puste",

    "notFound.eyebrow": "Błąd 404",
    "notFound.title": "Ta strona zabłądziła.",
    "notFound.lead": "Link jest nieaktualny albo strona zmieniła adres. Oto dokąd możesz przejść dalej.",
    "notFound.home": "Wróć na stronę główną",
    "notFound.blog": "Czytaj bloga",
    "notFound.contact": "Kontakt",
    "notFound.metaTitle": "Nie znaleziono strony",
    "notFound.metaDescription":
      "Strona, której szukasz, nie istnieje. Wróć na bloga albo napisz do mnie.",

    "a11y.allArticles": "Wszystkie artykuły",
    "a11y.contactSection": "Formularz kontaktowy i bezpośrednie kanały",
    "a11y.trackRecord": "Dotychczasowe realizacje",
    "a11y.engagementMeta": "Format współpracy i dostępność",
    "a11y.breadcrumb": "Ścieżka nawigacji",
    "a11y.skipToContent": "Przejdź do treści",
  },
} as const;

export type UIKey = keyof (typeof ui)["en"];
