import Link from "next/link"
import {
  FileText,
  MessageSquare,
  Wrench,
  Users,
  TrendingUp,
  ArrowRight,
  Plus,
  Clock,
  Mail,
  BarChart3,
} from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
}

const STATS = [
  {
    label: "Total Posts",
    value: "24",
    change: "+3 this month",
    icon: FileText,
    color: "from-[#0066FF] to-[#00A8FF]",
    href: "/admin/posts",
  },
  {
    label: "New Contacts",
    value: "12",
    change: "+5 this week",
    icon: MessageSquare,
    color: "from-[#6C3FFF] to-[#00FFD1]",
    href: "/admin/contacts",
  },
  {
    label: "Active Tools",
    value: "8",
    change: "2 coming soon",
    icon: Wrench,
    color: "from-[#FF6B35] to-[#FFB300]",
    href: "/admin/tools",
  },
  {
    label: "Team Members",
    value: "6",
    change: "1 pending invite",
    icon: Users,
    color: "from-[#00E676] to-[#00A8FF]",
    href: "/admin/team",
  },
]

const RECENT_CONTACTS = [
  {
    name: "Alex Johnson",
    email: "alex@startupxyz.com",
    service: "Web App Development",
    budget: "$5k – $10k",
    status: "new" as const,
    time: "10 min ago",
  },
  {
    name: "Maria García",
    email: "maria@brandco.io",
    service: "Digital Marketing",
    budget: "$1k – $5k",
    status: "new" as const,
    time: "2 hours ago",
  },
  {
    name: "James Wu",
    email: "james@techfirm.dev",
    service: "AI Integration",
    budget: "$10k – $25k",
    status: "in_progress" as const,
    time: "Yesterday",
  },
  {
    name: "Sarah Okonkwo",
    email: "sarah@saas.com",
    service: "Custom Software",
    budget: "$25k+",
    status: "resolved" as const,
    time: "2 days ago",
  },
]

const STATUS_STYLES = {
  new: "bg-[#0066FF]/10 text-[#00A8FF] border-[#0066FF]/20",
  in_progress: "bg-[#FFB300]/10 text-[#FFB300] border-[#FFB300]/20",
  resolved: "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20",
  spam: "bg-[#FF1744]/10 text-[#FF1744] border-[#FF1744]/20",
}

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl text-[#F0F4FF] mb-1">
          Admin Dashboard
        </h1>
        <p className="text-[#8899BB] text-sm">
          Overview of Growthency platform activity.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-5 hover:border-[#0066FF]/40 hover:shadow-[0_0_20px_rgba(0,102,255,0.08)] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-[0_0_12px_rgba(0,102,255,0.25)]`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#4A5878] group-hover:text-[#00A8FF] transition-colors" />
            </div>
            <p className="font-[family-name:var(--font-syne)] font-extrabold text-2xl text-[#F0F4FF] mb-0.5">
              {stat.value}
            </p>
            <p className="text-xs text-[#4A5878] font-medium uppercase tracking-wide">
              {stat.label}
            </p>
            <p className="text-xs text-[#8899BB] mt-1">{stat.change}</p>
          </Link>
        ))}
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent contacts — wider */}
        <div className="lg:col-span-2 bg-[#0A0F1E] border border-[#1A2440] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2440]">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#00A8FF]" />
              <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[#F0F4FF]">
                Recent Contacts
              </h2>
            </div>
            <Link
              href="/admin/contacts"
              className="flex items-center gap-1 text-xs text-[#00A8FF] hover:text-[#00E5FF] transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-[#1A2440]">
            {RECENT_CONTACTS.map((contact, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-[#0D1428] transition-colors">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0066FF]/20 to-[#00FFD1]/10 border border-[#0066FF]/20 flex items-center justify-center shrink-0 text-sm font-bold text-[#00A8FF]">
                  {contact.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#F0F4FF] truncate">{contact.name}</p>
                  <p className="text-xs text-[#4A5878] truncate">{contact.email}</p>
                </div>
                <div className="hidden sm:block text-right shrink-0">
                  <p className="text-xs text-[#8899BB]">{contact.service}</p>
                  <p className="text-xs text-[#4A5878]">{contact.budget}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs border ${STATUS_STYLES[contact.status]}`}
                  >
                    {contact.status.replace("_", " ")}
                  </span>
                  <span className="text-[10px] text-[#4A5878]">{contact.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-5">
            <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[#F0F4FF] mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              {[
                { label: "New Blog Post", href: "/admin/posts/new", icon: Plus },
                { label: "View Contacts", href: "/admin/contacts", icon: Mail },
                { label: "Manage Team", href: "/admin/team", icon: Users },
                { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm text-[#8899BB] hover:text-[#F0F4FF] hover:bg-[#0D1428] transition-all duration-200"
                >
                  <action.icon className="w-4 h-4 shrink-0 text-[#4A5878]" />
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-[#00A8FF]" />
              <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-sm text-[#F0F4FF]">
                Recent Activity
              </h2>
            </div>
            <div className="space-y-3">
              {[
                { text: "Post published: '5 Growth Hacks'", time: "1h ago" },
                { text: "New contact from james@techfirm.dev", time: "2h ago" },
                { text: "Team member added: Priya Singh", time: "Yesterday" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <TrendingUp className="w-3 h-3 text-[#00A8FF] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-[#8899BB]">{item.text}</p>
                    <p className="text-[10px] text-[#4A5878]">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
