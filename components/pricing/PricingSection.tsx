"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useClerkUser } from "@/hooks/useClerkUser"
import { Check, X } from "lucide-react"
import { PricingCard } from "./PricingCard"
import { PLANS } from "@/lib/constants"

/* ── Feature comparison data ── */
const FEATURES = [
  { label: "Tool uses per day",    free: "3",   pro: "Unlimited", yearly: "Unlimited", lifetime: "Unlimited" },
  { label: "Free tools",           free: true,  pro: true,        yearly: true,        lifetime: true },
  { label: "Pro tools",            free: false, pro: true,        yearly: true,        lifetime: true },
  { label: "Priority support",     free: false, pro: true,        yearly: true,        lifetime: true },
  { label: "Advanced analytics",   free: false, pro: true,        yearly: true,        lifetime: true },
  { label: "Custom build request", free: false, pro: true,        yearly: true,        lifetime: true },
  { label: "Early access to tools",free: false, pro: false,       yearly: false,       lifetime: true },
  { label: "Founding member badge",free: false, pro: false,       yearly: false,       lifetime: true },
]

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm text-[var(--accent-blue)] font-medium">{value}</span>
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
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  async function checkout(priceId: string | undefined, mode: "subscription" | "payment", key: string) {
    if (!isSignedIn) { router.push("/sign-up"); return }
    setLoadingPlan(key)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, mode }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error("[PricingSection] checkout error:", err)
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div>
      {/* 4-card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-20 pt-6 overflow-visible">
        <PricingCard
          variant="free"
          onSelect={() => {}}
          loading={false}
        />
        <PricingCard
          variant="pro"
          onSelect={() => checkout(PLANS.MONTHLY.stripeId, "subscription", "pro")}
          loading={loadingPlan === "pro"}
        />
        <PricingCard
          variant="yearly"
          onSelect={() => checkout(PLANS.YEARLY.stripeId, "subscription", "yearly")}
          loading={loadingPlan === "yearly"}
        />
        <PricingCard
          variant="lifetime"
          onSelect={() => checkout(PLANS.LIFETIME.stripeId, "payment", "lifetime")}
          loading={loadingPlan === "lifetime"}
        />
      </div>

      {/* Feature comparison table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid var(--border-default)", background: "var(--bg-card)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <th className="text-left p-4 text-sm font-semibold text-[var(--text-muted)]">Feature</th>
                <th className="p-4 text-center text-sm font-bold text-[var(--text-primary)]">Free</th>
                <th className="p-4 text-center text-sm font-bold" style={{ background: "rgba(0,102,255,0.06)", color: "var(--accent-blue)" }}>Pro</th>
                <th className="p-4 text-center text-sm font-bold" style={{ background: "rgba(0,229,255,0.05)", color: "var(--accent-cyan)" }}>Yearly</th>
                <th className="p-4 text-center text-sm font-bold text-[var(--text-primary)]">Lifetime</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((f, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: i < FEATURES.length - 1 ? "1px solid var(--border-default)" : "none" }}
                >
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{f.label}</td>
                  <td className="p-4 text-center"><FeatureCell value={f.free} /></td>
                  <td className="p-4 text-center" style={{ background: "rgba(0,102,255,0.04)" }}><FeatureCell value={f.pro} /></td>
                  <td className="p-4 text-center" style={{ background: "rgba(0,229,255,0.03)" }}><FeatureCell value={f.yearly} /></td>
                  <td className="p-4 text-center"><FeatureCell value={f.lifetime} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
