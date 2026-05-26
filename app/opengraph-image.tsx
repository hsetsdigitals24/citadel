import { ImageResponse } from "next/og";

export const alt = "Citadel Global Dental Clinic — Best Braces Centre, Ilorin Nigeria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1B3E6F 0%, #122b50 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative large circle — top-right */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
          }}
        />
        {/* decorative small circle — bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            display: "flex",
          }}
        />

        {/* tooth SVG icon */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          style={{ marginBottom: "28px", opacity: 0.9 }}
        >
          <path
            d="M40 8 C28 8 16 16 16 28 C16 36 18 42 20 50 C22 58 24 68 30 72 C33 74 36 72 38 68 C39 64 40 60 40 60 C40 60 41 64 42 68 C44 72 47 74 50 72 C56 68 58 58 60 50 C62 42 64 36 64 28 C64 16 52 8 40 8Z"
            fill="white"
            opacity="0.95"
          />
          <path
            d="M28 20 C28 20 32 18 40 20 C48 22 52 20 52 20"
            stroke="rgba(27,62,111,0.4)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* clinic name */}
        <div
          style={{
            color: "white",
            fontSize: "58px",
            fontWeight: 700,
            letterSpacing: "-0.5px",
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: "900px",
            display: "flex",
          }}
        >
          Citadel Global Dental Clinic
        </div>

        {/* divider */}
        <div
          style={{
            width: "80px",
            height: "3px",
            background: "#C0392B",
            borderRadius: "2px",
            margin: "22px 0",
            display: "flex",
          }}
        />

        {/* subtitle */}
        <div
          style={{
            color: "rgba(255,255,255,0.82)",
            fontSize: "28px",
            fontWeight: 400,
            letterSpacing: "0.02em",
            textAlign: "center",
            display: "flex",
          }}
        >
          Best Braces Centre · Ilorin, Nigeria
        </div>

        {/* tagline */}
        <div
          style={{
            marginTop: "20px",
            color: "rgba(255,255,255,0.55)",
            fontSize: "20px",
            fontWeight: 400,
            textAlign: "center",
            display: "flex",
          }}
        >
          World-class dental care · Braces · Implants · Whitening
        </div>
      </div>
    ),
    { ...size }
  );
}
