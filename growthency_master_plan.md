# 🚀 GROWTHENCY.COM — COMPLETE MASTER PLAN
**Stack: Next.js 15 + Convex + Clerk + Stripe + Vercel**
*growthency.com | Built by a Software Engineer, for Business Growth*

---

## TABLE OF CONTENTS

1. [Tech Stack — Final Decision](#1-tech-stack--final-decision)
2. [Brand Identity & Design System](#2-brand-identity--design-system)
3. [Folder & Project Structure](#3-folder--project-structure)
4. [Site Architecture & URL Map](#4-site-architecture--url-map)
5. [Page-by-Page Blueprint](#5-page-by-page-blueprint)
6. [Database Schema (Convex)](#6-database-schema-convex)
7. [Authentication — Clerk Setup](#7-authentication--clerk-setup)
8. [Blog System](#8-blog-system)
9. [Tools System & Rate Limiting](#9-tools-system--rate-limiting)
10. [Subscription & Pricing Model](#10-subscription--pricing-model)
11. [Stripe Payment Integration](#11-stripe-payment-integration)
12. [Admin Panel (Developer Only)](#12-admin-panel-developer-only)
13. [Navigation & Global UI Components](#13-navigation--global-ui-components)
14. [Design & Animation Specifications](#14-design--animation-specifications)
15. [SEO Strategy](#15-seo-strategy)
16. [Email System (Resend)](#16-email-system-resend)
17. [Environment Variables](#17-environment-variables)
18. [Deployment — Vercel](#18-deployment--vercel)
19. [Development Roadmap & Phases](#19-development-roadmap--phases)
20. [Quick Reference Cheatsheet](#20-quick-reference-cheatsheet)

---

## 1. TECH STACK — FINAL DECISION

### Why Next.js over WordPress (for Growthency)

| Requirement | WordPress | Next.js |
|---|---|---|
| SaaS Tools with rate limiting | Plugin hell | Native React components |
| Stripe subscription + usage tracking | WooCommerce mess | Clean API routes |
| Convex real-time database | Not possible | First-class support |
| 3D animations, particle effects, wow UI | Theme limitations | Three.js, Framer Motion |
| User dashboard with tool history | Very complex | App Router + Clerk |
| Blog SEO | Mature (Yoast) | Metadata API (equally good) |
| Long-term scalability | Plugin bloat | Full control |
| You are a Software Engineer | Fighting the tool | In your element |

**Verdict: Next.js is the only real option for what Growthency needs.**

---

### Complete Tech Stack

```
FRONTEND
  Framework:        Next.js 15 (App Router, React 19)
  Language:         TypeScript (strict mode)
  Styling:          Tailwind CSS v4
  Animations:       Framer Motion + CSS custom keyframes
  3D / WebGL:       Three.js (hero section)
  Icons:            Lucide React + custom SVGs
  Fonts:            next/font — Syne + DM Sans + JetBrains Mono
  Form Handling:    React Hook Form + Zod

BACKEND / DATABASE
  Database:         Convex (real-time, serverless — one DB for everything)
  File Storage:     Convex File Storage (blog images, avatars)
  Search:           Convex full-text search (blog posts, tools)

AUTH
  Provider:         Clerk (with Convex JWT integration)

PAYMENTS
  Provider:         Stripe
  Subscriptions:    Stripe Billing (monthly + yearly)
  One-time:         Stripe Payment Intents (lifetime)
  Webhooks:         Stripe → Next.js API Route → Convex mutation

EMAIL
  Provider:         Resend + React Email templates

DEPLOYMENT & INFRA
  Hosting:          Vercel (Edge Network)
  Domain:           growthency.com
  Analytics:        Vercel Analytics + PostHog
  Monitoring:       Sentry
```

---

## 2. BRAND IDENTITY & DESIGN SYSTEM

### Brand Positioning

> "We Build. We Scale. We Grow."
> Growthency helps new businesses launch from zero and existing businesses break through their growth ceiling — using modern software, AI tools, and proven digital strategy.

### Target Audience
- New entrepreneurs / startup founders who need a tech partner
- Existing business owners who want to digitize and scale
- Anyone who needs web/mobile apps, marketing, or automation

### Design Philosophy

**"How is this even a website?"** — Every visitor should feel this.
The design should communicate: *This person is technically extraordinary.*

Aesthetic direction: **Cinematic Dark-Tech with Light Mode Option**
- Light mode default: clean, airy, professional — with glow accents
- Dark mode: deep space, electric blue, glowing elements
- NOT a generic agency website — this should feel like a product, not a brochure

---

### Color Palette

```css
/* LIGHT MODE (default) */
--bg-primary:      #F5F7FF;
--bg-surface:      #FFFFFF;
--bg-card:         #F0F4FF;
--bg-card-hover:   #E8EEFF;
--text-primary:    #0A0F1E;
--text-secondary:  #4A5568;
--text-muted:      #8899AA;
--border-default:  #E2E8F0;
--border-glow:     rgba(0, 102, 255, 0.2);

/* DARK MODE */
--bg-primary:      #050810;
--bg-surface:      #0A0F1E;
--bg-card:         #0D1428;
--bg-card-hover:   #111B35;
--text-primary:    #F0F4FF;
--text-secondary:  #8899BB;
--text-muted:      #4A5878;
--border-default:  #1A2440;
--border-glow:     rgba(0, 168, 255, 0.3);

/* SHARED ACCENTS */
--accent-blue:     #00A8FF;
--accent-cyan:     #00E5FF;
--gradient:        linear-gradient(135deg, #0066FF, #00FFD1);
--glow-blue:       0 0 40px rgba(0, 168, 255, 0.35);
--success:         #00E676;
--warning:         #FFB300;
--error:           #FF1744;
--radius-card:     16px;
--radius-btn:      10px;
--radius-input:    8px;
--transition:      all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

---

### Typography

```
Display Headings:   "Syne" ExtraBold 800
                    Large hero text, section titles
                    Futuristic, architectural feel

Body / UI:          "DM Sans" Regular/Medium 400 500
                    All body copy, descriptions, nav links
                    Clean, modern, highly readable

Code / Technical:   "JetBrains Mono" Regular 400
                    Code blocks, technical labels, stats
                    Signals engineering credibility

Decorative Numbers: "Bebas Neue" Regular
                    Counter stats (50+, 99%, etc.)
                    Large bold impact numbers
```

### Logo System

```
Primary:    GROWTHENCY wordmark in Syne ExtraBold
            "GROWTH" white/dark + "ENCY" in blue gradient

Icon:       Stylized upward arrow that doubles as:
            - A circuit board trace (tech identity)
            - A growth chart spike (business identity)
            - Blue-to-Cyan gradient fill with inner glow

Files to create:
  /public/logo/logo-full-dark.svg
  /public/logo/logo-full-light.svg
  /public/logo/logo-icon-only.svg
  /public/logo/favicon.ico
  /public/og-image.png            (1200x630 for Open Graph)
```

---

## 3. FOLDER & PROJECT STRUCTURE

```
growthency/
│
├── app/
│   ├── (public)/                     Public routes layout group
│   │   ├── layout.tsx                Public layout (navbar + footer)
│   │   ├── page.tsx                  Home /
│   │   ├── services/
│   │   │   ├── page.tsx              /services
│   │   │   └── [slug]/page.tsx       /services/web-app-development
│   │   ├── tools/
│   │   │   ├── page.tsx              /tools
│   │   │   └── [slug]/page.tsx       /tools/seo-meta-generator
│   │   ├── blog/
│   │   │   └── page.tsx              /blog (listing only)
│   │   ├── [slug]/
│   │   │   └── page.tsx              /how-you-can-scale-your-digital-business-with-us
│   │   ├── pricing/page.tsx          /pricing
│   │   ├── team/page.tsx             /team
│   │   ├── about/page.tsx            /about
│   │   └── contact/page.tsx          /contact
│   │
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   │
│   ├── dashboard/
│   │   ├── layout.tsx                Dashboard layout (sidebar)
│   │   ├── page.tsx                  /dashboard overview
│   │   ├── tools/page.tsx            /dashboard/tools
│   │   ├── billing/page.tsx          /dashboard/billing
│   │   └── profile/page.tsx          /dashboard/profile
│   │
│   ├── admin/
│   │   ├── layout.tsx                Admin layout (role check)
│   │   ├── page.tsx                  /admin dashboard
│   │   ├── posts/
│   │   │   ├── page.tsx              All posts list
│   │   │   ├── new/page.tsx          Create post
│   │   │   └── [id]/page.tsx         Edit post
│   │   ├── tools/page.tsx            Manage tools registry
│   │   ├── team/page.tsx             Manage team members
│   │   └── contacts/page.tsx         View contact submissions
│   │
│   └── api/
│       ├── stripe/
│       │   ├── webhook/route.ts      Stripe webhook handler
│       │   └── checkout/route.ts     Create checkout session
│       ├── webhooks/
│       │   └── clerk/route.ts        Clerk user sync webhook
│       └── og/route.tsx              Dynamic OG image generation
│
├── components/
│   ├── ui/                           Base design system
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── ThemeToggle.tsx
│   ├── home/                         Home page sections
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ToolsTeaser.tsx
│   │   ├── WhySection.tsx
│   │   ├── BlogTeaser.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTABanner.tsx
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── PostHeader.tsx
│   │   ├── TableOfContents.tsx
│   │   └── RelatedPosts.tsx
│   ├── tools/
│   │   ├── ToolCard.tsx
│   │   ├── UsageBar.tsx
│   │   ├── UpgradePrompt.tsx
│   │   ├── ToolWrapper.tsx
│   │   └── tools/                   Individual tool components
│   │       ├── SeoMetaGenerator.tsx
│   │       ├── BusinessNameGenerator.tsx
│   │       └── ...
│   ├── pricing/
│   │   ├── PricingCard.tsx
│   │   ├── BillingToggle.tsx
│   │   └── ComparisonTable.tsx
│   └── shared/
│       ├── AnimatedCounter.tsx
│       ├── ScrambleText.tsx
│       ├── GlowOrbs.tsx
│       ├── ParticleCanvas.tsx
│       └── SectionHeader.tsx
│
├── convex/
│   ├── schema.ts
│   ├── users.ts
│   ├── posts.ts
│   ├── tools.ts
│   ├── toolUsage.ts
│   ├── contacts.ts
│   ├── team.ts
│   ├── testimonials.ts
│   ├── subscribers.ts
│   ├── stripe.ts
│   └── auth.config.ts
│
├── lib/
│   ├── stripe.ts
│   ├── utils.ts                      cn(), formatDate(), slugify()
│   ├── constants.ts                  PLANS, TOOL_LIMITS, SITE_URL
│   └── validations.ts                Shared Zod schemas
│
├── hooks/
│   ├── useTheme.ts
│   ├── useScrollToTop.ts
│   ├── useToolUsage.ts
│   └── useSubscription.ts
│
├── types/index.ts
├── public/
├── styles/globals.css
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
└── .env.local
```

---

## 4. SITE ARCHITECTURE & URL MAP

```
growthency.com/

  /                                           HOME
  /services                                   All services overview
  /services/web-app-development
  /services/mobile-app-development
  /services/digital-marketing
  /services/ui-ux-design
  /services/custom-software
  /services/ai-integration
  /services/automations

  /tools                                      Tools hub
  /tools/[tool-slug]                          Individual tool

  /blog                                       Blog listing page
  /[post-slug]                                Blog posts live at ROOT level
  e.g. /how-you-can-scale-your-digital-business-with-us

  /pricing                                    Subscription plans
  /team
  /about
  /contact

  /dashboard                                  Protected
  /dashboard/tools
  /dashboard/billing
  /dashboard/profile

  /admin                                      Developer only
  /admin/posts
  /admin/posts/new
  /admin/posts/[id]
  /admin/tools
  /admin/team
  /admin/contacts

  /sign-in
  /sign-up
  /privacy-policy
  /terms-of-service
  /refund-policy
```

> **Note on Blog URLs:** Posts live at root level (`/[slug]`), not under `/blog/`.
> This gives shorter, cleaner URLs which is better for SEO.
> The `/blog` route is only the listing/index page.

---

## 5. PAGE-BY-PAGE BLUEPRINT

---

### 5.1 HOME PAGE ( / )

**Section 1 — Hero (100vh, full screen)**
```
BACKGROUND:
  Three.js animated particle mesh (sparse floating dots, connected by lines)
  2-3 large blurred glowing orbs drifting slowly (CSS radial gradients)
  Subtle CSS grid pattern overlay (very faint lines)

CONTENT (centered, vertical stack):

  Small eyebrow label:
  "— SOFTWARE ENGINEER & GROWTH PARTNER —"
  (Syne, uppercase, letter-spacing 0.2em, accent-blue)

  Main headline (scramble text reveal on page load):
  "We Build."      white, Syne ExtraBold
  "We Scale."      white, Syne ExtraBold
  "We Grow."       gradient blue-to-cyan, Syne ExtraBold
  Font: clamp(48px, 8vw, 96px)

  Sub-headline (fade in, 0.5s delay):
  "From zero to launch, from growth to dominance —
   Growthency engineers your success."

  CTA row (slide up, 0.8s delay):
  [Explore Services →]   primary gradient button
  [View Our Tools]       ghost button with border glow

  Scroll indicator:
  Animated bouncing chevron + "Scroll to explore"

BOTTOM BAR:
  Infinite marquee of tech logos
  "Built with:" → React, Next.js, Flutter, Node.js, Stripe,
  Convex, Three.js, Figma, AWS, Tailwind, etc.
  Auto-scrolling, pauses on hover
```

**Section 2 — Social Proof / Stats**
```
Full-width dark card, 4-column grid:

  [50+]                [30+]              [7]                  [99%]
  Projects Delivered   Happy Clients      Core Services        Satisfaction Rate

Each stat:
  Number: Bebas Neue, large, gradient colored
  Label: DM Sans, muted text
  Animation: count-up from 0 over 2s (triggers on scroll into view)
  Card: subtle glow border, glassmorphism background
```

**Section 3 — Core Services Grid**
```
Heading: "What We Do" (small label) + "Core Capabilities" (large Syne)
         "Capabilities" in gradient blue-to-cyan

3-column grid (2 tablet, 1 mobile):

7 Service Cards + "More Coming" placeholder:
  Each card:
    Rounded square icon (dark bg, blue icon, glows on hover)
    Service name (DM Sans Medium)
    2-line description (muted text)
    "Learn more →" (appears on hover)
  Hover effect: lifts -8px, border glows, icon animates
  3D tilt on mouse move (CSS perspective + rotateX/Y)

Services:
  1. Web App Development      globe icon
  2. Mobile App Development   smartphone icon
  3. Digital Marketing        megaphone icon (includes video editing)
  4. UI/UX Design             palette icon
  5. Custom Software          code icon
  6. AI Integration           cpu/brain icon
  7. Automations              zap icon
  [More Coming]               dashed border, muted, coming soon badge
```

**Section 4 — Tools Teaser**
```
Heading: "Power Tools for Modern Business"
Sub: "Free to try. Unlimited with Pro."

3 featured tool cards with usage bar UI mockup
"3 free uses/day" chip on each
CTA: [Explore All Tools →]
Background: animated gradient mesh
```

**Section 5 — Why Growthency (Split Layout)**
```
LEFT:
  "Why Choose Growthency"
  5 feature points with icons:
    Lightning: Blazing Fast Delivery
    Target: Results-Driven Approach
    Brain: AI-Powered Solutions
    Chart: Scalable Architecture
    Handshake: Dedicated Partnership

RIGHT:
  Floating code terminal that types live
  Orbiting tech stack icons (CSS 3D orbit animation)
  Subtle continuous slow rotation
```

**Section 6 — Featured Blog Posts**
```
Heading: "Insights & Growth Strategies"
3 latest published posts
Each card: cover image, category, title, excerpt, author, date, read time
Hover: image scales 1.05, card lifts
CTA: [Read All Articles →]
```

**Section 7 — Testimonials**
```
Auto-scrolling horizontal carousel (pauses on hover)
Each card:
  Client avatar + name + role + company
  5-star rating
  Quote text
  Service used badge
Background: alternating card styles, gradient borders
```

**Section 8 — CTA Banner**
```
Full-width animated gradient background
"Ready to Grow Your Business?"
"Let's build something extraordinary together."
[Start a Project →]   [Book a Free Call]
Decorative floating geometric shapes
```

**Section 9 — Footer**
```
4-column grid:
  Col 1: Logo + tagline + social icons
         (LinkedIn, Twitter/X, GitHub, YouTube, Instagram)
  Col 2: Services (7 links)
  Col 3: Company (About, Team, Blog, Pricing, Contact, Privacy, Terms)
  Col 4: Newsletter
         Email input + Subscribe button
         "Join 500+ business owners. No spam."

Bottom bar:
  Copyright 2025 Growthency.com
  Privacy Policy · Terms of Service · Refund Policy
```

---

### 5.2 SERVICES PAGE ( /services )

```
Hero: "Core Capabilities"
      "Everything you need to build, launch, and scale."

Full 7-service grid (same cards as home, larger with longer descriptions)
Each card links to /services/[slug]

CTA at bottom:
  "Don't see what you need? Let's talk."
  [Contact Us →]
```

**Individual Service Pages ( /services/[slug] )**
```
Each of the 7 services has a dedicated page:

1. HERO
   Large glowing service icon
   Service name + tagline
   [Start This Project →] button

2. PROBLEM / SOLUTION
   "The challenge you face" — pain points list
   "How we solve it" — our approach

3. WHAT'S INCLUDED
   Checklist of deliverables
   Animated checkmark reveal on scroll

4. OUR PROCESS (4-step horizontal timeline)
   Step 1: Discovery & Planning
   Step 2: Design & Architecture
   Step 3: Build & Test
   Step 4: Launch & Support

5. TECH STACK USED
   Icon grid of relevant technologies

6. PRICING RANGE
   "Starting from $X" or "Custom quote"
   [Get a Quote →]

7. FAQ ACCORDION
   5-7 common questions

8. RELATED SERVICES (3 cards)
```

---

### 5.3 TOOLS PAGE ( /tools )

```
Hero:
  "Business Growth Tools"
  "Powerful tools. Free to try. Unlimited with Pro."
  Badges: [3 Free Uses/Day] [No Credit Card Needed]

Filter tabs:
  All | Marketing | SEO | Development | Business | Content | Finance

Tools grid (3 cols desktop, 2 tablet, 1 mobile):

Each Tool Card:
  ┌─────────────────────────────────┐
  │ [Icon]  Tool Name    [PRO/FREE] │
  │ Short description text          │
  │ Category: Marketing             │
  │ ─────────────────────────────── │
  │ [████████░░] 2 of 3 used today  │
  │ (only shows when logged in)     │
  │          [Use Tool →]           │
  └─────────────────────────────────┘

  PRO badge: gradient blue, locked overlay for free users
  Usage bar: only visible to logged-in users
```

**Individual Tool Page ( /tools/[slug] )**
```
Header: Tool name + icon (large), one-line description
Feature list, category badge, free/pro badge

TOOL INTERFACE (main area):
  The actual interactive React component
  Input fields, submit button, results area
  Loading animation while processing

USAGE INDICATOR (logged in, free plan):
  1 of 3 free uses remaining today
  Upgrade for unlimited access
  [Upgrade to Pro →]

UPGRADE WALL (0 uses remaining):
  Daily limit reached (3/3 used)
  Come back tomorrow, or upgrade for unlimited
  [Upgrade to Pro — $9.99/mo]

NOT LOGGED IN:
  Tool UI visible
  On submit: slide-up modal
  "Sign in to use this tool"
  "Get 3 free uses per day, no credit card needed"
  [Sign In]  [Create Free Account]

RELATED TOOLS (bottom):
  3 tools in same category
```

---

### 5.4 BLOG PAGE ( /blog )

```
Hero: "Insights & Growth Strategies"
      Full-text search bar (Convex search)

Featured post (large card, full-width):
  Cover image, category, title, excerpt, [Read Article →]

Filter pills:
  All | Business Growth | Development | Marketing | Case Studies | Guides

Post grid (3 cols desktop):
  Each card: cover image, category, read time,
             title, excerpt, author + date, [Read More →]

Load more button (pagination)
```

---

### 5.5 BLOG POST PAGE ( /[post-slug] )

**Example URL:** `growthency.com/how-you-can-scale-your-digital-business-with-us`

```
LAYOUT (desktop, 2-column):

  Full-width hero image (60vh max height)

  [Category]  [5 min read]

  Post Title in Syne ExtraBold (large)

  [Author Avatar] Author Name · March 21, 2025

  ─────────────────────────────────────────────────
  │                           │                   │
  │  ARTICLE BODY (65ch max)  │  TABLE OF CONTENTS│
  │                           │  (sticky sidebar) │
  │  Headings (H2, H3)        │                   │
  │  Paragraphs               │  > Section 1      │
  │  Code blocks (highlighted)│  > Section 2      │
  │  Blockquotes              │  > Section 3      │
  │  Images (next/image)      │                   │
  │  Lists                    │  SHARE            │
  │  Callout boxes            │  [Twitter]        │
  │                           │  [LinkedIn]       │
  │  INLINE TOOL CTA:         │  [Copy Link]      │
  │  ┌─────────────────────┐  │                   │
  │  │ Related Tool        │  │                   │
  │  │ Try SEO Meta Gen →  │  │                   │
  │  └─────────────────────┘  │                   │
  │                           │                   │
  ─────────────────────────────────────────────────

  AUTHOR BIO CARD:
    Avatar, Name, Role, Bio, Social links

  RELATED POSTS (3 cards)
```

---

### 5.6 PRICING PAGE ( /pricing )

*(Full detail in Section 10)*

```
Hero: "Simple, Transparent Pricing"
      "Start free. Upgrade when you're ready."

BILLING TOGGLE: [Monthly]  ●  [Yearly — Save 17%]

3 PRICING CARDS:

  FREE          PRO MONTHLY (Popular)    LIFETIME (Best Value)
  $0/mo         $9.99/mo                 $199.99
                ($99.99/yr on yearly)    one-time payment

  3 uses/day    Unlimited uses           Unlimited forever
  Free tools    All paid tools           All future tools
                Priority support         Lifetime updates
                Export results           Early access
                No ads                   Priority support

  [Start Free]  [Get Pro →]              [Get Lifetime →]

30-day money-back guarantee badge
Feature comparison table (full matrix)
FAQ accordion (6-8 questions)
```

---

### 5.7 TEAM PAGE ( /team )

```
Hero: "Meet the Builders"
      "The engineers and strategists behind Growthency."

Team grid (3 cols desktop):
  Each card:
    Photo with CSS 3D tilt on hover
    Name (Syne Bold)
    Role (accent blue)
    Short bio (2-3 lines)
    Tech stack chips
    Social: LinkedIn, GitHub, Twitter

Bottom: "We're growing the team" + hiring CTA
```

---

### 5.8 ABOUT PAGE ( /about )

```
1. Hero: "Building the Future of Business,
          One Project at a Time"

2. Our Story: Mission narrative paragraph

3. Our Mission (3 pillars):
   Build → Scale → Grow
   Icon + title + paragraph each

4. Our Values (4 cards):
   Innovation | Transparency | Results | Partnership

5. Timeline (animated vertical):
   2024: Founded
   2024: First client
   2025: Tools platform launched
   2025: 50+ projects completed
   [Future milestone coming soon]

6. Tech Stack We Use:
   Infinite scrolling logo strip (dual rows, opposite directions)

7. CTA: "Want to work with us?"
   [Start a Project →]  [View Services]
```

---

### 5.9 CONTACT PAGE ( /contact )

```
Hero: "Let's Build Something Great"
      "We reply within 24 hours — guaranteed."

2-column layout:

LEFT — Form:
  Full Name *
  Email Address *
  Phone (optional)
  Service Interested In (dropdown):
    Web App | Mobile App | Digital Marketing | UI/UX |
    Custom Software | AI Integration | Automations | Other
  Budget Range (dropdown):
    Under $500 | $500-$2,000 | $2,000-$10,000 | $10,000+ | Let's discuss
  Message * (textarea)
  [Send Message →] (gradient, loading state)

  On submit:
    Convex mutation: insert into contacts table
    Resend: notify you via email
    Resend: auto-reply to user
    UI: success animation + message

RIGHT — Contact Info:
  hello@growthency.com
  Bangladesh (remote worldwide)
  Mon-Fri, 9am-6pm BST
  Average response: < 24 hours badge
  Large social icons
```

---

### 5.10 USER DASHBOARD ( /dashboard )

```
Layout: Sidebar (left) + Main content (right)

Sidebar Nav:
  Overview
  My Tools
  Billing
  Profile
  ← Back to Site

OVERVIEW:
  "Hey [Name]" welcome message
  Current plan badge
  Today's tool usage summary
  Quick access to 3 most-used tools
  Upgrade banner (free users)

TOOLS:
  Table: Tool | Uses Today | Uses This Month | Last Used
  Quick-launch buttons
  Upgrade prompt when near limit

BILLING:
  Current plan card (name, price, next renewal)
  [Upgrade Plan] or [Manage Subscription] button
  Stripe Customer Portal link (update card, cancel)
  Invoice history: Date | Amount | Status | Download PDF

PROFILE:
  Avatar upload (Convex storage)
  Name, Email (from Clerk)
  Notification preferences
  [Save Changes]
  Danger zone: Delete Account
```

---

## 6. DATABASE SCHEMA (CONVEX)

```typescript
// convex/schema.ts

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  // USERS — synced from Clerk on user.created / user.updated
  users: defineTable({
    clerkId:              v.string(),
    email:                v.string(),
    name:                 v.string(),
    avatarUrl:            v.optional(v.string()),
    role:                 v.union(v.literal("user"), v.literal("admin")),
    plan: v.union(
      v.literal("free"),
      v.literal("monthly"),
      v.literal("yearly"),
      v.literal("lifetime")
    ),
    stripeCustomerId:     v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    subscriptionStatus:   v.optional(v.string()),
    currentPeriodEnd:     v.optional(v.number()),
    createdAt:            v.number(),
    updatedAt:            v.number(),
  })
  .index("by_clerkId",          ["clerkId"])
  .index("by_email",            ["email"])
  .index("by_stripeCustomerId", ["stripeCustomerId"]),


  // TOOL USAGE — per user, per tool, per day
  toolUsage: defineTable({
    userId:      v.string(),
    toolSlug:    v.string(),
    date:        v.string(),    // "YYYY-MM-DD"
    usageCount:  v.number(),
    lastUsedAt:  v.number(),
  })
  .index("by_user_tool_date", ["userId", "toolSlug", "date"])
  .index("by_user_date",      ["userId", "date"]),


  // BLOG POSTS — managed via /admin
  posts: defineTable({
    title:           v.string(),
    slug:            v.string(),
    excerpt:         v.string(),
    content:         v.string(),       // Markdown string
    coverImageUrl:   v.optional(v.string()),
    coverImageId:    v.optional(v.id("_storage")),
    authorId:        v.string(),
    authorName:      v.string(),
    authorAvatarUrl: v.optional(v.string()),
    category:        v.string(),
    tags:            v.array(v.string()),
    status:          v.union(v.literal("draft"), v.literal("published")),
    readTimeMinutes: v.number(),
    viewCount:       v.number(),
    seoTitle:        v.optional(v.string()),
    seoDescription:  v.optional(v.string()),
    ogImageUrl:      v.optional(v.string()),
    publishedAt:     v.optional(v.number()),
    createdAt:       v.number(),
    updatedAt:       v.number(),
  })
  .index("by_slug",     ["slug"])
  .index("by_status",   ["status"])
  .index("by_category", ["category"])
  .searchIndex("search_posts", {
    searchField: "title",
    filterFields: ["status", "category"],
  }),


  // TOOLS REGISTRY — master list of all platform tools
  tools: defineTable({
    slug:           v.string(),
    name:           v.string(),
    description:    v.string(),
    category:       v.string(),
    isPaid:         v.boolean(),
    freeUsesPerDay: v.number(),
    isActive:       v.boolean(),
    orderIndex:     v.number(),
    iconName:       v.string(),
    badgeText:      v.optional(v.string()),
    createdAt:      v.number(),
  })
  .index("by_slug",     ["slug"])
  .index("by_category", ["category"])
  .index("by_active",   ["isActive"]),


  // CONTACTS — from contact form
  contacts: defineTable({
    name:      v.string(),
    email:     v.string(),
    phone:     v.optional(v.string()),
    service:   v.optional(v.string()),
    budget:    v.optional(v.string()),
    message:   v.string(),
    status:    v.union(
      v.literal("new"),
      v.literal("read"),
      v.literal("replied"),
      v.literal("archived")
    ),
    createdAt: v.number(),
  })
  .index("by_status",    ["status"])
  .index("by_createdAt", ["createdAt"]),


  // TEAM MEMBERS
  team: defineTable({
    name:        v.string(),
    role:        v.string(),
    bio:         v.string(),
    avatarUrl:   v.optional(v.string()),
    avatarId:    v.optional(v.id("_storage")),
    linkedinUrl: v.optional(v.string()),
    githubUrl:   v.optional(v.string()),
    twitterUrl:  v.optional(v.string()),
    skills:      v.array(v.string()),
    orderIndex:  v.number(),
    isActive:    v.boolean(),
  }),


  // TESTIMONIALS
  testimonials: defineTable({
    clientName:    v.string(),
    clientRole:    v.string(),
    clientCompany: v.string(),
    avatarUrl:     v.optional(v.string()),
    content:       v.string(),
    rating:        v.number(),
    service:       v.optional(v.string()),
    isActive:      v.boolean(),
    orderIndex:    v.number(),
  }),


  // NEWSLETTER SUBSCRIBERS
  subscribers: defineTable({
    email:        v.string(),
    subscribedAt: v.number(),
    isActive:     v.boolean(),
    source:       v.optional(v.string()),  // "footer" | "blog" | "pricing"
  })
  .index("by_email", ["email"]),

});
```

---

## 7. AUTHENTICATION — CLERK SETUP

### Why Clerk
- Drop-in React components (SignIn, SignUp, UserButton)
- Native Next.js 15 App Router support
- Built-in Convex integration via JWT
- Social login: Google + GitHub + Email/password
- User webhooks to sync with Convex

### Installation
```bash
npm install @clerk/nextjs convex
```

### Middleware
```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/admin(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

### Admin Role Check (Layout)
```typescript
// app/admin/layout.tsx
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await fetchQuery(api.users.getByClerkId, { clerkId: userId });
  if (user?.role !== "admin") redirect("/");

  return <>{children}</>;
}
```

### Sync Clerk Users to Convex
```typescript
// app/api/webhooks/clerk/route.ts
// Events to handle:
//   user.created  → insert user with plan: "free", role: "user"
//   user.updated  → update name, email, avatarUrl
//   user.deleted  → soft delete or anonymize
```

### Convex Auth Config
```typescript
// convex/auth.config.ts
export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
};
```

---

## 8. BLOG SYSTEM

### Architecture
- All posts in Convex `posts` table
- Content format: Markdown (string in Convex)
- Rendered with `react-markdown` + `remark-gfm` + `rehype-highlight`
- Written via `/admin/posts` editor (developer only)
- Static generation (generateStaticParams) for performance

### Convex Functions (convex/posts.ts)
```typescript
// PUBLIC QUERIES
getPublished()           // All published posts for /blog
getBySlug(slug)          // Single post for /[slug]
getLatest(limit)         // Latest N posts for homepage
getByCategory(category)  // Category-filtered posts
search(query)            // Full-text search

// ADMIN MUTATIONS (admin role required)
create(data)             // New draft post
update(id, data)         // Edit existing post
publish(id)              // Draft → Published (sets publishedAt)
unpublish(id)            // Published → Draft
remove(id)               // Delete post

// PUBLIC MUTATION
incrementViewCount(slug) // Called on post page load
```

### Admin Post Editor ( /admin/posts/new )
```
Fields:
  Title              → auto-generates slug
  Slug               → editable, must be unique
  Cover Image        → drag-and-drop upload to Convex storage
  Category           → dropdown
  Tags               → comma-separated
  SEO Title          → optional (defaults to title)
  SEO Description    → optional, 150 char max
  Content            → Markdown textarea with live preview
  Status             → Draft / Published toggle
  Published At       → date picker

Auto-features:
  Auto-save draft every 30 seconds
  Word count display
  Estimated read time (word count / 200)
  Slug preview: "growthency.com/[slug]"

Buttons: [Save Draft]  [Preview →]  [Publish]
```

### Blog Post Page SEO
```typescript
// app/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug);
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImageUrl || "/og-image.png"],
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
    },
    alternates: {
      canonical: `https://growthency.com/${post.slug}`,
    },
  };
}
```

---

## 9. TOOLS SYSTEM & RATE LIMITING

### Initial 12 Tools at Launch

| Tool | Category | Plan | Description |
|---|---|---|---|
| Business Name Generator | Business | Free | AI-powered name ideas + domain check |
| Hashtag Generator | Marketing | Free | Trending hashtags for any niche |
| Profit Margin Calculator | Finance | Free | Calculate margins and pricing |
| QR Code Generator | Utility | Free | Generate QR codes instantly |
| Color Palette Extractor | Design | Free | Brand colors from logo/image |
| SEO Meta Generator | SEO | Paid | Title, description, keywords |
| Social Caption Writer | Marketing | Paid | Captions for any platform |
| Invoice Generator | Business | Paid | Create and download PDF invoices |
| Keyword Idea Generator | SEO | Paid | Keywords with difficulty scores |
| Email Subject Line Scorer | Marketing | Paid | Score and improve subject lines |
| Blog Outline Generator | Content | Paid | Full article outlines from title |
| Privacy Policy Generator | Legal | Paid | Auto-generate legal pages |

### Rate Limiting (convex/toolUsage.ts)
```typescript
export const checkAndUse = mutation({
  args: {
    userId:   v.string(),
    toolSlug: v.string(),
  },
  handler: async (ctx, { userId, toolSlug }) => {
    const today = new Date().toISOString().split("T")[0];

    // 1. Get user — check plan
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", q => q.eq("clerkId", userId))
      .first();
    if (!user) throw new Error("User not found");

    // 2. Paid users → unlimited, just log
    if (user.plan !== "free") {
      await logUsage(ctx, userId, toolSlug, today);
      return { allowed: true, remaining: -1 };
    }

    // 3. Get tool's daily limit
    const tool = await ctx.db
      .query("tools")
      .withIndex("by_slug", q => q.eq("slug", toolSlug))
      .first();
    const DAILY_LIMIT = tool?.freeUsesPerDay ?? 3;

    // 4. Check today's usage
    const existing = await ctx.db
      .query("toolUsage")
      .withIndex("by_user_tool_date", q =>
        q.eq("userId", userId)
         .eq("toolSlug", toolSlug)
         .eq("date", today)
      ).first();
    const currentCount = existing?.usageCount ?? 0;

    // 5. Block if at limit
    if (currentCount >= DAILY_LIMIT) {
      return { allowed: false, remaining: 0 };
    }

    // 6. Increment usage
    if (existing) {
      await ctx.db.patch(existing._id, {
        usageCount: currentCount + 1,
        lastUsedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("toolUsage", {
        userId, toolSlug, date: today,
        usageCount: 1, lastUsedAt: Date.now(),
      });
    }

    return { allowed: true, remaining: DAILY_LIMIT - (currentCount + 1) };
  },
});
```

### Tool Wrapper Component
```tsx
// components/tools/ToolWrapper.tsx
"use client";

interface ToolWrapperProps {
  toolSlug: string;
  dailyLimit: number;
  children: (onUse: () => Promise<boolean>) => React.ReactNode;
}

export function ToolWrapper({ toolSlug, dailyLimit, children }: ToolWrapperProps) {
  const { user, isSignedIn } = useUser();
  const checkAndUse = useMutation(api.toolUsage.checkAndUse);
  const todayUsage = useQuery(
    api.toolUsage.getTodayUsage,
    isSignedIn ? { userId: user!.id, toolSlug } : "skip"
  );

  const handleUse = async (): Promise<boolean> => {
    if (!isSignedIn) {
      // Open sign-in modal
      return false;
    }
    const result = await checkAndUse({ userId: user.id, toolSlug });
    return result.allowed;
  };

  const usageCount = todayUsage ?? 0;
  const remaining = Math.max(0, dailyLimit - usageCount);

  if (remaining === 0 && isSignedIn) {
    return <UpgradePrompt />;
  }

  return (
    <div>
      {isSignedIn && (
        <UsageBar used={usageCount} limit={dailyLimit} />
      )}
      {children(handleUse)}
    </div>
  );
}
```

---

## 10. SUBSCRIPTION & PRICING MODEL

### Plans

```
FREE          $0/month
  3 uses per day per tool
  Access to free tools only
  Login required for usage tracking

PRO MONTHLY   $9.99/month
  Unlimited tool uses
  All paid tools unlocked
  Priority support
  Export results
  No usage limits

PRO YEARLY    $99.99/year  (saves ~17% vs monthly)
  Everything in Pro Monthly
  Annual receipt for accounting
  Yearly billing convenience

LIFETIME      $199.99 one-time
  Unlimited uses forever
  All current + future tools
  Lifetime product updates
  Early access to new tools
  Priority support forever
```

### Constants
```typescript
// lib/constants.ts
export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    toolUsagePerDay: 3,
    stripePriceId: null,
  },
  monthly: {
    name: "Pro Monthly",
    price: 9.99,
    toolUsagePerDay: Infinity,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    mode: "subscription" as const,
  },
  yearly: {
    name: "Pro Yearly",
    price: 99.99,
    pricePerMonth: 8.33,
    toolUsagePerDay: Infinity,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
    mode: "subscription" as const,
  },
  lifetime: {
    name: "Lifetime",
    price: 199.99,
    toolUsagePerDay: Infinity,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID,
    mode: "payment" as const,
  },
} as const;
```

---

## 11. STRIPE PAYMENT INTEGRATION

### Upgrade Flow
```
User clicks "Get Pro Monthly" on /pricing
  ↓
Not signed in? → redirect to /sign-up?redirect=/pricing
  ↓
POST /api/stripe/checkout { priceId, mode }
  ↓
Stripe Checkout Session created (Stripe-hosted page)
  ↓
User enters card on Stripe's secure checkout
  ↓
Payment success → /dashboard?success=true
  ↓
Stripe webhook: checkout.session.completed
  ↓
POST /api/stripe/webhook
  ↓
Convex mutation: update user plan in DB
  ↓
User has Pro access ✅
```

### Checkout API Route
```typescript
// app/api/stripe/checkout/route.ts
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { priceId, mode } = await req.json();
  const user = await fetchQuery(api.users.getByClerkId, { clerkId: userId });

  // Get or create Stripe customer
  let customerId = user?.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user?.email,
      metadata: { clerkId: userId },
    });
    customerId = customer.id;
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: { clerkId: userId },
    allow_promotion_codes: true,
  });

  return Response.json({ url: session.url });
}
```

### Webhook Handler
```typescript
// app/api/stripe/webhook/route.ts

export async function POST(req: Request) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature")!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case "checkout.session.completed":
      // Activate subscription or lifetime plan
      break;

    case "customer.subscription.updated":
      // Plan change or renewal
      break;

    case "customer.subscription.deleted":
      // Downgrade to free
      break;

    case "invoice.payment_failed":
      // Send dunning email via Resend
      break;
  }

  return new Response("OK");
}
```

### Webhook Events to Handle
```
checkout.session.completed     → Activate subscription/lifetime
customer.subscription.updated  → Plan change / renewal sync
customer.subscription.deleted  → Downgrade user to free
invoice.payment_failed         → Dunning email via Resend
```

### Stripe Products to Create in Dashboard
```
Product: "Growthency Pro"
  Price 1: $9.99 USD / month   (recurring) → copy ID to env
  Price 2: $99.99 USD / year   (recurring) → copy ID to env

Product: "Growthency Lifetime"
  Price: $199.99 USD one-time  (payment)   → copy ID to env
```

---

## 12. ADMIN PANEL (DEVELOPER ONLY)

**Route:** `/admin` — Protected by Clerk + admin role in Convex

### Admin Dashboard
```
Stats cards:
  Total users | Free | Monthly | Yearly | Lifetime
  New signups this week
  Total tool uses today
  New contact submissions (unread count)
  Total published posts
```

### Blog Posts Manager ( /admin/posts )
```
Table: Title | Status | Category | Views | Date | Actions
Actions: Edit | Preview | Publish/Unpublish | Delete

[+ New Post] button → /admin/posts/new
```

### Post Editor ( /admin/posts/new + /admin/posts/[id] )
```
Split-pane:
  LEFT:  Markdown textarea (JetBrains Mono font)
  RIGHT: Live rendered preview

Fields below:
  Title, Slug (editable), Cover image upload, Category,
  Tags, SEO Title, SEO Description, Status toggle

Auto-save draft every 30 seconds
Word count + read time estimate
[Save Draft]  [Preview in new tab]  [Publish]
```

### Tools Manager ( /admin/tools )
```
Table: Name | Category | Free/Paid | Uses/Day | Active | Order
Inline edit: toggle active, edit daily limit
Drag to reorder (changes orderIndex in Convex)
```

### Contact Inbox ( /admin/contacts )
```
Table: Name | Email | Service | Budget | Date | Status
Click row to expand full message
[Mark as Read] [Mark as Replied] [Archive]
Status badge: new (red) | read | replied | archived
```

### Team Manager ( /admin/team )
```
Cards: Photo | Name | Role | Active toggle
[+ Add Member] button
Edit modal: all team fields + photo upload
Drag to reorder
```

---

## 13. NAVIGATION & GLOBAL UI COMPONENTS

### Navbar
```
Height: 72px
Position: fixed top-0, full width
Background: backdrop-blur(20px) + semi-transparent bg
Border-bottom: 1px with subtle gradient

[Logo]  [Home] [Services▾] [Tools▾] [Blog] [Pricing] [Team] [About] [Contact]  [☀/🌙] [Sign In] [Get Started →]
```

**Services Mega Dropdown:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Our Services                                                   │
│                                                                 │
│  🌐 Web App Dev       📱 Mobile App       📣 Digital Marketing  │
│  Scalable web apps    iOS & Android        SEO, PPC, Social     │
│                                                                 │
│  🎨 UI/UX Design      💻 Custom Software   🤖 AI Integration    │
│  User-centered        Tailored solutions   ML & automation      │
│                                                                 │
│  ⚡ Automations                                                  │
│  Streamline workflows                                           │
│                                                                 │
│                              [View All Services →]              │
└─────────────────────────────────────────────────────────────────┘
```

**Tools Dropdown:**
```
┌───────────────────────────────────┐
│  Popular Tools                    │
│                                   │
│  📝 SEO Meta Generator    [PRO]   │
│  🏷  Business Name Gen    [FREE]  │
│  📊 Keyword Idea Gen      [PRO]   │
│  💰 Profit Calculator     [FREE]  │
│                                   │
│  Filter: All | Marketing | SEO    │
│                                   │
│         [View All Tools →]        │
└───────────────────────────────────┘
```

### Mobile Navigation
```
Hamburger → animated X
Full-screen overlay slides in from right

Vertical list with accordions:
  Home
  Services ▾
    Web App Development
    Mobile App Development
    Digital Marketing
    UI/UX Design
    Custom Software
    AI Integration
    Automations
  Tools ▾
    View All Tools
    [4 featured tools]
  Blog
  Pricing
  Team
  About
  Contact
  ─────────────────────
  [☀/🌙 Theme Toggle]
  [Sign In]  [Get Started →]
```

### Theme Toggle
```typescript
// hooks/useTheme.ts — default: "light"
export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("growthency-theme");
    const initial = (saved as "light" | "dark") || "light";
    applyTheme(initial);
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
    localStorage.setItem("growthency-theme", next);
  };

  return { theme, toggle };
}

function applyTheme(t: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", t);
  document.documentElement.classList.toggle("dark", t === "dark");
}
```

### Scroll To Top (All Pages)
```typescript
// components/layout/ScrollToTop.tsx
// Fixed bottom-right, appears after 400px scroll
// Smooth scroll to top on click
// Present in root layout — appears on every page

"use client";
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full
                 bg-gradient-to-r from-blue-500 to-cyan-400
                 shadow-lg shadow-blue-500/30 flex items-center justify-center
                 hover:scale-110 hover:shadow-blue-500/50
                 transition-all duration-300
                 animate-in slide-in-from-bottom-2 fade-in duration-300"
    >
      <ArrowUp className="w-5 h-5 text-white" />
    </button>
  );
}
```

---

## 14. DESIGN & ANIMATION SPECIFICATIONS

### CSS Variables & Theming
```css
/* styles/globals.css */

[data-theme="light"] {
  --bg-primary:   #F5F7FF;
  --bg-surface:   #FFFFFF;
  --bg-card:      #F0F4FF;
  --text-primary: #0A0F1E;
  --text-muted:   #4A5568;
  --border:       #E2E8F0;
  --accent:       #0066FF;
}

[data-theme="dark"] {
  --bg-primary:   #050810;
  --bg-surface:   #0A0F1E;
  --bg-card:      #0D1428;
  --text-primary: #F0F4FF;
  --text-muted:   #8899BB;
  --border:       #1A2440;
  --accent:       #00A8FF;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

### Animation 1 — Scramble Text (Hero)
```
Each letter cycles through random A-Z chars before settling
Total duration: 1.5s
Letters settle left-to-right with 50ms stagger
Triggered on component mount
Use: custom hook with setInterval
```

### Animation 2 — Glowing Orbs (Background)
```css
@keyframes float-orb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(30px, -20px) scale(1.05); }
  66%       { transform: translate(-20px, 30px) scale(0.95); }
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.12;
  animation: float-orb 8s ease-in-out infinite;
  pointer-events: none;
}

.orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, #0066FF, transparent);
  top: -200px; left: -100px;
}
.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #00FFD1, transparent);
  bottom: 0; right: -100px;
  animation-delay: -3s;
}
```

### Animation 3 — 3D Card Tilt
```typescript
const handleMouseMove = (e: React.MouseEvent, card: HTMLDivElement) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateX = ((y - rect.height / 2) / rect.height) * -8;
  const rotateY = ((x - rect.width  / 2) / rect.width)  *  8;
  card.style.transform =
    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
};

const handleMouseLeave = (card: HTMLDivElement) => {
  card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
};
```

### Animation 4 — Scroll-triggered Reveals (Framer Motion)
```typescript
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0,
             transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
};

// Stagger children
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// Usage:
<motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {items.map(item => (
    <motion.div key={item.id} variants={fadeUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Animation 5 — Animated Counters
```typescript
// Trigger: IntersectionObserver
// Animate from 0 to target over 2 seconds
// Easing: ease-out cubic
// Format: add "+" suffix if needed
```

### Animation 6 — Morphing Gradient Border
```css
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes border-spin {
  to { --angle: 360deg; }
}

.card-gradient-border {
  background:
    linear-gradient(var(--bg-card), var(--bg-card)) padding-box,
    conic-gradient(from var(--angle), transparent 70%, #00A8FF, #00FFD1, transparent) border-box;
  border: 1px solid transparent;
  animation: border-spin 4s linear infinite;
}
```

### Animation 7 — Infinite Marquee
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 25s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}
```

### Animation 8 — Custom Cursor (Desktop only)
```
Small dot (8px) that follows mouse exactly
Larger ring (40px) that follows with easing (lerp)
Ring scales up on hover over buttons/links
Hidden on touch devices (pointer: coarse)
```

### Button Styles
```css
/* Primary gradient button */
.btn-primary {
  background: linear-gradient(135deg, #0066FF, #00FFD1);
  color: white;
  padding: 12px 24px;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 102, 255, 0.3);
  transition: all 0.3s ease;
}
.btn-primary:hover {
  box-shadow: 0 8px 40px rgba(0, 102, 255, 0.5);
  transform: translateY(-2px) scale(1.02);
}

/* Ghost button */
.btn-ghost {
  background: transparent;
  border: 1px solid rgba(0, 168, 255, 0.4);
  color: #00A8FF;
  padding: 12px 24px;
  border-radius: 10px;
  transition: all 0.3s ease;
}
.btn-ghost:hover {
  border-color: #00A8FF;
  background: rgba(0, 168, 255, 0.08);
  box-shadow: 0 0 24px rgba(0, 168, 255, 0.2);
}
```

---

## 15. SEO STRATEGY

### Root Metadata
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://growthency.com"),
  title: {
    default: "Growthency — Build. Scale. Grow.",
    template: "%s | Growthency",
  },
  description:
    "Growthency helps businesses launch, scale, and dominate with expert software development, digital marketing, and AI-powered growth tools.",
  keywords: [
    "web development", "mobile app development", "digital marketing",
    "business growth", "AI tools", "software engineer Bangladesh",
    "custom software", "UI UX design", "business automation"
  ],
  openGraph: {
    type: "website",
    url: "https://growthency.com",
    siteName: "Growthency",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@growthency",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Blog Post SEO Checklist
```
URL:          Root-level /[slug] — short, keyword-rich, under 60 chars
Title:        50-60 chars, keyword in first 3 words
Description:  150-160 chars, compelling, includes keyword
OG Image:     Auto-generated via /api/og?title=[title]
Schema:       Article JSON-LD with author, date, image
Canonical:    Self-referencing canonical URL
Internal links: 2-3 related posts + 1 relevant tool per article
```

### Sitemap & Robots
```typescript
// app/sitemap.ts — auto-includes all pages + published posts + tools + services
// app/robots.ts  — allow all, point to sitemap
```

### Performance Targets (Lighthouse)
```
Performance:     95+
Accessibility:   95+
Best Practices:  100
SEO:             100

LCP: < 2.5s
CLS: < 0.1
FID: < 100ms
```

### Performance Optimizations
```
next/image:     All images (WebP + blur placeholder + lazy load)
next/font:      All fonts (display: swap, no layout shift)
Dynamic imports: Three.js, particle canvas (lazy loaded)
ISR:            Blog listing + tools page (revalidate: 60)
SSG:            Individual blog posts (generateStaticParams)
Code splitting: Automatic per route (App Router)
```

---

## 16. EMAIL SYSTEM (RESEND)

### Setup
```bash
npm install resend @react-email/components
```

### Email Templates to Build

```
1. Welcome Email
   Trigger: user.created (Clerk webhook)
   Subject: "Welcome to Growthency!"
   Content: Quick start guide, link to tools, social links

2. Contact Form Auto-Reply
   Trigger: Contact form submission
   Subject: "We got your message! | Growthency"
   Content: Receipt confirmation, 24hr response promise

3. Contact Notification (to you)
   Trigger: Contact form submission
   Subject: "New Contact: [Name] — [Service]"
   Content: Full form details, quick reply button

4. Subscription Confirmed
   Trigger: checkout.session.completed
   Subject: "You're on Growthency Pro!"
   Content: Plan details, what's unlocked, dashboard link

5. Payment Failed
   Trigger: invoice.payment_failed
   Subject: "Action needed: Payment issue"
   Content: Update card link, deadline, help link

6. Subscription Cancelled
   Trigger: customer.subscription.deleted
   Subject: "Your Pro subscription has ended"
   Content: What was lost, resubscribe link, feedback form
```

### Email Sending Utility
```typescript
// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to, subject, react
}: { to: string; subject: string; react: React.ReactElement }) {
  return resend.emails.send({
    from: "Growthency <hello@growthency.com>",
    to,
    subject,
    react,
  });
}
```

---

## 17. ENVIRONMENT VARIABLES

```bash
# .env.local

# App
NEXT_PUBLIC_APP_URL=https://growthency.com

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
CLERK_JWT_ISSUER_DOMAIN=https://your-instance.clerk.accounts.dev

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
CONVEX_DEPLOY_KEY=prod:...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID=price_...

# Resend Email
RESEND_API_KEY=re_...
FROM_EMAIL=hello@growthency.com
ADMIN_EMAIL=you@youremail.com

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Sentry
SENTRY_DSN=https://...
```

---

## 18. DEPLOYMENT — VERCEL

### Steps
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login and link
vercel login
vercel link

# 3. Add env vars (or use Vercel Dashboard → Settings → Env Vars)
vercel env add STRIPE_SECRET_KEY production

# 4. Deploy Convex first
npx convex deploy

# 5. Deploy to production
vercel --prod
```

### Vercel Config
```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["sin1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### DNS Setup for growthency.com
```
A record:      @     →  76.76.21.21
CNAME record:  www   →  cname.vercel-dns.com

Wait 5-30 minutes for propagation.
SSL auto-provisioned by Vercel (Let's Encrypt).
```

### Stripe Webhook Setup (Production)
```
1. Stripe Dashboard → Developers → Webhooks → Add endpoint
2. URL: https://growthency.com/api/stripe/webhook
3. Events:
   checkout.session.completed
   customer.subscription.updated
   customer.subscription.deleted
   invoice.payment_failed
   payment_intent.succeeded
4. Copy signing secret → STRIPE_WEBHOOK_SECRET
```

---

## 19. DEVELOPMENT ROADMAP & PHASES

### Phase 1 — Foundation (Weeks 1–2)
```
  Next.js 15 project setup (TypeScript, Tailwind v4)
  Convex setup + schema.ts deployed
  Clerk auth + middleware
  Clerk → Convex user sync webhook
  Design system: CSS variables, fonts, base components
  Global layout: Navbar, Footer, ScrollToTop, ThemeToggle
  Light/dark mode working end-to-end
  Deploy to Vercel + domain connected
```

### Phase 2 — Core Pages (Weeks 3–4)
```
  Home page — all 9 sections
  Services page + 7 individual service pages
  About page + timeline
  Team page + team data in Convex
  Contact page + form submission + Resend emails
  404 page (branded, animated)
  Privacy, Terms, Refund pages
```

### Phase 3 — Blog System (Week 5)
```
  /admin layout with role protection
  Blog post editor (markdown + live preview + Convex storage upload)
  Blog listing page (/blog) + filters
  Blog post page (/[slug]) + TOC + view counter
  Full-text search
  Category filtering
  SEO metadata per post
  First 5 blog posts written:
    1. how-you-can-scale-your-digital-business-with-us
    2. web-app-development-guide-for-businesses
    3. digital-marketing-strategies-that-actually-work
    4. ai-tools-every-business-owner-should-use
    5. why-your-business-needs-custom-software
```

### Phase 4 — Tools System (Weeks 6–7)
```
  Tools hub page (/tools) + category filters
  Tool registry seeded in Convex
  Rate limiting (checkAndUse mutation)
  ToolWrapper, UsageBar, UpgradePrompt components
  Sign-in gate for unauthenticated users
  Build first 6 tools:
    Business Name Generator  (free)
    Hashtag Generator        (free)
    Profit Margin Calc       (free)
    QR Code Generator        (free)
    SEO Meta Generator       (paid)
    Social Caption Writer    (paid)
  User dashboard (/dashboard):
    Overview, Tools, Billing, Profile tabs
```

### Phase 5 — Payments (Week 8)
```
  Stripe products + prices created in dashboard
  Pricing page (/pricing) — billing toggle, 3 cards, comparison table
  /api/stripe/checkout route
  /api/stripe/webhook handler
  User plan updates in Convex
  Stripe Customer Portal integration
  Test all payment flows:
    Free → Monthly → Yearly → Lifetime upgrades
    Cancellation → downgrade to free
  Resend emails: Welcome, Subscription Confirmed, Payment Failed
```

### Phase 6 — Polish & Launch (Weeks 9–10)
```
  Remaining 6 tools built (Invoice Gen, Keywords, Email Scorer,
    Blog Outline, Privacy Policy Gen, Color Palette)
  Testimonials in Convex + carousel on home
  Three.js particle hero (with CSS fallback for mobile)
  Scramble text effect on hero
  Custom cursor (desktop)
  All animations audited (mobile-safe)
  Full mobile responsiveness (320px → 1920px)
  Cross-browser: Chrome, Firefox, Safari, Edge
  Lighthouse audit (target 95+ all pages)
  Sentry error monitoring
  PostHog events: tool_used, upgrade_clicked, checkout_completed
  robots.txt + sitemap verified
  Google Search Console: sitemap submitted
  Soft launch → 10 beta users → feedback
  Fix issues → PUBLIC LAUNCH
```

### Phase 7 — Growth (Ongoing)
```
  2 new tools per month
  2 SEO blog posts per week
  Newsletter campaign (Resend)
  A/B test pricing page
  Affiliate program (future)
  Developer API tier (future)
  Mobile app for dashboard (future)
```

---

## 20. QUICK REFERENCE CHEATSHEET

| Decision | Choice |
|---|---|
| Framework | Next.js 15, App Router, TypeScript |
| Database | Convex (single DB for everything) |
| Auth | Clerk |
| Payments | Stripe |
| Email | Resend |
| Hosting | Vercel |
| Styling | Tailwind CSS v4 + Framer Motion |
| 3D Effects | Three.js (hero), CSS 3D (cards) |
| Blog Content | Convex + /admin markdown editor |
| Admin Access | Developer only (role: "admin") |
| Default Theme | Light mode |
| Theme Toggle | Top-right navbar, saved to localStorage |
| Scroll To Top | Fixed bottom-right, all pages, 400px trigger |
| Blog URL Format | growthency.com/[post-slug] (root level) |
| Free Tool Uses | 3/day/tool (login required) |
| Monthly Plan | $9.99/month |
| Yearly Plan | $99.99/year (~17% savings) |
| Lifetime Plan | $199.99 one-time |
| Nav Items | Home, Services, Tools, Blog, Pricing, Team, About, Contact |
| Services Count | 7 (Web, Mobile, Marketing, UI/UX, Custom SW, AI, Automations) |
| Initial Tools | 12 at launch |
| Video Editing | Under Digital Marketing service |
| Primary Goal | Help businesses build, scale, and grow with technology |

### Key npm Packages
```bash
npm install \
  convex \
  @clerk/nextjs \
  stripe \
  resend \
  @react-email/components \
  framer-motion \
  three \
  @types/three \
  lucide-react \
  react-hook-form \
  zod \
  @hookform/resolvers \
  react-markdown \
  remark-gfm \
  rehype-highlight \
  rehype-slug \
  clsx \
  tailwind-merge
```

---

*Growthency.com Master Plan v1.0*
*Stack: Next.js 15 + Convex + Clerk + Stripe*
*Last Updated: March 2025*
