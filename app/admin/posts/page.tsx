import Link from "next/link"
import { Plus, Edit, Trash2, Eye, FileText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Posts",
}

const MOCK_POSTS = [
  {
    id: "1",
    title: "5 Growth Hacks Every Startup Should Know in 2026",
    slug: "5-growth-hacks-every-startup-should-know",
    category: "Growth",
    published: true,
    views: 1247,
    date: "Mar 15, 2026",
  },
  {
    id: "2",
    title: "How to Scale Your SaaS From 0 to 10K Users",
    slug: "how-to-scale-saas-0-to-10k-users",
    category: "Startups",
    published: true,
    views: 3891,
    date: "Mar 8, 2026",
  },
  {
    id: "3",
    title: "The Complete Guide to AI Integration for Small Businesses",
    slug: "ai-integration-guide-small-businesses",
    category: "AI",
    published: true,
    views: 2156,
    date: "Feb 28, 2026",
  },
  {
    id: "4",
    title: "Building a Brand Identity That Converts",
    slug: "building-brand-identity-that-converts",
    category: "Marketing",
    published: false,
    views: 0,
    date: "Draft",
  },
  {
    id: "5",
    title: "Why Mobile-First Design Is Non-Negotiable in 2026",
    slug: "mobile-first-design-non-negotiable",
    category: "Design",
    published: false,
    views: 0,
    date: "Draft",
  },
]

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl text-[#F0F4FF] mb-1">
            Blog Posts
          </h1>
          <p className="text-[#8899BB] text-sm">
            {MOCK_POSTS.filter((p) => p.published).length} published &middot;{" "}
            {MOCK_POSTS.filter((p) => !p.published).length} drafts
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 h-10 px-5 text-sm font-medium text-white bg-[linear-gradient(135deg,#0066FF,#00FFD1)] rounded-[10px] shadow-[0_2px_12px_rgba(0,102,255,0.3)] hover:shadow-[0_0_24px_rgba(0,102,255,0.45)] hover:-translate-y-px transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Posts table */}
      <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl overflow-hidden">
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1A2440]">
                <th className="text-left px-6 py-3 text-xs font-medium text-[#4A5878] uppercase tracking-wide">
                  Title
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#4A5878] uppercase tracking-wide">
                  Category
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#4A5878] uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#4A5878] uppercase tracking-wide">
                  Views
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#4A5878] uppercase tracking-wide">
                  Date
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-[#4A5878] uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A2440]">
              {MOCK_POSTS.map((post) => (
                <tr key={post.id} className="hover:bg-[#0D1428] transition-colors">
                  <td className="px-6 py-4 max-w-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#4A5878] shrink-0" />
                      <span className="font-medium text-[#F0F4FF] truncate">
                        {post.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A5878] mt-0.5 pl-5">/{post.slug}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-[#0D1428] border border-[#1A2440] text-[#8899BB]">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs border ${
                        post.published
                          ? "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20"
                          : "bg-[#8899BB]/10 text-[#8899BB] border-[#8899BB]/20"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#8899BB]">
                    {post.published ? post.views.toLocaleString() : "—"}
                  </td>
                  <td className="px-6 py-4 text-[#8899BB]">{post.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {post.published && (
                        <Link
                          href={`/${post.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-[#4A5878] hover:text-[#00A8FF] hover:bg-[#0066FF]/10 transition-all"
                          title="View post"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="p-1.5 rounded-lg text-[#4A5878] hover:text-[#00A8FF] hover:bg-[#0066FF]/10 transition-all"
                        title="Edit post"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        className="p-1.5 rounded-lg text-[#4A5878] hover:text-[#FF1744] hover:bg-[#FF1744]/10 transition-all"
                        title="Delete post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="sm:hidden divide-y divide-[#1A2440]">
          {MOCK_POSTS.map((post) => (
            <div key={post.id} className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-medium text-sm text-[#F0F4FF] leading-snug">
                  {post.title}
                </p>
                <span
                  className={`shrink-0 px-2 py-0.5 rounded-full text-xs border ${
                    post.published
                      ? "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20"
                      : "bg-[#8899BB]/10 text-[#8899BB] border-[#8899BB]/20"
                  }`}
                >
                  {post.published ? "Live" : "Draft"}
                </span>
              </div>
              <p className="text-xs text-[#4A5878] mb-3">{post.category} · {post.date}</p>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="inline-flex items-center gap-1.5 text-xs text-[#00A8FF] hover:text-[#00E5FF] transition-colors"
                >
                  <Edit className="w-3 h-3" /> Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
