"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"

interface ProfileFormProps {
  email: string
}

export function ProfileForm({ email }: ProfileFormProps) {
  const [prefs, setPrefs] = useState({
    productUpdates: true,
    toolTips: true,
    weeklyDigest: false,
    securityAlerts: true,
    marketingEmails: false,
  })
  const [saved, setSaved] = useState(false)

  function toggle(key: keyof typeof prefs) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }))
    setSaved(false)
  }

  function handleSave() {
    // Will connect to Convex once deployed
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const notifications: { key: keyof typeof prefs; label: string; description: string }[] = [
    {
      key: "productUpdates",
      label: "Product Updates",
      description: "Get notified about new features and improvements.",
    },
    {
      key: "toolTips",
      label: "Tool Tips & Guides",
      description: "Receive tips to get the most out of Growthency tools.",
    },
    {
      key: "weeklyDigest",
      label: "Weekly Digest",
      description: "A weekly summary of your usage and growth metrics.",
    },
    {
      key: "securityAlerts",
      label: "Security Alerts",
      description: "Important notifications about your account security.",
    },
    {
      key: "marketingEmails",
      label: "Marketing Emails",
      description: "Occasional promotions, discounts, and special offers.",
    },
  ]

  return (
    <div className="space-y-4">
      <p className="text-xs text-[#4A5878] mb-4">
        Notifications will be sent to: <span className="text-[#8899BB]">{email}</span>
      </p>

      {notifications.map(({ key, label, description }) => (
        <div
          key={key}
          className="flex items-start justify-between gap-4 py-3 border-b border-[#1A2440] last:border-0"
        >
          <div className="flex-1">
            <p className="text-sm font-medium text-[#F0F4FF]">{label}</p>
            <p className="text-xs text-[#4A5878] mt-0.5">{description}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={prefs[key]}
            onClick={() => toggle(key)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A8FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E] ${
              prefs[key] ? "bg-gradient-to-r from-[#0066FF] to-[#00A8FF]" : "bg-[#1A2440]"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                prefs[key] ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 h-9 px-5 text-sm font-medium text-white bg-[linear-gradient(135deg,#0066FF,#00FFD1)] rounded-[10px] shadow-[0_2px_12px_rgba(0,102,255,0.3)] hover:shadow-[0_0_24px_rgba(0,102,255,0.45)] hover:-translate-y-px transition-all duration-300"
        >
          Save Preferences
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-[#00E676]">
            <CheckCircle className="w-4 h-4" />
            Saved!
          </span>
        )}
      </div>
    </div>
  )
}
