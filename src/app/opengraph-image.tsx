import { ImageResponse } from "next/og";

export const alt = "Kooked";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>Kooked</div>
      <div style={{ fontSize: 32, color: "#a1a1aa" }}>Tools we actually use ourselves.</div>
    </div>,
    { ...size },
  );
}
