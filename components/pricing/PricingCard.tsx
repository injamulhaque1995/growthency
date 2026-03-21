import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type PricingVariant = "free" | "pro" | "lifetime"

interface PricingCardProps {
  variant: PricingVariant
  billingCycle?: "monthly" | "yearly"
  onSelect: () => void
  loading?: boolean
}

const CARD_DATA = {
  free: {
    name: "Free",
    price: { monthly: "$0", yearly: "$0" },
    period: { monthly: "forever", yearly: "forever" },
    description: "Try the platform risk-free.",
    badge: null,
    features: [
      "3 tool uses per day",
      "Access to all free tools",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get Started Free",
  },
  pro: {
    name: "Pro",
    price: { monthly: "$9", yearly: "$99" },
    period: { monthly: "per month", yearly: "per year" },
    description: "Unlimited tools, full power.",
    badge: "Most Popular",
    features: [
      "Unlimited tool uses",
      "Access to all pro tools",
      "Priority support",
      "Advanced analytics",
      "Custom build based on your request",
      "Dedicated growth consultation",
    ],
    cta: "Get Pro",
  },
  lifetime: {
    name: "Lifetime",
    price: { monthly: "$199", yearly: "$199" },
    period: { monthly: "one-time payment", yearly: "one-time payment" },
    description: "Pay once, own it forever.",
    badge: null,
    features: [
      "Everything in Pro",
      "Lifetime updates",
      "Priority & dedicated support",
      "Early access to new tools",
      "Founding member badge",
      "Custom build based on your request",
    ],
    cta: "Get Lifetime Access",
  },
}

export function PricingCard({ variant, billingCycle = "monthly", onSelect, loading }: PricingCardProps) {
  const data = CARD_DATA[variant]
  const isPro = variant === "pro"
  const isLifetime = variant === "lifetime"

  return (
    <div
      className={cn(
        "relative rounded-2xl p-8 flex flex-col h-full transition-all duration-300",
        isPro
          ? "scale-[1.03] shadow-[0_0_60px_rgba(0,102,255,0.25)]"
          : "hover:-translate-y-1"
      )}
      style={{
        background: isPro
          ? "linear-gradient(145deg, rgba(0,30,80,0.9), rgba(0,15,40,0.95))"
          : "var(--bg-card)",
        border: isPro
          ? "1px solid rgba(0,168,255,0.5)"
          : isLifetime
          ? "1px solid rgba(0,229,255,0.3)"
          : "1px solid var(--border-default)",
      }}
    >
      {/* Most Popular badge */}
      {data.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span
            className="inline-block px-5 py-1.5 rounded-full text-xs font-bold text-white whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #0066FF, #00FFD1)",
              boxShadow: "0 0 20px rgba(0,102,255,0.5)",
            }}
          >
            {data.badge}
          </span>
        </div>
      )}

      {/* Top glow for pro */}
      {isPro && (
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, #0066FF, #00FFD1)" }}
        />
      )}

      {/* Header */}
      <div className="mb-6 mt-2">
        <h3 className="font-extrabold text-xl text-[var(--text-primary)] mb-1">{data.name}</h3>
        <p className="text-sm text-[var(--text-muted)]">{data.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span
            className="font-extrabold text-5xl"
            style={
              isPro
                ? {
                    background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                : isLifetime
                ? {
                    background: "linear-gradient(135deg, #00E5FF, #00FFD1)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                : { color: "var(--text-primary)" }
            }
          >
            {data.price[billingCycle]}
          </span>
        </div>
        <span className="text-sm text-[var(--text-muted)]">{data.period[billingCycle]}</span>
        {variant === "pro" && billingCycle === "yearly" && (
          <p className="text-xs text-[#00E676] mt-1 font-medium">Save $9 vs monthly billing</p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-8">
        {data.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: isPro
                  ? "rgba(0,168,255,0.2)"
                  : isLifetime
                  ? "rgba(0,229,255,0.15)"
                  : "rgba(0,168,255,0.1)",
              }}
            >
              <Check size={11} className="text-[var(--accent-blue)]" />
            </div>
            <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onSelect}
        disabled={loading || variant === "free"}
        className={cn(
          "w-full h-12 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden",
          "disabled:opacity-50 disabled:pointer-events-none"
        )}
        style={
          isPro
            ? { background: "linear-gradient(135deg, #0066FF, #00FFD1)", color: "#fff", border: "none" }
            : isLifetime
            ? { background: "transparent", color: "var(--accent-cyan)", border: "1px solid rgba(0,229,255,0.4)" }
            : { background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border-default)" }
        }
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            Processing...
          </span>
        ) : variant === "free" ? (
          "Current Plan"
        ) : (
          data.cta
        )}
      </button>
    </div>
  )
}
