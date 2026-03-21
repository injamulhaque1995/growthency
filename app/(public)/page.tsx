import type { Metadata } from "next"
import HeroSection from "@/components/home/HeroSection"
import StatsSection from "@/components/home/StatsSection"
import ServicesSection from "@/components/home/ServicesSection"
import ToolsTeaser from "@/components/home/ToolsTeaser"
import WhySection from "@/components/home/WhySection"
import BlogTeaser from "@/components/home/BlogTeaser"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import CTABanner from "@/components/home/CTABanner"
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants"

/* ── Page metadata ── */
export const metadata: Metadata = {
  title: `${SITE_NAME} — We Build. We Scale. We Grow.`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — We Build. We Scale. We Grow.`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: `${SITE_NAME} — We Build. We Scale. We Grow.`,
    description: SITE_DESCRIPTION,
  },
}

/* ── Page ── */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ToolsTeaser />
      <WhySection />
      <BlogTeaser />
      <TestimonialsSection />
      <CTABanner />
    </main>
  )
}
