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
    support:
      "Homepages were handmade. Backgrounds tiled. Guestbooks proved you existed.",
    status: "built",
  },
  {
    id: "social-web",
    year: "2004",
    title: "The Social Web",
    shortTitle: "Social",
    theme: "social",
    statement: "THE WEB STOPPED BEING PAGES. IT BECAME PEOPLE.",
    support:
      "Profiles replaced homepages. Friends became infrastructure.",
    status: "built",
  },
  {
    id: "mobile-web",
    year: "2007",
    title: "The Mobile Shift",
    shortTitle: "Mobile",
    theme: "mobile",
    statement: "THEN THE WEB LEFT THE DESK.",
    support:
      "The same sites had to fit a pocket. Navigation collapsed. Fingers replaced the mouse.",
    status: "built",
  },
  {
    id: "platform-web",
    year: "2012",
    title: "The Platform Web",
    shortTitle: "Platform",
    theme: "platform",
    statement: "THE INTERNET LEARNED TO KEEP YOU SCROLLING.",
    support:
      "Recommendation replaced intention. The next thing arrived before you asked for it.",
    status: "built",
  },
  {
    id: "modern-web",
    year: "2018",
    title: "The Polished Web",
    shortTitle: "Polished",
    theme: "polished",
    statement: "EVERYTHING GOT BETTER. EVERYTHING STARTED LOOKING THE SAME.",
    support:
      "Spacing got better. Type got better. Every product started speaking the same dialect.",
    status: "built",
  },
  {
    id: "ai-web",
    year: "2023",
    title: "The AI Web",
    shortTitle: "AI",
    theme: "ai",
    statement: "THE WEB STARTED ANSWERING BACK.",
    support:
      "A prompt became a page. Text turned into layout. The interface started writing itself.",
    status: "built",
  },
  {
    id: "generated-web",
    year: "2026",
    title: "The Generated Web",
    shortTitle: "Generated",
    theme: "generated",
    statement: "WHAT IF THE WEBSITE IS NO LONGER A FIXED PLACE?",
    support: "Pages used to wait. Now they rearrange around you.",
    status: "built",
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
