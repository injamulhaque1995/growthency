import Link from "next/link"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/Badge"

/* ── Types ── */
export interface MockPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: { name: string; initials: string }
  date: string
  readTime: number
  featured: boolean
  gradient: { from: string; to: string }
}

/* ── Static mock posts ── */
export const MOCK_POSTS: MockPost[] = [
  {
    slug: "how-to-launch-mvp-in-4-weeks",
    title: "How to Launch a Production-Ready MVP in 4 Weeks",
    excerpt:
      "Stop over-engineering your first version. Here's the exact process we use to ship MVPs quickly without accumulating technical debt that kills momentum.",
    category: "Development",
    author: { name: "Alex Rivera", initials: "AR" },
    date: "March 15, 2025",
    readTime: 8,
    featured: true,
    gradient: { from: "#0066FF", to: "#00FFD1" },
  },
  {
    slug: "seo-strategy-that-actually-works-2025",
    title: "The SEO Strategy That 10x'd Our Organic Traffic in 6 Months",
    excerpt:
      "Forget keyword stuffing and link farms. This is the modern SEO playbook — topical authority, programmatic pages, and content clusters that actually rank.",
    category: "Marketing",
    author: { name: "Jordan Mills", initials: "JM" },
    date: "March 8, 2025",
    readTime: 11,
    featured: false,
    gradient: { from: "#F59E0B", to: "#EF4444" },
  },
  {
    slug: "ai-tools-for-small-business-growth",
    title: "7 AI Tools That Give Small Businesses an Unfair Advantage",
    excerpt:
      "Large companies have entire AI teams. Here's how small businesses can punch above their weight using the right AI tools — without the big budget.",
    category: "Business Growth",
    author: { name: "Alex Rivera", initials: "AR" },
    date: "February 28, 2025",
    readTime: 7,
    featured: false,
    gradient: { from: "#8B5CF6", to: "#EC4899" },
  },
  {
    slug: "design-systems-that-scale",
    title: "Building a Design System That Scales With Your Startup",
    excerpt:
      "A proper design system saves thousands of hours in the long run. Here's how we approach design tokens, component architecture, and documentation.",
    category: "Development",
    author: { name: "Sam Chen", initials: "SC" },
    date: "February 20, 2025",
    readTime: 9,
    featured: false,
    gradient: { from: "#06B6D4", to: "#0066FF" },
  },
  {
    slug: "automating-client-onboarding",
    title: "How We Automated Client Onboarding and Saved 15 Hours Per Week",
    excerpt:
      "Manual onboarding is expensive and error-prone. This is the full automation stack we built — from first form submission to onboarded client in under 10 minutes.",
    category: "Business Growth",
    author: { name: "Jordan Mills", initials: "JM" },
    date: "February 10, 2025",
    readTime: 6,
    featured: false,
    gradient: { from: "#10B981", to: "#0066FF" },
  },
  {
    slug: "nextjs-performance-optimization-guide",
    title: "Next.js Performance Optimization: The Complete 2025 Guide",
    excerpt:
      "Core Web Vitals, image optimization, caching strategies, bundle splitting — everything you need to achieve a perfect Lighthouse score on your Next.js app.",
    category: "Development",
    author: { name: "Alex Rivera", initials: "AR" },
    date: "January 30, 2025",
    readTime: 14,
    featured: false,
    gradient: { from: "#F59E0B", to: "#8B5CF6" },
  },
]

/* ── Post card ── */
export function PostCard({ post }: { post: MockPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl overflow-hidden relative transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
      }}
    >
      {/* Gradient banner */}
      <div
        className="h-2 w-full"
        style={{
          background: `linear-gradient(90deg, ${post.gradient.from}, ${post.gradient.to})`,
        }}
      />

      <div className="p-6">
        <Badge variant="blue" className="text-xs mb-4">
          {post.category}
        </Badge>

        <h3 className="font-syne font-extrabold text-lg text-[var(--text-primary)] leading-snug mb-3 group-hover:text-[var(--accent-blue)] transition-colors duration-200">
          {post.title}
        </h3>

        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${post.gradient.from}, ${post.gradient.to})`,
              }}
            >
              {post.author.initials}
            </div>
            <span className="text-xs text-[var(--text-muted)]">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readTime} min
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {post.date}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-blue)] mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
          Read article
          <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  )
}
