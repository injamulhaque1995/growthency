export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://growthency.com"
export const SITE_NAME = "Growthency"
export const SITE_TAGLINE = "We Build. We Scale. We Grow."
export const SITE_DESCRIPTION =
  "Growthency helps new businesses launch from zero and existing businesses break through their growth ceiling — using modern software, AI tools, and proven digital strategy."

/* ─────────────────────────────────────────
   SUBSCRIPTION PLANS
───────────────────────────────────────── */

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    toolUsagePerDay: 3,
  },
  MONTHLY: {
    name: "Pro Monthly",
    price: 9,
    toolUsagePerDay: Infinity,
    // Price IDs are NEXT_PUBLIC_ — safe to expose (not secrets)
    stripeId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
  },
  YEARLY: {
    name: "Pro Yearly",
    price: 79,
    toolUsagePerDay: Infinity,
    stripeId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
  },
  LIFETIME: {
    name: "Lifetime",
    price: 189,
    toolUsagePerDay: Infinity,
    stripeId: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID,
  },
} as const

export const TOOL_LIMITS = {
  free: 3,
  pro: Infinity,
} as const

/* ─────────────────────────────────────────
   SERVICES
───────────────────────────────────────── */

export const SERVICES = [
  {
    slug: "web-app-development",
    name: "Web App Development",
    icon: "Globe",
    description:
      "Full-stack web applications built with modern frameworks and scalable architecture.",
    tagline: "From concept to deployment",
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    icon: "Smartphone",
    description:
      "Native and cross-platform mobile apps for iOS and Android with Flutter or React Native.",
    tagline: "iOS & Android, one codebase",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    icon: "Megaphone",
    description:
      "SEO, social media, content strategy, paid ads, and video editing to grow your audience.",
    tagline: "Grow your online presence",
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    icon: "Palette",
    description: "Beautiful, intuitive interfaces that convert visitors into customers.",
    tagline: "Design that converts",
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    icon: "Code",
    description:
      "Bespoke software solutions tailored precisely to your business workflows.",
    tagline: "Built exactly for you",
  },
  {
    slug: "ai-integration",
    name: "AI Integration",
    icon: "Cpu",
    description:
      "Integrate cutting-edge AI and machine learning into your existing products.",
    tagline: "Powered by intelligence",
  },
  {
    slug: "automations",
    name: "Automations",
    icon: "Zap",
    description:
      "Eliminate repetitive tasks with smart automations, saving you hours every week.",
    tagline: "Work smarter, not harder",
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    icon: "Share2",
    description: "Full-service social media management — content creation, scheduling, community management, and growth strategy across all major platforms.",
    tagline: "Grow your social presence",
  },
  {
    slug: "video-editing",
    name: "Video Editing",
    icon: "Video",
    description: "Professional video editing for ads, reels, YouTube, and corporate content — hooks, captions, color grading, and motion graphics included.",
    tagline: "Stories that convert",
  },
  {
    slug: "paid-ads",
    name: "Paid Ads",
    icon: "TrendingUp",
    description: "High-ROI paid advertising campaigns on Google, Meta, TikTok, and LinkedIn — from strategy and creative to optimization and reporting.",
    tagline: "Ads that deliver ROI",
  },
] as const

/* ─────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────── */

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const

/* ─────────────────────────────────────────
   SOCIAL LINKS
───────────────────────────────────────── */

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/growthency",
  linkedin: "https://linkedin.com/company/growthency",
  instagram: "https://instagram.com/growthency",
  tiktok: "https://tiktok.com/@growthency",
  youtube: "https://youtube.com/@growthency",
} as const

/* ─────────────────────────────────────────
   MISC
───────────────────────────────────────── */

export const DEFAULT_PAGE_SIZE = 9

export const BLOG_CATEGORIES = [
  "All",
  "Growth",
  "Development",
  "Design",
  "Marketing",
  "AI",
  "Startups",
] as const

export const CONTACT_BUDGET_OPTIONS = [
  "Under $1k",
  "$1k – $5k",
  "$5k – $10k",
  "$10k – $25k",
  "$25k+",
  "Not sure yet",
] as const

export const CONTACT_SERVICE_OPTIONS = SERVICES.map((s) => s.name)
