"use client"

import * as React from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* ── Variants ── */
const cardVariants = cva(
  "relative rounded-card transition-all duration-300",
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--bg-card)] border border-[var(--border-default)]",
          "shadow-card-light dark:shadow-card-dark",
          "hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-glow)] hover:shadow-glow-blue",
        ],
        glass: [
          "glass-card",
        ],
        glow: [
          "bg-[var(--bg-card)] border border-transparent",
          "shadow-glow-blue",
          "animate-[borderGlow_2s_ease-in-out_infinite]",
          "hover:shadow-glow-blue-lg",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/* ── Types ── */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  tilt?: boolean
  tiltStrength?: number
}

/* ── Component ── */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, tilt = false, tiltStrength = 10, children, ...props }, ref) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltStrength, -tiltStrength]), {
      stiffness: 300,
      damping: 30,
    })
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltStrength, tiltStrength]), {
      stiffness: 300,
      damping: 30,
    })

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      const rect = e.currentTarget.getBoundingClientRect()
      x.set((e.clientX - rect.left) / rect.width - 0.5)
      y.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    function handleMouseLeave() {
      x.set(0)
      y.set(0)
    }

    if (tilt) {
      return (
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(cardVariants({ variant }), className)}
          {...(props as React.ComponentProps<typeof motion.div>)}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

/* ── Sub-components ── */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-syne font-extrabold text-xl leading-tight text-[var(--text-primary)]", className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[var(--text-secondary)] leading-relaxed", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-3 p-6 pt-0", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
