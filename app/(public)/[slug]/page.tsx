import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getPostBySlug, getRelatedPosts, MOCK_POSTS } from "@/lib/mock-posts"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import {
  Clock,
  Calendar,
  Tag,
  Twitter,
  Linkedin,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { CopyLinkButton } from "@/components/shared/CopyLinkButton"

/* ─────────────────────────────────────────
   STATIC PARAMS — pre-render published posts
───────────────────────────────────────── */
export function generateStaticParams() {
  return MOCK_POSTS.filter((p) => p.published).map((p) => ({ slug: p.slug }))
}

/* ─────────────────────────────────────────
   METADATA
───────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/${post.slug}`,
      siteName: SITE_NAME,
      publishedTime: post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : undefined,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

/* ─────────────────────────────────────────
   CONTENT RENDERER — minimal markdown-like
───────────────────────────────────────── */
function renderContent(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="font-[family-name:var(--font-inter)] font-extrabold text-xl lg:text-2xl text-[#F0F4FF] mt-10 mb-4"
        >
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="font-[family-name:var(--font-inter)] font-extrabold text-lg text-[#F0F4FF] mt-6 mb-3"
        >
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith("---")) {
      elements.push(
        <hr key={i} className="border-[#1A2440] my-8" />
      )
    } else if (line.startsWith("**") && line.endsWith("**") && !line.slice(2, -2).includes("**")) {
      elements.push(
        <p key={i} className="font-semibold text-[#F0F4FF] mt-4 mb-2">
          {line.slice(2, -2)}
        </p>
      )
    } else if (line.startsWith("- ")) {
      // Collect consecutive list items
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-2 mb-4 pl-4">
          {items.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-2 text-[#8899BB] text-sm lg:text-base leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A8FF] mt-2 shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
            </li>
          ))}
        </ul>
      )
      continue
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = []
      let num = 1
      while (i < lines.length && new RegExp(`^${num}\\. `).test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""))
        i++
        num++
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-2 mb-4 pl-4">
          {items.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-3 text-[#8899BB] text-sm lg:text-base leading-relaxed"
            >
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/25 text-[#00A8FF] text-xs font-bold flex items-center justify-center mt-0.5">
                {j + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: inlineMarkdown(item) }} />
            </li>
          ))}
        </ol>
      )
      continue
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-2 border-[#0066FF] pl-4 my-4 italic text-[#8899BB] text-sm lg:text-base"
        >
          {line.slice(2)}
        </blockquote>
      )
    } else if (line.startsWith("| ")) {
      // Table
      const rows: string[][] = []
      while (i < lines.length && lines[i].startsWith("| ")) {
        if (!lines[i].includes("---")) {
          rows.push(lines[i].split("|").filter((c) => c.trim()).map((c) => c.trim()))
        }
        i++
      }
      if (rows.length > 0) {
        elements.push(
          <div key={`tbl-${i}`} className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {rows[0].map((h, j) => (
                    <th
                      key={j}
                      className="text-left px-4 py-2 text-xs font-medium text-[#4A5878] uppercase tracking-wide border-b border-[#1A2440]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, ri) => (
                  <tr key={ri} className="border-b border-[#1A2440]">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2 text-[#8899BB]">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      continue
    } else if (line.startsWith("- [ ] ") || line.startsWith("- [x] ")) {
      const items: string[] = []
      while (i < lines.length && (lines[i].startsWith("- [ ] ") || lines[i].startsWith("- [x] "))) {
        items.push(lines[i])
        i++
      }
      elements.push(
        <ul key={`chk-${i}`} className="space-y-2 my-4">
          {items.map((item, j) => {
            const checked = item.startsWith("- [x] ")
            return (
              <li key={j} className="flex items-center gap-2 text-sm text-[#8899BB]">
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ${
                    checked
                      ? "bg-[#00E676]/10 border-[#00E676]/30 text-[#00E676]"
                      : "border-[#1A2440]"
                  }`}
                >
                  {checked ? "✓" : ""}
                </span>
                {item.replace(/^- \[.\] /, "")}
              </li>
            )
          })}
        </ul>
      )
      continue
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      elements.push(
        <p
          key={i}
          className="text-[#8899BB] text-sm lg:text-base leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(line) }}
        />
      )
    }

    i++
  }

  return elements
}

function inlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-[#F0F4FF]">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="font-mono text-[#00E5FF] bg-[#0D1428] px-1 py-0.5 rounded text-xs">$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#00A8FF] hover:text-[#00E5FF] underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>')
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category)

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  // Extract section headings for ToC
  const headings = post.content
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => l.slice(3))

  const postUrl = `${SITE_URL}/${post.slug}`

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Organization", name: post.author.name },
            datePublished: post.publishedAt
              ? new Date(post.publishedAt).toISOString()
              : undefined,
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
            },
          }),
        }}
      />

      <article className="min-h-screen bg-[#050810]">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,102,255,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#8899BB] hover:text-[#00A8FF] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category + read time */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#00A8FF]">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#4A5878]">
                <Clock className="w-3.5 h-3.5" />
                {post.readTimeMinutes} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="font-[family-name:var(--font-inter)] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F0F4FF] leading-tight mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-[#8899BB] text-base lg:text-lg leading-relaxed mb-8 max-w-2xl">
              {post.excerpt}
            </p>

            {/* Author + date */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FFD1] flex items-center justify-center text-white font-bold shrink-0">
                {post.author.name[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-[#F0F4FF]">
                  {post.author.name}
                </p>
                {publishedDate && (
                  <div className="flex items-center gap-1.5 text-xs text-[#4A5878]">
                    <Calendar className="w-3 h-3" />
                    {publishedDate}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cover gradient area */}
        <div className="h-1 bg-gradient-to-r from-[#0066FF] via-[#00A8FF] to-[#00FFD1] opacity-60" />

        {/* Main content + sidebar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex gap-12">
            {/* Article */}
            <div className="flex-1 min-w-0 max-w-3xl">
              <div className="prose-custom">
                {renderContent(post.content)}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-10 pt-8 border-t border-[#1A2440]">
                  <Tag className="w-4 h-4 text-[#4A5878]" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs bg-[#0D1428] border border-[#1A2440] text-[#8899BB] hover:border-[#00A8FF] hover:text-[#00A8FF] transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="mt-8 p-5 bg-[#0A0F1E] border border-[#1A2440] rounded-2xl">
                <p className="text-sm font-medium text-[#F0F4FF] mb-3">
                  Share this article
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-9 px-4 text-sm text-[#8899BB] border border-[#1A2440] rounded-lg hover:border-[#1DA1F2] hover:text-[#1DA1F2] transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                  <a
                    href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-9 px-4 text-sm text-[#8899BB] border border-[#1A2440] rounded-lg hover:border-[#0066FF] hover:text-[#0066FF] transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <CopyLinkButton url={postUrl} />
                </div>
              </div>

              {/* Author bio */}
              <div className="mt-6 p-5 bg-[#0A0F1E] border border-[#1A2440] rounded-2xl flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FFD1] flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {post.author.name[0]}
                </div>
                <div>
                  <p className="font-[family-name:var(--font-inter)] font-extrabold text-sm text-[#F0F4FF] mb-1">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-[#8899BB] leading-relaxed">
                    The Growthency team helps businesses launch, scale, and grow using modern software, AI tools, and proven digital strategy. We&apos;ve worked with 200+ startups and growing businesses worldwide.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1 mt-2 text-xs text-[#00A8FF] hover:text-[#00E5FF] transition-colors"
                  >
                    About Growthency <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sticky sidebar — ToC */}
            {headings.length > 0 && (
              <aside className="hidden xl:block w-56 shrink-0">
                <div className="sticky top-8">
                  <p className="text-xs font-medium text-[#4A5878] uppercase tracking-wide mb-3">
                    Contents
                  </p>
                  <nav className="space-y-1">
                    {headings.map((heading, i) => (
                      <a
                        key={i}
                        href={`#${heading.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}`}
                        className="block text-xs text-[#8899BB] hover:text-[#00A8FF] transition-colors py-1 border-l-2 border-[#1A2440] hover:border-[#00A8FF] pl-3 leading-snug"
                      >
                        {heading}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-10 border-t border-[#1A2440]">
              <h2 className="font-[family-name:var(--font-inter)] font-extrabold text-xl text-[#F0F4FF] mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related._id}
                    href={`/${related.slug}`}
                    className="group bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-5 hover:border-[#0066FF]/40 hover:shadow-[0_0_20px_rgba(0,102,255,0.08)] transition-all duration-300"
                  >
                    <span className="px-2 py-0.5 rounded-full text-xs bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#00A8FF]">
                      {related.category}
                    </span>
                    <h3 className="font-[family-name:var(--font-inter)] font-extrabold text-sm text-[#F0F4FF] mt-3 mb-2 group-hover:text-[#00A8FF] transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <p className="text-xs text-[#4A5878] line-clamp-2 leading-relaxed">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-xs text-[#00A8FF]">
                      Read article <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
