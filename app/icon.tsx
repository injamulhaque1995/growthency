import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #0066FF 0%, #00FFD1 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 3,
          padding: "4px 5px",
        }}
      >
        {/* Bar 1 — short */}
        <div
          style={{
            width: 5,
            height: 9,
            background: "rgba(255,255,255,0.65)",
            borderRadius: 2,
          }}
        />
        {/* Bar 2 — medium */}
        <div
          style={{
            width: 5,
            height: 15,
            background: "rgba(255,255,255,0.82)",
            borderRadius: 2,
          }}
        />
        {/* Bar 3 — tall */}
        <div
          style={{
            width: 5,
            height: 21,
            background: "white",
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size }
  )
}
