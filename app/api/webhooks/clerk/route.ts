import { headers } from "next/headers"
import { createHmac } from "crypto"
// import { fetchMutation } from "convex/nextjs"
// import { api } from "@/convex/_generated/api"

// ─────────────────────────────────────────────────────────────────────────────
// Svix webhook verification
// svix sends three headers: svix-id, svix-timestamp, svix-signature
// The signed content is: `${svix-id}.${svix-timestamp}.${rawBody}`
// The secret is the raw bytes of the webhook secret (after the "whsec_" prefix
// is stripped and the remainder is base64-decoded).
// ─────────────────────────────────────────────────────────────────────────────
function verifySvixWebhook(
  rawBody: string,
  svixId: string,
  svixTimestamp: string,
  svixSignature: string,
  secret: string
): boolean {
  // Clerk webhook secrets are prefixed with "whsec_"
  const secretBytes = Buffer.from(secret.replace(/^whsec_/, ""), "base64")
  const toSign = `${svixId}.${svixTimestamp}.${rawBody}`
  const hmac = createHmac("sha256", secretBytes)
  hmac.update(toSign)
  const computedSignature = `v1,${hmac.digest("base64")}`

  // svix-signature may contain multiple space-separated signatures
  const signatures = svixSignature.split(" ")
  return signatures.some((s) => s === computedSignature)
}

// ─────────────────────────────────────────────────────────────────────────────
// Clerk event types (minimal subset)
// ─────────────────────────────────────────────────────────────────────────────
interface ClerkEmailAddress {
  email_address: string
  id: string
  verification?: { status: string }
}

interface ClerkUserCreatedData {
  id: string
  email_addresses: ClerkEmailAddress[]
  first_name: string | null
  last_name: string | null
  image_url: string | null
  primary_email_address_id: string | null
}

interface ClerkWebhookEvent {
  type: string
  data: ClerkUserCreatedData
}

function getPrimaryEmail(data: ClerkUserCreatedData): string {
  if (data.primary_email_address_id) {
    const primary = data.email_addresses.find(
      (e) => e.id === data.primary_email_address_id
    )
    if (primary) return primary.email_address
  }
  return data.email_addresses[0]?.email_address ?? ""
}

function getFullName(data: ClerkUserCreatedData): string {
  const parts = [data.first_name, data.last_name].filter(Boolean)
  return parts.join(" ") || "Unknown"
}

export async function POST(req: Request) {
  const rawBody = await req.text()
  const headersList = await headers()

  const svixId = headersList.get("svix-id")
  const svixTimestamp = headersList.get("svix-timestamp")
  const svixSignature = headersList.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return Response.json({ error: "Missing svix headers" }, { status: 400 })
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error("[webhooks/clerk] CLERK_WEBHOOK_SECRET is not set")
    return Response.json({ error: "Webhook secret not configured" }, { status: 500 })
  }

  const isValid = verifySvixWebhook(
    rawBody,
    svixId,
    svixTimestamp,
    svixSignature,
    webhookSecret
  )

  if (!isValid) {
    console.warn("[webhooks/clerk] Invalid webhook signature")
    return Response.json({ error: "Invalid webhook signature" }, { status: 401 })
  }

  let event: ClerkWebhookEvent
  try {
    event = JSON.parse(rawBody) as ClerkWebhookEvent
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  try {
    switch (event.type) {
      // ──────────────────────────────────────────────
      // USER CREATED
      // ──────────────────────────────────────────────
      case "user.created": {
        const data = event.data
        const email = getPrimaryEmail(data)
        const name = getFullName(data)

        console.log(`[webhooks/clerk] user.created — id=${data.id} email=${email}`)

        // TODO: uncomment once Convex is deployed
        // await fetchMutation(api.users.create, {
        //   clerkId: data.id,
        //   email,
        //   name,
        //   avatarUrl: data.image_url ?? undefined,
        // })
        break
      }

      // ──────────────────────────────────────────────
      // USER UPDATED
      // ──────────────────────────────────────────────
      case "user.updated": {
        const data = event.data
        const email = getPrimaryEmail(data)
        const name = getFullName(data)

        console.log(`[webhooks/clerk] user.updated — id=${data.id}`)

        // TODO: uncomment once Convex is deployed
        // await fetchMutation(api.users.update, {
        //   clerkId: data.id,
        //   email,
        //   name,
        //   avatarUrl: data.image_url ?? undefined,
        // })
        break
      }

      // ──────────────────────────────────────────────
      // USER DELETED
      // ──────────────────────────────────────────────
      case "user.deleted": {
        const data = event.data
        console.log(`[webhooks/clerk] user.deleted — id=${data.id}`)

        // TODO: uncomment once Convex is deployed
        // await fetchMutation(api.users.deleteByClerkId, { clerkId: data.id })
        break
      }

      default:
        console.log(`[webhooks/clerk] Unhandled event type: ${event.type}`)
    }
  } catch (err) {
    console.error("[webhooks/clerk] Handler error:", err)
    return Response.json({ error: "Webhook handler error" }, { status: 500 })
  }

  return Response.json({ received: true })
}
