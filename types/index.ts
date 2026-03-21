/* ─────────────────────────────────────────
   BLOG / CONTENT
───────────────────────────────────────── */

export interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  /** Convex storage ID or external URL */
  coverImageStorageId?: string
  author: {
    name: string
    avatarUrl?: string
    clerkId?: string
  }
  category: string
  tags: string[]
  published: boolean
  featured: boolean
  views: number
  readTimeMinutes: number
  publishedAt?: number
  createdAt: number
  updatedAt: number
}

/* ─────────────────────────────────────────
   TOOLS
───────────────────────────────────────── */

export type ToolCategory =
  | "SEO"
  | "Marketing"
  | "Development"
  | "Design"
  | "AI"
  | "Business"
  | "Analytics"
  | "Productivity"

export type ToolAccessLevel = "free" | "pro"

export interface Tool {
  _id: string
  slug: string
  name: string
  description: string
  longDescription?: string
  icon: string
  category: ToolCategory
  accessLevel: ToolAccessLevel
  /** Whether the tool is live and visible */
  isActive: boolean
  /** Number of times this tool has been used across all users */
  totalUsageCount: number
  /** Relative URL path: /tools/[slug] */
  path: string
  tags: string[]
  createdAt: number
  updatedAt: number
}

/* ─────────────────────────────────────────
   TEAM
───────────────────────────────────────── */

export type TeamRole =
  | "Founder"
  | "Co-Founder"
  | "CTO"
  | "CEO"
  | "Lead Developer"
  | "Designer"
  | "Marketer"
  | "Developer"
  | "Intern"

export interface TeamMember {
  _id: string
  name: string
  role: TeamRole | string
  bio: string
  avatarUrl?: string
  /** Convex storage ID */
  avatarStorageId?: string
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
  }
  /** Display order on the About page */
  order: number
  isActive: boolean
  joinedAt: number
}

/* ─────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────── */

export interface Testimonial {
  _id: string
  authorName: string
  authorRole: string
  authorCompany?: string
  authorAvatarUrl?: string
  content: string
  /** 1–5 */
  rating: 1 | 2 | 3 | 4 | 5
  /** Which service this relates to, if any */
  serviceSlug?: string
  isFeatured: boolean
  isVisible: boolean
  createdAt: number
}

/* ─────────────────────────────────────────
   CONTACT SUBMISSIONS
───────────────────────────────────────── */

export type ContactStatus = "new" | "in_progress" | "resolved" | "spam"

export interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
  service?: string
  budget?: string
  message: string
  status: ContactStatus
  /** IP address for spam detection (optional) */
  ipAddress?: string
  /** Clerk user ID if the submitter was signed in */
  userId?: string
  createdAt: number
  updatedAt: number
}

/* ─────────────────────────────────────────
   NEWSLETTER SUBSCRIBERS
───────────────────────────────────────── */

export type SubscriberStatus = "active" | "unsubscribed" | "bounced"

export interface Subscriber {
  _id: string
  email: string
  status: SubscriberStatus
  /** Tags for segmentation */
  tags: string[]
  /** Source: "footer", "blog", "popup", etc. */
  source?: string
  subscribedAt: number
  unsubscribedAt?: number
}

/* ─────────────────────────────────────────
   USER / AUTH / BILLING
───────────────────────────────────────── */

export type UserRole = "user" | "admin" | "superadmin"
export type PlanType = "free" | "monthly" | "yearly" | "lifetime"
export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing"
  | "incomplete"
  | "paused"
  | null

export interface UserPlan {
  _id: string
  clerkId: string
  email: string
  name: string
  avatarUrl?: string
  role: UserRole
  plan: PlanType
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  subscriptionStatus: SubscriptionStatus
  /** Unix timestamp (ms) for when the current billing period ends */
  currentPeriodEnd?: number
  createdAt: number
  updatedAt: number
}

/* ─────────────────────────────────────────
   TOOL USAGE TRACKING
───────────────────────────────────────── */

export interface ToolUsage {
  _id: string
  /** Convex user document ID */
  userId: string
  toolSlug: string
  /** ISO date string: YYYY-MM-DD */
  date: string
  usageCount: number
  lastUsedAt: number
}

/* ─────────────────────────────────────────
   API RESPONSE HELPERS
───────────────────────────────────────── */

export interface ApiSuccess<T = unknown> {
  success: true
  data: T
  message?: string
}

export interface ApiError {
  success: false
  error: string
  code?: string
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError

/* ─────────────────────────────────────────
   MISC / SHARED
───────────────────────────────────────── */

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export type ServiceSlug =
  | "web-app-development"
  | "mobile-app-development"
  | "digital-marketing"
  | "ui-ux-design"
  | "custom-software"
  | "ai-integration"
  | "automations"
