import type { Metadata } from "next"
import { Shield, ChevronDown } from "lucide-react"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { PricingSection } from "@/components/pricing/PricingSection"
import { PricingFAQ } from "./PricingFAQ"

/* ── Metadata ── */
export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing. Start free, upgrade when you're ready. No hidden fees, no lock-in.",
  openGraph: {
    title: "Pricing",
    description: "Start free. Upgrade when you're ready. 30-day money-back guarantee.",
    url: `${SITE_URL}/pricing`,
  },
}

/* ── Page ── */
export default function PricingPage() {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,102,255,0.12), transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue)] mb-4">
            Plans & Pricing
          </span>
          <h1 className="font-syne font-extrabold text-5xl sm:text-6xl lg:text-7xl text-[var(--text-primary)] leading-tight mb-6">
            Simple,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Transparent
            </span>{" "}
            Pricing
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl mx-auto">
            Start free. Upgrade when {`you're`} ready.
          </p>
        </div>
      </section>

      {/* Pricing section (client) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <PricingSection />
      </section>

      {/* Money-back guarantee */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-5"
          style={{
            background: "var(--bg-card)",
            border: "1px solid rgba(0,230,118,0.25)",
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(0,230,118,0.12)" }}
          >
            <Shield size={24} className="text-[#00E676]" />
          </div>
          <div className="text-left">
            <h3 className="font-syne font-bold text-lg text-[var(--text-primary)] mb-1">
              30-Day Money-Back Guarantee
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Not happy in the first 30 days? Email us for a full refund — no questions asked.
              We {`don't`} believe in lock-in. We believe in earning your trust every month.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] mb-10 text-center">
          Pricing{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #0066FF, #00FFD1)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FAQ
          </span>
        </h2>
        <PricingFAQ />
      </section>
    </div>
  )
}
