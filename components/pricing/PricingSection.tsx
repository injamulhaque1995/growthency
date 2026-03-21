"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useClerkUser } from "@/hooks/useClerkUser"
import { Check, X } from "lucide-react"
import { PricingCard } from "./PricingCard"
import { PLANS } from "@/lib/constants"

type BillingCycle = "monthly" | "yearly"

/* ── Feature comparison data ── */
const FEATURES = [
  { label: "Tool uses per day", free: "3", pro: "Unlimited", lifetime: "Unlimited" },
  { label: "Free tools", free: true, pro: true, lifetime: true },
  { label: "Pro tools", free: false, pro: true, lifetime: true },
  { label: "API access", free: false, pro: true, lifetime: true },
  { label: "Priority support", free: false, pro: true, lifetime: true },
  { label: "Advanced analytics", free: false, pro: true, lifetime: true },
  { label: "Early access to new tools", free: false, pro: false, lifetime: true },
  { label: "Founding member badge", free: false, pro: false, lifetime: true },
  { label: "Team collaboration", free: false, pro: "Soon", lifetime: "Soon" },
]

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return (
      <span className="text-sm text-[var(--accent-blue)] font-medium">{value}</span>
    )
  }
  return value ? (
    <Check size={16} className="text-[#00E676] mx-auto" />
  ) : (
    <X size={16} className="text-[var(--text-muted)] mx-auto opacity-50" />
  )
}

export function PricingSection() {
  const router = useRouter()
  const { isSignedIn } = useClerkUser()
  const [billing, setBilling] = useState<BillingCycle>("monthly")
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  async function handleSelectPro() {
    if (!isSignedIn) {
      router.push("/sign-up")
      return
    }

    const priceId =
      billing === "monthly"
        ? PLANS.MONTHLY.stripeId
        : PLANS.YEARLY.stripeId

    setLoadingPlan("pro")
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, mode: "subscription" }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error("[PricingSection] checkout error:", err)
    } finally {
      setLoadingPlan(null)
    }
  }

  async function handleSelectLifetime() {
    if (!isSignedIn) {
      router.push("/sign-up")
      return
    }

    setLoadingPlan("lifetime")
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: PLANS.LIFETIME.stripeId,
          mode: "payment",
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error("[PricingSection] checkout error:", err)
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-4 mb-14">
        <button
          onClick={() => setBilling("monthly")}
          className="relative text-sm font-semibold transition-colors duration-200"
          style={{
            color: billing === "monthly" ? "var(--text-primary)" : "var(--text-muted)",
          }}
        >
          Monthly
        </button>

        <button
          onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
          className="relative w-12 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
          style={{
            background:
              billing === "yearly"
                ? "linear-gradient(135deg, #0066FF, #00FFD1)"
                : "var(--bg-card)",
            border: "1px solid var(--border-default)",
          }}
          aria-label="Toggle billing cycle"
        >
          <span
            className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md"
            style={{
              transform: billing === "yearly" ? "translateX(24px)" : "translateX(0)",
            }}
          />
        </button>

        <button
          onClick={() => setBilling("yearly")}
          className="relative text-sm font-semibold transition-colors duration-200 flex items-center gap-2"
          style={{
            color: billing === "yearly" ? "var(--text-primary)" : "var(--text-muted)",
          }}
        >
          Yearly
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,230,118,0.15)",
              color: "#00E676",
              border: "1px solid rgba(0,230,118,0.3)",
            }}
          >
            Save 17%
          </span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-20">
        <PricingCard
          variant="free"
          billingCycle={billing}
          onSelect={() => {}}
          loading={false}
        />
        <PricingCard
          variant="pro"
          billingCycle={billing}
          onSelect={handleSelectPro}
          loading={loadingPlan === "pro"}
        />
        <PricingCard
          variant="lifetime"
          billingCycle={billing}
          onSelect={handleSelectLifetime}
          loading={loadingPlan === "lifetime"}
        />
      </div>

      {/* Feature comparison table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          border: "1px solid var(--border-default)",
          background: "var(--bg-card)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <th className="text-left p-5 text-sm font-semibold text-[var(--text-muted)]">
                  Feature
                </th>
                <th className="p-5 text-center text-sm font-bold text-[var(--text-primary)]">
                  Free
                </th>
                <th
                  className="p-5 text-center text-sm font-bold"
                  style={{
                    background: "rgba(0,102,255,0.06)",
                    color: "var(--accent-blue)",
                  }}
                >
                  Pro
                </th>
                <th className="p-5 text-center text-sm font-bold text-[var(--text-primary)]">
                  Lifetime
                </th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((feature, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom:
                      i < FEATURES.length - 1 ? "1px solid var(--border-default)" : "none",
                  }}
                >
                  <td className="p-5 text-sm text-[var(--text-secondary)]">
                    {feature.label}
                  </td>
                  <td className="p-5 text-center">
                    <FeatureCell value={feature.free} />
                  </td>
                  <td
                    className="p-5 text-center"
                    style={{ background: "rgba(0,102,255,0.04)" }}
                  >
                    <FeatureCell value={feature.pro} />
                  </td>
                  <td className="p-5 text-center">
                    <FeatureCell value={feature.lifetime} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
