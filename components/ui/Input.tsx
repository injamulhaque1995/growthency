import * as React from "react"
import { cn } from "@/lib/utils"

/* ── Types ── */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  containerClassName?: string
  labelClassName?: string
}

/* ── Component ── */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      labelClassName,
      label,
      error,
      hint,
      icon,
      iconPosition = "left",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium text-[var(--text-primary)]",
              disabled && "opacity-50",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {/* Left icon */}
          {icon && iconPosition === "left" && (
            <span className="absolute left-3 text-[var(--text-muted)] pointer-events-none flex items-center">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            className={cn(
              // Base
              "w-full bg-[var(--bg-card)] text-[var(--text-primary)]",
              "rounded-input border border-[var(--border-default)]",
              "placeholder:text-[var(--text-muted)]",
              "text-sm leading-none h-10 px-3",
              "outline-none transition-all duration-200",
              // Focus
              "focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_rgba(0,168,255,0.15)]",
              // Error
              error &&
                "border-[var(--error)] focus:border-[var(--error)] focus:shadow-[0_0_0_3px_rgba(255,23,68,0.15)]",
              // Disabled
              disabled && "opacity-50 cursor-not-allowed",
              // Icon padding
              icon && iconPosition === "left" && "pl-9",
              icon && iconPosition === "right" && "pr-9",
              className
            )}
            {...props}
          />

          {/* Right icon */}
          {icon && iconPosition === "right" && (
            <span className="absolute right-3 text-[var(--text-muted)] pointer-events-none flex items-center">
              {icon}
            </span>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-xs text-[var(--error)] flex items-center gap-1"
          >
            {error}
          </p>
        )}

        {/* Hint */}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-[var(--text-muted)]">
            {hint}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
