import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.20), transparent 45%), radial-gradient(circle at 90% 80%, rgba(192, 132, 252, 0.15), transparent 45%)",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#6366f1",
            fontFamily: "monospace",
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          Ruchit.Pahadia
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#f9fafb",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Ruchit Pahadia
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#9ca3af",
            marginTop: 20,
          }}
        >
          ML Engineer &amp; AI Developer
        </div>
      </div>
    ),
    { ...size }
  );
}
