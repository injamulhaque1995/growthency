export const dynamic = "force-dynamic"

import Stripe from "stripe"
// import { fetchMutation } from "convex/nextjs"
// import { api } from "@/convex/_generated/api"

// Determine plan type from a Stripe checkout session
function getPlanFromSession(
  session: Stripe.Checkout.Session
): "monthly" | "yearly" | "lifetime" {
  if (session.mode === "payment") return "lifetime"
  // For subscriptions we'd normally inspect the price interval —
  // use metadata set on the price if available, otherwise fall back to monthly.
  const interval = (session as unknown as { interval?: string }).interval
  if (interval === "year") return "yearly"
  return "monthly"
}

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_placeholder", {
    apiVersion: "2026-02-25.clover",
  })
  const rawBody = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) {
    return Response.json({ error: "Missing stripe-signature header" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("[stripe/webhook] Signature verification failed:", message)
    return Response.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      // ──────────────────────────────────────────────
      // CHECKOUT SESSION COMPLETED
      // ──────────────────────────────────────────────
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const clerkUserId = session.metadata?.clerkUserId

        if (!clerkUserId) {
          console.warn("[stripe/webhook] checkout.session.completed: missing clerkUserId in metadata")
          break
        }

        const plan = getPlanFromSession(session)
        const stripeCustomerId =
          typeof session.customer === "string" ? session.customer : session.customer?.id
        const stripeSubscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id

        console.log(
          `[stripe/webhook] checkout.session.completed — user=${clerkUserId} plan=${plan} customer=${stripeCustomerId}`
        )

        // TODO: uncomment once Convex is deployed
        // await fetchMutation(api.users.updatePlan, {
        //   clerkId: clerkUserId,
        //   plan,
        //   stripeCustomerId,
        //   stripeSubscriptionId,
        //   subscriptionStatus: "active",
        // })
        break
      }

      // ──────────────────────────────────────────────
      // SUBSCRIPTION UPDATED
      // ──────────────────────────────────────────────
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const clerkUserId = subscription.metadata?.clerkUserId

        if (!clerkUserId) {
          console.warn("[stripe/webhook] customer.subscription.updated: missing clerkUserId in metadata")
          break
        }

        // Determine plan from price interval
        const priceItem = subscription.items.data[0]
        const interval = priceItem?.price?.recurring?.interval
        const plan: "monthly" | "yearly" = interval === "year" ? "yearly" : "monthly"

        const currentPeriodEnd =
          // current_period_end is in seconds; convert to ms
          (subscription as unknown as { current_period_end?: number }).current_period_end
            ? (subscription as unknown as { current_period_end: number }).current_period_end * 1000
            : undefined

        console.log(
          `[stripe/webhook] customer.subscription.updated — user=${clerkUserId} status=${subscription.status} plan=${plan}`
        )

        // TODO: uncomment once Convex is deployed
        // await fetchMutation(api.users.updatePlan, {
        //   clerkId: clerkUserId,
        //   plan,
        //   stripeSubscriptionId: subscription.id,
        //   subscriptionStatus: subscription.status,
        //   currentPeriodEnd,
        // })
        break
      }

      // ──────────────────────────────────────────────
      // SUBSCRIPTION DELETED (cancelled / expired)
      // ──────────────────────────────────────────────
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const clerkUserId = subscription.metadata?.clerkUserId

        if (!clerkUserId) {
          console.warn("[stripe/webhook] customer.subscription.deleted: missing clerkUserId in metadata")
          break
        }

        console.log(
          `[stripe/webhook] customer.subscription.deleted — user=${clerkUserId}, downgrading to free`
        )

        // TODO: uncomment once Convex is deployed
        // await fetchMutation(api.users.updatePlan, {
        //   clerkId: clerkUserId,
        //   plan: "free",
        //   stripeSubscriptionId: subscription.id,
        //   subscriptionStatus: subscription.status,
        // })
        break
      }

      // ──────────────────────────────────────────────
      // INVOICE PAYMENT FAILED
      // ──────────────────────────────────────────────
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        const customerId =
          typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id

        console.error(
          `[stripe/webhook] invoice.payment_failed — customer=${customerId} amount_due=${invoice.amount_due} attempt=${invoice.attempt_count}`
        )

        // TODO: look up user by stripeCustomerId and mark subscription as past_due
        // await fetchMutation(api.users.updatePlan, { ... subscriptionStatus: "past_due" })
        break
      }

      default:
        console.log(`[stripe/webhook] Unhandled event type: ${event.type}`)
    }
  } catch (err) {
    console.error("[stripe/webhook] Handler error:", err)
    return Response.json({ error: "Webhook handler error" }, { status: 500 })
  }

  return Response.json({ received: true })
}
