import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { ShieldCheck } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Admin | Growthency",
    template: "%s | Admin — Growthency",
  },
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const user = await currentUser()
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || ""

  // Admin check: compare against ADMIN_EMAIL env var
  // Once Convex is connected, replace with a role check from the database
  const adminEmail = process.env.ADMIN_EMAIL || ""
  const isAdmin = adminEmail
    ? userEmail === adminEmail
    : false

  if (!isAdmin) {
    redirect("/dashboard?error=unauthorized")
  }

  return (
    <div className="min-h-screen flex bg-[#050810]">
      <AdminSidebar />

      <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Admin top bar */}
        <div className="sticky top-0 z-30 flex items-center gap-2 px-6 py-3 bg-[#050810]/90 backdrop-blur border-b border-[#1A2440]">
          <ShieldCheck className="w-4 h-4 text-[#FF6B35]" />
          <span className="text-xs font-medium text-[#FF6B35]">Admin Mode</span>
          <span className="text-xs text-[#4A5878] ml-2">{userEmail}</span>
        </div>

        {/* Mobile top padding */}
        <div className="lg:hidden h-14" />

        <main className="p-6 lg:p-8 max-w-7xl mx-auto w-full flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
