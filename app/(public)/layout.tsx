import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ScrollToTop } from "@/components/layout/ScrollToTop"

export const metadata: Metadata = {
  // Individual pages override this via their own exported metadata
}

/**
 * Public layout wraps all marketing / public-facing pages with the
 * site-wide Navbar and Footer. Authenticated app routes (dashboard,
 * admin) use their own separate layouts and are not wrapped here.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
