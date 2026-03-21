import { query } from "./_generated/server"

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC QUERY: get all active (visible) testimonials ordered by orderIndex
// The schema stores isVisible and isFeatured — we order featured ones first,
// then by createdAt desc as a secondary sort.
// ─────────────────────────────────────────────────────────────────────────────
export const getActive = query({
  handler: async (ctx) => {
    const visible = await ctx.db
      .query("testimonials")
      .withIndex("by_isVisible", (q) => q.eq("isVisible", true))
      .order("desc")
      .collect()

    // Sort: featured first, then by createdAt descending
    return visible.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1
      if (!a.isFeatured && b.isFeatured) return 1
      return b.createdAt - a.createdAt
    })
  },
})
