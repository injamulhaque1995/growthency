"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  q: string
  a: string
}

export function ServiceFAQ({ faqs }: { faqs: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden transition-all duration-300"
          style={{
            background: "var(--bg-card)",
            border: open === i ? "1px solid rgba(0,168,255,0.35)" : "1px solid var(--border-default)",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left group"
            aria-expanded={open === i}
          >
            <span className="font-syne font-semibold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors duration-200">
              {faq.q}
            </span>
            <ChevronDown
              size={18}
              className={cn(
                "flex-shrink-0 text-[var(--text-muted)] transition-transform duration-300",
                open === i && "rotate-180 text-[var(--accent-blue)]"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <p className="px-5 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
