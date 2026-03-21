import { Mail, Filter } from "lucide-react"
import type { Metadata } from "next"
import type { Contact } from "@/types"

export const metadata: Metadata = {
  title: "Contacts",
}

const MOCK_CONTACTS: Contact[] = [
  {
    _id: "c1",
    name: "Alex Johnson",
    email: "alex@startupxyz.com",
    phone: "+1 (555) 234-5678",
    service: "Web App Development",
    budget: "$5k – $10k",
    message:
      "We need a full-stack web application for our marketplace. Looking to launch in Q2. The platform needs to handle payments, user profiles, and real-time notifications.",
    status: "new",
    createdAt: Date.now() - 600_000,
    updatedAt: Date.now() - 600_000,
  },
  {
    _id: "c2",
    name: "Maria García",
    email: "maria@brandco.io",
    service: "Digital Marketing",
    budget: "$1k – $5k",
    message:
      "Looking for help with our social media strategy and content calendar. We're a B2B SaaS in the HR space.",
    status: "new",
    createdAt: Date.now() - 7_200_000,
    updatedAt: Date.now() - 7_200_000,
  },
  {
    _id: "c3",
    name: "James Wu",
    email: "james@techfirm.dev",
    phone: "+1 (555) 876-4321",
    service: "AI Integration",
    budget: "$10k – $25k",
    message:
      "We want to integrate an AI-powered recommendation engine into our existing e-commerce platform. We use a Next.js frontend and Node.js API.",
    status: "in_progress",
    createdAt: Date.now() - 86_400_000,
    updatedAt: Date.now() - 50_000_000,
  },
  {
    _id: "c4",
    name: "Sarah Okonkwo",
    email: "sarah@saas.com",
    service: "Custom Software",
    budget: "$25k+",
    message:
      "We need a custom CRM system built from scratch tailored to our logistics business. Must integrate with our existing ERP.",
    status: "resolved",
    createdAt: Date.now() - 172_800_000,
    updatedAt: Date.now() - 100_000_000,
  },
  {
    _id: "c5",
    name: "Daniel Kim",
    email: "daniel@noreply123.xyz",
    service: "UI/UX Design",
    budget: "Not sure yet",
    message: "Buy cheap likes. Get followers. SEO backlinks.",
    status: "spam",
    createdAt: Date.now() - 200_000_000,
    updatedAt: Date.now() - 200_000_000,
  },
]

const STATUS_CONFIG = {
  new: { label: "New", color: "bg-[#0066FF]/10 text-[#00A8FF] border-[#0066FF]/20" },
  in_progress: { label: "In Progress", color: "bg-[#FFB300]/10 text-[#FFB300] border-[#FFB300]/20" },
  resolved: { label: "Resolved", color: "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20" },
  spam: { label: "Spam", color: "bg-[#FF1744]/10 text-[#FF1744] border-[#FF1744]/20" },
}

function formatTime(ms: number) {
  const diff = Date.now() - ms
  const mins = Math.floor(diff / 60_000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(diff / 3_600_000)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(diff / 86_400_000)}d ago`
}

export default function ContactsPage() {
  const counts = {
    all: MOCK_CONTACTS.length,
    new: MOCK_CONTACTS.filter((c) => c.status === "new").length,
    in_progress: MOCK_CONTACTS.filter((c) => c.status === "in_progress").length,
    resolved: MOCK_CONTACTS.filter((c) => c.status === "resolved").length,
    spam: MOCK_CONTACTS.filter((c) => c.status === "spam").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl text-[#F0F4FF] mb-1">
          Contacts
        </h1>
        <p className="text-[#8899BB] text-sm">
          {counts.new} new · {counts.in_progress} in progress · {counts.resolved} resolved
        </p>
      </div>

      {/* Status filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-[#4A5878] mr-1">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </div>
        {(["all", "new", "in_progress", "resolved", "spam"] as const).map((status) => (
          <button
            key={status}
            type="button"
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              status === "all"
                ? "bg-[#0066FF]/10 text-[#00A8FF] border-[#0066FF]/20"
                : "bg-[#0A0F1E] border-[#1A2440] text-[#8899BB] hover:border-[#00A8FF] hover:text-[#00A8FF]"
            }`}
          >
            {status === "all" ? "All" : status.replace("_", " ")}
            <span className="ml-1.5 opacity-60">
              {status === "all" ? counts.all : counts[status]}
            </span>
          </button>
        ))}
      </div>

      {/* Contacts list */}
      <div className="space-y-3">
        {MOCK_CONTACTS.map((contact) => {
          const cfg = STATUS_CONFIG[contact.status]
          return (
            <div
              key={contact._id}
              className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-5 hover:border-[#0066FF]/30 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066FF]/20 to-[#00FFD1]/10 border border-[#0066FF]/20 flex items-center justify-center shrink-0 text-sm font-bold text-[#00A8FF]">
                    {contact.name[0]}
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-syne)] font-extrabold text-sm text-[#F0F4FF]">
                      {contact.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Mail className="w-3 h-3 text-[#4A5878]" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-xs text-[#8899BB] hover:text-[#00A8FF] transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-xs border ${cfg.color}`}>
                    {cfg.label}
                  </span>
                  <span className="text-xs text-[#4A5878]">
                    {formatTime(contact.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {contact.service && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-[#0D1428] border border-[#1A2440] text-[#8899BB]">
                    {contact.service}
                  </span>
                )}
                {contact.budget && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-[#0D1428] border border-[#1A2440] text-[#8899BB]">
                    {contact.budget}
                  </span>
                )}
                {contact.phone && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-[#0D1428] border border-[#1A2440] text-[#8899BB]">
                    {contact.phone}
                  </span>
                )}
              </div>

              <p className="text-sm text-[#8899BB] leading-relaxed line-clamp-2">
                {contact.message}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#1A2440]">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-1.5 h-7 px-3 text-xs font-medium text-[#00A8FF] border border-[#0066FF]/20 rounded-lg hover:bg-[#0066FF]/10 transition-all"
                >
                  <Mail className="w-3 h-3" />
                  Reply
                </a>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 h-7 px-3 text-xs font-medium text-[#8899BB] border border-[#1A2440] rounded-lg hover:border-[#00A8FF] hover:text-[#00A8FF] transition-all"
                >
                  Mark as In Progress
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 h-7 px-3 text-xs font-medium text-[#8899BB] border border-[#1A2440] rounded-lg hover:border-[#00E676] hover:text-[#00E676] transition-all"
                >
                  Resolve
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
