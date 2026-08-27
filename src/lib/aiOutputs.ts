export const AI_PROMPT = "make a page about the web";

export const AI_TOKENS = [
  "page",
  "layout",
  "image",
  "code",
  "diagram",
  "card",
] as const;

export type AiOutputKind = "ui" | "code" | "image" | "diagram";

export type AiOutput = {
  id: string;
  kind: AiOutputKind;
  label: string;
  labelAlt: string;
  body: string;
  bodyAlt: string;
  desktopOnly?: boolean;
};

export const AI_OUTPUTS: AiOutput[] = [
  {
    id: "ui",
    kind: "ui",
    label: "interface",
    labelAlt: "layout",
    body: "A heading. A door. A place.",
    bodyAlt: "Your page, assembled.",
  },
  {
    id: "code",
    kind: "code",
    label: "markup",
    labelAlt: "stylesheet",
    body: "<h1>the web</h1>",
    bodyAlt: "h1 { display: block }",
  },
  {
    id: "image",
    kind: "image",
    label: "picture",
    labelAlt: "render",
    body: "grain over a field",
    bodyAlt: "light, then noise",
    desktopOnly: true,
  },
  {
    id: "diagram",
    kind: "diagram",
    label: "structure",
    labelAlt: "graph",
    body: "prompt — page",
    bodyAlt: "one in, many out",
    desktopOnly: true,
  },
];
