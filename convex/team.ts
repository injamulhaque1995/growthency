import { query } from "./_generated/server"

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC QUERY: get all active team members ordered by `order` ascending
// ─────────────────────────────────────────────────────────────────────────────
export const getActive = query({
  handler: async (ctx) => {
    const members = await ctx.db
      .query("team")
      .withIndex("by_isActive", (q) => q.eq("isActive", true))
      .collect()

    // Sort by display order ascending
    return members.sort((a, b) => a.order - b.order)
  },
})
