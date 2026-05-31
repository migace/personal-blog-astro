export interface ExperienceItem {
  company: string;
  role: string;
  text: string;
}

export const experience: ExperienceItem[] = [
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
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

// Add real, attributable client testimonials here once you have permission to
// publish them. The homepage testimonials section only renders when this array
// is non-empty, so it is safe to leave empty. Do not add invented quotes.
export const testimonials: Testimonial[] = [];
