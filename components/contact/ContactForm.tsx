"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { CONTACT_BUDGET_OPTIONS, CONTACT_SERVICE_OPTIONS } from "@/lib/constants"
import { sendContactEmail } from "@/app/actions/email"
import { cn } from "@/lib/utils"

/* ── Validation schema ── */
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

/* ── Field wrapper ── */
function Field({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--text-secondary)]">
        {label}
        {required && <span className="text-[#FF1744] ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-[#FF1744] flex items-center gap-1">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass = cn(
  "w-full h-11 px-4 rounded-xl text-sm",
  "bg-[var(--bg-card)] text-[var(--text-primary)]",
  "border border-[var(--border-default)]",
  "outline-none transition-all duration-200",
  "placeholder:text-[var(--text-muted)]",
  "focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_rgba(0,168,255,0.12)]"
)

/* ── Main component ── */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(data: ContactFormValues) {
    setStatus("loading")
    setErrorMsg("")
    try {
      // TODO: Also save to Convex once deployed:
      // await saveLead({ ...data })

      await sendContactEmail({
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        budget: data.budget,
        message: data.message,
      })
      setStatus("success")
      reset()
    } catch (err) {
      console.error("[ContactForm] submit error:", err)
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      )
      setStatus("error")
    }
  }

  /* Success state */
  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-10 flex flex-col items-center text-center"
        style={{
          background: "var(--bg-card)",
          border: "1px solid rgba(0,230,118,0.3)",
        }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: "rgba(0,230,118,0.12)" }}
        >
          <CheckCircle2 size={40} className="text-[#00E676]" />
        </div>
        <h3 className="font-syne font-extrabold text-2xl text-[var(--text-primary)] mb-3">
          Message sent!
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-sm">
          {`We've received your message and will reply within 24 hours. Check your inbox for a confirmation.`}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-[var(--accent-blue)] hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" error={errors.name?.message} required>
          <input
            {...register("name")}
            placeholder="John Smith"
            className={cn(inputClass, errors.name && "border-[#FF1744]")}
          />
        </Field>
        <Field label="Email Address" error={errors.email?.message} required>
          <input
            {...register("email")}
            type="email"
            placeholder="john@company.com"
            className={cn(inputClass, errors.email && "border-[#FF1744]")}
          />
        </Field>
      </div>

      {/* Phone */}
      <Field label="Phone Number" error={errors.phone?.message}>
        <input
          {...register("phone")}
          type="tel"
          placeholder="+1 (555) 000-0000"
          className={inputClass}
        />
      </Field>

      {/* Service + Budget row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Service Interested In" error={errors.service?.message}>
          <select
            {...register("service")}
            className={cn(inputClass, "cursor-pointer")}
            defaultValue=""
          >
            <option value="" disabled>
              Select a service…
            </option>
            {CONTACT_SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget Range" error={errors.budget?.message}>
          <select
            {...register("budget")}
            className={cn(inputClass, "cursor-pointer")}
            defaultValue=""
          >
            <option value="" disabled>
              Select budget…
            </option>
            {CONTACT_BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Message */}
      <Field label="Message" error={errors.message?.message} required>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Tell us about your project, goals, and timeline…"
          className={cn(
            inputClass,
            "h-auto py-3 resize-none",
            errors.message && "border-[#FF1744]"
          )}
        />
      </Field>

      {/* Error banner */}
      {status === "error" && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl text-sm"
          style={{
            background: "rgba(255,23,68,0.1)",
            border: "1px solid rgba(255,23,68,0.3)",
            color: "#FF1744",
          }}
        >
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full h-12 rounded-xl font-semibold text-sm text-white transition-all duration-300 relative overflow-hidden disabled:opacity-60 disabled:pointer-events-none hover:shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:-translate-y-px"
        style={{ background: "linear-gradient(135deg, #0066FF, #00FFD1)" }}
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending…
          </span>
        ) : (
          "Send Message"
        )}
      </button>

      <p className="text-xs text-center text-[var(--text-muted)]">
        We reply within 24 hours. Your information is never shared.
      </p>
    </form>
  )
}
