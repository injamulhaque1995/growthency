import { z } from "zod"

/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),

  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .regex(/^\+?[0-9\s\-().]{7,20}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),

  service: z
    .enum([
      "Web App Development",
      "Mobile App Development",
      "Digital Marketing",
      "UI/UX Design",
      "Custom Software",
      "AI Integration",
      "Automations",
      "Other",
    ])
    .optional(),

  budget: z
    .enum(["Under $1k", "$1k – $5k", "$5k – $10k", "$10k – $25k", "$25k+", "Not sure yet"])
    .optional(),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters")
    .trim(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

/* ─────────────────────────────────────────
   NEWSLETTER
───────────────────────────────────────── */

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
})

export type NewsletterValues = z.infer<typeof newsletterSchema>

/* ─────────────────────────────────────────
   TOOL USAGE
───────────────────────────────────────── */

export const toolUsageSchema = z.object({
  toolSlug: z
    .string()
    .min(1, "Tool slug is required")
    .max(100, "Tool slug is too long")
    .regex(/^[a-z0-9-]+$/, "Tool slug must be lowercase alphanumeric with hyphens"),

  userId: z.string().min(1, "User ID is required"),

  /** ISO date string in YYYY-MM-DD format */
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
})

export type ToolUsageValues = z.infer<typeof toolUsageSchema>

/* ─────────────────────────────────────────
   AUTH / USER PROFILE UPDATE
───────────────────────────────────────── */

export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),

  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

export type ProfileUpdateValues = z.infer<typeof profileUpdateSchema>

/* ─────────────────────────────────────────
   BLOG POST (admin)
───────────────────────────────────────── */

export const postSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be under 200 characters")
    .trim(),

  slug: z
    .string()
    .min(3, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens")
    .trim(),

  excerpt: z
    .string()
    .min(20, "Excerpt must be at least 20 characters")
    .max(400, "Excerpt must be under 400 characters")
    .trim(),

  content: z.string().min(100, "Content must be at least 100 characters"),

  coverImage: z.string().url("Cover image must be a valid URL").optional().or(z.literal("")),

  category: z.string().min(1, "Category is required"),

  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed").default([]),

  published: z.boolean().default(false),
})

export type PostValues = z.infer<typeof postSchema>
