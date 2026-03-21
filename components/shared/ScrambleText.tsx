"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&"

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

/* ── Types ── */
export interface ScrambleTextProps {
  /** The final resolved text */
  text: string
  /** Delay before scramble starts (ms) */
  delay?: number
  /** How long each character takes to resolve (ms) */
  speed?: number
  /** Whether the scramble plays on mount or on hover */
  trigger?: "mount" | "hover"
  className?: string
  /** Preserve whitespace characters as-is */
  preserveSpaces?: boolean
}

/* ── Component ── */
export function ScrambleText({
  text,
  delay = 0,
  speed = 40,
  trigger = "mount",
  className,
  preserveSpaces = true,
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState<string>(() =>
    trigger === "mount" ? text.replace(/[^\s]/g, randomChar) : text
  )
  const [isScrambling, setIsScrambling] = useState(false)
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const scramble = () => {
    if (isScrambling) return
    setIsScrambling(true)

    // Start with all random chars
    setDisplayed(text.replace(/[^\s]/g, randomChar))

    let resolved = 0
    const chars = text.split("")

    const tick = () => {
      if (resolved >= chars.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayed(text)
        setIsScrambling(false)
        return
      }

      setDisplayed(() => {
        return chars
          .map((char, i) => {
            if (preserveSpaces && char === " ") return " "
            if (i < resolved) return char
            // Randomize unresolved chars
            return char === " " ? " " : randomChar()
          })
          .join("")
      })

      resolved++
    }

    intervalRef.current = setInterval(tick, speed)
  }

  useEffect(() => {
    if (trigger !== "mount") return

    animationRef.current = setTimeout(() => {
      scramble()
    }, delay)

    return () => {
      if (animationRef.current) clearTimeout(animationRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  if (trigger === "hover") {
    return (
      <span
        className={cn("cursor-default", className)}
        onMouseEnter={scramble}
        aria-label={text}
      >
        {displayed}
      </span>
    )
  }

  return (
    <span className={cn("font-mono", className)} aria-label={text} suppressHydrationWarning>
      {displayed}
    </span>
  )
}
