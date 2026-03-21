"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Calendar, User } from "lucide-react"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Badge } from "@/components/ui/Badge"

/* ── Mock blog posts ── */
const MOCK_POSTS = [
  {
    title: "How to Scale Your Digital Business in 2025",
    slug: "how-to-scale-digital-business-2025",
    category: "Business Growth",
    readTime: "5 min read",
    excerpt:
      "Discover the proven frameworks and tools that fast-growing businesses use to break through plateaus and unlock the next stage of growth.",
    date: "March 15, 2025",
    author: "Growthency Team",
    gradientFrom: "#0066FF",
    gradientTo: "#00FFD1",
  },
  {
    title: "Building AI-Powered SaaS Products: A Complete Guide",
    slug: "building-ai-powered-saas-products",
    category: "Development",
    readTime: "8 min read",
    excerpt:
      "From prompt engineering to production-ready pipelines — everything you need to integrate AI into your next SaaS product effectively.",
    date: "March 8, 2025",
    author: "Growthency Team",
    gradientFrom: "#7B61FF",
    gradientTo: "#00A8FF",
  },
  {
    title: "UI Design Principles That Skyrocket Conversions",
    slug: "ui-design-principles-for-conversions",
    category: "Design",
    readTime: "6 min read",
    excerpt:
      "The difference between a 2% and 12% conversion rate often comes down to five key UI principles. Here's how to implement them.",
    date: "February 28, 2025",
    author: "Growthency Team",
    gradientFrom: "#FF6B6B",
    gradientTo: "#FFB300",
  },
]

/* ── Single blog card ── */
function BlogCard({
  post,
  index,
}: {
  post: (typeof MOCK_POSTS)[number]
  index: number
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="group relative rounded-[var(--radius-card)] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        boxShadow: "none",
      }}
    >
      {/* Hover shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[var(--radius-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15), inset 0 0 0 1px var(--border-glow)" }}
      />

      {/* Gradient top border */}
      <div
        aria-hidden="true"
        className="h-1 w-full flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, ${post.gradientFrom}, ${post.gradientTo})`,
        }}
      />

      {/* Mock image placeholder */}
      <div
        className="relative h-44 overflow-hidden flex-shrink-0"
        style={{ background: "var(--bg-surface)" }}
      >
        {/* Gradient bg as placeholder */}
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${post.gradientFrom}22, ${post.gradientTo}11)`,
          }}
        />
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(${post.gradientFrom}18 1px, transparent 1px),
              linear-gradient(90deg, ${post.gradientFrom}18 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />
        {/* Category overlay */}
        <div className="absolute bottom-3 left-4">
          <Badge variant="blue" className="text-[10px]">
            {post.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-[family-name:var(--font-dm-sans)]">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {post.date}
          </span>
          <span className="w-px h-3 bg-[var(--border-default)]" />
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-base sm:text-lg text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-blue)] transition-colors duration-200">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed font-[family-name:var(--font-dm-sans)] flex-1">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-default)] mt-auto">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${post.gradientFrom}, ${post.gradientTo})`,
              }}
            >
              <User size={11} />
            </div>
            <span className="text-xs text-[var(--text-muted)] font-[family-name:var(--font-dm-sans)]">
              {post.author}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-xs font-medium text-[var(--accent-blue)] hover:text-[var(--accent-cyan)] transition-colors group/link"
          >
            Read More
            <ArrowRight
              size={12}
              className="transition-transform duration-200 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Main section ── */
export default function BlogTeaser() {
  return (
    <section
      className="relative py-24 bg-[var(--bg-surface)] overflow-hidden"
      aria-labelledby="blog-heading"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--border-glow), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,102,255,0.05), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14"
        >
          <SectionHeader
            eyebrow="From Our Blog"
            heading="Insights & Growth Strategies"
            gradientLastWord
            subtitle="Practical guides, deep dives, and growth playbooks from the Growthency team."
            align="left"
          />

          <Link
            href="/blog"
            className="btn-ghost flex-shrink-0 inline-flex items-center gap-2 text-sm px-5 py-2.5"
          >
            Read All Articles
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_POSTS.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        {/* Newsletter prompt */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 rounded-[var(--radius-card)] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-default)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,102,255,0.04) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10">
            <h4 className="font-[family-name:var(--font-syne)] font-extrabold text-lg text-[var(--text-primary)] mb-1">
              Get growth insights in your inbox
            </h4>
            <p className="text-sm text-[var(--text-muted)] font-[family-name:var(--font-dm-sans)]">
              Weekly strategies, tool updates, and case studies. No spam, ever.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-56 h-10 px-4 text-sm rounded-[var(--radius-input)] bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
            />
            <button className="btn-primary h-10 px-5 text-sm w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
