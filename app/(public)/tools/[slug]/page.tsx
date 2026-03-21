import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Search,
  FileText,
  BarChart2,
  Zap,
  Cpu,
  PenTool,
  Globe,
  TrendingUp,
  Hash,
  DollarSign,
  Mail,
  ArrowRight,
  Construction,
  Lock,
} from "lucide-react"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ToolCard } from "@/components/tools/ToolCard"
import { TOOLS_DATA } from "../page"

/* ── Icon map ── */
const TOOL_ICON_MAP: Record<string, React.ElementType> = {
  Search,
  FileText,
  BarChart2,
  Zap,
  Cpu,
  PenTool,
  Globe,
  TrendingUp,
  Hash,
  DollarSign,
  Mail,
}

/* ── generateStaticParams ── */
export function generateStaticParams() {
  return TOOLS_DATA.map((t) => ({ slug: t.slug }))
}

/* ── generateMetadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = TOOLS_DATA.find((t) => t.slug === slug)
  if (!tool) return { title: "Not Found" }

  return {
    title: `${tool.name} — ${SITE_NAME}`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} — ${SITE_NAME}`,
      description: tool.description,
      url: `${SITE_URL}/tools/${slug}`,
    },
  }
}

/* ── Page ── */
export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = TOOLS_DATA.find((t) => t.slug === slug)
  if (!tool) notFound()

  const Icon = TOOL_ICON_MAP[tool.icon] ?? Zap
  const isPro = tool.accessLevel === "pro"

  // Related tools: same category, exclude current
  const related = TOOLS_DATA.filter(
    (t) => t.slug !== slug && t.category === tool.category
  ).slice(0, 3)
  const fallbackRelated = related.length < 3
    ? [
        ...related,
        ...TOOLS_DATA.filter(
          (t) => t.slug !== slug && !related.find((r) => r.slug === t.slug)
        ).slice(0, 3 - related.length),
      ]
    : related

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${tool.gradient.from}22, transparent 65%)`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
            <Link href="/tools" className="hover:text-[var(--accent-blue)] transition-colors">
              Tools
            </Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">{tool.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${tool.gradient.from}22, ${tool.gradient.to}22)`,
                border: `1px solid ${tool.gradient.from}50`,
                boxShadow: `0 0 40px ${tool.gradient.from}30`,
              }}
            >
              <Icon size={36} style={{ color: tool.gradient.from }} />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge variant="default" className="text-xs">
                  {tool.category}
                </Badge>
                {isPro ? (
                  <Badge variant="yellow" className="text-xs gap-1">
                    <Lock size={9} />
                    Pro Required
                  </Badge>
                ) : (
                  <Badge variant="green" className="text-xs">
                    Free
                  </Badge>
                )}
              </div>
              <h1 className="font-syne font-extrabold text-4xl sm:text-5xl text-[var(--text-primary)] mb-4 leading-tight">
                {tool.name}
              </h1>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {tool.description}
              </p>
              {tool.totalUsageCount && tool.totalUsageCount > 0 && (
                <p className="text-sm text-[var(--text-muted)] mt-3">
                  Used {tool.totalUsageCount.toLocaleString()} times
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tool interface placeholder */}
      <section className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            background: "var(--bg-card)",
            border: `1px solid ${tool.gradient.from}40`,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${tool.gradient.from}15, transparent)`,
            }}
          />
          <div className="relative z-10">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                background: `linear-gradient(135deg, ${tool.gradient.from}20, ${tool.gradient.to}20)`,
                border: `1px solid ${tool.gradient.from}40`,
              }}
            >
              <Construction size={32} style={{ color: tool.gradient.from }} />
            </div>
            <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] mb-4">
              Tool Interface Coming Soon
            </h2>
            <p className="text-base text-[var(--text-secondary)] max-w-lg mx-auto mb-8 leading-relaxed">
              {`We're building the interface for `}<strong>{tool.name}</strong>
              {`. Sign up to get notified when it launches — Pro subscribers get early access.`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {isPro ? (
                <Button asChild size="lg">
                  <Link href="/pricing">
                    Upgrade to Pro for Early Access
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg">
                  <Link href="/sign-up">
                    Get Notified on Launch
                  </Link>
                </Button>
              )}
              <Button asChild variant="ghost" size="lg">
                <Link href="/tools">
                  Browse Other Tools
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related tools */}
      {fallbackRelated.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-syne font-extrabold text-2xl text-[var(--text-primary)] mb-8">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fallbackRelated.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
