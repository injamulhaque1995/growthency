"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Zap, Target, Brain, BarChart3, Handshake } from "lucide-react"
import { SectionHeader } from "@/components/shared/SectionHeader"

/* ── Feature points ── */
const FEATURES = [
  {
    Icon: Zap,
    title: "Blazing Fast Delivery",
    description:
      "We ship production-ready MVPs in weeks, not months. Agile sprints keep your project on time and on budget.",
  },
  {
    Icon: Target,
    title: "Results-Driven Approach",
    description:
      "Every decision is tied to measurable outcomes — traffic, conversions, revenue. No vanity metrics.",
  },
  {
    Icon: Brain,
    title: "AI-Powered Solutions",
    description:
      "We integrate the latest large language models and AI APIs directly into your product workflows.",
  },
  {
    Icon: BarChart3,
    title: "Scalable Architecture",
    description:
      "Code built to handle 10 users or 10 million. Clean, documented, and ready for the next stage of growth.",
  },
  {
    Icon: Handshake,
    title: "Dedicated Partnership",
    description:
      "You're not a ticket number. We embed with your team, attend standups, and stay invested in your success.",
  },
]

/* ── Terminal snippets ── */
const TERMINAL_SNIPPETS = [
  {
    label: "$ launch project",
    lines: [
      { text: "> Initializing project scaffold...", delay: 0 },
      { text: "> Installing dependencies... ✓", delay: 400 },
      { text: "> Configuring Convex backend... ✓", delay: 800 },
      { text: "> Setting up Stripe billing... ✓", delay: 1200 },
      { text: "> Deploying to Vercel... ✓", delay: 1600 },
      { text: "> 🚀 Project live at growthency.app", delay: 2000 },
    ],
  },
  {
    label: "$ analyze growth",
    lines: [
      { text: "> Fetching analytics data...", delay: 0 },
      { text: "> Visitors this month: +124%", delay: 400 },
      { text: "> Conversions: 8.4% (↑ from 3.1%)", delay: 800 },
      { text: "> MRR: $24,800 (↑ $8,200)", delay: 1200 },
      { text: "> Churn rate: 1.2% ✓", delay: 1600 },
      { text: "> 📈 All systems growing.", delay: 2000 },
    ],
  },
  {
    label: "$ run ai integration",
    lines: [
      { text: "> Connecting OpenAI API...", delay: 0 },
      { text: "> Loading custom fine-tune model...", delay: 400 },
      { text: "> Building inference pipeline... ✓", delay: 800 },
      { text: "> Routing prompt to embeddings... ✓", delay: 1200 },
      { text: "> Response latency: 180ms ✓", delay: 1600 },
      { text: "> 🤖 AI integration complete.", delay: 2000 },
    ],
  },
]

/* ── Terminal card ── */
function TerminalCard() {
  const [snippetIndex, setSnippetIndex] = useState(0)
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const snippet = TERMINAL_SNIPPETS[snippetIndex]

  const runSnippet = (idx: number) => {
    // Clear existing timeouts
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setVisibleLines([])
    setIsRunning(true)

    const s = TERMINAL_SNIPPETS[idx]
    s.lines.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i])
        if (i === s.lines.length - 1) {
          setIsRunning(false)
        }
      }, line.delay + 200)
      timeoutsRef.current.push(t)
    })
  }

  useEffect(() => {
    runSnippet(snippetIndex)
    return () => timeoutsRef.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snippetIndex])

  // Auto-cycle every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setSnippetIndex((prev) => (prev + 1) % TERMINAL_SNIPPETS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="rounded-[var(--radius-card)] overflow-hidden font-[family-name:var(--font-mono)] text-sm shadow-2xl"
      style={{
        background: "#0D1117",
        border: "1px solid #30363D",
        boxShadow: "0 0 40px rgba(0,168,255,0.15)",
      }}
    >
      {/* Terminal titlebar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ background: "#161B22", borderColor: "#30363D" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
        <span className="ml-3 text-xs" style={{ color: "#8B949E" }}>
          growthency — terminal
        </span>
        <div className="ml-auto flex gap-1">
          {TERMINAL_SNIPPETS.map((_, i) => (
            <button
              key={i}
              onClick={() => setSnippetIndex(i)}
              className="w-1.5 h-1.5 rounded-full transition-colors"
              style={{
                background: i === snippetIndex ? "#00A8FF" : "#30363D",
              }}
              aria-label={`Switch to snippet ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Terminal body */}
      <div className="p-5 min-h-[240px]">
        {/* Command line */}
        <div className="flex items-center gap-2 mb-4">
          <span style={{ color: "#00A8FF" }}>growthency</span>
          <span style={{ color: "#8B949E" }}>in</span>
          <span style={{ color: "#00FFD1" }}>~/workspace</span>
          <span style={{ color: "#8B949E" }}>$</span>
          <span style={{ color: "#E6EDF3" }}>{snippet.label.replace("$ ", "")}</span>
          {isRunning && (
            <span
              className="inline-block w-2 h-4 ml-0.5"
              style={{
                background: "#00A8FF",
                animation: "blink 1s step-end infinite",
              }}
            />
          )}
        </div>

        {/* Output lines */}
        <div className="space-y-1.5 pl-2">
          {snippet.lines.map((line, i) => (
            <div
              key={`${snippetIndex}-${i}`}
              className="transition-all duration-200"
              style={{
                color: line.text.includes("✓") || line.text.includes("🚀") || line.text.includes("📈") || line.text.includes("🤖")
                  ? "#28C840"
                  : "#8B949E",
                opacity: visibleLines.includes(i) ? 1 : 0,
                transform: visibleLines.includes(i) ? "translateY(0)" : "translateY(4px)",
              }}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Prompt */}
        {!isRunning && visibleLines.length === snippet.lines.length && (
          <div className="mt-4 flex items-center gap-2">
            <span style={{ color: "#00A8FF" }}>growthency</span>
            <span style={{ color: "#8B949E" }}>$</span>
            <span
              className="inline-block w-2 h-4"
              style={{
                background: "#00A8FF",
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

/* ── Animation variants ── */
const containerVariants: import("framer-motion").Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const featureVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
}

/* ── Main section ── */
export default function WhySection() {
  return (
    <section
      className="relative py-24 bg-[var(--bg-primary)] overflow-hidden"
      aria-labelledby="why-heading"
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,229,255,0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Features */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <SectionHeader
                eyebrow="Why Growthency"
                heading="Why Choose Growthency"
                gradientLastWord
                subtitle="We're not just a vendor — we're your growth partner, embedded in your journey from day one."
                align="left"
              />
            </motion.div>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              {FEATURES.map((feature) => (
                <motion.li
                  key={feature.title}
                  variants={featureVariants}
                  className="flex items-start gap-4"
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(0,168,255,0.1)" }}
                  >
                    <feature.Icon size={18} className="text-[var(--accent-blue)]" />
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[var(--text-primary)] mb-1 leading-snug">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed font-[family-name:var(--font-dm-sans)]">
                      {feature.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative"
          >
            {/* Floating glow under terminal */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-2xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,168,255,0.12), transparent)",
              }}
            />

            <TerminalCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
