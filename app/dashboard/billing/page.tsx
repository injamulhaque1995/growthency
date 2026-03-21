import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { UpgradeButton } from "@/components/dashboard/UpgradeButton"
import { ManageSubscriptionButton } from "@/components/dashboard/ManageSubscriptionButton"
import { CheckCircle, FileText, Calendar, CreditCard } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Billing",
}

// Static placeholder — replace with Convex query once connected
const MOCK_PLAN = {
  name: "Free",
  price: "$0",
  renewalDate: null as string | null,
  stripeCustomerId: null as string | null,
}

const MOCK_INVOICES: { id: string; date: string; amount: number; status: string; url?: string }[] = []

const FEATURES_FREE = [
  "3 tool uses per day",
  "Access to all free tools",
  "Community support",
]

const FEATURES_PRO = [
  "Unlimited tool uses",
  "All Pro tools unlocked",
  "Priority support",
  "Early access to new tools",
  "Advanced analytics",
]

export default async function BillingPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const isFreePlan = MOCK_PLAN.name === "Free"

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl text-[#F0F4FF] mb-1">
          Billing
        </h1>
        <p className="text-[#8899BB] text-sm">
          Manage your subscription and payment details.
        </p>
      </div>

      {/* Current plan card */}
      <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <div>
            <p className="text-xs text-[#4A5878] font-medium uppercase tracking-wide mb-1">
              Current Plan
            </p>
            <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-2xl text-[#F0F4FF]">
              {MOCK_PLAN.name}
            </h2>
            <p className="text-[#00A8FF] font-medium text-sm mt-0.5">
              {MOCK_PLAN.price}
              {isFreePlan ? " — forever" : " / month"}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium bg-[#0D1428] border-[#1A2440]">
            <span className={`w-2 h-2 rounded-full ${isFreePlan ? "bg-[#8899BB]" : "bg-[#00E676]"}`} />
            <span className={isFreePlan ? "text-[#8899BB]" : "text-[#00E676]"}>
              {isFreePlan ? "Free" : "Active"}
            </span>
          </div>
        </div>

        {/* Plan features */}
        <div className="grid sm:grid-cols-2 gap-6 pb-6 border-b border-[#1A2440]">
          {/* Current */}
          <div>
            <p className="text-xs font-medium text-[#4A5878] uppercase tracking-wide mb-3">
              What you have
            </p>
            <ul className="space-y-2">
              {FEATURES_FREE.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#8899BB]">
                  <CheckCircle className="w-4 h-4 text-[#00A8FF] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {/* Pro preview */}
          {isFreePlan && (
            <div className="bg-gradient-to-br from-[#0066FF]/10 to-[#00FFD1]/5 border border-[#0066FF]/20 rounded-xl p-4">
              <p className="text-xs font-medium text-[#00A8FF] uppercase tracking-wide mb-3">
                Unlock with Pro
              </p>
              <ul className="space-y-2">
                {FEATURES_PRO.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#8899BB]">
                    <CheckCircle className="w-4 h-4 text-[#00FFD1] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-6">
          {isFreePlan ? (
            <>
              <UpgradeButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID}
                mode="subscription"
                label="Upgrade to Pro Monthly — $9.99/mo"
                size="md"
              />
              <UpgradeButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID}
                mode="subscription"
                label="Upgrade Yearly — $99.99/yr"
                size="md"
                className="bg-[linear-gradient(135deg,#6C3FFF,#00FFD1)]!"
              />
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 h-10 px-5 text-sm font-medium text-[#8899BB] border border-[#1A2440] rounded-[10px] hover:border-[#00A8FF] hover:text-[#00A8FF] transition-all duration-200"
              >
                View all plans
              </Link>
            </>
          ) : (
            <ManageSubscriptionButton
              customerId={MOCK_PLAN.stripeCustomerId || ""}
            />
          )}
        </div>

        {/* Renewal info */}
        {!isFreePlan && MOCK_PLAN.renewalDate && (
          <div className="flex items-center gap-2 mt-4 text-sm text-[#8899BB]">
            <Calendar className="w-4 h-4" />
            Renews on {MOCK_PLAN.renewalDate}
          </div>
        )}
      </div>

      {/* Payment method — only show for paid */}
      {!isFreePlan && (
        <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-4 h-4 text-[#00A8FF]" />
            <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[#F0F4FF]">
              Payment Method
            </h2>
          </div>
          <p className="text-sm text-[#8899BB]">
            Payment details are managed securely through Stripe.
          </p>
          <ManageSubscriptionButton
            customerId={MOCK_PLAN.stripeCustomerId || ""}
            label="Manage Payment Method"
            className="mt-4"
          />
        </div>
      )}

      {/* Invoice history */}
      <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-[#00A8FF]" />
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[#F0F4FF]">
            Invoice History
          </h2>
        </div>

        {MOCK_INVOICES.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-8 h-8 text-[#1A2440] mx-auto mb-2" />
            <p className="text-sm text-[#4A5878]">No invoices yet.</p>
            {isFreePlan && (
              <p className="text-xs text-[#4A5878] mt-1">
                Invoices will appear here once you upgrade to a paid plan.
              </p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-[#1A2440]">
            {MOCK_INVOICES.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <div>
                  <p className="text-[#F0F4FF] font-medium">{inv.date}</p>
                  <p className="text-xs text-[#4A5878]">{inv.id}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#F0F4FF]">{inv.amount}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20">
                    {inv.status}
                  </span>
                  <a
                    href={inv.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00A8FF] hover:text-[#00E5FF] transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
