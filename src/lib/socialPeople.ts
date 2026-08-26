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
    color: "#3a5578",
  status: "updated their profile",
} as const;

export const SOCIAL_PEOPLE: SocialPerson[] = [
  {
    id: "mira",
    name: "Mira Chen",
    initial: "M",
    color: "#3f5c88",
    status: "posted a photo from the roof",
  },
  {
    id: "jonas",
    name: "Jonas Pell",
    initial: "J",
    color: "#a35c2e",
    status: "is now connected to Rae",
  },
  {
    id: "ada",
    name: "Ada Okonkwo",
    initial: "A",
    color: "#2f6f52",
    status: "commented on your wall",
    desktopOnly: true,
  },
  {
    id: "lev",
    name: "Lev Hart",
    initial: "L",
    color: "#5c3d72",
    status: "joined the network",
    desktopOnly: true,
  },
  {
    id: "suki",
    name: "Suki Park",
    initial: "S",
    color: "#8e3a3a",
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
