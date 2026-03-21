# 🔧 Growthency — Environment Variables Setup Guide

সব service এর API key এখানে listed আছে। নিচের checklist অনুযায়ী সব fill করো।

---

## 📁 File Location

Project root এ `.env.local` নামে একটা file আছে।
সেই file এ নিচের সব values replace করো।

---

## ✅ Complete Checklist

### 1. 🔐 CLERK — Authentication (Sign In / Sign Up)

**Website:** https://clerk.com

**Steps:**
1. clerk.com এ গিয়ে account খোলো
2. "Create Application" click করো
3. Application name: `Growthency`
4. Sign-in methods: Email + Google select করো
5. Dashboard → **API Keys** এ যাও
6. নিচের values copy করো

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxx
```

---

### 2. 💳 STRIPE — Payments (Pro / Lifetime Plans)

**Website:** https://stripe.com

**Steps:**
1. stripe.com এ account খোলো
2. Dashboard → **Developers → API Keys** থেকে keys copy করো

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxx
```

**Products তৈরি করো (3টা):**

Dashboard → **Products → Add Product**

| Product Name     | Price  | Billing       | Price ID Variable                         |
|------------------|--------|---------------|-------------------------------------------|
| Pro Monthly      | $9     | Recurring/Monthly | `NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID`  |
| Pro Yearly       | $99    | Recurring/Yearly  | `NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID`   |
| Lifetime Access  | $199   | One-time          | `NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID` |

Product তৈরির পর প্রতিটার **Price ID** copy করো (শুরু হবে `price_` দিয়ে)

```
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID=price_xxxxxxxxxxxxxxxxxx
```

**Webhook setup:**

Dashboard → **Developers → Webhooks → Add Endpoint**
- Endpoint URL: `https://growthency.vercel.app/api/stripe/webhook`
- Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- Signing secret copy করো

```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxx
```

---

### 3. 🗄️ CONVEX — Database

**Website:** https://convex.dev

**Steps:**
1. convex.dev এ account খোলো
2. "New Project" click করো → Project name: `growthency`
3. Dashboard → **Settings** থেকে values copy করো

```
NEXT_PUBLIC_CONVEX_URL=https://xxxxxxxxx.convex.cloud
CONVEX_DEPLOY_KEY=prod:xxxxxxxxxxxxxxxxxx
```

**Deploy করতে terminal এ run করো:**
```bash
npx convex deploy
```

---

### 4. 📧 RESEND — Email (Contact Form / Notifications)

**Website:** https://resend.com

**Steps:**
1. resend.com এ account খোলো
2. Dashboard → **API Keys → Create API Key**
3. Name: `Growthency`, Permission: Full Access

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
```

---

### 5. 🌐 APP URL

```
NEXT_PUBLIC_APP_URL=https://growthency.vercel.app
```

> ✏️ Custom domain থাকলে `growthency.vercel.app` এর জায়গায় সেটা দাও (যেমন: `https://growthency.com`)

---

## 📋 Complete `.env.local` Template

সব values fill করার পর `.env.local` এভাবে দেখাবে:

```env
# ════════════════════════════════════════════
# APP
# ════════════════════════════════════════════
NEXT_PUBLIC_APP_URL=https://growthency.vercel.app

# ════════════════════════════════════════════
# CLERK — Authentication
# ════════════════════════════════════════════
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxx

# ════════════════════════════════════════════
# STRIPE — Payments
# ════════════════════════════════════════════
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID=price_xxxxxxxxxxxxxxxxxx

# ════════════════════════════════════════════
# CONVEX — Database
# ════════════════════════════════════════════
NEXT_PUBLIC_CONVEX_URL=https://xxxxxxxxx.convex.cloud
CONVEX_DEPLOY_KEY=prod:xxxxxxxxxxxxxxxxxx

# ════════════════════════════════════════════
# RESEND — Email
# ════════════════════════════════════════════
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
```

---

## 🚀 Vercel এ Add করার নিয়ম

Local এ `.env.local` এ add করলেই হবে না — Vercel এও add করতে হবে।

**Steps:**
1. https://vercel.com এ যাও
2. `growthency` project এ click করো
3. **Settings → Environment Variables** এ যাও
4. উপরের সব variables একটা একটা করে add করো
5. Save করার পর **Redeploy** করো

> ⚠️ `CLERK_SECRET_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `CONVEX_DEPLOY_KEY`, `RESEND_API_KEY` — এগুলো কখনো GitHub এ push করো না। `.env.local` file `.gitignore` এ already আছে তাই safe।

---

## 🔴 Priority Order

সবচেয়ে আগে যেগুলো লাগবে:

| Priority | Service | কেন দরকার |
|----------|---------|-----------|
| 1st | **Clerk** | Sign In / Sign Up কাজ করবে |
| 2nd | **Stripe** | Payment নেওয়া যাবে |
| 3rd | **Convex** | Database (tools usage, user data) |
| 4th | **Resend** | Contact form email |

---

*Generated for Growthency — growthency.vercel.app*
