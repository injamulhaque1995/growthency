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
  {
    slug: "social-media-growth-playbook",
    title: "The Social Media Growth Playbook: 0 to 100K Followers",
    excerpt:
      "Stop posting randomly and hoping for the best. Here's the data-driven social media strategy that consistently grows accounts across every platform.",
    category: "Marketing",
    author: { name: "Jordan Mills", initials: "JM" },
    date: "January 20, 2025",
    readTime: 10,
    featured: false,
    gradient: { from: "#EC4899", to: "#8B5CF6" },
  },
  {
    slug: "saas-pricing-psychology",
    title: "SaaS Pricing Psychology: Why $9.99 Beats $10 Every Time",
    excerpt:
      "Pricing is the highest-leverage decision in your SaaS. Discover the psychological principles and real-world tactics that top SaaS companies use to maximize revenue.",
    category: "Business Growth",
    author: { name: "Alex Rivera", initials: "AR" },
    date: "January 12, 2025",
    readTime: 9,
    featured: false,
    gradient: { from: "#0066FF", to: "#8B5CF6" },
  },
  {
    slug: "react-server-components-guide",
    title: "React Server Components: The Complete Practical Guide",
    excerpt:
      "RSC changes everything about how we build React apps. Here's what they actually are, when to use them, and how to avoid the most common pitfalls.",
    category: "Development",
    author: { name: "Sam Chen", initials: "SC" },
    date: "January 5, 2025",
    readTime: 12,
    featured: false,
    gradient: { from: "#06B6D4", to: "#00E676" },
  },
  {
    slug: "cold-email-outreach-that-converts",
    title: "Cold Email Outreach That Actually Gets Replies in 2025",
    excerpt:
      "Spray-and-pray cold email is dead. Here's the hyper-personalized, AI-assisted outreach framework that's generating 40%+ reply rates for our clients.",
    category: "Marketing",
    author: { name: "Jordan Mills", initials: "JM" },
    date: "December 28, 2024",
    readTime: 8,
    featured: false,
    gradient: { from: "#F59E0B", to: "#10B981" },
  },
  {
    slug: "product-market-fit-signals",
    title: "How to Know When You've Actually Hit Product-Market Fit",
    excerpt:
      "Most founders think they have PMF when they don't. Here are the real signals — retention curves, NPS patterns, and organic word-of-mouth — that indicate true fit.",
    category: "Business Growth",
    author: { name: "Alex Rivera", initials: "AR" },
    date: "December 18, 2024",
    readTime: 7,
    featured: false,
    gradient: { from: "#00E676", to: "#0066FF" },
  },
  {
    slug: "database-architecture-startups",
    title: "Database Architecture Decisions That Will Save Your Startup",
    excerpt:
      "The database choices you make in week 1 will haunt you in year 3. Here's a pragmatic guide to picking the right database architecture for your startup stage.",
    category: "Development",
    author: { name: "Sam Chen", initials: "SC" },
    date: "December 10, 2024",
    readTime: 11,
    featured: false,
    gradient: { from: "#8B5CF6", to: "#06B6D4" },
  },
  {
    slug: "google-ads-roi-framework",
    title: "The Google Ads ROI Framework That Stopped Wasting Our Budget",
    excerpt:
      "We burned $50K on Google Ads before figuring this out. Now we use a strict ROI framework that ensures every dollar spent drives measurable return.",
    category: "Marketing",
    author: { name: "Jordan Mills", initials: "JM" },
    date: "November 30, 2024",
    readTime: 9,
    featured: false,
    gradient: { from: "#EF4444", to: "#F59E0B" },
  },
  {
    slug: "startup-hiring-guide",
    title: "How to Hire Your First 10 Employees Without Making Costly Mistakes",
    excerpt:
      "The first 10 hires define your company culture forever. Here's the hiring process, interview questions, and red flags we've learned over hundreds of hires.",
    category: "Business Growth",
    author: { name: "Alex Rivera", initials: "AR" },
    date: "November 20, 2024",
    readTime: 13,
    featured: false,
    gradient: { from: "#EC4899", to: "#F59E0B" },
  },
  {
    slug: "typescript-patterns-production",
    title: "TypeScript Patterns We Wish We Knew Before Going to Production",
    excerpt:
      "Generic types, discriminated unions, and template literal types sound complex — but these patterns will make your codebase dramatically safer and more maintainable.",
    category: "Development",
    author: { name: "Sam Chen", initials: "SC" },
    date: "November 10, 2024",
    readTime: 10,
    featured: false,
    gradient: { from: "#0066FF", to: "#EC4899" },
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
