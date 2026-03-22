import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Book a Free 15-Min Call",
  description:
    "Stop wasting time on repetitive tasks. In 15 minutes, we'll identify your biggest business bottleneck and show you exactly how to fix it — for free.",
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Hero strip */}
      <div className="pt-24 pb-6 text-center px-4">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue)] mb-3">
          Free Strategy Call
        </span>
        <h1 className="font-syne font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] mb-2">
          Stop Wasting Time —{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#0066FF,#00FFD1)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Fix Your #1 Bottleneck
          </span>
        </h1>
        <p className="text-[var(--text-secondary)] text-base max-w-xl mx-auto">
          15 minutes. No pitch. No pressure. Just clarity on what&apos;s holding your business back — and the exact steps to break through it.
        </p>
      </div>

      {/* TidyCal embed */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 pb-16">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border-default)" }}
        >
          <div
            className="tidycal-embed"
            data-path="growthency/15-minute-meeting"
          />
        </div>
      </div>

      <Script
        src="https://asset-tidycal.b-cdn.net/js/embed.js"
        strategy="afterInteractive"
      />
    </div>
  )
}
