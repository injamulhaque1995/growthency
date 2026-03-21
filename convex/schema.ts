import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  /* ─────────────────────────────────────────
     USERS
  ───────────────────────────────────────── */
  users: defineTable({
    /** Clerk user ID — primary external identifier */
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
    /** "user" | "admin" | "superadmin" */
    role: v.union(v.literal("user"), v.literal("admin"), v.literal("superadmin")),
    /** "free" | "monthly" | "yearly" | "lifetime" */
    plan: v.union(
      v.literal("free"),
      v.literal("monthly"),
      v.literal("yearly"),
      v.literal("lifetime"),
    ),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    /**
     * Stripe subscription status:
     * "active" | "canceled" | "past_due" | "trialing" | "incomplete" | "paused"
     */
    subscriptionStatus: v.optional(v.string()),
    /** Unix timestamp (ms) for current billing period end */
    currentPeriodEnd: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_stripeCustomerId", ["stripeCustomerId"])
    .index("by_plan", ["plan"]),

  /* ─────────────────────────────────────────
     TOOL USAGE
  ───────────────────────────────────────── */
  toolUsage: defineTable({
    /** Convex users table ID */
    userId: v.id("users"),
    toolSlug: v.string(),
    /** ISO date: YYYY-MM-DD */
    date: v.string(),
    usageCount: v.number(),
    lastUsedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_toolSlug_date", ["userId", "toolSlug", "date"])
    .index("by_toolSlug", ["toolSlug"])
    .index("by_date", ["date"]),

  /* ─────────────────────────────────────────
     BLOG POSTS
  ───────────────────────────────────────── */
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    /** Convex storage ID for cover image */
    coverImageStorageId: v.optional(v.id("_storage")),
    authorName: v.string(),
    authorAvatarUrl: v.optional(v.string()),
    /** Clerk ID of the author */
    authorClerkId: v.optional(v.string()),
    category: v.string(),
    tags: v.array(v.string()),
    published: v.boolean(),
    featured: v.boolean(),
    views: v.number(),
    readTimeMinutes: v.number(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published"])
    .index("by_featured", ["featured"])
    .index("by_category", ["category"])
    .index("by_publishedAt", ["publishedAt"])
    .searchIndex("search_posts", {
      searchField: "title",
      filterFields: ["published", "category", "featured"],
    }),

  /* ─────────────────────────────────────────
     TOOLS
  ───────────────────────────────────────── */
  tools: defineTable({
    slug: v.string(),
    name: v.string(),
    description: v.string(),
    longDescription: v.optional(v.string()),
    icon: v.string(),
    /**
     * "SEO" | "Marketing" | "Development" | "Design" |
     * "AI" | "Business" | "Analytics" | "Productivity"
     */
    category: v.string(),
    /** "free" | "pro" */
    accessLevel: v.union(v.literal("free"), v.literal("pro")),
    isActive: v.boolean(),
    totalUsageCount: v.number(),
    tags: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_accessLevel", ["accessLevel"])
    .index("by_isActive", ["isActive"]),

  /* ─────────────────────────────────────────
     CONTACT SUBMISSIONS
  ───────────────────────────────────────── */
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    service: v.optional(v.string()),
    budget: v.optional(v.string()),
    message: v.string(),
    /** "new" | "in_progress" | "resolved" | "spam" */
    status: v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("resolved"),
      v.literal("spam"),
    ),
    ipAddress: v.optional(v.string()),
    /** Clerk user ID if the submitter was signed in */
    userId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  /* ─────────────────────────────────────────
     TEAM
  ───────────────────────────────────────── */
  team: defineTable({
    name: v.string(),
    role: v.string(),
    bio: v.string(),
    avatarUrl: v.optional(v.string()),
    avatarStorageId: v.optional(v.id("_storage")),
    linkedinUrl: v.optional(v.string()),
    twitterUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    /** Display order on the About page */
    order: v.number(),
    isActive: v.boolean(),
    joinedAt: v.number(),
  })
    .index("by_order", ["order"])
    .index("by_isActive", ["isActive"]),

  /* ─────────────────────────────────────────
     TESTIMONIALS
  ───────────────────────────────────────── */
  testimonials: defineTable({
    authorName: v.string(),
    authorRole: v.string(),
    authorCompany: v.optional(v.string()),
    authorAvatarUrl: v.optional(v.string()),
    content: v.string(),
    /** 1–5 */
    rating: v.number(),
    serviceSlug: v.optional(v.string()),
    isFeatured: v.boolean(),
    isVisible: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_isFeatured", ["isFeatured"])
    .index("by_isVisible", ["isVisible"])
    .index("by_serviceSlug", ["serviceSlug"]),

  /* ─────────────────────────────────────────
     NEWSLETTER SUBSCRIBERS
  ───────────────────────────────────────── */
  subscribers: defineTable({
    email: v.string(),
    /** "active" | "unsubscribed" | "bounced" */
    status: v.union(
      v.literal("active"),
      v.literal("unsubscribed"),
      v.literal("bounced"),
    ),
    tags: v.array(v.string()),
    /** Source: "footer", "blog", "popup", etc. */
    source: v.optional(v.string()),
    subscribedAt: v.number(),
    unsubscribedAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"]),
})
