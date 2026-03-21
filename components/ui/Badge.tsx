import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium leading-none select-none transition-colors duration-200",
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--bg-card)] text-[var(--text-secondary)]",
          "border border-[var(--border-default)]",
        ],
        blue: [
          "bg-[rgba(0,168,255,0.12)] text-[var(--accent-blue)]",
          "border border-[rgba(0,168,255,0.25)]",
        ],
        green: [
          "bg-[rgba(0,230,118,0.12)] text-[#00E676]",
          "border border-[rgba(0,230,118,0.25)]",
        ],
        yellow: [
          "bg-[rgba(255,179,0,0.12)] text-[#FFB300]",
          "border border-[rgba(255,179,0,0.25)]",
        ],
        red: [
          "bg-[rgba(255,23,68,0.12)] text-[#FF1744]",
          "border border-[rgba(255,23,68,0.25)]",
        ],
        gradient: [
          "text-white border-0",
          "bg-[linear-gradient(135deg,#0066FF,#00FFD1)]",
          "shadow-[0_0_12px_rgba(0,102,255,0.3)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
