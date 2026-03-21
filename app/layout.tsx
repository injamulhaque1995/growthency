import type { Metadata, Viewport } from "next"
import { Syne, DM_Sans, JetBrains_Mono, Bebas_Neue } from "next/font/google"
import { ClerkSafeProvider } from "@/components/providers/ClerkSafeProvider"
import { ThemeProvider } from "next-themes"
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants"
import "@/styles/globals.css"

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */

const syne = Syne({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-syne",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
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
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${bebasNeue.variable}`}
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
