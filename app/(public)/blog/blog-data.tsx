import Link from "next/link"
import Image from "next/image"
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
  coverImage?: string
  coverImageAlt?: string
}

/* ── Static mock posts (sorted newest first) ── */
export const MOCK_POSTS: MockPost[] = [
  {
    slug: "saas-growth-strategies-2025",
    title: "7 Proven SaaS Growth Strategies to Scale From $0 to $1M ARR",
    excerpt:
      "Most SaaS founders plateau at $10K MRR. Here are the 7 growth strategies that the fastest-growing SaaS companies use to break through and scale to $1M ARR.",
    category: "Business Growth",
    author: { name: "Growthency Team", initials: "G" },
    date: "March 20, 2025",
    readTime: 12,
    featured: true,
    gradient: { from: "#0066FF", to: "#00FFD1" },
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "SaaS growth strategies dashboard showing revenue metrics",
  },
  {
    slug: "seo-for-startups",
    title: "SEO for Startups: Rank #1 on Google Without a Big Budget",
    excerpt:
      "You don't need a $50K/month SEO budget to dominate Google. Here's the exact keyword research, content clustering, and link-building framework we use with early-stage startups.",
    category: "Marketing",
    author: { name: "Growthency Team", initials: "G" },
    date: "March 15, 2025",
    readTime: 11,
    featured: false,
    gradient: { from: "#F59E0B", to: "#EF4444" },
    coverImage:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "SEO for startups keyword research and Google ranking strategy",
  },
  {
    slug: "best-ai-tools-for-business-2025",
    title: "Best AI Tools for Small Businesses in 2025: Automate, Scale, Grow",
    excerpt:
      "These 12 AI tools are giving small businesses an unfair advantage over larger competitors — from AI copywriting and customer service to data analysis and automation.",
    category: "Tools",
    author: { name: "Growthency Team", initials: "G" },
    date: "March 10, 2025",
    readTime: 10,
    featured: false,
    gradient: { from: "#8B5CF6", to: "#EC4899" },
    coverImage:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "Best AI tools for small business automation and growth in 2025",
  },
  {
    slug: "nextjs-performance-optimization",
    title: "Next.js Performance Optimization: Achieve Perfect Lighthouse Scores",
    excerpt:
      "Core Web Vitals, image optimization, caching strategies, server components, and bundle splitting — everything you need to get a 100/100 Lighthouse score on your Next.js app.",
    category: "Development",
    author: { name: "Growthency Team", initials: "G" },
    date: "March 5, 2025",
    readTime: 14,
    featured: false,
    gradient: { from: "#06B6D4", to: "#0066FF" },
    coverImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "Next.js performance optimization and Lighthouse score improvement",
  },
  {
    slug: "startup-financial-planning",
    title: "Startup Financial Planning: Build a Cash Flow Model That Keeps You Alive",
    excerpt:
      "Most startups run out of money not because they aren't profitable — but because they mismanage cash flow. Here's how to build a financial model that gives you a real runway.",
    category: "Finance",
    author: { name: "Growthency Team", initials: "G" },
    date: "February 28, 2025",
    readTime: 9,
    featured: false,
    gradient: { from: "#10B981", to: "#0066FF" },
    coverImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "Startup financial planning and cash flow management spreadsheet",
  },
  {
    slug: "ecommerce-revenue-growth-case-study",
    title: "Case Study: How We Scaled an E-Commerce Store from $5K to $50K/Month",
    excerpt:
      "A real-world breakdown of the exact marketing, SEO, automation, and product strategies we used to 10x a struggling e-commerce store's revenue in under 8 months.",
    category: "Case Study",
    author: { name: "Growthency Team", initials: "G" },
    date: "February 20, 2025",
    readTime: 13,
    featured: false,
    gradient: { from: "#F59E0B", to: "#8B5CF6" },
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "E-commerce revenue growth case study results dashboard",
  },
  {
    slug: "business-automation-guide",
    title: "Business Automation: Eliminate 20+ Hours of Manual Work Per Week",
    excerpt:
      "Stop doing repetitive tasks manually. This guide covers the exact automation stack — Zapier, Make, n8n, and AI agents — that growing businesses use to run leaner and faster.",
    category: "Business Growth",
    author: { name: "Growthency Team", initials: "G" },
    date: "February 15, 2025",
    readTime: 11,
    featured: false,
    gradient: { from: "#00FFD1", to: "#0066FF" },
    coverImage:
      "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "Business automation tools workflow eliminating manual work",
  },
  {
    slug: "content-marketing-strategy",
    title: "Content Marketing Strategy: Build a $0 Traffic Machine That Compounds",
    excerpt:
      "A content strategy that's working in 2025 looks nothing like it did 3 years ago. Here's the topical authority model that drives organic traffic without paid ads.",
    category: "Marketing",
    author: { name: "Growthency Team", initials: "G" },
    date: "February 8, 2025",
    readTime: 10,
    featured: false,
    gradient: { from: "#EC4899", to: "#8B5CF6" },
    coverImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "Content marketing strategy for organic traffic growth",
  },
  {
    slug: "build-saas-product-step-by-step",
    title: "How to Build a SaaS Product from Scratch: A Complete Technical Guide",
    excerpt:
      "From idea validation to production deployment — this is the full technical stack, architecture decisions, and launch checklist we use to ship SaaS products in 8–12 weeks.",
    category: "Development",
    author: { name: "Growthency Team", initials: "G" },
    date: "February 1, 2025",
    readTime: 15,
    featured: false,
    gradient: { from: "#8B5CF6", to: "#06B6D4" },
    coverImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "Building a SaaS product from scratch technical guide",
  },
  {
    slug: "digital-marketing-roi",
    title: "How to Calculate and Maximize ROI from Every Digital Marketing Channel",
    excerpt:
      "Stop guessing which marketing channels work. This ROI framework gives you a clear formula to measure, compare, and double down on the channels that actually move the needle.",
    category: "Finance",
    author: { name: "Growthency Team", initials: "G" },
    date: "January 25, 2025",
    readTime: 8,
    featured: false,
    gradient: { from: "#EF4444", to: "#F59E0B" },
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "Digital marketing ROI calculation and channel performance analysis",
  },
  {
    slug: "saas-organic-traffic-case-study",
    title: "Case Study: 300% Organic Traffic Growth in 6 Months Through Topical SEO",
    excerpt:
      "We took a SaaS client from 800 monthly visitors to 3,200 in 6 months without a single paid ad. Here's the exact topical SEO strategy, content calendar, and results.",
    category: "Case Study",
    author: { name: "Growthency Team", initials: "G" },
    date: "January 18, 2025",
    readTime: 12,
    featured: false,
    gradient: { from: "#00E676", to: "#0066FF" },
    coverImage:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "SaaS organic traffic growth case study Google Analytics dashboard",
  },
  {
    slug: "project-management-tools-remote-teams",
    title: "Top 10 Project Management Tools for Remote Teams in 2025",
    excerpt:
      "Managing remote teams without the right tools is like building a house without a blueprint. Here's our ranked list of the best project management software for distributed teams.",
    category: "Tools",
    author: { name: "Growthency Team", initials: "G" },
    date: "January 10, 2025",
    readTime: 9,
    featured: false,
    gradient: { from: "#06B6D4", to: "#00E676" },
    coverImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "Project management tools for remote teams collaboration",
  },
  {
    slug: "social-media-marketing-b2b",
    title: "B2B Social Media Marketing: Generate Qualified Leads from LinkedIn",
    excerpt:
      "LinkedIn generates 80% of B2B leads from social media. Here's the posting strategy, content pillars, and outreach framework that fills our clients' pipelines with qualified prospects.",
    category: "Marketing",
    author: { name: "Growthency Team", initials: "G" },
    date: "January 3, 2025",
    readTime: 10,
    featured: false,
    gradient: { from: "#0066FF", to: "#EC4899" },
    coverImage:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "B2B social media marketing LinkedIn lead generation strategy",
  },
  {
    slug: "product-market-fit-framework",
    title: "Product-Market Fit: How to Validate Your Business Idea Before You Build",
    excerpt:
      "90% of startups fail because they build before validating. This framework gives you a step-by-step process to test your idea with real users and real money before writing a single line of code.",
    category: "Business Growth",
    author: { name: "Growthency Team", initials: "G" },
    date: "December 26, 2024",
    readTime: 11,
    featured: false,
    gradient: { from: "#8B5CF6", to: "#F59E0B" },
    coverImage:
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "Product market fit validation framework for startup ideas",
  },
  {
    slug: "react-server-components-guide",
    title: "React Server Components: The Complete Practical Guide for 2025",
    excerpt:
      "RSC changes everything about how we think about rendering in React. Here's what they actually are, when to use them vs client components, and the most common pitfalls to avoid.",
    category: "Development",
    author: { name: "Growthency Team", initials: "G" },
    date: "December 18, 2024",
    readTime: 13,
    featured: false,
    gradient: { from: "#F59E0B", to: "#0066FF" },
    coverImage:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "React Server Components guide for modern web development",
  },
  {
    slug: "startup-bootstrap-growth",
    title: "Bootstrap Growth: Scale Your Startup Without Raising a Single Dollar",
    excerpt:
      "Venture capital is not the only path to scale. Here's the bootstrap growth playbook — revenue-based financing, strategic partnerships, and scrappy marketing — that keeps you in control.",
    category: "Business Growth",
    author: { name: "Growthency Team", initials: "G" },
    date: "December 10, 2024",
    readTime: 10,
    featured: false,
    gradient: { from: "#10B981", to: "#EC4899" },
    coverImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&fm=webp&fit=crop",
    coverImageAlt: "Bootstrap startup growth without venture capital funding",
  },
]

/* ── Post card ── */
export function PostCard({ post }: { post: MockPost }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="group block rounded-2xl overflow-hidden relative transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
      }}
    >
      {/* Cover image or gradient banner */}
      {post.coverImage ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-3 left-4">
            <Badge variant="blue" className="text-[10px]">
              {post.category}
            </Badge>
          </div>
        </div>
      ) : (
        <div
          className="h-2 w-full"
          style={{
            background: `linear-gradient(90deg, ${post.gradient.from}, ${post.gradient.to})`,
          }}
        />
      )}

      <div className="p-6">
        {!post.coverImage && (
          <Badge variant="blue" className="text-xs mb-4">
            {post.category}
          </Badge>
        )}

        <h3 className="font-syne font-extrabold text-lg text-[var(--text-primary)] leading-snug mb-3 group-hover:text-[var(--accent-blue)] transition-colors duration-200">
          {post.title}
        </h3>

        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center p-1"
              style={{
                background: `linear-gradient(135deg, ${post.gradient.from}, ${post.gradient.to})`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.svg" alt="Growthency" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs text-[var(--text-muted)]">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readTime} min
            </span>
            <Calendar size={11} />
            {post.date}
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
