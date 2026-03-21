import Link from "next/link"
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
  Image,
  ArrowRight,
  Lock,
} from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

/* ── Tool icon map ── */
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
  Image,
}

export interface ToolCardData {
  slug: string
  name: string
  description: string
  category: string
  accessLevel: "free" | "pro"
  icon: string
  gradient: { from: string; to: string }
  totalUsageCount?: number
}

export function ToolCard({ tool }: { tool: ToolCardData }) {
  const Icon = TOOL_ICON_MAP[tool.icon] ?? Zap
  const isPro = tool.accessLevel === "pro"

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
      }}
    >
      {/* Hover glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${tool.gradient.from}60`,
        }}
      />
      {/* Top gradient line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${tool.gradient.from}, ${tool.gradient.to})`,
        }}
      />

      {/* Icon + badges row */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${tool.gradient.from}22, ${tool.gradient.to}22)`,
            border: `1px solid ${tool.gradient.from}40`,
          }}
        >
          <Icon size={22} style={{ color: tool.gradient.from }} />
        </div>

        <div className="flex items-center gap-2">
          {isPro ? (
            <Badge variant="yellow" className="text-xs gap-1">
              <Lock size={9} />
              Pro
            </Badge>
          ) : (
            <Badge variant="green" className="text-xs">
              Free
            </Badge>
          )}
        </div>
      </div>

      {/* Info */}
      <Badge variant="default" className="text-xs mb-3">
        {tool.category}
      </Badge>

      <h3 className="font-syne font-bold text-base text-[var(--text-primary)] mb-2 leading-snug">
        {tool.name}
      </h3>
      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
        {tool.description}
      </p>

      {/* Usage count */}
      {tool.totalUsageCount !== undefined && tool.totalUsageCount > 0 && (
        <p className="text-xs text-[var(--text-muted)] mb-4">
          {tool.totalUsageCount.toLocaleString()} uses
        </p>
      )}

      {/* CTA */}
      <div className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0"
        style={{ color: tool.gradient.from }}
      >
        Use Tool
        <ArrowRight size={14} />
      </div>
    </Link>
  )
}
