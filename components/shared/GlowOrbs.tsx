import * as React from "react"
import { cn } from "@/lib/utils"

/* ── Types ── */
export interface GlowOrbsProps {
  className?: string
  /** Which preset layout to use */
  preset?: "default" | "hero" | "subtle"
}

/* ── Component ── */
export function GlowOrbs({ className, preset = "default" }: GlowOrbsProps) {
  const orbs = getOrbs(preset)

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none select-none",
        className
      )}
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            opacity: orb.opacity,
            animation: `${orb.animation} ease-in-out infinite`,
            willChange: "transform",
          }}
        />
      ))}

      {/* Inject keyframes once */}
      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(40px, -30px) scale(1.05); }
          66%       { transform: translate(-20px, 20px) scale(0.97); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-50px, 30px) scale(1.08); }
          66%       { transform: translate(30px, -40px) scale(0.95); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(20px, 50px) scale(1.03); }
        }
      `}</style>
    </div>
  )
}

/* ── Orb presets ── */
interface OrbConfig {
  size: string
  top: string
  left: string
  color: string
  blur: number
  opacity: number
  animation: string
}

function getOrbs(preset: NonNullable<GlowOrbsProps["preset"]>): OrbConfig[] {
  switch (preset) {
    case "hero":
      return [
        {
          size: "700px",
          top: "-20%",
          left: "30%",
          color: "radial-gradient(ellipse, rgba(0,102,255,0.35), transparent 70%)",
          blur: 0,
          opacity: 1,
          animation: "orbFloat1 12s",
        },
        {
          size: "500px",
          top: "20%",
          left: "-10%",
          color: "radial-gradient(ellipse, rgba(0,229,255,0.25), transparent 70%)",
          blur: 0,
          opacity: 1,
          animation: "orbFloat2 15s",
        },
        {
          size: "400px",
          top: "50%",
          left: "70%",
          color: "radial-gradient(ellipse, rgba(0,255,209,0.2), transparent 70%)",
          blur: 0,
          opacity: 1,
          animation: "orbFloat3 18s",
        },
      ]
    case "subtle":
      return [
        {
          size: "500px",
          top: "-15%",
          left: "50%",
          color: "radial-gradient(ellipse, rgba(0,102,255,0.15), transparent 70%)",
          blur: 0,
          opacity: 1,
          animation: "orbFloat1 14s",
        },
        {
          size: "350px",
          top: "60%",
          left: "10%",
          color: "radial-gradient(ellipse, rgba(0,229,255,0.12), transparent 70%)",
          blur: 0,
          opacity: 1,
          animation: "orbFloat2 18s",
        },
      ]
    default:
      return [
        {
          size: "600px",
          top: "-10%",
          left: "20%",
          color: "radial-gradient(ellipse, rgba(0,102,255,0.25), transparent 70%)",
          blur: 0,
          opacity: 1,
          animation: "orbFloat1 14s",
        },
        {
          size: "450px",
          top: "40%",
          left: "-5%",
          color: "radial-gradient(ellipse, rgba(0,229,255,0.2), transparent 70%)",
          blur: 0,
          opacity: 1,
          animation: "orbFloat2 17s",
        },
        {
          size: "380px",
          top: "60%",
          left: "65%",
          color: "radial-gradient(ellipse, rgba(0,255,209,0.18), transparent 70%)",
          blur: 0,
          opacity: 1,
          animation: "orbFloat3 20s",
        },
      ]
  }
}
