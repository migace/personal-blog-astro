import type { Lang } from "../i18n/ui";

export interface ExperienceItem {
  company: string;
  role: string;
  text: string;
}

export const experience: Record<Lang, ExperienceItem[]> = {
  en: [
    {
      company: "BlockyDevs",
      role: "Frontend leadership",
      text: "Lead frontend developer owning architecture, code quality, and technical direction with React, TypeScript, and Next.js.",
    },
    {
      company: "Hey Alfie",
      role: "AI and RAG systems",
      text: "Production RAG system in Python and Qdrant with document chunking, semantic retrieval, and hallucination-reducing prompt constraints.",
    },
    {
      company: "Rockwell Automation",
      role: "Industrial software",
      text: "Reliability-focused frontend work for automation systems built with Angular and Electron.",
    },
    {
      company: "Intercars",
      role: "E-commerce platforms",
      text: "TypeScript, React, Next.js, ChakraUI, and performance-critical product experiences.",
    },
    {
      company: "Grin Gaming",
      role: "Platform architecture",
      text: "Principal frontend ownership across product architecture, delivery, and team execution.",
    },
    {
      company: "Polette",
      role: "Payments and quality",
      text: "Node.js payment refactoring and practical E2E test coverage with Cypress and Puppeteer.",
    },
    {
      company: "Sabre",
      role: "Travel systems",
      text: "Booking engine development with React, Redux, AWS deployments, and engineering discipline.",
    },
  ],
  pl: [
    {
      company: "BlockyDevs",
      role: "Przywództwo frontendowe",
      text: "Lead frontend odpowiedzialny za architekturę, jakość kodu i kierunek techniczny zespołu w React, TypeScript i Next.js.",
    },
    {
      company: "Hey Alfie",
      role: "AI i systemy RAG",
      text: "Produkcyjny system RAG w Pythonie i Qdrant: chunking dokumentów, wyszukiwanie semantyczne i ograniczanie halucynacji przez ograniczenia w promptach.",
    },
    {
      company: "Rockwell Automation",
      role: "Oprogramowanie przemysłowe",
      text: "Frontend nastawiony na niezawodność dla systemów automatyki w Angularze i Electronie.",
    },
    {
      company: "Intercars",
      role: "Platformy e-commerce",
      text: "TypeScript, React, Next.js, ChakraUI i widoki produktowe, w których liczy się wydajność.",
    },
    {
      company: "Grin Gaming",
      role: "Architektura platformy",
      text: "Główna odpowiedzialność za frontend: architektura produktu, dowożenie i praca zespołu.",
    },
    {
      company: "Polette",
      role: "Płatności i jakość",
      text: "Refaktor płatności w Node.js i praktyczne pokrycie testami E2E w Cypressie i Puppeteerze.",
    },
    {
      company: "Sabre",
      role: "Systemy turystyczne",
      text: "Rozwój silnika rezerwacji w React i Redux, wdrożenia na AWS i dyscyplina inżynierska.",
    },
  ],
};

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

// Add real, attributable client testimonials here once you have permission to
// publish them. The homepage testimonials section only renders when this array
// is non-empty, so it is safe to leave empty. Do not add invented quotes.
export const testimonials: Record<Lang, Testimonial[]> = {
  en: [],
  pl: [],
};
