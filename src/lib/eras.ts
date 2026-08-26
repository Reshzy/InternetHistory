import type { Era, EraId } from "@/types/museum";

export const eras: Era[] = [
  {
    id: "boot",
    year: "BOOT",
    title: "Before the Web",
    shortTitle: "Boot",
    theme: "terminal",
    statement: "A machine wakes up and looks for a line out.",
    status: "built",
  },
  {
    id: "document-web",
    year: "1995",
    title: "The Document Web",
    shortTitle: "Documents",
    theme: "document",
    statement: "THE WEB WAS A PLACE YOU VISITED.",
    support:
      "Pages were documents. Links were doors. Getting online still felt like going somewhere.",
    status: "built",
  },
  {
    id: "wild-web",
    year: "1999",
    title: "The Wild Web",
    shortTitle: "Wild",
    theme: "wild",
    statement: "EVERYONE GOT A CORNER OF THE INTERNET.",
    status: "placeholder",
  },
  {
    id: "social-web",
    year: "2004",
    title: "The Social Web",
    shortTitle: "Social",
    theme: "social",
    statement: "THE WEB STOPPED BEING PAGES. IT BECAME PEOPLE.",
    status: "placeholder",
  },
  {
    id: "mobile-web",
    year: "2007",
    title: "The Mobile Shift",
    shortTitle: "Mobile",
    theme: "mobile",
    statement: "THEN THE WEB LEFT THE DESK.",
    status: "placeholder",
  },
  {
    id: "platform-web",
    year: "2012",
    title: "The Platform Web",
    shortTitle: "Platform",
    theme: "platform",
    statement: "THE INTERNET LEARNED TO KEEP YOU SCROLLING.",
    status: "placeholder",
  },
  {
    id: "modern-web",
    year: "2018",
    title: "The Polished Web",
    shortTitle: "Polished",
    theme: "polished",
    statement: "EVERYTHING GOT BETTER. EVERYTHING STARTED LOOKING THE SAME.",
    status: "placeholder",
  },
  {
    id: "ai-web",
    year: "2023",
    title: "The AI Web",
    shortTitle: "AI",
    theme: "ai",
    statement: "THE WEB STARTED ANSWERING BACK.",
    status: "placeholder",
  },
  {
    id: "generated-web",
    year: "2026",
    title: "The Generated Web",
    shortTitle: "Generated",
    theme: "generated",
    statement: "WHAT IF THE WEBSITE IS NO LONGER A FIXED PLACE?",
    status: "placeholder",
  },
  {
    id: "next",
    year: "NEXT",
    title: "What Comes After?",
    shortTitle: "Next",
    theme: "next",
    statement: "THE WEB HAS NEVER STOPPED CHANGING.",
    support: "WHAT SHOULD IT BECOME NEXT?",
    status: "placeholder",
  },
];

export const eraIds: EraId[] = eras.map((era) => era.id);

export function getEra(id: EraId): Era {
  const era = eras.find((item) => item.id === id);
  if (!era) {
    throw new Error(`Unknown era: ${id}`);
  }
  return era;
}
