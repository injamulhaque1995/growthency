import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

// ─────────────────────────────────────────────────────────────────────────────
// Helper — require admin role
// ─────────────────────────────────────────────────────────────────────────────
async function requireAdmin(ctx: {
  auth: { getUserIdentity: () => Promise<{ subject: string } | null> }
  db: {
    query: (table: string) => {
      withIndex: (
        index: string,
        q: (q: { eq: (field: string, value: string) => unknown }) => unknown
      ) => { first: () => Promise<{ role: string } | null> }
    }
  }
}) {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) throw new Error("Unauthorized: not authenticated")

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
    .first()

  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    throw new Error("Unauthorized: admin access required")
  }

  return user
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC MUTATION: create a contact submission (no auth required)
// ─────────────────────────────────────────────────────────────────────────────
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    service: v.optional(v.string()),
    budget: v.optional(v.string()),
    message: v.string(),
    userId: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Basic validation
    if (!args.name.trim()) throw new Error("Name is required")
    if (!args.email.trim()) throw new Error("Email is required")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.email)) throw new Error("Invalid email address")
    if (!args.message.trim()) throw new Error("Message is required")

    const now = Date.now()

    return ctx.db.insert("contacts", {
      name: args.name.trim(),
      email: args.email.trim().toLowerCase(),
      phone: args.phone?.trim(),
      service: args.service?.trim(),
      budget: args.budget?.trim(),
      message: args.message.trim(),
      status: "new",
      userId: args.userId,
      ipAddress: args.ipAddress,
      createdAt: now,
      updatedAt: now,
    })
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN QUERY: get all contact submissions
// ─────────────────────────────────────────────────────────────────────────────
export const getAll = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("in_progress"),
        v.literal("resolved"),
        v.literal("spam")
      )
    ),
  },
  handler: async (ctx, { status }) => {
    await requireAdmin(ctx as Parameters<typeof requireAdmin>[0])

    if (status) {
      return ctx.db
        .query("contacts")
        .withIndex("by_status", (q) => q.eq("status", status))
        .order("desc")
        .collect()
    }

    return ctx.db
      .query("contacts")
      .withIndex("by_createdAt")
      .order("desc")
      .collect()
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN MUTATION: update a contact's status
// ─────────────────────────────────────────────────────────────────────────────
export const updateStatus = mutation({
  args: {
    id: v.id("contacts"),
    status: v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("resolved"),
      v.literal("spam")
    ),
  },
  handler: async (ctx, { id, status }) => {
    await requireAdmin(ctx as Parameters<typeof requireAdmin>[0])

    const contact = await ctx.db.get(id)
    if (!contact) throw new Error("Contact not found")

    await ctx.db.patch(id, { status, updatedAt: Date.now() })
    return id
  },
})
