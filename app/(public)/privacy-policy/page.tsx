import type { Metadata } from "next"
import Link from "next/link"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

/* ── Metadata ── */
export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
  description: `Privacy Policy for ${SITE_NAME}. Learn how we collect, use, and protect your data.`,
  openGraph: {
    title: `Privacy Policy — ${SITE_NAME}`,
    url: `${SITE_URL}/privacy-policy`,
  },
}

/* ── Section component ── */
function PolicySection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10">
      <h2 className="font-syne font-bold text-xl text-[var(--text-primary)] mb-4">
        {title}
      </h2>
      <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
        {children}
      </div>
    </section>
  )
}

/* ── Page ── */
export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Header */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,102,255,0.08), transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-blue)] block mb-3">
            Legal
          </span>
          <h1 className="font-syne font-extrabold text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Last updated: March 21, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div
          className="rounded-2xl p-8 sm:p-10"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-default)",
          }}
        >
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
            Welcome to Growthency (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit{" "}
            <Link href="/" className="text-[var(--accent-blue)] hover:underline">
              growthency.com
            </Link>{" "}
            and use our services. Please read this policy carefully.
          </p>

          <PolicySection title="1. Information We Collect">
            <p>
              <strong className="text-[var(--text-primary)]">Personal Information:</strong> When you
              contact us, sign up, or purchase a plan, we may collect your name, email address,
              phone number, and payment information (processed securely by Stripe — we never store
              card details).
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Usage Data:</strong> We automatically
              collect information about how you interact with our platform, including pages visited,
              tools used, browser type, IP address, and referring URLs.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Cookies:</strong> We use cookies and
              similar tracking technologies to maintain session state, analyze site traffic, and
              provide a personalized experience. You can control cookie preferences in your browser
              settings.
            </p>
          </PolicySection>

          <PolicySection title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Provide, operate, and improve our services and tools</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative emails, updates, and support messages</li>
              <li>Send marketing communications (with your consent, opt-out anytime)</li>
              <li>Monitor and analyze usage patterns to improve the platform</li>
              <li>Detect and prevent fraudulent or unauthorized activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. How We Share Your Information">
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may
              share your information with:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong className="text-[var(--text-primary)]">Service Providers:</strong> Trusted
                third-party vendors (Stripe for payments, Clerk for authentication, Resend for
                email, Vercel for hosting) who process data on our behalf.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Legal Requirements:</strong> If
                required to comply with applicable law, regulation, legal process, or government
                request.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Business Transfers:</strong> In
                connection with a merger, acquisition, or sale of assets, with advance notice.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Data Retention">
            <p>
              We retain your personal information for as long as your account is active or as needed
              to provide services, comply with legal obligations, resolve disputes, and enforce
              agreements. You may request deletion of your data at any time.
            </p>
          </PolicySection>

          <PolicySection title="5. Security">
            <p>
              We implement industry-standard security measures including HTTPS encryption, secure
              password hashing, and access controls. However, no method of transmission over the
              internet is 100% secure and we cannot guarantee absolute security.
            </p>
          </PolicySection>

          <PolicySection title="6. Your Rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications</li>
              <li>Data portability (receive your data in a structured format)</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p>
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@growthency.com" className="text-[var(--accent-blue)] hover:underline">
                privacy@growthency.com
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection title="7. Children's Privacy">
            <p>
              Our services are not directed to children under the age of 13. We do not knowingly
              collect personal information from children. If you believe a child has provided us
              with personal information, please contact us immediately.
            </p>
          </PolicySection>

          <PolicySection title="8. Third-Party Links">
            <p>
              Our website may contain links to third-party sites. We are not responsible for the
              privacy practices of those sites and encourage you to review their privacy policies.
            </p>
          </PolicySection>

          <PolicySection title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant
              changes by email or via a prominent notice on our website. Your continued use of the
              service after changes become effective constitutes your acceptance.
            </p>
          </PolicySection>

          <PolicySection title="10. Contact Us">
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <div
              className="mt-3 p-4 rounded-xl"
              style={{
                background: "rgba(0,168,255,0.06)",
                border: "1px solid rgba(0,168,255,0.15)",
              }}
            >
              <p>
                <strong className="text-[var(--text-primary)]">Growthency</strong>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:privacy@growthency.com" className="text-[var(--accent-blue)] hover:underline">
                  privacy@growthency.com
                </a>
              </p>
              <p>Website: growthency.com</p>
            </div>
          </PolicySection>
        </div>

        {/* Links to other policies */}
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/terms-of-service" className="text-[var(--accent-blue)] hover:underline">
            Terms of Service
          </Link>
          <Link href="/refund-policy" className="text-[var(--accent-blue)] hover:underline">
            Refund Policy
          </Link>
          <Link href="/contact" className="text-[var(--accent-blue)] hover:underline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
