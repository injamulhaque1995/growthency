"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function BookingPage() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Dark theme ID 425432 = "Growthency Dark" in TidyCal
  const src = mounted && resolvedTheme === "dark"
    ? "https://tidycal.com/growthency/15-minute-meeting?theme=425432"
    : "https://tidycal.com/growthency/15-minute-meeting"

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
          15 minutes. No pitch. No pressure. Just clarity on what&apos;s holding
          your business back — and the exact steps to break through it.
        </p>
      </div>

      {/* TidyCal iframe — stable across theme switches */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 pb-16">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border-default)" }}
        >
          {mounted && (
            <iframe
              key={src}
              src={src}
              width="100%"
              height="900"
              frameBorder="0"
              title="Book a Free 15-Min Strategy Call"
              loading="lazy"
              style={{ display: "block" }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
