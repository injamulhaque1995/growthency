"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import {
  Globe,
  Smartphone,
  Megaphone,
  Palette,
  Code,
  Cpu,
  Zap,
  Share2,
  Video,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { SERVICES } from "@/lib/constants"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Badge } from "@/components/ui/Badge"

/* ── Icon map ── */
const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Megaphone,
  Palette,
  Code,
  Cpu,
  Zap,
  Share2,
  Video,
  TrendingUp,
}

/* ── Tilt card ── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(y, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(x, { stiffness: 300, damping: 30 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    x.set(cy * -10)
    y.set(cx * 10)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const Icon = ICON_MAP[service.icon] ?? Globe

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group"
    >
      <Link
        href={`/${service.slug}`}
        className="block h-full rounded-[var(--radius-card)] p-6 relative overflow-hidden transition-all duration-300"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-default)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Hover glow border */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[var(--radius-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 0 1px var(--accent-blue), 0 0 40px rgba(0,168,255,0.15)",
          }}
        />

        {/* Gradient top edge on hover */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(90deg, #0066FF, #00FFD1)" }}
        />

        {/* Inner background glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,168,255,0.07), transparent)",
          }}
        />

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 relative z-10"
          style={{ background: "rgba(0,168,255,0.1)" }}
        >
          <Icon
            size={22}
            className="text-[var(--accent-blue)] transition-colors duration-300"
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-lg text-[var(--text-primary)] mb-2 leading-snug">
            {service.name}
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 font-[family-name:var(--font-dm-sans)]">
            {service.description}
          </p>

          {/* Tagline badge */}
          <Badge variant="blue" className="text-xs mb-4">
            {service.tagline}
          </Badge>

          {/* Learn more */}
          <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--accent-blue)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            Learn more
            <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ── "More Coming" placeholder card ── */
function MoreComingCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-[var(--radius-card)] p-6 flex flex-col items-center justify-center text-center min-h-[220px]"
      style={{
        border: "2px dashed var(--border-default)",
        background: "transparent",
      }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
        style={{ background: "rgba(0,168,255,0.06)", border: "1px dashed var(--border-default)" }}
      >
        <Sparkles size={18} className="text-[var(--text-muted)]" />
      </div>
      <Badge variant="default" className="mb-3 text-xs">
        Coming Soon
      </Badge>
      <p className="text-sm text-[var(--text-muted)] font-[family-name:var(--font-dm-sans)]">
        More services are being developed. Stay tuned.
      </p>
    </motion.div>
  )
}

/* ── Main section ── */
export default function ServicesSection() {
  return (
    <section
      className="relative py-24 bg-[var(--bg-primary)] overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Subtle background orb */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,102,255,0.04), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <SectionHeader
            eyebrow="What We Do"
            heading="Core Capabilities"
            gradientLastWord
            subtitle="End-to-end digital services designed to launch, scale, and grow your business in the modern era."
            align="center"
          />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
          <MoreComingCard index={SERVICES.length} />
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link href="/services" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base">
            View All Services
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
