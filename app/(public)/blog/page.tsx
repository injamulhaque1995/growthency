import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { Badge } from "@/components/ui/Badge"
import { MOCK_POSTS, type MockPost } from "./blog-data"
import { BlogFilterClient } from "./BlogFilterClient"

/* ── Metadata ── */
export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, growth strategies, and deep-dives from the Growthency team on development, marketing, AI, and business growth.",
  openGraph: {
    title: "Blog",
    url: `${SITE_URL}/blog`,
  },
}

/* ── Featured post ── */
function FeaturedPost({ post }: { post: MockPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-3xl overflow-hidden relative transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
      }}
    >
      {/* Gradient banner */}
      <div
        className="h-3 w-full"
        style={{
          background: `linear-gradient(90deg, ${post.gradient.from}, ${post.gradient.to})`,
        }}
      />

      <div className="p-8 sm:p-10">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <Badge variant="gradient" className="text-xs">
            Featured
          </Badge>
          <Badge variant="blue" className="text-xs">
            {post.category}
          </Badge>
        </div>

        <h2 className="font-syne font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] leading-tight mb-4 group-hover:text-[var(--accent-blue)] transition-colors duration-300 max-w-3xl">
          {post.title}
        </h2>
        <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${post.gradient.from}, ${post.gradient.to})`,
              }}
            >
              {post.author.initials}
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">{post.author.name}</p>
              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {post.readTime} min read
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={10} />
                  {post.date}
                </span>
              </div>
            </div>
          </div>

          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
            style={{ background: `linear-gradient(135deg, ${post.gradient.from}, ${post.gradient.to})` }}
          >
            Read Article
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ── Page ── */
export default function BlogPage() {
  const featured = MOCK_POSTS.find((p) => p.featured)!
  const rest = MOCK_POSTS.filter((p) => !p.featured)

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,102,255,0.12), transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue)] mb-4">
            The Blog
          </span>
          <h1 className="font-syne font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] leading-tight mb-6">
            Insights &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Growth Strategies
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Practical guides, case studies, and deep-dives on building and scaling businesses in the
            modern era.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Featured */}
        <div className="mb-12">
          <FeaturedPost post={featured} />
        </div>

        {/* Filters + Grid — client component handles interactivity */}
        <BlogFilterClient posts={rest} />
      </div>
    </div>
  )
}
