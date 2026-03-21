"use client"

import { useState } from "react"
import { useClerkUser } from "@/hooks/useClerkUser"
import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface UpgradeButtonProps {
  priceId?: string
  mode?: "subscription" | "payment"
  label?: string
  className?: string
  size?: "sm" | "md" | "lg"
}

export function UpgradeButton({
  priceId,
  mode = "subscription",
  label = "Upgrade to Pro",
  className,
  size = "md",
}: UpgradeButtonProps) {
  const { user, isLoaded } = useClerkUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-7 text-base",
  }

  async function handleUpgrade() {
    if (!isLoaded || !user) return
    setLoading(true)
    setError(null)

    try {
      const targetPriceId =
        priceId || process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID

      if (!targetPriceId) {
        setError("No price configured. Please contact support.")
        return
      }

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: targetPriceId, mode }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        setError(data.error || "Failed to start checkout.")
        return
      }

      window.location.href = data.url
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        onClick={handleUpgrade}
        disabled={loading || !isLoaded}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap",
          "rounded-[10px] border border-transparent",
          "bg-[linear-gradient(135deg,#0066FF,#00FFD1)] text-white",
          "shadow-[0_2px_12px_rgba(0,102,255,0.3)]",
          "hover:shadow-[0_0_30px_rgba(0,102,255,0.5),0_4px_15px_rgba(0,102,255,0.3)]",
          "hover:-translate-y-px active:translate-y-0",
          "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          "disabled:opacity-50 disabled:pointer-events-none",
          "relative overflow-hidden",
          sizeClasses[size],
          className
        )}
        aria-busy={loading}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
        ) : (
          <Zap className="w-4 h-4 shrink-0" />
        )}
        {label}
      </button>
      {error && <p className="text-xs text-[#FF1744]">{error}</p>}
    </div>
  )
}
