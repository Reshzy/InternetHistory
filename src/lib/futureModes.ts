export const FUTURE_MODES = [
  {
    id: "place",
    label: "Place",
    hint: "A layout that waits.",
  },
  {
    id: "orbit",
    label: "Orbit",
    hint: "The page follows you.",
  },
  {
    id: "dissolve",
    label: "Dissolve",
    hint: "Nothing stays put.",
  },
] as const;

export type FutureModeId = (typeof FUTURE_MODES)[number]["id"];

export const GENERATED_SHARDS = [
  {
    id: "heading",
    kind: "heading",
    label: "A PAGE",
    labelAlt: "A MOMENT",
    body: "still here",
    bodyAlt: "already gone",
  },
  {
    id: "nav",
    kind: "nav",
    label: "NAV",
    labelAlt: "PATH",
    body: "Index  Rooms  Exit",
    bodyAlt: "Here  Near  Nowhere",
  },
  {
    id: "card",
    kind: "card",
    label: "OBJECT",
    labelAlt: "TRACE",
    body: "A card that used to belong to a grid.",
    bodyAlt: "It only exists while you look.",
  },
  {
    id: "note",
    kind: "note",
    label: "NOTE",
    labelAlt: "ECHO",
    body: "Fixed places are a habit.",
    bodyAlt: "This one is temporary.",
  },
] as const;
