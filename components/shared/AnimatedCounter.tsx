"use client"

import { useEffect, useRef, useState } from "react"
import { useMotionValue, animate, useTransform, motion } from "framer-motion"
import { cn } from "@/lib/utils"

/* ── Types ── */
export interface AnimatedCounterProps {
  /** Target number to count up to */
  to: number
  /** Prefix before the number (e.g. "$") */
  prefix?: string
  /** Suffix after the number (e.g. "+", "k", "%") */
  suffix?: string
  /** Duration of the animation in seconds */
  duration?: number
  /** Number of decimal places */
  decimals?: number
  /** Delay before starting (in seconds) */
  delay?: number
  className?: string
}

/* ── Component ── */
export function AnimatedCounter({
  to,
  prefix = "",
  suffix = "",
  duration = 2,
  decimals = 0,
  delay = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState("0")
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          const controls = animate(motionValue, to, {
            duration,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
            onUpdate: (latest) => {
              setDisplayValue(
                latest.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              )
            },
          })

          return () => controls.stop()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [to, duration, delay, decimals, hasAnimated, motionValue])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}
