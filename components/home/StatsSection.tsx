"use client"

import { motion } from "framer-motion"
import { AnimatedCounter } from "@/components/shared/AnimatedCounter"

/* ── Stats data ── */
const STATS = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    delay: 0,
  },
  {
    value: 30,
    suffix: "+",
    label: "Happy Clients",
    delay: 0.1,
  },
  {
    value: 7,
    suffix: "",
    label: "Core Services",
    delay: 0.2,
  },
  {
    value: 99,
    suffix: "%",
    label: "Satisfaction Rate",
    delay: 0.3,
  },
]

/* ── Card animation ── */
const cardVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeInOut",
    },
  }),
}

/* ── Component ── */
export default function StatsSection() {
  return (
    <section className="relative py-20 bg-[var(--bg-surface)] overflow-hidden">
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,168,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,168,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top fade */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--border-glow), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={stat.delay}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative rounded-[var(--radius-card)] p-6 sm:p-8 text-center overflow-hidden cursor-default"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-default)",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              {/* Glow border on hover — CSS handles this via the group class */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[var(--radius-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 0 1px var(--accent-blue), 0 0 40px rgba(0,168,255,0.2)",
                }}
              />

              {/* Inner glow blob */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[var(--radius-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,168,255,0.08), transparent)",
                }}
              />

              {/* Stat number */}
              <div
                className="font-[family-name:var(--font-bebas)] text-5xl sm:text-6xl lg:text-7xl leading-none mb-2"
                style={{
                  background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <AnimatedCounter
                  to={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                  delay={stat.delay}
                />
              </div>

              {/* Label */}
              <p className="text-sm sm:text-base text-[var(--text-muted)] font-[family-name:var(--font-dm-sans)] font-medium leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--border-glow), transparent)",
        }}
      />
    </section>
  )
}
