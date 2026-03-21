export const dynamic = "force-dynamic"

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

    const body = await req.json()
    const { priceId, mode } = body as { priceId?: string; mode?: string }

    if (!priceId || !mode) {
      return Response.json({ error: "Missing priceId or mode" }, { status: 400 })
    }

    if (!["payment", "subscription"].includes(mode)) {
      return Response.json({ error: "Invalid mode. Must be 'payment' or 'subscription'" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: { clerkUserId: userId },
      allow_promotion_codes: true,
    })

    return Response.json({ url: session.url })
  } catch (error) {
    console.error("[stripe/checkout] Error:", error)
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
