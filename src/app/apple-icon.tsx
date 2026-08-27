import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 48,
            background: "#d4782a",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
