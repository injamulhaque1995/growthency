import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

// ISO date string for "today" in UTC: YYYY-MM-DD
function todayUTC(): string {
  return new Date().toISOString().slice(0, 10)
}

// ─────────────────────────────────────────────────────────────────────────────
// Get today's usage count for a specific tool for the authenticated user
// ─────────────────────────────────────────────────────────────────────────────
export const getTodayUsage = query({
  args: { toolSlug: v.string() },
  handler: async (ctx, { toolSlug }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!user) return null

    const today = todayUTC()

    const record = await ctx.db
      .query("toolUsage")
      .withIndex("by_userId_toolSlug_date", (q) =>
        q.eq("userId", user._id).eq("toolSlug", toolSlug).eq("date", today)
      )
      .first()

    return record?.usageCount ?? 0
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// Increment (or create) usage record for a tool for today
// Returns the new usage count
// ─────────────────────────────────────────────────────────────────────────────
export const incrementUsage = mutation({
  args: { toolSlug: v.string() },
  handler: async (ctx, { toolSlug }) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized: not authenticated")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!user) throw new Error("User not found in database")

    const today = todayUTC()
    const now = Date.now()

    const existing = await ctx.db
      .query("toolUsage")
      .withIndex("by_userId_toolSlug_date", (q) =>
        q.eq("userId", user._id).eq("toolSlug", toolSlug).eq("date", today)
      )
      .first()

    if (existing) {
      const newCount = existing.usageCount + 1
      await ctx.db.patch(existing._id, {
        usageCount: newCount,
        lastUsedAt: now,
      })
      return newCount
    } else {
      await ctx.db.insert("toolUsage", {
        userId: user._id,
        toolSlug,
        date: today,
        usageCount: 1,
        lastUsedAt: now,
      })
      return 1
    }
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// Get all usage history for the authenticated user
// ─────────────────────────────────────────────────────────────────────────────
export const getUserUsageHistory = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first()

    if (!user) return null

    return ctx.db
      .query("toolUsage")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect()
  },
})
