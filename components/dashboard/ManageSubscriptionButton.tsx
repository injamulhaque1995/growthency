"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface ManageSubscriptionButtonProps {
  customerId: string
  label?: string
  className?: string
}

export function ManageSubscriptionButton({
  customerId,
  label = "Manage Subscription",
  className,
}: ManageSubscriptionButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleManage() {
    if (!customerId) {
      setError("No Stripe customer found.")
      return
    }
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        setError(data.error || "Failed to open billing portal.")
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
    <div className={cn("inline-flex flex-col items-start gap-1", className)}>
      <button
        onClick={handleManage}
        disabled={loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 h-10 px-5 text-sm font-medium",
          "text-[#8899BB] border border-[#1A2440] rounded-[10px]",
          "hover:border-[#00A8FF] hover:text-[#00A8FF]",
          "transition-all duration-200",
          "disabled:opacity-50 disabled:pointer-events-none"
        )}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin shrink-0" />
        ) : (
          <Settings className="w-4 h-4 shrink-0" />
        )}
        {label}
      </button>
      {error && <p className="text-xs text-[#FF1744]">{error}</p>}
    </div>
  )
}
