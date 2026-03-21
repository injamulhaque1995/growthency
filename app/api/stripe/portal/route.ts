export const dynamic = "force-dynamic"

// Server-only — STRIPE_SECRET_KEY only here, never exposed to the client
import { auth } from "@clerk/nextjs/server"
import Stripe from "stripe"

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_placeholder", {
    apiVersion: "2026-02-25.clover",
  })
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { customerId } = await req.json()
    if (!customerId) {
      return Response.json({ error: "No Stripe customer" }, { status: 400 })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    })

    return Response.json({ url: session.url })
  } catch (error) {
    console.error("[stripe/portal] Error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
