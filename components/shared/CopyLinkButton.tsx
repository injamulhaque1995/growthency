"use client"

import { useState } from "react"
import { Link as LinkIcon, Check } from "lucide-react"

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 h-9 px-4 text-sm text-[#8899BB] border border-[#1A2440] rounded-lg hover:border-[#00A8FF] hover:text-[#00A8FF] transition-all"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-[#00E676]" />
          Copied!
        </>
      ) : (
        <>
          <LinkIcon className="w-4 h-4" />
          Copy Link
        </>
      )}
    </button>
  )
}
