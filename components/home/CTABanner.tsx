"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"

/* ── Floating shape ── */
function FloatingShape({
  style,
  className,
}: {
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={style}
    />
  )
}

/* ── Component ── */
export default function CTABanner() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* ── Animated gradient background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #050810 0%, #070E1A 40%, #050810 100%)",
        }}
      />

      {/* Sweeping gradient animation */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ animation: "gradientSweep 8s ease-in-out infinite" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(0,102,255,0.15) 0deg, rgba(0,229,255,0.08) 120deg, rgba(0,255,209,0.12) 240deg, rgba(0,102,255,0.15) 360deg)",
          }}
        />
      </div>

      {/* Radial center glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,102,255,0.2), transparent 70%)",
        }}
      />

      {/* ── Decorative floating shapes ── */}
      {/* Top-left circle */}
      <FloatingShape
        className="absolute w-20 h-20 rounded-full border opacity-20"
        style={{
          top: "15%",
          left: "8%",
          borderColor: "rgba(0,168,255,0.5)",
          animation: "shapeFloat1 7s ease-in-out infinite",
        }}
      />
      {/* Top-right square */}
      <FloatingShape
        className="absolute w-12 h-12 rounded-lg opacity-15"
        style={{
          top: "20%",
          right: "12%",
          border: "2px solid rgba(0,255,209,0.4)",
          animation: "shapeFloat2 9s ease-in-out infinite",
          transform: "rotate(15deg)",
        }}
      />
      {/* Bottom-left diamond */}
      <FloatingShape
        className="absolute w-10 h-10 opacity-20"
        style={{
          bottom: "20%",
          left: "15%",
          border: "2px solid rgba(0,229,255,0.4)",
          transform: "rotate(45deg)",
          animation: "shapeFloat3 11s ease-in-out infinite",
        }}
      />
      {/* Bottom-right circle */}
      <FloatingShape
        className="absolute w-16 h-16 rounded-full opacity-15"
        style={{
          bottom: "15%",
          right: "8%",
          background: "rgba(0,102,255,0.15)",
          border: "1px solid rgba(0,102,255,0.3)",
          animation: "shapeFloat1 8s ease-in-out infinite reverse",
        }}
      />
      {/* Center-left large blob */}
      <FloatingShape
        className="absolute w-32 h-32 rounded-full opacity-10"
        style={{
          top: "50%",
          left: "3%",
          transform: "translateY(-50%)",
          background: "radial-gradient(ellipse, rgba(0,168,255,0.3), transparent 70%)",
          animation: "shapeFloat2 12s ease-in-out infinite",
        }}
      />
      {/* Center-right large blob */}
      <FloatingShape
        className="absolute w-28 h-28 rounded-full opacity-10"
        style={{
          top: "50%",
          right: "3%",
          transform: "translateY(-50%)",
          background: "radial-gradient(ellipse, rgba(0,255,209,0.3), transparent 70%)",
          animation: "shapeFloat3 15s ease-in-out infinite",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow */}
          <span
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "rgba(0,229,255,0.85)" }}
          >
            — Let&apos;s Work Together —
          </span>

          {/* Heading */}
          <h2
            id="cta-heading"
            className="font-[family-name:var(--font-syne)] font-extrabold leading-tight tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
          >
            Ready to Grow Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Business?
            </span>
          </h2>

          {/* Sub */}
          <p
            className="max-w-xl text-base sm:text-lg leading-relaxed font-[family-name:var(--font-dm-sans)]"
            style={{ color: "rgba(240,244,255,0.7)" }}
          >
            Let&apos;s build something extraordinary together. Tell us about your project
            and we&apos;ll get back to you within 24 hours.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/contact"
              className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2 group"
            >
              Start a Project
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[var(--radius-btn)] text-base font-medium transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(240,244,255,0.9)",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"
                ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(0,168,255,0.4)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"
                ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"
              }}
            >
              <Calendar size={16} />
              Book a Free Call
            </Link>
          </div>

          {/* Trust row */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 text-xs mt-2"
            style={{ color: "rgba(240,244,255,0.45)" }}
          >
            <span>✓ No commitment required</span>
            <span>✓ Response within 24 hours</span>
            <span>✓ Free consultation</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradientSweep {
          0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
          50%       { opacity: 1;   transform: scale(1.05) rotate(5deg); }
        }
        @keyframes shapeFloat1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-15px) rotate(10deg); }
        }
        @keyframes shapeFloat2 {
          0%, 100% { transform: translateY(0px) rotate(15deg); }
          50%       { transform: translateY(-12px) rotate(25deg); }
        }
        @keyframes shapeFloat3 {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50%       { transform: translateY(-18px) rotate(55deg); }
        }
      `}</style>
    </section>
  )
}
