import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
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
            width: 10,
            height: 10,
            borderRadius: 10,
            background: "#d4782a",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
