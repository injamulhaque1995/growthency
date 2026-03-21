"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ToolCard, type ToolCardData } from "@/components/tools/ToolCard"

const TABS = ["All", "Marketing", "SEO", "Development", "Business"]

export function ToolsFilterClient({ tools }: { tools: ToolCardData[] }) {
  const [active, setActive] = useState("All")

  const filtered =
    active === "All" ? tools : tools.filter((t) => t.category === active)

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--text-muted)]">
          No tools in this category yet. Check back soon.
        </div>
      )}
    </div>
  )
}
