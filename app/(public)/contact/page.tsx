import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock, Linkedin, Twitter, Github } from "lucide-react"
import { SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/constants"
import { ContactForm } from "@/components/contact/ContactForm"

/* ── Metadata ── */
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Growthency team. We reply within 24 hours and offer free project estimates.",
  openGraph: {
    title: "Contact",
    url: `${SITE_URL}/contact`,
  },
}

/* ── Contact info items ── */
const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@growthency.com",
    href: "mailto:hello@growthency.com",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Remote — Worldwide",
    href: null,
  },
]

/* ── Page ── */
export default function ContactPage() {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,102,255,0.12), transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue)] mb-4">
            Get In Touch
          </span>
          <h1 className="font-syne font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] leading-tight mb-6">
            {`Let's Build Something`}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Great
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            We reply within 24 hours. Tell us about your project and {`we'll`} get the
            conversation started.
          </p>
        </div>
      </section>

      {/* Main content — 2 col */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form — left (3 cols) */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl p-8 sm:p-10"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-default)",
              }}
            >
              <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-6">
                Send us a message
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Info — right (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Contact info */}
            <div
              className="rounded-2xl p-7"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-default)",
              }}
            >
              <h3 className="font-syne font-bold text-lg text-[var(--text-primary)] mb-5">
                Contact Information
              </h3>
              <ul className="space-y-5">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,168,255,0.1)" }}
                    >
                      <Icon size={17} className="text-[var(--accent-blue)]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[var(--text-muted)] mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-[var(--text-primary)] hover:text-[var(--accent-blue)] transition-colors duration-200"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-[var(--text-primary)]">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social links */}
            <div
              className="rounded-2xl p-7"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-default)",
              }}
            >
              <h3 className="font-syne font-bold text-lg text-[var(--text-primary)] mb-5">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(0,168,255,0.08)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Linkedin size={15} />
                  LinkedIn
                </a>
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(0,168,255,0.08)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Twitter size={15} />
                  Twitter / X
                </a>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(0,168,255,0.08)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Github size={15} />
                  GitHub
                </a>
              </div>
            </div>

            {/* Quick note */}
            <div
              className="rounded-2xl p-7"
              style={{
                background: "rgba(0,102,255,0.06)",
                border: "1px solid rgba(0,168,255,0.2)",
              }}
            >
              <h3 className="font-syne font-bold text-sm text-[var(--accent-blue)] mb-2 uppercase tracking-[0.1em]">
                Free Estimate
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Not sure of your budget or scope? Send us a message anyway — we offer free,
                no-obligation project estimates for every inquiry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
