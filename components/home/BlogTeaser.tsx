"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Badge } from "@/components/ui/Badge"
import type { MockPost } from "@/app/(public)/blog/blog-data"

import { MOCK_POSTS as ALL_POSTS } from "@/app/(public)/blog/blog-data"

const MOCK_POSTS = ALL_POSTS.slice(0, 3)

/* ── Single blog card ── */
function BlogCard({ post, index }: { post: MockPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="group relative rounded-[var(--radius-card)] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[var(--radius-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15), inset 0 0 0 1px var(--border-glow)" }}
      />

      {/* Cover image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${post.gradient.from}33, ${post.gradient.to}11)` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <Badge variant="blue" className="text-[10px]">{post.category}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
          <span className="w-px h-3 bg-[var(--border-default)]" />
          <span className="flex items-center gap-1"><Clock size={12} />{post.readTime} min</span>
        </div>

        <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-base sm:text-lg text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-blue)] transition-colors duration-200">
          {post.title}
        </h3>

        <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-default)] mt-auto">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center p-0.5"
              style={{ background: `linear-gradient(135deg, ${post.gradient.from}, ${post.gradient.to})` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.svg" alt="Growthency" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs text-[var(--text-muted)]">{post.author.name}</span>
          </div>
          <Link
            href={`/${post.slug}`}
            className="flex items-center gap-1 text-xs font-medium text-[var(--accent-blue)] hover:text-[var(--accent-cyan)] transition-colors group/link"
          >
            Read More
            <ArrowRight size={12} className="transition-transform duration-200 group-hover/link:translate-x-1" />
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
