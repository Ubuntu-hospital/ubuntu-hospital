import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { OpenGraphBrandCard } from "@/components/layout/brand/opengraph-brand-card";

export const alt =
  "Ubuntu Orthopaedic and Spine Hospital. Specialist orthopaedic and spine care with hospital contact numbers.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const logomarkBuffer = await readFile(
    join(process.cwd(), "public", "ubuntu-logomark.png"),
  );

  const logomarkSrc = `data:image/png;base64,${logomarkBuffer.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "52px",
        background:
          "linear-gradient(132deg, #202326 0%, #292d30 58%, #34383b 100%)",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-180px",
          right: "-110px",
          display: "flex",
          width: "540px",
          height: "540px",
          border: "1px solid rgba(255, 109, 18, 0.32)",
          borderRadius: "50%",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "170px",
          bottom: "-270px",
          display: "flex",
          width: "430px",
          height: "430px",
          border: "1px solid rgba(255, 109, 18, 0.18)",
          borderRadius: "50%",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          display: "flex",
          width: "100%",
          height: "8px",
          background: "#ff6d12",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "38px",
          left: "52px",
          display: "flex",
          width: "82px",
          height: "4px",
          background: "#ff6d12",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          width: "430px",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            color: "#ffc49d",
            fontSize: "15px",
            fontWeight: 800,
            letterSpacing: "3px",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          Specialist orthopaedic and spine care
        </span>

        <span
          style={{
            marginTop: "27px",
            color: "#ffffff",
            fontSize: "68px",
            fontWeight: 800,
            letterSpacing: "-4.5px",
            lineHeight: 0.93,
          }}
        >
          Stronger bones.
        </span>

        <span
          style={{
            marginTop: "4px",
            color: "#ff6d12",
            fontSize: "68px",
            fontWeight: 800,
            letterSpacing: "-4.5px",
            lineHeight: 0.93,
          }}
        >
          Better lives.
        </span>

        <span
          style={{
            maxWidth: "390px",
            marginTop: "26px",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "19px",
            fontWeight: 500,
            letterSpacing: "-0.4px",
            lineHeight: 1.52,
          }}
        >
          Modern hospital care designed around diagnosis, treatment, and
          recovery.
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "31px",
          }}
        >
          <span
            style={{
              display: "flex",
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              background: "#ff6d12",
            }}
          />

          <span
            style={{
              marginLeft: "10px",
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "14px",
              fontWeight: 800,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Ubuntu Hospital
          </span>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
        }}
      >
        <OpenGraphBrandCard markSrc={logomarkSrc} />
      </div>
    </div>,
    {
      ...size,
    },
  );
}
