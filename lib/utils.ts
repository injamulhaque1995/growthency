import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS class names, resolving conflicts correctly.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Formats a Unix timestamp (ms) into a human-readable date string.
 * e.g. 1700000000000 → "November 14, 2023"
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * Converts a string into a URL-safe slug.
 * e.g. "Hello, World!" → "hello-world"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Estimates reading time in minutes for a given body of text.
 * Assumes an average reading speed of 200 words per minute.
 */
export function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

/**
 * Truncates a string to a maximum length, appending an ellipsis if needed.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3).trimEnd() + "..."
}

/**
 * Formats a number as a USD currency string.
 * e.g. 9.99 → "$9.99"
 */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Returns a relative time string from a Unix timestamp (ms).
 * e.g. "3 days ago", "just now"
 */
export function relativeTime(timestamp: number): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  const diff = timestamp - Date.now()
  const absDiff = Math.abs(diff)

  if (absDiff < 60_000) return "just now"
  if (absDiff < 3_600_000) return rtf.format(Math.round(diff / 60_000), "minute")
  if (absDiff < 86_400_000) return rtf.format(Math.round(diff / 3_600_000), "hour")
  if (absDiff < 2_592_000_000) return rtf.format(Math.round(diff / 86_400_000), "day")
  if (absDiff < 31_536_000_000) return rtf.format(Math.round(diff / 2_592_000_000), "month")
  return rtf.format(Math.round(diff / 31_536_000_000), "year")
}

/**
 * Returns a random element from an array.
 */
export function sample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Deep-clones a plain JSON-serialisable value.
 */
export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

/**
 * Delays execution for `ms` milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
