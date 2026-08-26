export type SocialPerson = {
  id: string;
  name: string;
  initial: string;
  color: string;
  status: string;
  desktopOnly?: boolean;
};

export const SOCIAL_SELF = {
  id: "rae",
  name: "Rae Solis",
  initial: "R",
  color: "#4d6a94",
  status: "updated their profile",
} as const;

export const SOCIAL_PEOPLE: SocialPerson[] = [
  {
    id: "mira",
    name: "Mira Chen",
    initial: "M",
    color: "#6b87b8",
    status: "posted a photo from the roof",
  },
  {
    id: "jonas",
    name: "Jonas Pell",
    initial: "J",
    color: "#c47a4a",
    status: "is now connected to Rae",
  },
  {
    id: "ada",
    name: "Ada Okonkwo",
    initial: "A",
    color: "#5a9a7a",
    status: "commented on your wall",
  },
  {
    id: "lev",
    name: "Lev Hart",
    initial: "L",
    color: "#8a6b9a",
    status: "joined the network",
    desktopOnly: true,
  },
  {
    id: "suki",
    name: "Suki Park",
    initial: "S",
    color: "#b85a5a",
    status: "wrote: see you after class",
    desktopOnly: true,
  },
];

export const SOCIAL_NOTES = [
  { id: "n1", text: "Ada commented on your wall" },
  { id: "n2", text: "Jonas added you" },
  { id: "n3", text: "Suki wrote: see you after class", desktopOnly: true },
] as const;

export const SOCIAL_FEED = [SOCIAL_SELF, ...SOCIAL_PEOPLE].map((person) => ({
  id: person.id,
  name: person.name,
  initial: person.initial,
  color: person.color,
  text: person.status,
  desktopOnly: "desktopOnly" in person ? person.desktopOnly : false,
}));
