import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Growthency",
    template: "%s | Dashboard — Growthency",
  },
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen flex bg-[#050810]">
      <DashboardSidebar />

      {/* Main content area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Top padding on mobile for the hamburger button */}
        <div className="lg:hidden h-14" />
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
