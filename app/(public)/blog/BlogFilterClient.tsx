"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PostCard, type MockPost } from "./blog-data"

const CATEGORIES = ["All", "Business Growth", "Development", "Marketing", "Tools", "Finance", "Case Study"]
const PER_PAGE = 9

export function BlogFilterClient({ posts }: { posts: MockPost[] }) {
  const [active, setActive] = useState("All")
  const [page, setPage] = useState(1)

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleCat = (cat: string) => {
    setActive(cat)
    setPage(1)
  }

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCat(cat)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={
              active === cat
                ? {
                    background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                    border: "1px solid transparent",
                    color: "#fff",
                    boxShadow: "0 0 20px rgba(0,102,255,0.3)",
                  }
                : {
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-muted)",
                  }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {paginated.length === 0 ? (
        <div className="text-center py-16 text-[var(--text-muted)]">
          No posts in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-default)",
              color: "var(--text-secondary)",
            }}
          >
            <ChevronLeft size={14} />
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className="w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200"
              style={
                n === page
                  ? {
                      background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                      color: "#fff",
                      boxShadow: "0 0 16px rgba(0,102,255,0.4)",
                    }
                  : {
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-default)",
                      color: "var(--text-muted)",
                    }
              }
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-default)",
              color: "var(--text-secondary)",
            }}
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
