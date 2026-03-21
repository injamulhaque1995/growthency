import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
async function requireAdmin(ctx: { auth: { getUserIdentity: () => Promise<{ subject: string } | null>; }; db: { query: (table: string) => { withIndex: (index: string, q: (q: { eq: (field: string, value: string) => unknown }) => unknown) => { first: () => Promise<{ role: string } | null> } } } }) {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) throw new Error("Unauthorized: not authenticated")

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q: { eq: (field: string, value: string) => unknown }) => q.eq("clerkId", identity.subject))
    .first()

  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    throw new Error("Unauthorized: admin access required")
  }

  return user
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC QUERIES
// ─────────────────────────────────────────────────────────────────────────────

// All published posts ordered by publishedAt descending
export const getPublished = query({
  handler: async (ctx) => {
    return ctx.db
      .query("posts")
      .withIndex("by_published", (q) => q.eq("published", true))
      .order("desc")
      .collect()
  },
})

// Single post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first()
  },
})

// 3 latest published posts (for home page / sidebar)
export const getFeatured = query({
  handler: async (ctx) => {
    return ctx.db
      .query("posts")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("desc")
      .take(3)
  },
})

// Full-text search across post titles (published only)
export const search = query({
  args: {
    searchQuery: v.string(),
    category: v.optional(v.string()),
  },
  handler: async (ctx, { searchQuery, category }) => {
    if (!searchQuery.trim()) return []

    return ctx.db
      .query("posts")
      .withSearchIndex("search_posts", (q) => {
        let builder = q.search("title", searchQuery).eq("published", true)
        if (category) {
          builder = builder.eq("category", category)
        }
        return builder
      })
      .take(20)
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN MUTATIONS
// ─────────────────────────────────────────────────────────────────────────────

// Create a new blog post (draft by default)
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    coverImageStorageId: v.optional(v.id("_storage")),
    authorName: v.string(),
    authorAvatarUrl: v.optional(v.string()),
    authorClerkId: v.optional(v.string()),
    category: v.string(),
    tags: v.array(v.string()),
    featured: v.boolean(),
    readTimeMinutes: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx as Parameters<typeof requireAdmin>[0])

    // Ensure slug is unique
    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first()

    if (existing) throw new Error(`A post with slug "${args.slug}" already exists`)

    return ctx.db.insert("posts", {
      ...args,
      published: false,
      views: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  },
})

// Update an existing post
export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    coverImageStorageId: v.optional(v.id("_storage")),
    authorName: v.optional(v.string()),
    authorAvatarUrl: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    featured: v.optional(v.boolean()),
    readTimeMinutes: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...fields }) => {
    await requireAdmin(ctx as Parameters<typeof requireAdmin>[0])

    const post = await ctx.db.get(id)
    if (!post) throw new Error("Post not found")

    // If updating slug, check uniqueness
    if (fields.slug && fields.slug !== post.slug) {
      const slugConflict = await ctx.db
        .query("posts")
        .withIndex("by_slug", (q) => q.eq("slug", fields.slug!))
        .first()
      if (slugConflict) throw new Error(`A post with slug "${fields.slug}" already exists`)
    }

    const patch: Record<string, unknown> = { updatedAt: Date.now() }
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) patch[key] = value
    }

    await ctx.db.patch(id, patch)
    return id
  },
})

// Publish a post (set published = true and record publishedAt)
export const publish = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx as Parameters<typeof requireAdmin>[0])

    const post = await ctx.db.get(id)
    if (!post) throw new Error("Post not found")

    await ctx.db.patch(id, {
      published: true,
      publishedAt: Date.now(),
      updatedAt: Date.now(),
    })

    return id
  },
})

// Delete a post permanently
export const deletePost = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, { id }) => {
    await requireAdmin(ctx as Parameters<typeof requireAdmin>[0])

    const post = await ctx.db.get(id)
    if (!post) throw new Error("Post not found")

    await ctx.db.delete(id)
    return id
  },
})
