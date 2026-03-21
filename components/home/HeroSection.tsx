"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { GlowOrbs } from "@/components/shared/GlowOrbs"
import { ScrambleText } from "@/components/shared/ScrambleText"

/* ── Marquee items ── */
const TECH_ITEMS = [
  "React",
  "Next.js",
  "Flutter",
  "Node.js",
  "Stripe",
  "Convex",
  "Three.js",
  "Figma",
  "AWS",
  "Tailwind",
  "TypeScript",
  "PostgreSQL",
  "Redis",
  "Docker",
]

/* ── Fade-in-up variants ── */
const containerVariants: import("framer-motion").Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeInOut" },
  },
}

/* ── Component ── */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  /* Parallax on scroll */
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const content = hero.querySelector<HTMLDivElement>(".hero-content")
      if (content) {
        content.style.transform = `translateY(${scrollY * 0.2}px)`
        content.style.opacity = `${1 - scrollY / 700}`
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[var(--bg-primary)]"
      aria-label="Hero"
    >
      {/* ── Background: Glow Orbs ── */}
      <GlowOrbs preset="hero" />

      {/* ── Background: Subtle CSS Grid Overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,168,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,168,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Radial vignette ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, var(--bg-primary) 100%)",
        }}
      />

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-24 pb-32 text-center hero-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 max-w-5xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue)] font-[family-name:var(--font-syne)]"
          >
            — Software Engineer &amp; Growth Partner —
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-[family-name:var(--font-syne)] font-extrabold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(48px, 8vw, 96px)" }}
          >
            <span className="block text-[var(--text-primary)]">
              <ScrambleText
                text="We Build."
                delay={300}
                speed={35}
                trigger="mount"
              />
            </span>
            <span className="block text-[var(--text-primary)]">
              <ScrambleText
                text="We Scale."
                delay={700}
                speed={35}
                trigger="mount"
              />
            </span>
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #0066FF 0%, #00FFD1 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <ScrambleText
                text="We Grow."
                delay={1100}
                speed={35}
                trigger="mount"
              />
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed font-[family-name:var(--font-dm-sans)]"
          >
            From zero to launch, from growth to dominance —{" "}
            <span className="text-[var(--text-primary)] font-medium">Growthency</span>{" "}
            engineers your success.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <Link
              href="/services"
              className="btn-primary text-base px-8 py-3.5 rounded-[var(--radius-btn)] font-medium inline-flex items-center gap-2 group"
            >
              Explore Services
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/tools"
              className="btn-ghost text-base px-8 py-3.5 rounded-[var(--radius-btn)] font-medium"
            >
              View Our Tools
            </Link>
          </motion.div>

          {/* Trust badge row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 text-sm text-[var(--text-muted)] mt-1"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] inline-block" />
              50+ Projects Delivered
            </span>
            <span className="hidden sm:block w-px h-4 bg-[var(--border-default)]" />
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] inline-block" />
              30+ Happy Clients
            </span>
            <span className="hidden sm:block w-px h-4 bg-[var(--border-default)]" />
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] inline-block" />
              99% Satisfaction
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[var(--text-muted)] text-xs"
      >
        <span className="tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      {/* ── Infinite Tech Marquee ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-t border-[var(--border-default)] bg-[var(--bg-surface)]/60 backdrop-blur-sm py-4">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
          {[...TECH_ITEMS, ...TECH_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-6 text-sm font-medium text-[var(--text-muted)] tracking-wide"
            >
              {item}
              <span className="mx-6 text-[var(--border-glow)]">·</span>
            </span>
          ))}
        </div>

        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  )
}
