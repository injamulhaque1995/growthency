import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

// ─────────────────────────────────────────────────────────────────────────────
// Get user by Clerk ID — used internally by other Convex functions
// ─────────────────────────────────────────────────────────────────────────────
export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first()
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// Get current authenticated user — reads own data only
// ─────────────────────────────────────────────────────────────────────────────
export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null
    return ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first()
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// Create user — called from Clerk webhook on user.created
// Idempotent: returns existing _id if user already exists
// ─────────────────────────────────────────────────────────────────────────────
export const create = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Guard against duplicate inserts (webhook retries, etc.)
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first()

    if (existing) return existing._id

    return ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      avatarUrl: args.avatarUrl,
      role: "user",
      plan: "free",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// Update user profile — called from Clerk webhook on user.updated
// ─────────────────────────────────────────────────────────────────────────────
export const update = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first()

    if (!user) throw new Error(`User not found: ${args.clerkId}`)

    await ctx.db.patch(user._id, {
      email: args.email,
      name: args.name,
      avatarUrl: args.avatarUrl,
      updatedAt: Date.now(),
    })

    return user._id
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// Delete user by Clerk ID — called from Clerk webhook on user.deleted
// ─────────────────────────────────────────────────────────────────────────────
export const deleteByClerkId = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first()

    if (!user) return null // already gone, nothing to do

    await ctx.db.delete(user._id)
    return user._id
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// Update plan — called from Stripe webhook
// ─────────────────────────────────────────────────────────────────────────────
export const updatePlan = mutation({
  args: {
    clerkId: v.string(),
    plan: v.union(
      v.literal("free"),
      v.literal("monthly"),
      v.literal("yearly"),
      v.literal("lifetime")
    ),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    subscriptionStatus: v.optional(v.string()),
    currentPeriodEnd: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { clerkId, ...patch } = args

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first()

    if (!user) throw new Error(`User not found: ${clerkId}`)

    // Only persist fields that were actually provided
    const update: Record<string, unknown> = { updatedAt: Date.now() }
    if (patch.plan !== undefined) update.plan = patch.plan
    if (patch.stripeCustomerId !== undefined) update.stripeCustomerId = patch.stripeCustomerId
    if (patch.stripeSubscriptionId !== undefined) update.stripeSubscriptionId = patch.stripeSubscriptionId
    if (patch.subscriptionStatus !== undefined) update.subscriptionStatus = patch.subscriptionStatus
    if (patch.currentPeriodEnd !== undefined) update.currentPeriodEnd = patch.currentPeriodEnd

    await ctx.db.patch(user._id, update)
    return user._id
  },
})
