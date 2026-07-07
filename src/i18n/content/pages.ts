import type { Lang } from "../ui";

// Page-level marketing copy. The markup is shared across languages; only the
// strings differ. Polish here is idiomatic, not a literal translation.

export const blogPage = {
  en: {
    metaTitle: "Blog",
    metaDescription:
      "Practical engineering notes on AI workflows, software architecture, testing strategy, and full-stack delivery by Michał Gacek.",
    eyebrow: "Proof library by Michał Gacek",
    title:
      "Practical notes on AI workflows, architecture, quality, and full-stack delivery.",
    lead: "These posts document decisions behind real systems: TypeScript, backend architecture, testing strategy, developer workflows, and AI beyond demos.",
    focus: [
      {
        title: "AI-assisted engineering",
        desc: "Agents, tool workflows, local automation, and evaluation.",
      },
      {
        title: "Software architecture",
        desc: "Product modeling, backend boundaries, and delivery trade-offs.",
      },
      {
        title: "Quality and DX",
        desc: "Playwright, TypeScript, CI feedback, and maintainable tests.",
      },
    ],
    browseByTopic: "Browse by topic",
    featured: "Featured article",
  },
  pl: {
    metaTitle: "Blog",
    metaDescription:
      "Praktyczne notatki inżynierskie o procesach z AI, architekturze oprogramowania, strategii testów i wytwarzaniu full-stack - Michał Gacek.",
    eyebrow: "Biblioteka dowodów - Michał Gacek",
    title:
      "Praktyczne notatki o pracy z AI, architekturze, jakości i dowożeniu full-stack.",
    lead: "Te wpisy dokumentują decyzje stojące za realnymi systemami: TypeScript, architektura backendu, strategia testów, codzienne workflow programisty i AI poza wersją demo.",
    focus: [
      {
        title: "Inżynieria wspierana przez AI",
        desc: "Agenci, workflow z narzędziami, lokalna automatyzacja i ewaluacja.",
      },
      {
        title: "Architektura oprogramowania",
        desc: "Modelowanie produktu, granice backendu i kompromisy w dowożeniu.",
      },
      {
        title: "Jakość i DX",
        desc: "Playwright, TypeScript, szybki feedback z CI i testy, które da się utrzymać.",
      },
    ],
    browseByTopic: "Przeglądaj tematy",
    featured: "Wyróżniony artykuł",
  },
} as const satisfies Record<Lang, unknown>;

export const homePage = {
  en: {
    metaTitle: "Tiptopdesign - Full-stack AI consulting by Michał Gacek",
    metaDescription:
      "Full-stack AI consulting and practical engineering by Michał Gacek for business problems that need real execution.",
    hero: {
      eyebrow: "Michał Gacek / Tiptopdesign",
      title:
        "Full-stack AI consulting for business problems that need real execution.",
      lead: "I help founders, product leaders, and technical teams turn complex workflows, product ideas, and AI opportunities into maintainable software that can reach production.",
      ctaPrimary: "Discuss a project problem",
      ctaSecondary: "Read the proof library",
    },
    panelLabel: "Working model",
    deliverySteps: [
      "Understand the business constraint",
      "Design the technical path",
      "Build the full-stack system",
      "Evaluate AI and quality risks",
      "Ship, measure, and iterate",
    ],
    trustLabel: "Senior full-stack work delivered across teams at",
    fit: {
      eyebrow: "Problem fit",
      title: 'Useful when the problem is not just "write more code".',
      lead: "The best fit is a situation where business context, architecture, implementation, and AI judgment all have to meet.",
      cards: [
        {
          mark: "Workflow",
          title: "Internal process stuck in manual work",
          body: "Map the real workflow, remove fragile handoffs, and build a tool that fits how the business actually operates.",
        },
        {
          mark: "AI",
          title: "AI idea needs feasibility and delivery",
          body: "Turn an AI concept into a scoped workflow with evaluation, tool-calling boundaries, and production constraints.",
        },
        {
          mark: "Product",
          title: "Prototype needs production architecture",
          body: "Move from a promising demo to a system with maintainable boundaries, tests, deployment, and operating discipline.",
        },
      ],
    },
    process: {
      eyebrow: "How I work",
      title: "Senior execution across the whole path.",
      steps: [
        { strong: "Concept", span: "clarify the problem and constraints" },
        {
          strong: "Architecture",
          span: "choose boundaries, data flows, and trade-offs",
        },
        {
          strong: "Implementation",
          span: "build full-stack features and integration points",
        },
        {
          strong: "Evaluation",
          span: "test quality, AI behavior, and operational risk",
        },
        {
          strong: "Production",
          span: "ship, observe, and iterate with the team",
        },
      ],
    },
    services: {
      eyebrow: "Ways to work together",
      title:
        "Four ways to get unstuck - pick the shape that fits this quarter.",
      lead: "Each engagement is sized to do one specific thing well. Start with the smallest one that creates clarity; the rest follows from what we learn.",
      meta: [
        "Audits run 1–2 weeks",
        "Builds typically 4–12 weeks",
        "Most engagements kick off within 2–3 weeks of the first call",
      ],
      fitLabel: "Best for",
      listLabel: "You get",
      cards: [
        {
          format: "2-week audit",
          title: "AI workflow audit",
          outcome:
            "In two weeks you know whether, where, and how AI fits your process - and what shipping it would actually cost.",
          fit: "teams considering AI without a clear hypothesis of where it creates value, or an AI feature stuck in proof-of-concept.",
          list: [
            "Process map with candidate AI insertion points",
            "Per-step feasibility, risk, and quality-evaluation strategy",
            "Cost estimate covering inference, build, and run",
            "Go / no-go recommendation with a scoped next phase",
          ],
          related: "Related: LLM workflow for E2E tests",
          relatedSlug: "llm-workflow-e2e-tests",
          mailSubject: "AI workflow audit",
          button: "Start with an audit",
        },
        {
          format: "1-week review",
          title: "Technical architecture review",
          outcome:
            "You walk away knowing where the architecture will break, what to fix first, and what is actually fine to leave alone.",
          fit: "pre-investment due diligence, post-MVP reality checks, or onboarding a new technical lead.",
          list: [
            "Written architecture review of boundaries, data flows, and integration risks",
            "Prioritized risk register - what blocks scale versus what is safe to ignore",
            "90-day stabilization plan",
            "Reference architecture for the next 6–12 months",
          ],
          related: "Related: How architecture shapes what is buildable",
          relatedSlug: "cpq-and-eav-model",
          mailSubject: "Architecture review",
          button: "Book a review",
        },
        {
          format: "4–12 week build",
          title: "Prototype to production",
          outcome:
            "A validated demo becomes a system real users can rely on - and that your team can keep extending after I leave.",
          fit: "founders with a working AI or product demo and no production path, and teams that need senior full-stack capacity to cross the gap.",
          list: [
            "Production architecture covering data, services, deployment, and observability",
            "Full-stack implementation in your stack, shipped to real users",
            "Test and evaluation harness, including AI behavior where relevant",
            "Handoff documentation and a maintenance runbook",
          ],
          related: "Related: Real caching architecture under production load",
          relatedSlug: "redis-in-practice-hono-typescript",
          mailSubject: "Prototype to production",
          button: "Discuss the build",
        },
        {
          format: "Starts with a 2-week diagnostic",
          title: "Full-stack product rescue",
          outcome:
            "A stuck project gets a clear path forward - and a senior pair of hands who can execute it alongside your team.",
          fit: "inherited codebases, stalled rewrites, or projects where the original team left or burned out.",
          list: [
            "Diagnostic of where delivery is actually blocked - technical, process, or scope",
            "Triage plan with the next three unblockers, ranked",
            "Hands-on implementation to ship the next milestone",
            "Optional ongoing senior capacity once the project is moving again",
          ],
          related: "Related: Why senior judgment matters when things get hard",
          relatedSlug: "end-of-fast-coding",
          mailSubject: "Product rescue",
          button: "Tell me what is stuck",
        },
      ],
      cta: {
        eyebrow: "Not sure which one fits?",
        title: "Describe the problem in two sentences.",
        body: "You will get a written response within 24 hours - no pitch, just whether and how I can help.",
        mailSubject: "Project problem",
        primary: "Email me the problem",
        secondary: "Book a 30-min scoping call",
      },
    },
    testimonials: {
      eyebrow: "What clients say",
      title: "Senior judgment, in their words.",
    },
    proof: {
      eyebrow: "Proof through work",
      title: "Technical writing as evidence of judgment.",
      lead: "The blog is a proof library: architecture decisions, AI workflows, testing strategy, backend systems, and interactive explanations.",
    },
    lab: {
      eyebrow: "Interactive lab",
      title:
        "Concepts should be touchable when timing, state, or trade-offs matter.",
      lead: "The Redis case study includes a cache-aside playground so readers can feel the difference between a cache miss, a cache hit, and TTL invalidation.",
      button: "Explore the Redis playground",
    },
  },
  pl: {
    metaTitle: "Tiptopdesign - konsulting full-stack i AI, Michał Gacek",
    metaDescription:
      "Konsulting full-stack i AI oraz praktyczna inżynieria - Michał Gacek pomaga rozwiązywać problemy biznesowe, które trzeba realnie dowieźć.",
    hero: {
      eyebrow: "Michał Gacek / Tiptopdesign",
      title:
        "Konsulting full-stack i AI dla problemów biznesowych, które trzeba realnie dowieźć.",
      lead: "Pomagam founderom, liderom produktu i zespołom technicznym zamieniać złożone procesy, pomysły produktowe i szanse związane z AI w utrzymywalne oprogramowanie, które trafia na produkcję.",
      ctaPrimary: "Opowiedz mi o problemie",
      ctaSecondary: "Zajrzyj do biblioteki dowodów",
    },
    panelLabel: "Model pracy",
    deliverySteps: [
      "Zrozumieć ograniczenie biznesowe",
      "Zaprojektować ścieżkę techniczną",
      "Zbudować system full-stack",
      "Ocenić ryzyka AI i jakości",
      "Wdrożyć, mierzyć i iterować",
    ],
    trustLabel: "Praca full-stack dowieziona w zespołach m.in. w",
    fit: {
      eyebrow: "Kiedy pasuję",
      title:
        'Przydaję się, gdy problemem nie jest tylko "napisać więcej kodu".',
      lead: "Najlepiej sprawdzam się tam, gdzie muszą spotkać się kontekst biznesowy, architektura, implementacja i trzeźwa ocena AI.",
      cards: [
        {
          mark: "Proces",
          title: "Wewnętrzny proces ugrzązł w ręcznej robocie",
          body: "Mapuję realny przebieg pracy, eliminuję kruche przekazania i buduję narzędzie dopasowane do tego, jak firma faktycznie działa.",
        },
        {
          mark: "AI",
          title: "Pomysł na AI potrzebuje weryfikacji i dowiezienia",
          body: "Zamieniam koncept AI w ograniczony, dobrze zdefiniowany proces z ewaluacją, granicami wywołań narzędzi i wymaganiami produkcyjnymi.",
        },
        {
          mark: "Produkt",
          title: "Prototyp potrzebuje architektury produkcyjnej",
          body: "Prowadzę od obiecującego demo do systemu z utrzymywalnymi granicami, testami, wdrożeniem i dyscypliną operacyjną.",
        },
      ],
    },
    process: {
      eyebrow: "Jak pracuję",
      title: "Dowożenie na całej ścieżce",
      steps: [
        { strong: "Koncepcja", span: "doprecyzować problem i ograniczenia" },
        {
          strong: "Architektura",
          span: "dobrać granice, przepływy danych i kompromisy",
        },
        {
          strong: "Implementacja",
          span: "zbudować funkcje full-stack i punkty integracji",
        },
        {
          strong: "Ewaluacja",
          span: "sprawdzić jakość, zachowanie AI i ryzyko operacyjne",
        },
        {
          strong: "Produkcja",
          span: "wdrożyć, obserwować i iterować z zespołem",
        },
      ],
    },
    services: {
      eyebrow: "Formy współpracy",
      title:
        "Cztery sposoby, żeby ruszyć z miejsca - wybierz formę dopasowaną do tego kwartału.",
      lead: "Każde zlecenie jest tak skrojone, żeby dobrze zrobić jedną konkretną rzecz. Zacznij od najmniejszego, które daje jasność; reszta wyniknie z tego, czego się nauczymy.",
      meta: [
        "Audyty trwają 1–2 tygodnie",
        "Budowy zwykle 4–12 tygodni",
        "Większość zleceń startuje w 2–3 tygodnie po pierwszej rozmowie",
      ],
      fitLabel: "Najlepsze dla",
      listLabel: "Co dostajesz",
      cards: [
        {
          format: "Audyt 2-tygodniowy",
          title: "Audyt procesu pod AI",
          outcome:
            "W dwa tygodnie wiesz, czy, gdzie i jak AI pasuje do Twojego procesu - i ile naprawdę kosztowałoby jego wdrożenie.",
          fit: "zespołów rozważających AI bez jasnej hipotezy, gdzie tworzy wartość, albo funkcji AI, która utknęła na etapie proof-of-concept.",
          list: [
            "Mapa procesu z potencjalnymi miejscami na wpięcie AI",
            "Dla każdego kroku: wykonalność, ryzyko i strategia ewaluacji jakości",
            "Szacunek kosztów obejmujący inferencję, budowę i utrzymanie",
            "Rekomendacja go / no-go z zarysowaną kolejną fazą",
          ],
          related: "Powiązane: Workflow z LLM do testów E2E",
          relatedSlug: "llm-workflow-e2e-tests",
          mailSubject: "Audyt procesu pod AI",
          button: "Zacznij od audytu",
        },
        {
          format: "Przegląd 1-tygodniowy",
          title: "Przegląd architektury technicznej",
          outcome:
            "Wychodzisz z wiedzą, gdzie architektura pęknie, co naprawić najpierw, a co spokojnie można zostawić bez zmian.",
          fit: "due diligence przed inwestycją, urealnienia po MVP albo wdrożenia nowego lidera technicznego.",
          list: [
            "Pisemny przegląd architektury: granice, przepływy danych i ryzyka integracji",
            "Rejestr ryzyk z priorytetami - co blokuje skalę, a co można zignorować",
            "Plan stabilizacji na 90 dni",
            "Architektura referencyjna na kolejne 6–12 miesięcy",
          ],
          related:
            "Powiązane: Jak architektura decyduje o tym, co da się zbudować",
          relatedSlug: "cpq-and-eav-model",
          mailSubject: "Przegląd architektury",
          button: "Umów przegląd",
        },
        {
          format: "Budowa 4–12 tygodni",
          title: "Od prototypu do produkcji",
          outcome:
            "Zweryfikowane demo staje się systemem, na którym realni użytkownicy mogą polegać - i który Twój zespół rozwija dalej, gdy się wycofam.",
          fit: "founderów z działającym demo AI lub produktu bez ścieżki na produkcję oraz zespołów, którym brakuje seniorskich rąk full-stack, by pokonać tę lukę.",
          list: [
            "Architektura produkcyjna obejmująca dane, usługi, wdrożenie i obserwowalność",
            "Implementacja full-stack w Twoim stacku, wdrożona dla realnych użytkowników",
            "Zestaw testów i ewaluacji, w tym zachowania AI tam, gdzie to istotne",
            "Dokumentacja przekazania i runbook utrzymaniowy",
          ],
          related:
            "Powiązane: Realna architektura cache'u pod produkcyjnym obciążeniem",
          relatedSlug: "redis-in-practice-hono-typescript",
          mailSubject: "Od prototypu do produkcji",
          button: "Porozmawiajmy o budowie",
        },
        {
          format: "Start od 2-tygodniowej diagnozy",
          title: "Ratunek dla produktu full-stack",
          outcome:
            "Zablokowany projekt dostaje jasną drogę naprzód - i moje seniorskie doświadczenie, które poprowadzi ją razem z Twoim zespołem.",
          fit: "odziedziczonych baz kodu, projektów przepisywanych od zera, które utknęły, albo takich, z których odszedł lub wypalił się pierwotny zespół.",
          list: [
            "Diagnoza tego, co naprawdę blokuje dowożenie - technologia, proces czy zakres",
            "Plan triage z trzema kolejnymi odblokowaniami w kolejności priorytetu",
            "Praktyczna implementacja, by dowieźć najbliższy kamień milowy",
            "Opcjonalne dalsze wsparcie seniorskie, gdy projekt znów ruszy",
          ],
          related:
            "Powiązane: Dlaczego seniorski osąd liczy się, gdy robi się trudno",
          relatedSlug: "end-of-fast-coding",
          mailSubject: "Ratunek dla produktu",
          button: "Powiedz, co się zacięło",
        },
      ],
      cta: {
        eyebrow: "Nie wiesz, co pasuje?",
        title: "Opisz problem w dwóch zdaniach.",
        body: "Dostaniesz pisemną odpowiedź w ciągu 24 godzin - bez sprzedażowej gadki, tylko czy i jak mogę pomóc.",
        mailSubject: "Problem projektowy",
        primary: "Napisz mi o problemie",
        secondary: "Umów 30-min rozmowę wstępną",
      },
    },
    testimonials: {
      eyebrow: "Co mówią klienci",
      title: "Seniorski osąd w ich słowach.",
    },
    proof: {
      eyebrow: "Dowód w pracy",
      title: "Pisanie techniczne jako dowód osądu.",
      lead: "Blog to biblioteka dowodów: decyzje architektoniczne, workflow z AI, strategia testów, systemy backendowe i interaktywne wyjaśnienia.",
    },
    lab: {
      eyebrow: "Interaktywne laboratorium",
      title:
        "Koncepcje powinny być namacalne, gdy liczą się czas, stan i kompromisy.",
      lead: "Studium przypadku Redisa zawiera interaktywny playground cache-aside, by poczuć różnicę między cache miss, cache hit i unieważnieniem przez TTL.",
      button: "Sprawdź playground Redisa",
    },
  },
} as const satisfies Record<Lang, unknown>;

export const aboutPage = {
  en: {
    metaTitle: "About Michał Gacek - Tiptopdesign",
    metaDescription:
      "Michał Gacek is a senior full-stack engineer and AI-focused technical partner helping teams solve business problems from concept to production.",
    hero: {
      eyebrow: "Primary expert behind Tiptopdesign",
      title: "I help teams turn technical uncertainty into delivered systems.",
      lead: "I'm Michał Gacek, a senior full-stack engineer, technical leader, and university lecturer based in Kraków, Poland. My work sits where business workflows, product architecture, practical AI, and delivery discipline meet.",
      photoAlt: "Michał Gacek - portrait photo",
    },
    bring: {
      eyebrow: "What I bring",
      title:
        "Senior judgment across product, architecture, implementation, and quality.",
      cards: [
        {
          title: "Business-to-system translation",
          body: "I help clarify what the problem actually is, where software belongs, and what should be validated before a team commits to a build.",
        },
        {
          title: "Full-stack execution",
          body: "I can move through frontend, backend, data flow, APIs, tests, and deployment decisions without losing the product context.",
        },
        {
          title: "Practical AI integration",
          body: "I treat AI as a system component: useful when it is evaluated, bounded, observable, and connected to a real workflow.",
        },
      ],
    },
    contexts: {
      eyebrow: "Operating contexts",
      title: "Experience across systems that have to work in the real world.",
      lead: "My background spans industrial software, e-commerce, gaming platforms, payments, travel systems, testing strategy, and developer workflows.",
    },
    teaching: {
      eyebrow: "Teaching and knowledge sharing",
      title: "Explaining systems clearly is part of the work.",
      body: "I also teach as a university lecturer. That matters for consulting: complex ideas need to be communicated in a way that founders, product leaders, and engineers can act on.",
    },
    speaking: {
      eyebrow: "Speaking and recognition",
      title: "Talks, recordings, and shipped-under-pressure proof.",
      items: [
        {
          title: "React performance - conference talk",
          desc: "A live deep dive into profiling and fixing real React rendering bottlenecks.",
          href: "https://www.youtube.com/watch?v=03DvePOx9RM&t=2217s",
          cta: "Watch the talk",
        },
        {
          title: "Comarch DevRing - recorded sessions",
          desc: "Engineering sessions recorded for Comarch's internal developer community.",
          href: "https://www.comarch.pl/szkolenia/nagrania-z-devring/",
          cta: "Browse the recordings",
        },
        {
          title: "HackYeah 2020 - winning team",
          desc: "Scoped, built, and shipped a working product in one weekend with a team that won Europe's largest stationary hackathon.",
          href: "https://hackyeah.pl/2020/12/10/the-winner-dodowork/",
          cta: "Read the announcement",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Bring a real problem.",
      lead: "If you're building a product, modernizing a workflow, or exploring where AI belongs in your business process, start with a concrete problem and we can map the next step.",
      emailLabel: "Email",
      githubLabel: "GitHub",
    },
  },
  pl: {
    metaTitle: "O Michale Gacku - Tiptopdesign",
    metaDescription:
      "Michał Gacek to senior full-stack i partner techniczny skupiony na AI, który pomaga zespołom rozwiązywać problemy biznesowe od koncepcji po produkcję.",
    hero: {
      eyebrow: "Założyciel Tiptopdesign",
      title:
        "Pomagam zespołom zamieniać techniczną niepewność w działające systemy.",
      lead: "Nazywam się Michał Gacek. Jestem senior full-stack, liderem technicznym i wykładowcą akademickim z Krakowa. Moja praca dzieje się tam, gdzie spotykają się procesy biznesowe, architektura produktu, praktyczne AI i dyscyplina dowożenia.",
      photoAlt: "Michał Gacek - zdjęcie portretowe",
    },
    bring: {
      eyebrow: "Co wnoszę",
      title:
        "Seniorski osąd w produkcie, architekturze, implementacji i jakości.",
      cards: [
        {
          title: "Tłumaczenie biznesu na system",
          body: "Pomagam doprecyzować, na czym naprawdę polega problem, gdzie jest miejsce na oprogramowanie i co warto zweryfikować, zanim zespół zaangażuje się w budowę.",
        },
        {
          title: "Dowożenie full-stack",
          body: "Poruszam się między frontendem, backendem, przepływem danych, API, testami i decyzjami wdrożeniowymi, nie tracąc z oczu kontekstu produktowego.",
        },
        {
          title: "Praktyczna integracja AI",
          body: "Traktuję AI jak komponent systemu: przydatny, gdy jest oceniany, ograniczony, obserwowalny i podpięty do realnego procesu.",
        },
      ],
    },
    contexts: {
      eyebrow: "Konteksty pracy",
      title:
        "Doświadczenie w systemach, które muszą działać w realnym świecie.",
      lead: "Moje doświadczenie obejmuje oprogramowanie przemysłowe, e-commerce, platformy gamingowe, płatności, systemy turystyczne, strategię testów i workflow programistyczne.",
    },
    teaching: {
      eyebrow: "Nauczanie i dzielenie się wiedzą",
      title: "Jasne tłumaczenie systemów to część tej pracy.",
      body: "Uczę też jako wykładowca akademicki. To ma znaczenie w konsultingu: złożone pomysły trzeba przekazać tak, by founderzy, liderzy produktu i inżynierowie mogli na ich podstawie działać.",
    },
    speaking: {
      eyebrow: "Wystąpienia i wyróżnienia",
      title: "Prelekcje, nagrania i dowożenie pod presją czasu.",
      items: [
        {
          title: "Wydajność Reacta - prelekcja konferencyjna",
          desc: "Warsztatowe przejście przez profilowanie i naprawę realnych wąskich gardeł renderowania w Reakcie.",
          href: "https://www.youtube.com/watch?v=03DvePOx9RM&t=2217s",
          cta: "Obejrzyj prelekcję",
        },
        {
          title: "Comarch DevRing - nagrania sesji",
          desc: "Sesje inżynierskie nagrane dla społeczności programistycznej Comarchu.",
          href: "https://www.comarch.pl/szkolenia/nagrania-z-devring/",
          cta: "Zobacz nagrania",
        },
        {
          title: "HackYeah 2020 - zwycięski zespół",
          desc: "Zdefiniowany, zbudowany i dowieziony w jeden weekend produkt, który wygrał największy stacjonarny hackathon w Europie.",
          href: "https://hackyeah.pl/2020/12/10/the-winner-dodowork/",
          cta: "Przeczytaj ogłoszenie",
        },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Przyjdź z realnym problemem.",
      lead: "Jeśli budujesz produkt, modernizujesz proces albo szukasz miejsca dla AI w swoim procesie biznesowym, zacznij od konkretnego problemu, a wspólnie zaplanujemy kolejny krok.",
      emailLabel: "E-mail",
      githubLabel: "GitHub",
    },
  },
} as const satisfies Record<Lang, unknown>;

// Standalone services landing page (/services/, /pl/uslugi/). The engagement
// cards themselves live in homePage.services so the home section and the page
// never drift apart.
export const servicesPage = {
  en: {
    metaTitle: "Services - Full-stack & AI consulting | Tiptopdesign",
    metaDescription:
      "Four consulting engagements by Michał Gacek: AI workflow audit, technical architecture review, prototype-to-production build, and full-stack product rescue.",
    hero: {
      eyebrow: "Services",
      title: "Four engagements, each built to do one thing well.",
      lead: "Every engagement below is scoped to produce a concrete outcome - a decision, a plan, or a shipped system. Start with the smallest one that creates clarity.",
    },
  },
  pl: {
    metaTitle: "Usługi - konsulting full-stack i AI | Tiptopdesign",
    metaDescription:
      "Cztery formy współpracy z Michałem Gackiem: audyt procesu pod AI, przegląd architektury technicznej, budowa od prototypu do produkcji i ratunek dla produktu full-stack.",
    hero: {
      eyebrow: "Usługi",
      title: "Cztery formy współpracy - każda robi dobrze jedną rzecz.",
      lead: "Każde zlecenie poniżej kończy się konkretnym efektem: decyzją, planem albo wdrożonym systemem. Zacznij od najmniejszego, które daje jasność.",
    },
  },
} as const satisfies Record<Lang, unknown>;

export const contactPage = {
  en: {
    metaTitle: "Contact - Tiptopdesign",
    metaDescription:
      "Get in touch with Michał Gacek about full-stack and AI consulting - describe your problem and get a written response within 24 hours.",
    hero: {
      eyebrow: "Contact",
      title: "Bring a real problem.",
      lead: "Tell me what is stuck - a workflow, a product, or an AI idea that needs a production path. Describe it in a few sentences and you will get a written response within 24 hours. No pitch, just whether and how I can help.",
    },
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      optional: "(optional)",
      message: "What is the problem?",
      submit: "Send message",
      sending: "Sending…",
      fillRequired: "Please fill in your name, email, and message.",
      genericError:
        "Something went wrong. You can also email me directly at michal.gacek@tiptopdesign.pl.",
      networkError:
        "Network error. You can also email me directly at michal.gacek@tiptopdesign.pl.",
    },
    aside: {
      directLabel: "Prefer a direct channel?",
      emailMe: "Email me directly",
      bookCall: "Book a 30-min scoping call",
      bookCallSub: "Pick a time that works for you",
      expectLabel: "What to expect",
      expect: [
        "A written reply within 24 hours on working days",
        "An honest take on whether this is a good fit",
        "A suggested next step - audit, review, or build",
      ],
    },
    success: {
      title: "Message sent",
      body: "Thanks for reaching out. Your message is on its way and I will reply within 24 hours on working days.",
      close: "Close",
    },
  },
  pl: {
    metaTitle: "Kontakt - Tiptopdesign",
    metaDescription:
      "Skontaktuj się z Michałem Gackiem w sprawie konsultingu full-stack i AI - opisz problem i otrzymaj pisemną odpowiedź w ciągu 24 godzin.",
    hero: {
      eyebrow: "Kontakt",
      title: "Przyjdź z realnym problemem.",
      lead: "Powiedz, co się zacięło - proces, produkt albo pomysł na AI, który potrzebuje ścieżki na produkcję. Opisz to w kilku zdaniach, a dostaniesz pisemną odpowiedź w ciągu 24 godzin. Bez sprzedażowej gadki, tylko czy i jak mogę pomóc.",
    },
    form: {
      name: "Imię i nazwisko",
      email: "E-mail",
      subject: "Temat",
      optional: "(opcjonalnie)",
      message: "Na czym polega problem?",
      submit: "Wyślij wiadomość",
      sending: "Wysyłanie…",
      fillRequired: "Uzupełnij imię, e-mail i wiadomość.",
      genericError:
        "Coś poszło nie tak. Możesz też napisać bezpośrednio na michal.gacek@tiptopdesign.pl.",
      networkError:
        "Błąd sieci. Możesz też napisać bezpośrednio na michal.gacek@tiptopdesign.pl.",
    },
    aside: {
      directLabel: "Wolisz kanał bezpośredni?",
      emailMe: "Napisz do mnie wprost",
      bookCall: "Umów 30-min rozmowę wstępną",
      bookCallSub: "Wybierz termin, który Ci pasuje",
      expectLabel: "Czego się spodziewać",
      expect: [
        "Pisemna odpowiedź w ciągu 24 godzin w dni robocze",
        "Szczera ocena, czy to dobre dopasowanie",
        "Propozycja kolejnego kroku - audyt, przegląd albo budowa",
      ],
    },
    success: {
      title: "Wiadomość wysłana",
      body: "Dzięki za kontakt. Twoja wiadomość jest w drodze, odpowiem w ciągu 24 godzin w dni robocze.",
      close: "Zamknij",
    },
  },
} as const satisfies Record<Lang, unknown>;

export const tagsPage = {
  en: {
    metaTitleSuffix: "",
    crumbsBlog: "Blog",
    crumbsTopics: "Topics",
    topicEyebrow: "Topic",
    articleSingular: "article",
    articlePlural: "articles",
    onThisTopic: "on this topic.",
    backToAll: "← Back to all articles",
    descPrefix: "Articles on ",
    descSuffix:
      " by Michał Gacek - practical engineering, architecture, and AI notes from Tiptopdesign.",
  },
  pl: {
    metaTitleSuffix: "",
    crumbsBlog: "Blog",
    crumbsTopics: "Tematy",
    topicEyebrow: "Temat",
    articleSingular: "artykuł",
    articlePlural: "artykuły",
    onThisTopic: "na ten temat.",
    backToAll: "← Wróć do wszystkich artykułów",
    descPrefix: "Artykuły o: ",
    descSuffix:
      " - autorstwa Michała Gacka. Praktyczna inżynieria, architektura i notatki o AI z Tiptopdesign.",
  },
} as const satisfies Record<Lang, unknown>;
