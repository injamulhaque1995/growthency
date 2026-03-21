import * as React from "react"
import { cn } from "@/lib/utils"

/* ── Types ── */
export interface SectionHeaderProps {
  /** Small uppercase label above the heading */
  eyebrow?: string
  /** Main heading text */
  heading: string
  /** If provided, the last word of heading gets gradient styling */
  gradientLastWord?: boolean
  /** Optional subtitle / description */
  subtitle?: string
  /** Alignment (default: left) */
  align?: "left" | "center"
  className?: string
  headingClassName?: string
  subtitleClassName?: string
  eyebrowClassName?: string
  /** Render heading as a different tag */
  as?: "h1" | "h2" | "h3" | "h4"
}

export function SectionHeader({
  eyebrow,
  heading,
  gradientLastWord = false,
  subtitle,
  align = "left",
  className,
  headingClassName,
  subtitleClassName,
  eyebrowClassName,
  as: Tag = "h2",
}: SectionHeaderProps) {
  const isCenter = align === "center"

  // Split last word for optional gradient
  const words = heading.trim().split(" ")
  const lastWord = words.pop() ?? ""
  const rest = words.join(" ")

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCenter && "items-center text-center",
        className
      )}
    >
      {/* Eyebrow label */}
      {eyebrow && (
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.15em]",
            "text-[var(--accent-blue)]",
            eyebrowClassName
          )}
        >
          {eyebrow}
        </span>
      )}

      {/* Main heading */}
      <Tag
        className={cn(
          "font-syne font-extrabold text-[var(--text-primary)] leading-tight",
          "text-3xl sm:text-4xl lg:text-5xl",
          headingClassName
        )}
      >
        {gradientLastWord && words.length > 0 ? (
          <>
            {rest}{" "}
            <span
              className="gradient-text"
              style={{
                background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {lastWord}
            </span>
          </>
        ) : gradientLastWord ? (
          <span
            className="gradient-text"
            style={{
              background: "linear-gradient(135deg, #0066FF, #00FFD1)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {heading}
          </span>
        ) : (
          heading
        )}
      </Tag>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            "text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed",
            isCenter && "max-w-2xl",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
