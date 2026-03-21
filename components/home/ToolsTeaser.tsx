"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Wand2, Search, BarChart2, ArrowRight, Lock } from "lucide-react"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Badge } from "@/components/ui/Badge"

/* ── Mock tool data ── */
const FEATURED_TOOLS = [
  {
    icon: Search,
    name: "SEO Analyzer",
    description: "Instantly audit any URL for on-page SEO issues, meta tags, performance, and actionable recommendations.",
    category: "SEO",
    freeUsage: 3,
    used: 2,
    slug: "seo-analyzer",
  },
  {
    icon: Wand2,
    name: "AI Content Writer",
    description: "Generate high-quality blog posts, ad copy, and social captions tailored to your brand voice with AI.",
    category: "AI",
    freeUsage: 3,
    used: 1,
    slug: "ai-content-writer",
  },
  {
    icon: BarChart2,
    name: "Growth Calculator",
    description: "Model your revenue growth, MRR, and customer acquisition costs with interactive projections.",
    category: "Analytics",
    freeUsage: 3,
    used: 0,
    slug: "growth-calculator",
  },
]

/* ── Single tool mock card ── */
function ToolCard({
  tool,
  index,
}: {
  tool: (typeof FEATURED_TOOLS)[number]
  index: number
}) {
  const Icon = tool.icon
  const usagePercent = (tool.used / tool.freeUsage) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="group relative rounded-[var(--radius-card)] p-6 flex flex-col gap-5 overflow-hidden transition-all duration-300 hover:-translate-y-2"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
      }}
      whileHover={{
        boxShadow: "0 0 40px rgba(0,168,255,0.15), inset 0 0 0 1px var(--accent-blue)",
      }}
    >
      {/* Top gradient accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, #0066FF, #00FFD1)" }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(0,168,255,0.1)" }}
          >
            <Icon size={20} className="text-[var(--accent-blue)]" />
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[var(--text-primary)] leading-snug">
              {tool.name}
            </h3>
            <Badge variant="blue" className="mt-0.5 text-[10px]">
              {tool.category}
            </Badge>
          </div>
        </div>

        {/* Free chip */}
        <span
          className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full"
          style={{
            background: "rgba(0,230,118,0.1)",
            color: "var(--success)",
            border: "1px solid rgba(0,230,118,0.25)",
          }}
        >
          3 free/day
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--text-muted)] leading-relaxed font-[family-name:var(--font-dm-sans)] flex-1">
        {tool.description}
      </p>

      {/* Usage bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--text-muted)]">Daily usage</span>
          <span className="text-[var(--text-secondary)] font-medium">
            {tool.used} of {tool.freeUsage} used
          </span>
        </div>
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ background: "var(--border-default)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                usagePercent >= 100
                  ? "#FF1744"
                  : "linear-gradient(90deg, #0066FF, #00FFD1)",
              width: 0,
            }}
            whileInView={{ width: `${usagePercent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Footer CTA */}
      <Link
        href={`/tools/${tool.slug}`}
        className="flex items-center gap-2 text-sm font-medium text-[var(--accent-blue)] hover:text-[var(--accent-cyan)] transition-colors group/link"
      >
        Try for free
        <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1" />
      </Link>
    </motion.div>
  )
}

/* ── Main section ── */
export default function ToolsTeaser() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
      aria-labelledby="tools-heading"
    >
      {/* Animated gradient mesh background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main gradient blob */}
        <div
          className="absolute w-[900px] h-[900px] rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(0,102,255,0.08) 0deg, rgba(0,229,255,0.05) 120deg, rgba(0,255,209,0.06) 240deg, rgba(0,102,255,0.08) 360deg)",
            filter: "blur(60px)",
            animation: "meshRotate 20s linear infinite",
          }}
        />
        {/* Secondary orb */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            top: "10%",
            right: "5%",
            background: "radial-gradient(ellipse, rgba(0,229,255,0.08), transparent 70%)",
            animation: "orbFloat2 14s ease-in-out infinite",
          }}
        />
        <style>{`
          @keyframes meshRotate {
            0%   { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}</style>
      </div>

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
            eyebrow="Power Tools"
            heading="Power Tools for Modern Business"
            gradientLastWord
            subtitle="Free to try. Unlimited with Pro. Automate, analyze, and accelerate your growth with purpose-built tools."
            align="center"
          />
        </motion.div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {FEATURED_TOOLS.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>

        {/* Pro teaser banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-[var(--radius-card)] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 overflow-hidden"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-default)",
          }}
        >
          {/* Background gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,102,255,0.05) 0%, rgba(0,255,209,0.03) 100%)",
            }}
          />

          <div className="relative z-10 flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "rgba(0,168,255,0.1)" }}
            >
              <Lock size={18} className="text-[var(--accent-blue)]" />
            </div>
            <div>
              <h4 className="font-[family-name:var(--font-syne)] font-extrabold text-lg text-[var(--text-primary)] mb-1">
                Unlock unlimited access with Pro
              </h4>
              <p className="text-sm text-[var(--text-muted)] font-[family-name:var(--font-dm-sans)]">
                Get unlimited daily usage, priority processing, and early access to new tools for just $9.99/month.
              </p>
            </div>
          </div>
          <Link
            href="/pricing"
            className="relative z-10 btn-primary flex-shrink-0 px-6 py-2.5 text-sm whitespace-nowrap"
          >
            Upgrade to Pro
          </Link>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/tools"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base"
          >
            Explore All Tools
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
