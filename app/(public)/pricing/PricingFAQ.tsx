"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const FAQS = [
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, cancel anytime from your account settings. You keep access until the end of your billing period. No penalties, no lock-in.",
  },
  {
    q: "What's the difference between Pro Monthly and Pro Yearly?",
    a: "Same features, different billing cycle. Yearly saves you 17% (equivalent to ~2 months free). Pick the option that fits your budget.",
  },
  {
    q: "What does Lifetime mean?",
    a: "Pay once and get Pro-tier access forever, including all future tool updates and new features we release. It's the best deal for long-term users.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "The Free plan gives you a taste of the platform with 3 tool uses per day. Upgrade to Pro whenever you need unlimited access.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards (Visa, Mastercard, Amex) and PayPal, processed securely via Stripe.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. If you're not satisfied within 30 days of your first payment, contact us for a full refund. After 30 days, refunds are handled case-by-case.",
  },
]

export function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => (
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
              open === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
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
