import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Rocket,
  TrendingUp,
  Sprout,
  Lightbulb,
  Eye,
  BarChart2,
  Handshake,
} from "lucide-react"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { Button } from "@/components/ui/Button"

/* ── Metadata ── */
export const metadata: Metadata = {
  title: `About — ${SITE_NAME}`,
  description:
    "We are a full-service digital agency helping new and existing businesses build, scale, and grow using modern software and proven strategy.",
  openGraph: {
    title: `About — ${SITE_NAME}`,
    url: `${SITE_URL}/about`,
  },
}

/* ── Tech stack items for marquee ── */
const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "Flutter",
  "React Native", "PostgreSQL", "Redis", "Tailwind CSS", "Vercel",
  "AWS", "OpenAI", "Stripe", "Figma", "Docker", "Supabase", "Convex",
  "Prisma", "GraphQL", "tRPC", "Framer Motion", "LangChain",
]

/* ── Values ── */
const VALUES = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We stay at the cutting edge so our clients never fall behind. Modern stacks, emerging AI, and forward-thinking strategy.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "No surprises. Clear pricing, honest timelines, and direct communication — always.",
  },
  {
    icon: BarChart2,
    title: "Results",
    description:
      "We measure success by your outcomes. Vanity metrics don't impress us. Revenue, retention, and growth do.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description:
      "We treat every client like a co-founder. Your win is our win. We're invested in your long-term success.",
  },
]

/* ── Timeline ── */
const TIMELINE = [
  {
    year: "2024",
    label: "Founded",
    description: "Growthency was born from a simple belief: great software and smart strategy can transform any business.",
  },
  {
    year: "2024",
    label: "First Client",
    description: "Shipped our first production product for a client — on time, on budget, and beyond expectations.",
  },
  {
    year: "2025",
    label: "Tools Platform",
    description: "Launched the Growthency Tools platform, giving businesses free access to powerful growth utilities.",
  },
  {
    year: "2025",
    label: "50+ Projects",
    description: "Crossed 50 completed projects across web apps, mobile, marketing, and automation.",
  },
]

/* ── Mission pillars ── */
const PILLARS = [
  {
    icon: Rocket,
    title: "Build",
    description: "Launch your idea with production-quality software built by engineers who care.",
  },
  {
    icon: TrendingUp,
    title: "Scale",
    description: "Design systems and infrastructure that grow with you — no rewrites, no bottlenecks.",
  },
  {
    icon: Sprout,
    title: "Grow",
    description: "Marketing, strategy, and automation that compound over time into real, measurable growth.",
  },
]

/* ── Page ── */
export default function AboutPage() {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,102,255,0.12), transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue)] mb-4">
            Our Story
          </span>
          <h1 className="font-syne font-extrabold text-5xl sm:text-6xl lg:text-7xl text-[var(--text-primary)] leading-tight mb-8">
            Building the Future of Business,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              One Project at a Time
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Growthency was built for the ambitious — founders, operators, and entrepreneurs
            who refuse to settle for mediocre tools and slow agencies.
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-10 relative overflow-hidden"
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
                "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(0,102,255,0.06), transparent)",
            }}
          />
          <div className="relative z-10">
            <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] mb-6">
              Why We Built This
            </h2>
            <div className="space-y-4 text-base text-[var(--text-secondary)] leading-relaxed">
              <p>
                We got tired of watching great ideas fail because of bad execution. Businesses
                spending months with agencies that overpromise and underdeliver. Founders drowning
                in tools that don{`'`}t talk to each other. Marketing spend with no measurable ROI.
              </p>
              <p>
                Growthency is the agency we wish existed when we started. We move fast, we build
                clean, and we stay accountable to results — not billable hours.
              </p>
              <p>
                We{`'`}re a lean, senior-only team of engineers, designers, and marketers. No
                juniors billing you for learning on your dime. Just focused execution from people
                who{`'`}ve done it before.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission Pillars ── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-blue)] block mb-3">
            Our Mission
          </span>
          <h2 className="font-syne font-extrabold text-4xl text-[var(--text-primary)]">
            Three Words. One Mission.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="rounded-2xl p-8 text-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, #0066FF, #00FFD1)" }}
              />
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{
                  background: "rgba(0,168,255,0.1)",
                  border: "1px solid rgba(0,168,255,0.2)",
                }}
              >
                <Icon size={28} className="text-[var(--accent-blue)]" />
              </div>
              <h3 className="font-syne font-extrabold text-2xl text-[var(--text-primary)] mb-3">
                {title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-blue)] block mb-3">
            What We Stand For
          </span>
          <h2 className="font-syne font-extrabold text-4xl text-[var(--text-primary)]">
            Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Values
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl p-6"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(0,168,255,0.1)" }}
              >
                <Icon size={20} className="text-[var(--accent-blue)]" />
              </div>
              <h3 className="font-syne font-bold text-lg text-[var(--text-primary)] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-blue)] block mb-3">
            Our Journey
          </span>
          <h2 className="font-syne font-extrabold text-4xl text-[var(--text-primary)]">
            The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Timeline
            </span>
          </h2>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="absolute left-7 top-0 bottom-0 w-px"
            style={{ background: "var(--border-default)" }}
          />
          <div className="space-y-10">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-8 relative">
                {/* Dot */}
                <div
                  className="w-14 h-14 rounded-full flex flex-col items-center justify-center flex-shrink-0 relative z-10"
                  style={{
                    background: "var(--bg-card)",
                    border: "2px solid rgba(0,168,255,0.4)",
                    boxShadow: "0 0 20px rgba(0,168,255,0.15)",
                  }}
                >
                  <span
                    className="font-syne font-bold text-xs leading-tight"
                    style={{
                      background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-2">
                  <h3 className="font-syne font-bold text-lg text-[var(--text-primary)] mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack Marquee ── */}
      <section className="py-12 overflow-hidden">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
            Technologies We Master
          </span>
        </div>
        <div className="relative">
          {/* Gradient masks */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, var(--bg-primary), transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, var(--bg-primary), transparent)",
            }}
          />

          {/* Marquee */}
          <div
            className="flex gap-6 w-max"
            style={{
              animation: "marquee-about 35s linear infinite",
            }}
          >
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-default)",
                  color: "var(--text-secondary)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee-about {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="rounded-3xl p-12 relative overflow-hidden"
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
              Want to work with us?
            </h2>
            <p className="text-base text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
              {`Whether you're starting from zero or scaling to the next level, we'd love to be part of your journey.`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact" className="inline-flex items-center gap-2">
                  Start a Project
                  <ArrowRight size={16} />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
