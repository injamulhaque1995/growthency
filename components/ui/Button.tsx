import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* ── Variants ── */
const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium whitespace-nowrap select-none",
    "rounded-btn border border-transparent",
    "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-blue)]",
    "disabled:opacity-50 disabled:pointer-events-none",
    "relative overflow-hidden",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-white",
          "bg-[linear-gradient(135deg,#0066FF,#00FFD1)]",
          "shadow-[0_2px_12px_rgba(0,102,255,0.3)]",
          "hover:shadow-[0_0_30px_rgba(0,102,255,0.5),0_4px_15px_rgba(0,102,255,0.3)]",
          "hover:-translate-y-px",
          "active:translate-y-0",
          "before:absolute before:inset-0 before:bg-white/0 hover:before:bg-white/[0.08] before:transition-colors before:duration-300",
        ],
        ghost: [
          "bg-transparent text-[var(--text-primary)]",
          "border-[var(--border-default)]",
          "hover:bg-[var(--bg-card-hover)] hover:border-[var(--accent-blue)]",
          "hover:text-[var(--accent-blue)]",
          "hover:shadow-[0_0_20px_var(--border-glow)]",
        ],
        outline: [
          "bg-transparent text-[var(--text-primary)]",
          "border-[var(--border-default)]",
          "hover:bg-[var(--bg-card)] hover:border-[var(--text-muted)]",
        ],
        danger: [
          "text-white",
          "bg-[#FF1744]",
          "shadow-[0_2px_12px_rgba(255,23,68,0.25)]",
          "hover:bg-[#E00035] hover:shadow-[0_0_24px_rgba(255,23,68,0.45)]",
          "hover:-translate-y-px active:translate-y-0",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

/* ── Types ── */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When true, renders children directly, merging Button's className/props
   * onto the child element (useful for wrapping Link components).
   */
  asChild?: boolean
  loading?: boolean
}

/* ── Component ── */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(buttonVariants({ variant, size }), className)

    // asChild: clone the single child element and merge props onto it
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
        {
          className: cn(classes, (children.props as { className?: string }).className),
          ...(props as object),
        }
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span
            className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin shrink-0"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
