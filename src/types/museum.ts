export type EraStatus = "built" | "placeholder";

export type EraId =
  | "boot"
  | "document-web"
  | "wild-web"
  | "social-web"
  | "mobile-web"
  | "platform-web"
  | "modern-web"
  | "ai-web"
  | "generated-web"
  | "next";

export type Era = {
  id: EraId;
  year: string;
  title: string;
  shortTitle: string;
  theme: string;
  statement: string;
  support?: string;
  status: EraStatus;
};
