import type { Metadata } from "next"
import Link from "next/link"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

/* ── Metadata ── */
export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${SITE_NAME}. Your rights and responsibilities when using our platform.`,
  openGraph: {
    title: "Terms of Service",
    url: `${SITE_URL}/terms-of-service`,
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
export default function TermsOfServicePage() {
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
            Terms of Service
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
            Please read these Terms of Service carefully before using the Growthency platform. By
            accessing or using our services, you agree to be bound by these terms. If you disagree,
            please discontinue use immediately.
          </p>

          <PolicySection title="1. Acceptance of Terms">
            <p>
              By creating an account or using any Growthency service, you confirm that you are at
              least 18 years of age and have the legal authority to enter into this agreement. If
              you are using our services on behalf of a business, you represent that you have
              authority to bind that entity.
            </p>
          </PolicySection>

          <PolicySection title="2. Description of Services">
            <p>
              Growthency provides a digital agency platform including web and mobile development
              services, digital marketing, UI/UX design, AI integration, automation, and a suite of
              business growth tools. Service availability is subject to your subscription plan.
            </p>
          </PolicySection>

          <PolicySection title="3. User Accounts">
            <p>
              You are responsible for maintaining the confidentiality of your account credentials
              and for all activities that occur under your account. You agree to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Provide accurate and complete information during registration</li>
              <li>Notify us immediately of unauthorized access</li>
              <li>Not share your account with any third party</li>
              <li>Use the platform only for lawful purposes</li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Subscription Plans and Billing">
            <p>
              Growthency offers Free, Pro Monthly, Pro Yearly, and Lifetime plans. By subscribing
              to a paid plan, you authorize us to charge your payment method on a recurring basis
              (monthly or yearly) until cancelled.
            </p>
            <p>
              Prices may change with 30 days notice. You will not be charged for plan changes until
              your next billing cycle. All charges are non-refundable except as outlined in our
              Refund Policy.
            </p>
          </PolicySection>

          <PolicySection title="5. Acceptable Use">
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Use the platform to generate or distribute illegal, harmful, or misleading content</li>
              <li>Attempt to reverse-engineer, scrape, or copy any part of the platform</li>
              <li>Upload malware, viruses, or malicious code</li>
              <li>Use automated bots to access the platform in a way that exceeds your plan limits</li>
              <li>Impersonate any person or entity</li>
              <li>Engage in any activity that disrupts the platform or other users</li>
              <li>
                Use our tools to generate content that violates third-party intellectual property
                rights
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="6. Intellectual Property">
            <p>
              <strong className="text-[var(--text-primary)]">Our IP:</strong> Growthency owns all
              rights to the platform, its design, tools, and underlying technology. Nothing in
              these terms grants you ownership of our intellectual property.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Your Content:</strong> You retain
              ownership of content you create using our tools. By using the platform, you grant us
              a limited, non-exclusive license to display and process your content as necessary to
              provide the service.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Client Work:</strong> For agency
              services (web development, design, etc.), ownership of deliverables transfers to you
              upon final payment as outlined in your service agreement.
            </p>
          </PolicySection>

          <PolicySection title="7. Disclaimers">
            <p>
              THE PLATFORM IS PROVIDED {`"AS IS"`} WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              OR NON-INFRINGEMENT. We do not guarantee that the platform will be uninterrupted,
              error-free, or free of security vulnerabilities.
            </p>
          </PolicySection>

          <PolicySection title="8. Limitation of Liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, GROWTHENCY SHALL NOT BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR
              USE OF THE PLATFORM, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL
              LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </PolicySection>

          <PolicySection title="9. Termination">
            <p>
              Either party may terminate this agreement at any time. We reserve the right to
              suspend or terminate accounts that violate these terms without notice. Upon
              termination, your right to use the platform ceases immediately.
            </p>
          </PolicySection>

          <PolicySection title="10. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with applicable law. Any
              disputes shall first be attempted to be resolved through good-faith negotiation.
            </p>
          </PolicySection>

          <PolicySection title="11. Changes to Terms">
            <p>
              We reserve the right to modify these Terms at any time. Significant changes will be
              communicated via email or platform notification. Continued use after changes take
              effect constitutes acceptance.
            </p>
          </PolicySection>

          <PolicySection title="12. Contact">
            <p>
              For questions about these Terms, contact us at{" "}
              <a href="mailto:legal@growthency.com" className="text-[var(--accent-blue)] hover:underline">
                legal@growthency.com
              </a>
              .
            </p>
          </PolicySection>
        </div>

        {/* Links to other policies */}
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/privacy-policy" className="text-[var(--accent-blue)] hover:underline">
            Privacy Policy
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
