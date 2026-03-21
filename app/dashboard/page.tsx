import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { Zap, TrendingUp, Code, Megaphone, Cpu, ArrowRight, Sparkles } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Overview",
}

const QUICK_TOOLS = [
  {
    name: "SEO Analyzer",
    description: "Audit your page and get actionable fixes",
    icon: TrendingUp,
    href: "/tools/seo-analyzer",
    color: "from-[#0066FF] to-[#00A8FF]",
    usage: 2,
  },
  {
    name: "Code Generator",
    description: "Generate boilerplate code in seconds",
    icon: Code,
    href: "/tools/code-generator",
    color: "from-[#6C3FFF] to-[#00FFD1]",
    usage: 5,
  },
  {
    name: "Ad Copy Writer",
    description: "Write high-converting ad copy with AI",
    icon: Megaphone,
    href: "/tools/ad-copy",
    color: "from-[#FF6B35] to-[#FFB300]",
    usage: 1,
  },
]

export default async function DashboardPage() {
  const user = await currentUser()
  const firstName = user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "there"

  // Static plan for now — will come from Convex once connected
  const currentPlan = "Free"
  const isFreePlan = currentPlan === "Free"
  const todayUsage = 8
  const dailyLimit = 3

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl lg:text-4xl text-[#F0F4FF] mb-1">
            Hey, {firstName}!
          </h1>
          <p className="text-[#8899BB] text-sm">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium bg-[#0A0F1E] border-[#1A2440] text-[#8899BB]">
          <span
            className={`w-2 h-2 rounded-full ${isFreePlan ? "bg-[#8899BB]" : "bg-[#00E676]"}`}
          />
          {currentPlan} Plan
        </div>
      </div>

      {/* Usage summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-5">
          <p className="text-xs text-[#4A5878] font-medium uppercase tracking-wide mb-2">
            Tools Used Today
          </p>
          <p className="text-3xl font-[family-name:var(--font-syne)] font-extrabold text-[#F0F4FF]">
            {todayUsage}
          </p>
          {isFreePlan && (
            <p className="text-xs text-[#8899BB] mt-1">
              / {dailyLimit} daily limit
            </p>
          )}
        </div>
        <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-5">
          <p className="text-xs text-[#4A5878] font-medium uppercase tracking-wide mb-2">
            This Month
          </p>
          <p className="text-3xl font-[family-name:var(--font-syne)] font-extrabold text-[#F0F4FF]">
            47
          </p>
          <p className="text-xs text-[#8899BB] mt-1">tool sessions</p>
        </div>
        <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-5">
          <p className="text-xs text-[#4A5878] font-medium uppercase tracking-wide mb-2">
            Member Since
          </p>
          <p className="text-3xl font-[family-name:var(--font-syne)] font-extrabold text-[#F0F4FF]">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
              : "—"}
          </p>
        </div>
      </div>

      {/* Quick access tools */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-lg text-[#F0F4FF]">
            Quick Access Tools
          </h2>
          <Link
            href="/tools"
            className="flex items-center gap-1 text-sm text-[#00A8FF] hover:text-[#00E5FF] transition-colors"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {QUICK_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-5 hover:border-[#0066FF]/50 hover:shadow-[0_0_24px_rgba(0,102,255,0.12)] transition-all duration-300"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 shadow-[0_0_12px_rgba(0,102,255,0.3)]`}
              >
                <tool.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-sm text-[#F0F4FF] mb-1 group-hover:text-[#00A8FF] transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-[#4A5878] leading-relaxed">
                {tool.description}
              </p>
              <p className="text-xs text-[#8899BB] mt-2">
                Used {tool.usage}x this week
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Upgrade banner — free plan only */}
      {isFreePlan && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0066FF]/15 to-[#00FFD1]/10 border border-[#0066FF]/30 p-6">
          {/* Glow orbs */}
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-[#0066FF]/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-[#00FFD1]/10 blur-2xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00FFD1] flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(0,102,255,0.4)]">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[#F0F4FF] mb-0.5">
                  Unlock Unlimited Tools
                </h3>
                <p className="text-sm text-[#8899BB]">
                  You&apos;re on the Free plan — limited to {dailyLimit} tool uses per day. Upgrade to Pro for unlimited access, priority processing, and more.
                </p>
              </div>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 inline-flex items-center gap-2 h-10 px-5 text-sm font-medium text-white bg-[linear-gradient(135deg,#0066FF,#00FFD1)] rounded-[10px] shadow-[0_2px_12px_rgba(0,102,255,0.3)] hover:shadow-[0_0_30px_rgba(0,102,255,0.5)] hover:-translate-y-px transition-all duration-300"
            >
              <Zap className="w-4 h-4" />
              View Plans
            </Link>
          </div>
        </div>
      )}

      {/* Recent activity */}
      <div>
        <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-lg text-[#F0F4FF] mb-4">
          Recent Activity
        </h2>
        <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl divide-y divide-[#1A2440]">
          {[
            { tool: "SEO Analyzer", time: "2 hours ago", icon: TrendingUp },
            { tool: "Ad Copy Writer", time: "Yesterday, 3:41 PM", icon: Megaphone },
            { tool: "AI Content Generator", time: "Yesterday, 11:12 AM", icon: Cpu },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3.5">
              <div className="w-8 h-8 rounded-lg bg-[#0D1428] border border-[#1A2440] flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-[#00A8FF]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#F0F4FF]">{item.tool}</p>
              </div>
              <span className="text-xs text-[#4A5878] shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
