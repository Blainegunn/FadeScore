import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FadeScore — Find the Best Barbers Near You";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "44px",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            F
          </div>
          <span
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-1px",
            }}
          >
            FadeScore
          </span>
        </div>
        <p
          style={{
            fontSize: "32px",
            color: "#f59e0b",
            fontWeight: 600,
            margin: 0,
            marginBottom: "16px",
          }}
        >
          Find the Best Barbers Near You
        </p>
        <p
          style={{
            fontSize: "22px",
            color: "#94a3b8",
            margin: 0,
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Real reviews. Real prices. Real ratings.
        </p>
      </div>
    ),
    { ...size },
  );
}
