import { ImageResponse } from "next/og";
import { MUSEUM_SHARE_ALT, museumShareSize } from "@/lib/museumMeta";
import { MuseumShareMark } from "@/lib/museumShare";

export const alt = MUSEUM_SHARE_ALT;
export const size = museumShareSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<MuseumShareMark />, { ...size });
}
