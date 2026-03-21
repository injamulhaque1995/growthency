import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { Button } from "@/components/ui/Button"
import { ToolCard, type ToolCardData } from "@/components/tools/ToolCard"
import { ToolsFilterClient } from "./ToolsFilterClient"

/* ── Metadata ── */
export const metadata: Metadata = {
  title: `Tools — ${SITE_NAME}`,
  description:
    "Free and pro business growth tools for SEO, marketing, development, and more. Unlimited usage with Pro.",
  openGraph: {
    title: `Tools — ${SITE_NAME}`,
    url: `${SITE_URL}/tools`,
  },
}

/* ── Static tools data ── */
export const TOOLS_DATA: ToolCardData[] = [
  {
    slug: "seo-audit",
    name: "SEO Audit Tool",
    description: "Analyze any webpage for SEO issues, missing meta tags, and quick-win optimizations.",
    category: "SEO",
    accessLevel: "free",
    icon: "Search",
    gradient: { from: "#0066FF", to: "#00FFD1" },
    totalUsageCount: 1847,
  },
  {
    slug: "keyword-research",
    name: "Keyword Research",
    description: "Discover high-intent keywords with search volume estimates and competition scores.",
    category: "SEO",
    accessLevel: "pro",
    icon: "Hash",
    gradient: { from: "#0066FF", to: "#8B5CF6" },
    totalUsageCount: 943,
  },
  {
    slug: "blog-post-generator",
    name: "Blog Post Generator",
    description: "Generate structured, SEO-optimized blog posts in seconds using AI — just add your topic.",
    category: "Marketing",
    accessLevel: "free",
    icon: "FileText",
    gradient: { from: "#F59E0B", to: "#EF4444" },
    totalUsageCount: 3201,
  },
  {
    slug: "email-subject-generator",
    name: "Email Subject Generator",
    description: "Craft high open-rate email subject lines with AI-powered suggestions and A/B variants.",
    category: "Marketing",
    accessLevel: "free",
    icon: "Mail",
    gradient: { from: "#10B981", to: "#0066FF" },
    totalUsageCount: 2156,
  },
  {
    slug: "roi-calculator",
    name: "ROI Calculator",
    description: "Calculate return on investment for marketing campaigns, software projects, and hiring.",
    category: "Business",
    accessLevel: "free",
    icon: "DollarSign",
    gradient: { from: "#00E676", to: "#0066FF" },
    totalUsageCount: 788,
  },
  {
    slug: "performance-analyzer",
    name: "Performance Analyzer",
    description: "Measure website load speed, Core Web Vitals, and get a prioritized fix list.",
    category: "Development",
    accessLevel: "pro",
    icon: "BarChart2",
    gradient: { from: "#06B6D4", to: "#0066FF" },
    totalUsageCount: 412,
  },
  {
    slug: "social-caption-writer",
    name: "Social Caption Writer",
    description: "Write engaging captions for Instagram, LinkedIn, and Twitter tailored to your brand voice.",
    category: "Marketing",
    accessLevel: "free",
    icon: "PenTool",
    gradient: { from: "#EC4899", to: "#8B5CF6" },
    totalUsageCount: 4589,
  },
  {
    slug: "competitor-research",
    name: "Competitor Research",
    description: "Analyze competitors' positioning, messaging, and content strategy to find your edge.",
    category: "Business",
    accessLevel: "pro",
    icon: "TrendingUp",
    gradient: { from: "#F59E0B", to: "#EF4444" },
    totalUsageCount: 334,
  },
  {
    slug: "ai-code-reviewer",
    name: "AI Code Reviewer",
    description: "Paste your code and get instant feedback on bugs, security issues, and best practices.",
    category: "Development",
    accessLevel: "pro",
    icon: "Cpu",
    gradient: { from: "#8B5CF6", to: "#06B6D4" },
    totalUsageCount: 671,
  },
  {
    slug: "landing-page-analyzer",
    name: "Landing Page Analyzer",
    description: "Evaluate your landing page for conversion rate optimization opportunities and CRO wins.",
    category: "Marketing",
    accessLevel: "free",
    icon: "Globe",
    gradient: { from: "#0066FF", to: "#EC4899" },
    totalUsageCount: 1102,
  },
  {
    slug: "content-calendar-planner",
    name: "Content Calendar Planner",
    description: "Plan and schedule your content across all channels with AI-generated posting schedules.",
    category: "Marketing",
    accessLevel: "free",
    icon: "CalendarDays",
    gradient: { from: "#8B5CF6", to: "#EC4899" },
    totalUsageCount: 892,
  },
  {
    slug: "conversion-copy-writer",
    name: "Conversion Copy Writer",
    description: "Write high-converting copy for ads, landing pages, and sales emails using proven frameworks.",
    category: "Marketing",
    accessLevel: "pro",
    icon: "Megaphone",
    gradient: { from: "#F59E0B", to: "#EF4444" },
    totalUsageCount: 1543,
  },
  {
    slug: "backlink-analyzer",
    name: "Backlink Analyzer",
    description: "Analyze your backlink profile, find toxic links, and discover new link-building opportunities.",
    category: "SEO",
    accessLevel: "pro",
    icon: "Link",
    gradient: { from: "#00E676", to: "#0066FF" },
    totalUsageCount: 678,
  },
  {
    slug: "startup-name-generator",
    name: "Startup Name Generator",
    description: "Generate creative, memorable startup names with domain availability checks built in.",
    category: "Business",
    accessLevel: "free",
    icon: "Lightbulb",
    gradient: { from: "#EC4899", to: "#F59E0B" },
    totalUsageCount: 3412,
  },
  {
    slug: "api-documentation-writer",
    name: "API Doc Writer",
    description: "Auto-generate clean, developer-friendly API documentation from your code or endpoints.",
    category: "Development",
    accessLevel: "pro",
    icon: "FileCode",
    gradient: { from: "#06B6D4", to: "#8B5CF6" },
    totalUsageCount: 445,
  },
]

/* ── Page ── */
export default function ToolsPage() {
  const freeCount = TOOLS_DATA.filter((t) => t.accessLevel === "free").length
  const proCount = TOOLS_DATA.filter((t) => t.accessLevel === "pro").length

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
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
            Growth Tools
          </span>
          <h1 className="font-syne font-extrabold text-5xl sm:text-6xl lg:text-7xl text-[var(--text-primary)] leading-tight mb-6">
            Business{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Growth Tools
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
            Free to try. Unlimited with Pro.
          </p>

          {/* Stats chips */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "rgba(0,230,118,0.1)",
                border: "1px solid rgba(0,230,118,0.25)",
                color: "#00E676",
              }}
            >
              {freeCount} Free Tools
            </span>
            <span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "rgba(255,179,0,0.1)",
                border: "1px solid rgba(255,179,0,0.25)",
                color: "#FFB300",
              }}
            >
              {proCount} Pro Tools
            </span>
            <span
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "rgba(0,168,255,0.1)",
                border: "1px solid rgba(0,168,255,0.25)",
                color: "var(--accent-blue)",
              }}
            >
              New tools monthly
            </span>
          </div>
        </div>
      </section>

      {/* Tools Grid (client for filtering) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <ToolsFilterClient tools={TOOLS_DATA} />
      </section>

      {/* Upgrade CTA */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <div
          className="rounded-3xl p-10 relative overflow-hidden"
          style={{
            background: "var(--bg-card)",
            border: "1px solid rgba(0,168,255,0.25)",
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
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{
                background: "rgba(0,168,255,0.1)",
                border: "1px solid rgba(0,168,255,0.2)",
              }}
            >
              <Zap size={24} className="text-[var(--accent-blue)]" />
            </div>
            <h2 className="font-syne font-extrabold text-3xl text-[var(--text-primary)] mb-3">
              Unlock Unlimited Access
            </h2>
            <p className="text-base text-[var(--text-secondary)] mb-8">
              {`Upgrade to Pro for unlimited tool uses, priority support, and early access to every new tool we build.`}
            </p>
            <Button asChild size="lg">
              <Link href="/pricing" className="inline-flex items-center gap-2">
                View Pricing
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
