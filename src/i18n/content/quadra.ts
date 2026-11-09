import type { Lang } from "../ui";

// Copy for the Quadra app pages (support + privacy policy). The app stores link
// to these URLs, so keep the routes stable: /apps/quadra/ and
// /apps/quadra/privacy/ (and their /pl/ twins).
//
// A privacy section body is a list of blocks: a string is a paragraph, a string
// array is a bulleted list.

export const QUADRA_PATH = "/apps/quadra/";
export const QUADRA_PRIVACY_PATH = "/apps/quadra/privacy/";
export const QUADRA_CONTACT_EMAIL = "michal.gacek@tiptopdesign.pl";

type Block = string | string[];

export const quadraSupportPage = {
  en: {
    metaTitle: "Quadra - box breathing app",
    metaDescription:
      "Support for Quadra, a free box breathing app with a living-light animation. No account, no ads, and your data stays on your phone.",
    eyebrow: "Support",
    title: "Quadra",
    lead: "Box breathing with a living light: four sides, one steady breath. Free, no account, no ads. Your data stays on your phone.",
    faqTitle: "Common questions",
    faq: [
      {
        q: "How does box breathing work?",
        a: "Breathe in, hold, breathe out and hold again, four seconds each by default. Follow the light around the square; each side is one phase.",
      },
      {
        q: "Can I change the rhythm?",
        a: "Yes. Pick Classic, Gentle, Deep or Focus on the start screen, or tap Custom to set each side between 2 and 10 seconds.",
      },
      {
        q: "How do I turn off sound or vibration?",
        a: "Use the buttons at the bottom of a session, or the switches in Settings. Sound cues also respect your phone's silent mode.",
      },
      {
        q: "Does Quadra work with VoiceOver and TalkBack?",
        a: "Yes. Each new phase is announced, and the app supports larger text and Reduce Motion.",
      },
      {
        q: "How do I delete my history?",
        a: "Your history lives only on your device. Uninstalling the app removes it completely.",
      },
      {
        q: "I feel dizzy during a session.",
        a: "Stop and breathe normally. Quadra is a relaxation exercise, not medical advice.",
      },
    ],
    contactTitle: "Contact",
    contactLead: "Questions or feedback:",
    privacyLink: "Privacy policy",
  },
  pl: {
    metaTitle: "Quadra - aplikacja do oddechu pudełkowego",
    metaDescription:
      "Pomoc dla Quadry, darmowej aplikacji do oddechu pudełkowego z animacją żywego światła. Bez konta, bez reklam, a dane zostają na Twoim telefonie.",
    eyebrow: "Pomoc",
    title: "Quadra",
    lead: "Oddech pudełkowy z żywym światłem: cztery boki, jeden spokojny oddech. Za darmo, bez konta i bez reklam. Twoje dane zostają na telefonie.",
    faqTitle: "Częste pytania",
    faq: [
      {
        q: "Na czym polega oddech pudełkowy?",
        a: "Wdech, zatrzymanie, wydech i znowu zatrzymanie, domyślnie po cztery sekundy. Podążaj za światłem wokół kwadratu: każdy bok to jedna faza.",
      },
      {
        q: "Czy mogę zmienić rytm?",
        a: "Tak. Na ekranie startowym wybierz Classic, Gentle, Deep albo Focus. Możesz też stuknąć Custom i ustawić każdy bok w zakresie od 2 do 10 sekund.",
      },
      {
        q: "Jak wyłączyć dźwięk albo wibracje?",
        a: "Użyj przycisków na dole ekranu sesji albo przełączników w ustawieniach. Dźwięki respektują też tryb cichy telefonu.",
      },
      {
        q: "Czy Quadra działa z VoiceOver i TalkBack?",
        a: "Tak. Każda nowa faza jest odczytywana, a aplikacja obsługuje większy tekst i ograniczenie ruchu.",
      },
      {
        q: "Jak usunąć historię?",
        a: "Historia jest zapisana wyłącznie na Twoim urządzeniu. Odinstalowanie aplikacji usuwa ją w całości.",
      },
      {
        q: "Podczas sesji kręci mi się w głowie.",
        a: "Przerwij i oddychaj normalnie. Quadra to ćwiczenie relaksacyjne, a nie porada medyczna.",
      },
    ],
    contactTitle: "Kontakt",
    contactLead: "Pytania i uwagi:",
    privacyLink: "Polityka prywatności",
  },
} satisfies Record<Lang, unknown>;

export const quadraPrivacyPage = {
  en: {
    metaTitle: "Quadra privacy policy",
    metaDescription:
      "Quadra does not collect, share or sell any personal data. Sessions, mood check-ins and settings stay on your device.",
    eyebrow: "Quadra",
    title: "Privacy policy",
    effective: "Effective 29 October 2026",
    lead: "Quadra does not collect, share or sell any personal data. Everything the app knows about you stays on your phone.",
    sections: [
      {
        title: "What the app stores, and where",
        body: [
          "To show your history and streaks, Quadra keeps a small database on your device only:",
          [
            "your breathing sessions: when they started, how long they lasted, how many cycles and which rhythm;",
            "the optional mood check-ins you choose before and after a session;",
            "your settings: sound, haptics, animation style, your custom rhythm, and whether you have seen the introduction.",
          ],
          "This data is never sent to us or anyone else. Deleting the app deletes it.",
        ],
      },
      {
        title: "What the app does not do",
        body: [
          [
            "No account or sign-in.",
            "No analytics, advertising, tracking or third-party data collection.",
            "No access to your microphone, camera, contacts, location or photos. The app asks for no permissions.",
          ],
        ],
      },
      {
        title: "Health",
        body: [
          "Quadra is a relaxation exercise, not a medical device, and it does not give medical advice. If you feel dizzy or light-headed, stop and breathe normally.",
        ],
      },
      {
        title: "Children",
        body: [
          "Quadra is not directed at children under 13 and collects no data from anyone.",
        ],
      },
      {
        title: "Changes",
        body: [
          "If this policy changes, the new version will be published on this page with a new effective date.",
        ],
      },
    ] satisfies { title: string; body: Block[] }[],
    contactTitle: "Contact",
    contactLead: "Questions about privacy:",
    backLink: "Quadra support",
  },
  pl: {
    metaTitle: "Quadra - polityka prywatności",
    metaDescription:
      "Quadra nie zbiera, nie udostępnia ani nie sprzedaje żadnych danych osobowych. Sesje, oceny nastroju i ustawienia zostają na Twoim urządzeniu.",
    eyebrow: "Quadra",
    title: "Polityka prywatności",
    effective: "Obowiązuje od 29 października 2026",
    lead: "Quadra nie zbiera, nie udostępnia ani nie sprzedaje żadnych danych osobowych. Wszystko, co aplikacja o Tobie wie, zostaje na Twoim telefonie.",
    sections: [
      {
        title: "Co aplikacja zapisuje i gdzie",
        body: [
          "Żeby pokazać historię i serię dni, Quadra prowadzi małą bazę danych wyłącznie na Twoim urządzeniu:",
          [
            "sesje oddechowe: kiedy się zaczęły, ile trwały, ile było cykli i jaki rytm;",
            "opcjonalne oceny nastroju, które zaznaczasz przed sesją i po niej;",
            "ustawienia: dźwięk, wibracje, styl animacji, własny rytm i to, czy wprowadzenie zostało już pokazane.",
          ],
          "Te dane nigdy nie trafiają do nas ani do nikogo innego. Usunięcie aplikacji usuwa także je.",
        ],
      },
      {
        title: "Czego aplikacja nie robi",
        body: [
          [
            "Nie ma konta ani logowania.",
            "Nie ma analityki, reklam, śledzenia ani zbierania danych przez podmioty trzecie.",
            "Nie korzysta z mikrofonu, aparatu, kontaktów, lokalizacji ani zdjęć. Aplikacja nie prosi o żadne uprawnienia.",
          ],
        ],
      },
      {
        title: "Zdrowie",
        body: [
          "Quadra to ćwiczenie relaksacyjne, a nie wyrób medyczny, i nie udziela porad medycznych. Jeśli zakręci Ci się w głowie albo poczujesz się słabo, przerwij i oddychaj normalnie.",
        ],
      },
      {
        title: "Dzieci",
        body: [
          "Quadra nie jest skierowana do dzieci poniżej 13 lat i nie zbiera danych od nikogo.",
        ],
      },
      {
        title: "Zmiany",
        body: [
          "Jeśli polityka się zmieni, nowa wersja pojawi się na tej stronie z nową datą obowiązywania.",
        ],
      },
    ] satisfies { title: string; body: Block[] }[],
    contactTitle: "Kontakt",
    contactLead: "Pytania dotyczące prywatności:",
    backLink: "Pomoc Quadry",
  },
} satisfies Record<Lang, unknown>;
