"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ToolCard, type ToolCardData } from "@/components/tools/ToolCard"

const TABS = ["All", "Marketing", "SEO", "Development", "Business"]
const PER_PAGE = 12

export function ToolsFilterClient({ tools }: { tools: ToolCardData[] }) {
  const [active, setActive] = useState("All")
  const [page, setPage] = useState(1)

  const filtered = active === "All" ? tools : tools.filter((t) => t.category === active)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleTab = (tab: string) => {
    setActive(tab)
    setPage(1)
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTab(tab)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={
              active === tab
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
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {paginated.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-[var(--text-muted)]">
          No tools in this category yet. Check back soon.
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
