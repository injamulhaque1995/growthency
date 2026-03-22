"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Badge } from "@/components/ui/Badge"

/* ── Testimonial data ── */
const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc",
    content:
      "Growthency transformed our digital presence completely. The web app they built exceeded all expectations — sleek, fast, and users love it.",
    rating: 5,
    service: "Web App Development",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    color: "#0066FF",
  },
  {
    name: "Marcus Rivera",
    role: "Founder",
    company: "NovaMobile",
    content:
      "We went from idea to App Store in 8 weeks. The Flutter app runs perfectly on both iOS and Android. Incredible work ethic and communication.",
    rating: 5,
    service: "Mobile App Development",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    color: "#00A8FF",
  },
  {
    name: "Aisha Patel",
    role: "Marketing Director",
    company: "GrowBrand Co",
    content:
      "Our organic traffic tripled in 4 months after partnering with Growthency. Their SEO and content strategy is genuinely world-class.",
    rating: 5,
    service: "Digital Marketing",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    color: "#00FFD1",
  },
  {
    name: "David Chen",
    role: "CTO",
    company: "SaaS Ventures",
    content:
      "The AI integration they built into our product cut our manual processing time by 70%. ROI on this engagement was off the charts.",
    rating: 5,
    service: "AI Integration",
    photo: "https://randomuser.me/api/portraits/men/41.jpg",
    color: "#7B61FF",
  },
  {
    name: "Emma Williams",
    role: "Product Manager",
    company: "DesignFirst Studio",
    content:
      "The UI/UX redesign increased our conversion rate from 2.3% to 8.7%. Growthency truly understands what makes users click.",
    rating: 5,
    service: "UI/UX Design",
    photo: "https://randomuser.me/api/portraits/women/28.jpg",
    color: "#FF6B6B",
  },
]

/* ── Star rating ── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? "#FFB300" : "none"}
          stroke={i < rating ? "#FFB300" : "var(--border-default)"}
        />
      ))}
    </div>
  )
}

/* ── Single testimonial card ── */
function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <div
      className="flex-shrink-0 w-[320px] sm:w-[380px] rounded-[var(--radius-card)] p-6 flex flex-col gap-4 relative overflow-hidden"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        /* Gradient border via background-clip trick */
        backgroundImage: `linear-gradient(var(--bg-card), var(--bg-card)), linear-gradient(135deg, ${t.color}55, transparent 60%)`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      {/* Top accent line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${t.color}, transparent)` }}
      />

      {/* Header row */}
      <div className="flex items-center gap-3">
        {/* Avatar photo */}
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden ring-2"
          style={{ ringColor: t.color, boxShadow: `0 0 0 2px ${t.color}66` }}
        >
          <Image
            src={t.photo}
            alt={t.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-[family-name:var(--font-syne)] font-extrabold text-sm text-[var(--text-primary)] leading-snug">
            {t.name}
          </p>
          <p className="text-xs text-[var(--text-muted)] font-[family-name:var(--font-dm-sans)]">
            {t.role}, {t.company}
          </p>
        </div>
        <div className="ml-auto">
          <StarRating rating={t.rating} />
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-sm text-[var(--text-secondary)] leading-relaxed font-[family-name:var(--font-dm-sans)] flex-1">
        &ldquo;{t.content}&rdquo;
      </blockquote>

      {/* Service badge */}
      <Badge variant="blue" className="text-[10px] self-start">
        {t.service}
      </Badge>
    </div>
  )
}

/* ── Main section ── */
export default function TestimonialsSection() {
  const [paused, setPaused] = useState(false)

  /* Duplicate cards for seamless loop */
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section
      className="relative py-24 overflow-hidden bg-[var(--bg-primary)]"
      aria-labelledby="testimonials-heading"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,168,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,168,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <SectionHeader
            eyebrow="Client Stories"
            heading="What Our Clients Say"
            gradientLastWord
            subtitle="Real results from real businesses. Here's what our clients have to say about working with Growthency."
            align="center"
          />
        </motion.div>
      </div>

      {/* Scrolling carousel — full width */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade masks */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--bg-primary), transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--bg-primary), transparent)",
          }}
        />

        {/* Scrolling track */}
        <div
          className="flex gap-5 pl-5"
          style={{
            animation: paused
              ? "none"
              : "testimonialsScroll 35s linear infinite",
            width: "max-content",
          }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        <style>{`
          @keyframes testimonialsScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Rating summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="#FFB300" stroke="#FFB300" />
              ))}
            </div>
            <span className="font-[family-name:var(--font-syne)] font-extrabold text-xl text-[var(--text-primary)]">
              5.0
            </span>
          </div>
          <span className="text-sm text-[var(--text-muted)] font-[family-name:var(--font-dm-sans)]">
            Average rating from 30+ verified clients
          </span>
        </div>
      </motion.div>
    </section>
  )
}
