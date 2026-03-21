import type { Metadata } from "next"
import Link from "next/link"
import { Shield, CheckCircle2, XCircle, Mail } from "lucide-react"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { Button } from "@/components/ui/Button"

/* ── Metadata ── */
export const metadata: Metadata = {
  title: `Refund Policy — ${SITE_NAME}`,
  description: `30-day money-back guarantee. ${SITE_NAME}'s refund policy for subscriptions and one-time purchases.`,
  openGraph: {
    title: `Refund Policy — ${SITE_NAME}`,
    url: `${SITE_URL}/refund-policy`,
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
export default function RefundPolicyPage() {
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
            Refund Policy
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Last updated: March 21, 2026
          </p>
        </div>
      </section>

      {/* 30-day guarantee highlight */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div
          className="rounded-2xl p-7 flex items-center gap-5"
          style={{
            background: "rgba(0,230,118,0.08)",
            border: "1px solid rgba(0,230,118,0.3)",
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(0,230,118,0.12)" }}
          >
            <Shield size={26} className="text-[#00E676]" />
          </div>
          <div>
            <h2 className="font-syne font-bold text-lg text-[var(--text-primary)] mb-1">
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Not satisfied? Email us within 30 days of your first payment for a full refund —
              no questions asked, no hassle.
            </p>
          </div>
        </div>
      </div>

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
            We want you to be fully satisfied with Growthency. Our refund policy is designed to be
            fair and straightforward. Please read carefully to understand what is covered.
          </p>

          <PolicySection title="1. Subscription Plans (Pro Monthly / Pro Yearly)">
            <p>
              <strong className="text-[var(--text-primary)]">30-day guarantee:</strong> If you are
              not satisfied with your Pro subscription within the first 30 days of your{" "}
              <em>first</em> purchase, you are eligible for a full refund. Contact us at{" "}
              <a href="mailto:support@growthency.com" className="text-[var(--accent-blue)] hover:underline">
                support@growthency.com
              </a>{" "}
              with your account email and reason (optional).
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Renewals:</strong> After the first 30
              days, subscription renewals are generally non-refundable. However, if you experience
              a technical issue or service outage that significantly impacts your use, please
              contact us — we will review on a case-by-case basis.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Cancellation:</strong> You may cancel
              your subscription at any time. Cancellation stops future charges; it does not
              generate a refund for the current billing period. Access continues until the period
              ends.
            </p>
          </PolicySection>

          <PolicySection title="2. Lifetime Plan">
            <p>
              The Lifetime plan is eligible for a full refund within 30 days of purchase under
              the same terms as subscriptions. After 30 days, the Lifetime plan is non-refundable.
            </p>
          </PolicySection>

          <PolicySection title="3. Agency Services (Web Dev, Design, Marketing, etc.)">
            <p>
              Refund eligibility for project-based services depends on the project stage:
            </p>
            <div className="space-y-3 mt-2">
              {/* Eligible */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: "rgba(0,230,118,0.08)",
                  border: "1px solid rgba(0,230,118,0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={15} className="text-[#00E676]" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    Eligible for Refund
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-secondary)]">
                  <li>Project cancelled before work has started: 100% refund</li>
                  <li>Discovery/planning phase only completed: 75% refund</li>
                  <li>Significant failure to deliver agreed deliverables: reviewed individually</li>
                </ul>
              </div>

              {/* Not eligible */}
              <div
                className="rounded-xl p-4"
                style={{
                  background: "rgba(255,23,68,0.08)",
                  border: "1px solid rgba(255,23,68,0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <XCircle size={15} className="text-[#FF1744]" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    Not Eligible for Refund
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs text-[var(--text-secondary)]">
                  <li>Work completed and delivered as agreed</li>
                  <li>Project cancelled mid-development (completed milestones are non-refundable)</li>
                  <li>Change-of-mind after project completion</li>
                  <li>Scope creep or changes you requested beyond original agreement</li>
                </ul>
              </div>
            </div>
          </PolicySection>

          <PolicySection title="4. How to Request a Refund">
            <p>To request a refund, email us at:</p>
            <div
              className="mt-3 p-4 rounded-xl"
              style={{
                background: "rgba(0,168,255,0.06)",
                border: "1px solid rgba(0,168,255,0.15)",
              }}
            >
              <p className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                <Mail size={14} className="text-[var(--accent-blue)]" />
                <a href="mailto:support@growthency.com" className="text-[var(--accent-blue)] hover:underline">
                  support@growthency.com
                </a>
              </p>
            </div>
            <p>Please include:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Your account email address</li>
              <li>Order or subscription ID (found in your account or receipt email)</li>
              <li>Reason for refund request (optional but helpful)</li>
            </ul>
            <p>
              We process refund requests within 3–5 business days. Refunds are returned to your
              original payment method. Bank processing may take an additional 5–10 business days.
            </p>
          </PolicySection>

          <PolicySection title="5. Disputes and Chargebacks">
            <p>
              Please contact us before initiating a chargeback with your bank. Chargebacks
              initiated without first contacting us may result in account suspension. We are
              committed to resolving disputes fairly and quickly.
            </p>
          </PolicySection>

          <PolicySection title="6. Changes to This Policy">
            <p>
              We reserve the right to modify this Refund Policy at any time. Changes will apply
              to purchases made after the updated date. Existing subscription terms are honored
              under the policy that was in effect at the time of purchase.
            </p>
          </PolicySection>
        </div>

        {/* CTA */}
        <div
          className="mt-8 rounded-2xl p-7 flex flex-col sm:flex-row items-center gap-5"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-default)",
          }}
        >
          <div className="flex-1">
            <h3 className="font-syne font-bold text-base text-[var(--text-primary)] mb-1">
              Need help with a refund?
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Our support team is ready to help. We respond within 24 hours.
            </p>
          </div>
          <Button asChild size="md">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>

        {/* Links to other policies */}
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/privacy-policy" className="text-[var(--accent-blue)] hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-[var(--accent-blue)] hover:underline">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-[var(--accent-blue)] hover:underline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
