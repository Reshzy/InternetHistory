export type SocialPerson = {
  id: string;
  name: string;
  initial: string;
  color: string;
  status: string;
  avatar?: string;
  desktopOnly?: boolean;
};

const DICEBEAR = "https://api.dicebear.com/10.x";

function toFeedItem(person: {
  id: string;
  name: string;
  initial: string;
  color: string;
  status: string;
  avatar?: string;
  desktopOnly?: boolean;
}) {
  return {
    id: person.id,
    name: person.name,
    initial: person.initial,
    color: person.color,
    text: person.status,
    avatar: person.avatar,
    desktopOnly: person.desktopOnly ?? false,
  };
}

export const SOCIAL_SELF = {
  id: "rae",
  name: "Rae Solis",
  initial: "R",
  color: "#3a5578",
  status: "updated their profile",
  avatar: `${DICEBEAR}/planets/svg?seed=Rae+Solis&tags=animation&size=64`,
} as const;

export const SOCIAL_PEOPLE: SocialPerson[] = [
  {
    id: "mira",
    name: "Mira Chen",
    initial: "M",
    color: "#3f5c88",
    status: "posted a photo from the roof",
    avatar: `${DICEBEAR}/critters/svg?seed=Mira+Chen&tags=animation&size=64`,
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
    avatar: `${DICEBEAR}/voxel-art/svg?seed=Ada+Okonkwo&tags=animation&size=64`,
    desktopOnly: true,
  },
  {
    id: "lev",
    name: "Lev Hart",
    initial: "L",
    color: "#5c3d72",
    status: "joined the network",
    avatar: `${DICEBEAR}/adventurer-neutral/svg?seed=Lev+Hart&scale=1.3&size=64`,
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

export const SOCIAL_FEED = [SOCIAL_SELF, ...SOCIAL_PEOPLE].map(toFeedItem);

export const SOCIAL_POCKET_EXTRA = (
  [
    {
      id: "resh",
      name: "Resh",
      initial: "R",
      color: "#4d6a4a",
      status: "is now married to Sera",
      avatar: `${DICEBEAR}/sprouts/svg?seed=Resh&tags=animation&size=64`,
    },
    {
      id: "sera",
      name: "Sera",
      initial: "S",
      color: "#7a4e62",
      status: "is now married to Resh",
      avatar: `${DICEBEAR}/sprouts/svg?seed=Sera&tags=animation&size=64`,
    },
  ] satisfies SocialPerson[]
).map(toFeedItem);

export const SOCIAL_POCKET_INBOX = [
  {
    id: "kiel",
    name: "Kiel",
    initial: "K",
    color: "#5a4a6a",
    text: "I just turned into a femboy",
    avatar: `${DICEBEAR}/gaze/svg?seed=Kiel&tags=animation&size=64`,
    unread: true,
  },
  {
    id: "tic",
    name: "Tic",
    initial: "T",
    color: "#4a5c6a",
    text: "bro im watching Skibidi Ohio: The Rizzler Awakens rn 💀💀 duke dennis just pulled up in the gyattmobile while baby gronk was mewing at the final boss 😭🙏",
    avatar: `${DICEBEAR}/gaze/svg?seed=Tic&tags=animation&size=64`,
    unread: false,
  },
] as const;
