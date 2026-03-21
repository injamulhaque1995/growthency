"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { PostCard, type MockPost } from "./blog-data"

const CATEGORIES = ["All", "Business Growth", "Development", "Marketing"]

export function BlogFilterClient({ posts }: { posts: MockPost[] }) {
  const [active, setActive] = useState("All")

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active)

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              active === cat
                ? "text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]"
            )}
            style={
              active === cat
                ? {
                    background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                    border: "1px solid transparent",
                    boxShadow: "0 0 20px rgba(0,102,255,0.3)",
                  }
                : {
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                  }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--text-muted)]">
          No posts in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
