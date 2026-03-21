# 🔐 GROWTHENCY — API SECURITY ARCHITECTURE
**কোনো Secret Key কখনো Frontend-এ যাবে না**
*Next.js 15 App Router — Server-side Security Guide*

---

## THE GOLDEN RULE

```
❌ WRONG:  Frontend (Browser) → Stripe API directly
✅ RIGHT:  Frontend (Browser) → Next.js Server → Stripe API

❌ WRONG:  STRIPE_SECRET_KEY in client component
✅ RIGHT:  STRIPE_SECRET_KEY only in server (API Route / Server Action)
```

Browser-এ যা কিছু যায় — যেকেউ DevTools খুলে দেখতে পারে।
তাই সব secret key শুধু server-এ থাকবে, কখনো browser-এ না।

---

## কোন Key কোথায় থাকবে — Master Table

```
KEY                                    কোথায় থাকবে        Browser দেখতে পাবে?
─────────────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_CONVEX_URL                 .env.local          ✅ হ্যাঁ (safe, public)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY      .env.local          ✅ হ্যাঁ (safe, public)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY     .env.local          ✅ হ্যাঁ (safe, public)
NEXT_PUBLIC_APP_URL                    .env.local          ✅ হ্যাঁ (safe, public)
NEXT_PUBLIC_POSTHOG_KEY                .env.local          ✅ হ্যাঁ (safe, public)

STRIPE_SECRET_KEY                      .env.local          ❌ না — Server only
STRIPE_WEBHOOK_SECRET                  .env.local          ❌ না — Server only
CLERK_SECRET_KEY                       .env.local          ❌ না — Server only
CLERK_WEBHOOK_SECRET                   .env.local          ❌ না — Server only
CONVEX_DEPLOY_KEY                      .env.local          ❌ না — Server only
RESEND_API_KEY                         .env.local          ❌ না — Server only
ADMIN_EMAIL                            .env.local          ❌ না — Server only
SENTRY_DSN                             .env.local          ❌ না — Server only
```

### Rule টা সহজ:
```
NEXT_PUBLIC_ prefix আছে  →  Frontend-এও যেতে পারে (public safe)
NEXT_PUBLIC_ prefix নেই  →  শুধু Server, কখনো Client Component-এ না
```

---

## ARCHITECTURE — কীভাবে কাজ করবে

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (Frontend)                       │
│                                                                 │
│   React Client Components                                       │
│   শুধু NEXT_PUBLIC_ variables use করতে পারবে                   │
│                                                                 │
│   ❌ STRIPE_SECRET_KEY জানে না                                   │
│   ❌ RESEND_API_KEY জানে না                                      │
│   ❌ CLERK_SECRET_KEY জানে না                                    │
│                                                                 │
└──────────────────────┬──────────────────────────────────────────┘
                       │  HTTP Request (শুধু user data পাঠায়)
                       │  e.g. { priceId: "price_xxx" }
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER (Backend)                     │
│                                                                 │
│   API Routes:    app/api/stripe/checkout/route.ts               │
│   API Routes:    app/api/stripe/webhook/route.ts                │
│   API Routes:    app/api/webhooks/clerk/route.ts                │
│   Server Actions: app/actions/*.ts                              │
│   Server Components: (no "use client" directive)                │
│                                                                 │
│   ✅ সব Secret Key এখানেই থাকে                                  │
│   ✅ process.env.STRIPE_SECRET_KEY ← শুধু এখানে                 │
│   ✅ process.env.RESEND_API_KEY    ← শুধু এখানে                 │
│                                                                 │
└──────┬──────────────────┬────────────────────┬─────────────────┘
       │                  │                    │
       ▼                  ▼                    ▼
  Stripe API         Convex DB            Resend Email
  (secret key)       (deploy key)         (api key)
```

---

## প্রতিটা API Call — কীভাবে লিখবে

---

### 1. STRIPE — Checkout Session Create

```
❌ WRONG — এটা কখনো করবে না:
Client Component-এ সরাসরি Stripe call
```

```typescript
// ❌ WRONG — app/components/PricingCard.tsx (client component)
"use client";
import Stripe from "stripe";

// এটা করলে STRIPE_SECRET_KEY browser-এ expose হয়ে যাবে!
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); // ❌ NEVER
```

```
✅ RIGHT — এভাবে করবে:
Frontend শুধু fetch() দিয়ে নিজের server-এ request করবে
Server সেই request নিয়ে Stripe-এ call করবে
```

```typescript
// ✅ STEP 1: Frontend (Client Component)
// app/components/pricing/PricingCard.tsx
"use client";

export function PricingCard({ priceId, mode }) {
  const handleUpgrade = async () => {
    // শুধু নিজের server-এ call — Stripe-এ directly না
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, mode }),
    });
    const { url } = await res.json();
    window.location.href = url; // Stripe Checkout page-এ redirect
  };

  return (
    <button onClick={handleUpgrade}>
      Get Pro
    </button>
  );
}
```

```typescript
// ✅ STEP 2: Server API Route
// app/api/stripe/checkout/route.ts
// এই file-এ "use client" কখনো লিখবে না

import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

// Secret key শুধু এখানে — server-এ
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
//                                    ↑
//                         NEXT_PUBLIC_ নেই = server only ✅

export async function POST(req: Request) {
  // 1. User authenticated কিনা check (server-side)
  const { userId } = auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Request body নাও
  const { priceId, mode } = await req.json();

  // 3. Stripe-এ call করো (secret key server-এ থাকে)
  const session = await stripe.checkout.sessions.create({
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: { clerkUserId: userId },
  });

  // 4. Frontend-কে শুধু URL দাও — secret কিছু না
  return Response.json({ url: session.url });
}
```

---

### 2. STRIPE — Webhook Handler

```typescript
// ✅ app/api/stripe/webhook/route.ts
// Stripe সরাসরি এই server route-এ call করে
// Frontend-এর কোনো involvement নেই

import Stripe from "stripe";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature")!;

  // Webhook signature verify — fake request আসলে reject করবে
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET! // ← server only
    );
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  // Event handle করো
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const clerkUserId = session.metadata?.clerkUserId!;

      // Convex-এ user plan update করো
      await fetchMutation(api.users.updatePlan, {
        clerkId: clerkUserId,
        plan: session.mode === "payment" ? "lifetime" : "monthly",
        stripeCustomerId: session.customer as string,
      });
      break;

    case "customer.subscription.deleted":
      // User downgrade to free
      break;
  }

  return new Response("OK", { status: 200 });
}
```

---

### 3. RESEND — Email পাঠানো

```typescript
// ❌ WRONG — Client Component থেকে Resend call
// RESEND_API_KEY expose হয়ে যাবে

// ✅ RIGHT — Server Action দিয়ে
// app/actions/email.ts
"use server"; // ← এই directive মানে এটা শুধু server-এ চলবে

import { Resend } from "resend";

// Server-এ secret key — safe ✅
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  // Server Action — browser-এ এই code যায় না
  await resend.emails.send({
    from: "Growthency <hello@growthency.com>",
    to: process.env.ADMIN_EMAIL!,
    subject: `New Contact: ${formData.name}`,
    html: `<p>${formData.message}</p>`,
  });
}
```

```typescript
// ✅ Frontend — Server Action call করো
// app/components/ContactForm.tsx
"use client";
import { sendContactEmail } from "@/app/actions/email";

export function ContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Server Action — internally server-এ যায়, API key expose হয় না
    await sendContactEmail({ name, email, message });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

### 4. CONVEX — Database Call

```
Convex-এর ক্ষেত্রে situation একটু আলাদা।
NEXT_PUBLIC_CONVEX_URL public হলেও সমস্যা নেই কারণ:
  → Convex নিজেই authentication handle করে (Clerk JWT দিয়ে)
  → Convex functions-এ তুমি নিজে auth check লিখবে
  → কেউ URL জানলেও unauthorized access করতে পারবে না
```

```typescript
// convex/posts.ts — Convex function-এ auth check
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Public query — যে কেউ পড়তে পারবে (blog posts)
export const getPublished = query({
  handler: async (ctx) => {
    return ctx.db
      .query("posts")
      .filter(q => q.eq(q.field("status"), "published"))
      .collect();
  },
});

// Protected mutation — শুধু admin
export const createPost = mutation({
  args: { title: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    // Auth check — Convex server-এ হয়
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Admin check
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", q => q.eq("clerkId", identity.subject))
      .first();
    if (user?.role !== "admin") throw new Error("Not authorized");

    return ctx.db.insert("posts", { ...args, status: "draft" });
  },
});
```

---

### 5. CLERK — Auth Check (Server-side)

```typescript
// ✅ Server Component-এ auth check
// app/dashboard/page.tsx (Server Component — no "use client")

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Server-এ auth check — CLERK_SECRET_KEY server-এ থাকে
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();

  return <div>Welcome {user?.firstName}</div>;
}
```

```typescript
// ✅ API Route-এ auth check
// app/api/some-protected-route/route.ts

import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = auth();

  // Authenticated না হলে reject
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // এখন safe — authenticated user-এর জন্য কাজ করো
}
```

---

## Server Action vs API Route — কখন কোনটা?

```
SERVER ACTION ব্যবহার করো যখন:
  → Form submission (contact form, newsletter signup)
  → Simple database write (profile update, toggle)
  → Email পাঠানো
  → File upload

  ফাইল: app/actions/[name].ts
  Directive: "use server" (file-এর শুরুতে)

API ROUTE ব্যবহার করো যখন:
  → Stripe checkout session create
  → Stripe webhook receive
  → Clerk webhook receive
  → Third-party service যেগুলো callback/webhook পাঠায়
  → External app থেকে call আসতে পারে

  ফাইল: app/api/[path]/route.ts
  Method: GET, POST, PUT, DELETE export করো
```

---

## .env.local — সম্পূর্ণ File

```bash
# ════════════════════════════════════════════
# PUBLIC — NEXT_PUBLIC_ prefix আছে
# Browser-এও যেতে পারে, sensitive না
# ════════════════════════════════════════════

NEXT_PUBLIC_APP_URL=https://growthency.com
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID=price_...
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# ════════════════════════════════════════════
# SECRET — NEXT_PUBLIC_ prefix নেই
# শুধু Server-এ থাকবে, কখনো Client Component-এ না
# ════════════════════════════════════════════

# Clerk
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_...
CLERK_JWT_ISSUER_DOMAIN=https://your-instance.clerk.accounts.dev

# Convex
CONVEX_DEPLOY_KEY=prod:...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend Email
RESEND_API_KEY=re_...
FROM_EMAIL=hello@growthency.com
ADMIN_EMAIL=your-personal@email.com

# Sentry
SENTRY_DSN=https://...@sentry.io/...
```

---

## .gitignore — অবশ্যই এটা থাকতে হবে

```bash
# .gitignore

# Environment files — কখনো GitHub-এ push করবে না
.env
.env.local
.env.development
.env.production
.env*.local

# এগুলোও
.vercel
.convex
```

---

## Agent-কে দেওয়ার জন্য — Quick Rules Summary

```
RULE 1: STRIPE_SECRET_KEY
  শুধু: app/api/stripe/checkout/route.ts
  শুধু: app/api/stripe/webhook/route.ts
  কখনো না: কোনো Client Component-এ ("use client" আছে যেখানে)

RULE 2: RESEND_API_KEY
  শুধু: app/actions/email.ts ("use server" directive দিয়ে)
  শুধু: app/api/webhooks/ routes-এ
  কখনো না: কোনো Client Component-এ

RULE 3: CLERK_SECRET_KEY
  Next.js এবং Clerk নিজেই handle করে
  তুমি directly use করবে না
  auth() এবং currentUser() use করবে server-এ

RULE 4: CONVEX_DEPLOY_KEY
  শুধু: CI/CD deploy time-এ
  কখনো না: কোনো component-এ

RULE 5: যেকোনো নতুন secret key যোগ করলে
  NEXT_PUBLIC_ ছাড়া রাখো
  শুধু API Route বা Server Action-এ use করো
  Client Component-এ কখনো process.env.SECRET_KEY লিখবে না

RULE 6: Client Component চেনার উপায়
  ফাইলের শুরুতে "use client" আছে = Client Component
  "use client" নেই = Server Component (safe for secrets)
  "use server" আছে = Server Action (safe for secrets)
```

---

## Security Checklist — Deploy করার আগে

```
□ .env.local .gitignore-এ আছে?
□ GitHub repo-তে কোনো .env file push হয়নি?
□ সব secret key Vercel Dashboard-এ add করা হয়েছে?
□ কোনো Client Component-এ NEXT_PUBLIC_ ছাড়া env var নেই?
□ Stripe webhook secret verify করা হচ্ছে?
□ সব API route-এ auth() check আছে (protected routes-এ)?
□ Convex functions-এ auth check আছে (sensitive mutations-এ)?
□ Browser DevTools-এ Network tab-এ কোনো secret key দেখা যাচ্ছে না?
```

---

*Growthency Security Architecture v1.0*
*Next.js 15 App Router — Server-first Security*
