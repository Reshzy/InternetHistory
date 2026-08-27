import { SOCIAL_PEOPLE, SOCIAL_SELF } from "@/lib/socialPeople";

export type PlatformPost = {
  id: string;
  name: string;
  initial: string;
  color: string;
  uniqueText: string;
  genericText: string;
  likesStart: number;
  likesEnd: number;
  viewsStart: number;
  viewsEnd: number;
  time: string;
  media: string;
  avatar?: string;
  desktopOnly?: boolean;
};

const GENERIC = "Suggested for you. People like you also paused here.";

const UNIQUE: Record<string, { text: string; likesStart: number; likesEnd: number; viewsStart: number; viewsEnd: number; time: string; media: string; desktopOnly?: boolean }> =
  {
    rae: {
      text: "The roof was still warm. Nobody had a caption for it yet.",
      likesStart: 6,
      likesEnd: 4820,
      viewsStart: 40,
      viewsEnd: 128400,
      time: "2m",
      media: "#c5d0dc",
    },
    mira: {
      text: "Posted a photo from the roof before the light went.",
      likesStart: 18,
      likesEnd: 9310,
      viewsStart: 120,
      viewsEnd: 210800,
      time: "11m",
      media: "#b7c4b0",
    },
    jonas: {
      text: "Rae is online. The thread is already longer than the night.",
      likesStart: 3,
      likesEnd: 2740,
      viewsStart: 22,
      viewsEnd: 88600,
      time: "28m",
      media: "#d4c4b2",
    },
    ada: {
      text: "Left a note on your wall. It will be buried by noon.",
      likesStart: 9,
      likesEnd: 6150,
      viewsStart: 70,
      viewsEnd: 164200,
      time: "1h",
      media: "#c3d1c8",
    },
    lev: {
      text: "Joined three groups and the algorithm noticed.",
      likesStart: 2,
      likesEnd: 15880,
      viewsStart: 16,
      viewsEnd: 402000,
      time: "3h",
      media: "#cdc6d4",
      desktopOnly: true,
    },
    suki: {
      text: "Wrote: see you after class. The class never loaded.",
      likesStart: 11,
      likesEnd: 7200,
      viewsStart: 55,
      viewsEnd: 99000,
      time: "5h",
      media: "#d8c0c0",
      desktopOnly: true,
    },
  };

const people = [SOCIAL_SELF, ...SOCIAL_PEOPLE];

const fromPeople: PlatformPost[] = people.map((person) => {
  const extra = UNIQUE[person.id];
  return {
    id: person.id,
    name: person.name,
    initial: person.initial,
    color: person.color,
    uniqueText: extra?.text ?? person.status,
    genericText: GENERIC,
    likesStart: extra?.likesStart ?? 4,
    likesEnd: extra?.likesEnd ?? 2400,
    viewsStart: extra?.viewsStart ?? 30,
    viewsEnd: extra?.viewsEnd ?? 64000,
    time: extra?.time ?? "now",
    media: extra?.media ?? "#d0d4da",
    avatar:
      person.id === "mira" || person.id === "ada"
        ? "avatar" in person
          ? person.avatar
          : undefined
        : undefined,
    desktopOnly: extra?.desktopOnly,
  };
});

const recommended: PlatformPost[] = [
  {
    id: "rec-1",
    name: "Recommended",
    initial: "•",
    color: "#8a8f98",
    uniqueText: "Because you paused on Mira's roof.",
    genericText: GENERIC,
    likesStart: 4,
    likesEnd: 22100,
    viewsStart: 90,
    viewsEnd: 518000,
    time: "now",
    media: "#d5d8de",
    desktopOnly: true,
  },
  {
    id: "rec-2",
    name: "For You",
    initial: "•",
    color: "#7b818c",
    uniqueText: "Similar to a photo you already liked.",
    genericText: GENERIC,
    likesStart: 1,
    likesEnd: 30400,
    viewsStart: 12,
    viewsEnd: 672000,
    time: "now",
    media: "#d5d8de",
    desktopOnly: true,
  },
];

export const PLATFORM_FEED: PlatformPost[] = [...fromPeople, ...recommended];

export function formatMetric(value: number) {
  const n = Math.max(0, value);
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(Math.floor(n));
}
