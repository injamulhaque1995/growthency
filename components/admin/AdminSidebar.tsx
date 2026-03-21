"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  FileText,
  Wrench,
  Users,
  MessageSquare,
  ArrowLeft,
  Menu,
  X,
  Zap,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Posts", href: "/admin/posts", icon: FileText },
  { label: "Tools", href: "/admin/tools", icon: Wrench },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Contacts", href: "/admin/contacts", icon: MessageSquare },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Logo + badge */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#1A2440]">
        <Link
          href="/admin"
          className="flex items-center gap-2 group"
          onClick={onClose}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF1744] to-[#FF6B35] flex items-center justify-center shadow-[0_0_16px_rgba(255,23,68,0.35)]">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[#F0F4FF]">
              Growthency
            </span>
            <div className="flex items-center gap-1 -mt-0.5">
              <ShieldCheck className="w-3 h-3 text-[#FF6B35]" />
              <span className="text-[10px] text-[#FF6B35] font-medium">Admin Panel</span>
            </div>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="text-[#4A5878] hover:text-[#F0F4FF] transition-colors p-1 rounded-md hover:bg-[#0D1428] lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, href, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-[#FF1744]/15 to-[#FF6B35]/10 text-[#FF6B35] border border-[#FF1744]/25 shadow-[0_0_12px_rgba(255,23,68,0.1)]"
                  : "text-[#8899BB] hover:text-[#F0F4FF] hover:bg-[#0D1428]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  isActive ? "text-[#FF6B35]" : "text-[#4A5878]"
                )}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-[#1A2440] space-y-1">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-[#8899BB] hover:text-[#F0F4FF] hover:bg-[#0D1428] transition-all duration-200"
        >
          <LayoutDashboard className="w-4 h-4 shrink-0 text-[#4A5878]" />
          User Dashboard
        </Link>
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-[#8899BB] hover:text-[#F0F4FF] hover:bg-[#0D1428] transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 shrink-0 text-[#4A5878]" />
          Back to Site
        </Link>
      </div>
    </div>
  )
}

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#0A0F1E] border border-[#1A2440] text-[#8899BB] hover:text-[#F0F4FF] transition-colors shadow-lg"
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[#0A0F1E] border-r border-[#1A2440] transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-[#0A0F1E] border-r border-[#1A2440]">
        <SidebarContent />
      </aside>
    </>
  )
}
