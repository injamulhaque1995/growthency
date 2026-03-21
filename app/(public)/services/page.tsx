import type { Metadata } from "next"
import Link from "next/link"
import {
  Globe,
  Smartphone,
  Megaphone,
  Palette,
  Code,
  Cpu,
  Zap,
  ArrowRight,
  MessageCircle,
} from "lucide-react"
import { SERVICES, SITE_NAME, SITE_URL } from "@/lib/constants"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

/* ── Metadata ── */
export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack web apps, mobile apps, digital marketing, UI/UX design, custom software, AI integration, and automations — all under one roof.",
  openGraph: {
    title: "Services",
    description:
      "Full-stack web apps, mobile apps, digital marketing, UI/UX design, custom software, AI integration, and automations.",
    url: `${SITE_URL}/services`,
  },
}

/* ── Icon map ── */
const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Megaphone,
  Palette,
  Code,
  Cpu,
  Zap,
}

/* ── Service card ── */
function ServiceCard({
  service,
}: {
  service: (typeof SERVICES)[number]
}) {
  const Icon = ICON_MAP[service.icon] ?? Globe

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
      }}
    >
      {/* Hover glow border */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px var(--accent-blue), 0 0 40px rgba(0,168,255,0.12)",
        }}
      />
      {/* Top gradient line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, #0066FF, #00FFD1)" }}
      />
      {/* Inner glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,168,255,0.06), transparent)",
        }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 relative z-10"
        style={{ background: "rgba(0,168,255,0.1)" }}
      >
        <Icon size={26} className="text-[var(--accent-blue)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-syne font-extrabold text-xl text-[var(--text-primary)] mb-2 leading-snug">
          {service.name}
        </h3>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
          {service.description}
        </p>
        <Badge variant="blue" className="text-xs mb-5">
          {service.tagline}
        </Badge>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-blue)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 mt-2">
          Learn More
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  )
}

/* ── Page ── */
export default function ServicesPage() {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Background orb */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,102,255,0.12), transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue)] mb-4">
            What We Do
          </span>
          <h1 className="font-syne font-extrabold text-5xl sm:text-6xl lg:text-7xl text-[var(--text-primary)] leading-tight mb-6">
            Core{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Capabilities
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Everything you need to build, launch, and scale.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div
          className="max-w-3xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-default)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,102,255,0.1), transparent)",
            }}
          />
          <div className="relative z-10">
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] mb-4">
              {`Don't see what you need?`}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              {`Let's talk. We build custom solutions for every challenge.`}
            </p>
            <Button asChild size="lg">
              <Link href="/contact" className="inline-flex items-center gap-2">
                <MessageCircle size={18} />
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
