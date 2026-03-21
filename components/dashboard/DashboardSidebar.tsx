"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { useState } from "react"
import {
  LayoutDashboard,
  Wrench,
  CreditCard,
  User,
  ArrowLeft,
  Menu,
  X,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Tools", href: "/dashboard/tools", icon: Wrench },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#1A2440]">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          onClick={onClose}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00FFD1] flex items-center justify-center shadow-[0_0_16px_rgba(0,102,255,0.4)]">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-[family-name:var(--font-syne)] font-extrabold text-lg text-[#F0F4FF]">
            Growthency
          </span>
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
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-[#0066FF]/20 to-[#00FFD1]/10 text-[#00A8FF] border border-[#0066FF]/30 shadow-[0_0_12px_rgba(0,102,255,0.15)]"
                  : "text-[#8899BB] hover:text-[#F0F4FF] hover:bg-[#0D1428]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  isActive ? "text-[#00A8FF]" : "text-[#4A5878]"
                )}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-[#1A2440] space-y-2">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium text-[#8899BB] hover:text-[#F0F4FF] hover:bg-[#0D1428] transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 shrink-0 text-[#4A5878]" />
          Back to Site
        </Link>
        <div className="flex items-center gap-3 px-3 py-2">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
          <span className="text-sm text-[#8899BB]">Account</span>
        </div>
      </div>
    </div>
  )
}

export function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle button */}
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
