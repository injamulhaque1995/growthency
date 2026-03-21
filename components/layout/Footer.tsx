"use client"

import { useState } from "react"
import Link from "next/link"
import { Linkedin, Twitter, Github, Youtube, Instagram, ArrowRight, CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { SERVICES, SOCIAL_LINKS, SITE_TAGLINE } from "@/lib/constants"
import { cn } from "@/lib/utils"

/* ── Newsletter schema ── */
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})
type NewsletterFormData = z.infer<typeof newsletterSchema>

/* ── Subcomponents ── */
function FooterLogo() {
  return (
    <Link href="/" className="inline-flex items-center group mb-3">
      <span className="font-syne text-xl font-extrabold tracking-tight text-white group-hover:opacity-90 transition-opacity">
        GROWTH
        <span
          style={{
            background: "linear-gradient(135deg, #0066FF, #00FFD1)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ENCY
        </span>
      </span>
    </Link>
  )
}

const SOCIAL_ICONS = [
  { key: "linkedin", Icon: Linkedin, label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { key: "twitter", Icon: Twitter, label: "Twitter / X", href: SOCIAL_LINKS.twitter },
  { key: "github", Icon: Github, label: "GitHub", href: SOCIAL_LINKS.github },
  { key: "youtube", Icon: Youtube, label: "YouTube", href: SOCIAL_LINKS.youtube },
  { key: "instagram", Icon: Instagram, label: "Instagram", href: SOCIAL_LINKS.instagram },
]

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/about#team" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
]

export function Footer() {
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, source: "footer" }),
      })
      setSuccess(true)
      reset()
    } catch {
      // silently fail — in prod, handle toast error here
    }
  }

  return (
    <footer className="bg-[#050810] border-t border-[#1A2440]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ── Col 1: Brand ── */}
          <div className="flex flex-col">
            <FooterLogo />
            <p className="text-[#8899BB] text-sm leading-relaxed mb-6 max-w-[220px]">
              {SITE_TAGLINE}
            </p>
            <p className="text-[#4A5878] text-xs mb-4">Follow us</p>
            <div className="flex items-center gap-3">
              {SOCIAL_ICONS.map(({ key, Icon, label, href }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4A5878] hover:text-[#00A8FF] hover:bg-[#0D1428] transition-all duration-200 border border-[#1A2440] hover:border-[rgba(0,168,255,0.3)]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Services ── */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[#8899BB] hover:text-[#00A8FF] text-sm transition-colors duration-200 group flex items-center gap-1.5"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 opacity-0 group-hover:opacity-100">
                      <ArrowRight size={12} />
                    </span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Company ── */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#8899BB] hover:text-[#00A8FF] text-sm transition-colors duration-200 group flex items-center gap-1.5"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 opacity-0 group-hover:opacity-100">
                      <ArrowRight size={12} />
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Newsletter ── */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest mb-2">
              Newsletter
            </h3>
            <p className="text-[#8899BB] text-sm mb-5 leading-relaxed">
              Growth tips, tool updates, and case studies. No spam.
            </p>

            {success ? (
              <div className="flex items-center gap-2 text-[#00E676] text-sm bg-[#00E676]/10 border border-[#00E676]/20 rounded-btn px-4 py-3">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>You&apos;re subscribed! Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email")}
                    className={cn(
                      "w-full bg-[#0D1428] border rounded-input px-4 py-2.5 text-sm text-white placeholder-[#4A5878] outline-none transition-all duration-200",
                      "focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_rgba(0,168,255,0.15)]",
                      errors.email ? "border-[#FF1744]" : "border-[#1A2440]"
                    )}
                  />
                  {errors.email && (
                    <p className="text-[#FF1744] text-xs">{errors.email.message}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full text-sm py-2.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Subscribing…
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 pt-6 border-t border-[#1A2440] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#4A5878] text-sm">
            © 2025 Growthency.com. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#4A5878] text-sm">
            <Link href="/privacy" className="hover:text-[#00A8FF] transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-[#00A8FF] transition-colors">
              Terms of Service
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/refund" className="hover:text-[#00A8FF] transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
