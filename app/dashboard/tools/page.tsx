import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { TrendingUp, Code, Megaphone, Cpu, Zap, Lock, ArrowRight, Clock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Tools",
}

const TOOL_USAGE_HISTORY = [
  {
    tool: "SEO Analyzer",
    slug: "seo-analyzer",
    category: "SEO",
    usageCount: 12,
    lastUsed: "Today, 2:31 PM",
    icon: TrendingUp,
    accessLevel: "free" as const,
  },
  {
    tool: "Ad Copy Writer",
    slug: "ad-copy",
    category: "Marketing",
    usageCount: 8,
    lastUsed: "Yesterday",
    icon: Megaphone,
    accessLevel: "free" as const,
  },
  {
    tool: "Code Generator",
    slug: "code-generator",
    category: "Development",
    usageCount: 24,
    lastUsed: "2 days ago",
    icon: Code,
    accessLevel: "pro" as const,
  },
  {
    tool: "AI Content Generator",
    slug: "ai-content",
    category: "AI",
    usageCount: 3,
    lastUsed: "3 days ago",
    icon: Cpu,
    accessLevel: "pro" as const,
  },
]

const ALL_TOOLS = [
  { name: "SEO Analyzer", slug: "seo-analyzer", category: "SEO", icon: TrendingUp, accessLevel: "free" as const, description: "Audit any URL and get actionable SEO fixes." },
  { name: "Ad Copy Writer", slug: "ad-copy", category: "Marketing", icon: Megaphone, accessLevel: "free" as const, description: "Generate high-converting ad copy in seconds." },
  { name: "Code Generator", slug: "code-generator", category: "Development", icon: Code, accessLevel: "pro" as const, description: "Generate boilerplate and utility code." },
  { name: "AI Content Generator", slug: "ai-content", category: "AI", icon: Cpu, accessLevel: "pro" as const, description: "Write blog posts and social content with AI." },
]

export default async function ToolsPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const isProUser = false // Will come from Convex

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl text-[#F0F4FF] mb-1">
          My Tools
        </h1>
        <p className="text-[#8899BB] text-sm">
          Launch tools and track your usage history.
        </p>
      </div>

      {/* Usage history table */}
      <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2440]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00A8FF]" />
            <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[#F0F4FF]">
              Usage History
            </h2>
          </div>
          <span className="text-xs text-[#4A5878]">Last 30 days</span>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1A2440]">
                <th className="text-left px-6 py-3 text-xs font-medium text-[#4A5878] uppercase tracking-wide">
                  Tool
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#4A5878] uppercase tracking-wide">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#4A5878] uppercase tracking-wide">
                  Sessions
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#4A5878] uppercase tracking-wide">
                  Last Used
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-[#4A5878] uppercase tracking-wide">
                  Launch
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A2440]">
              {TOOL_USAGE_HISTORY.map((item) => (
                <tr key={item.slug} className="hover:bg-[#0D1428] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF]/20 to-[#00FFD1]/10 border border-[#0066FF]/20 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-[#00A8FF]" />
                      </div>
                      <span className="font-medium text-[#F0F4FF]">{item.tool}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-[#0D1428] border border-[#1A2440] text-[#8899BB]">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#8899BB]">{item.usageCount}</td>
                  <td className="px-6 py-4 text-[#8899BB]">{item.lastUsed}</td>
                  <td className="px-6 py-4 text-right">
                    {item.accessLevel === "pro" && !isProUser ? (
                      <span className="inline-flex items-center gap-1 text-xs text-[#4A5878]">
                        <Lock className="w-3 h-3" /> Pro
                      </span>
                    ) : (
                      <Link
                        href={`/tools/${item.slug}`}
                        className="inline-flex items-center gap-1 text-xs text-[#00A8FF] hover:text-[#00E5FF] transition-colors"
                      >
                        Open <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="sm:hidden divide-y divide-[#1A2440]">
          {TOOL_USAGE_HISTORY.map((item) => (
            <div key={item.slug} className="flex items-center gap-3 px-4 py-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0066FF]/20 to-[#00FFD1]/10 border border-[#0066FF]/20 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-[#00A8FF]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-[#F0F4FF]">{item.tool}</p>
                <p className="text-xs text-[#4A5878]">
                  {item.usageCount} sessions · {item.lastUsed}
                </p>
              </div>
              {item.accessLevel === "pro" && !isProUser ? (
                <Lock className="w-4 h-4 text-[#4A5878]" />
              ) : (
                <Link href={`/tools/${item.slug}`}>
                  <ArrowRight className="w-4 h-4 text-[#00A8FF]" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* All available tools */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-lg text-[#F0F4FF]">
            All Available Tools
          </h2>
          <Link
            href="/tools"
            className="flex items-center gap-1 text-sm text-[#00A8FF] hover:text-[#00E5FF] transition-colors"
          >
            Browse all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ALL_TOOLS.map((tool) => {
            const isLocked = tool.accessLevel === "pro" && !isProUser
            return (
              <div
                key={tool.slug}
                className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-5 flex items-start gap-4"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isLocked
                      ? "bg-[#0D1428] border border-[#1A2440]"
                      : "bg-gradient-to-br from-[#0066FF]/20 to-[#00FFD1]/10 border border-[#0066FF]/20"
                  }`}
                >
                  <tool.icon className={`w-5 h-5 ${isLocked ? "text-[#4A5878]" : "text-[#00A8FF]"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-sm text-[#F0F4FF]">
                      {tool.name}
                    </h3>
                    {isLocked && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-[#FFB300]/10 border border-[#FFB300]/20 text-[#FFB300]">
                        <Zap className="w-2.5 h-2.5" /> Pro
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#4A5878] leading-relaxed mb-3">
                    {tool.description}
                  </p>
                  {isLocked ? (
                    <Link
                      href="/pricing"
                      className="inline-flex items-center gap-1 text-xs text-[#FFB300] hover:text-[#FFB300]/80 transition-colors"
                    >
                      Upgrade to unlock <ArrowRight className="w-3 h-3" />
                    </Link>
                  ) : (
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center gap-1 text-xs text-[#00A8FF] hover:text-[#00E5FF] transition-colors"
                    >
                      Launch tool <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
