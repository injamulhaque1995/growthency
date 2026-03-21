import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ClerkSafeProvider } from "@/components/providers/ClerkSafeProvider"
import { ThemeProvider } from "next-themes"
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants"
import "@/styles/globals.css"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
})

/* ─────────────────────────────────────────
   METADATA
───────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — We Build. We Scale. We Grow.`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "web development",
    "mobile app development",
    "digital marketing",
    "UI UX design",
    "AI integration",
    "business growth",
    "custom software",
    "automations",
    "Growthency",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — We Build. We Scale. We Grow.`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — We Build. We Scale. We Grow.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@growthency",
    creator: "@growthency",
    title: `${SITE_NAME} — We Build. We Scale. We Grow.`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F7FF" },
    { media: "(prefers-color-scheme: dark)", color: "#050810" },
  ],
  width: "device-width",
  initialScale: 1,
}

/* ─────────────────────────────────────────
   ROOT LAYOUT
───────────────────────────────────────── */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkSafeProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${inter.variable}`}
      >
        <body className="min-h-screen antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="growthency-theme"
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkSafeProvider>
  )
}
