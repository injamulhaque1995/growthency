import { mutation } from "./_generated/server"
import { v } from "convex/values"

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC MUTATION: subscribe an email address to the newsletter
// - Validates the email format
// - Checks for duplicates (reactivates if previously unsubscribed)
// - Prevents adding already-active subscribers
// ─────────────────────────────────────────────────────────────────────────────
export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, { email, source }) => {
    const normalised = email.trim().toLowerCase()

    // Basic format validation
    if (!normalised || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalised)) {
      throw new Error("Invalid email address")
    }

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", normalised))
      .first()

    if (existing) {
      if (existing.status === "active") {
        // Already subscribed — surface a friendly message, not an error
        return { alreadySubscribed: true, id: existing._id }
      }

      if (existing.status === "unsubscribed") {
        // Re-activate the subscriber
        await ctx.db.patch(existing._id, {
          status: "active",
          unsubscribedAt: undefined,
          source: source ?? existing.source,
          subscribedAt: Date.now(),
        })
        return { alreadySubscribed: false, id: existing._id }
      }

      // "bounced" — update source/status and try again
      await ctx.db.patch(existing._id, {
        status: "active",
        source: source ?? existing.source,
        subscribedAt: Date.now(),
      })
      return { alreadySubscribed: false, id: existing._id }
    }

    // New subscriber
    const id = await ctx.db.insert("subscribers", {
      email: normalised,
      status: "active",
      tags: [],
      source,
      subscribedAt: Date.now(),
    })

    return { alreadySubscribed: false, id }
  },
})
