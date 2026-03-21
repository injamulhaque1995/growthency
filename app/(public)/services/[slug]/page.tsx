import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Globe,
  Smartphone,
  Megaphone,
  Palette,
  Code,
  Cpu,
  Zap,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react"
import { SERVICES, SITE_NAME, SITE_URL } from "@/lib/constants"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ServiceFAQ } from "./ServiceFAQ"

/* ── Icon map ── */
const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Megaphone,
  Palette,
  Code,
  Cpu,
  Zap,
}

/* ── Per-service detail data ── */
const SERVICE_DETAILS: Record<
  string,
  {
    problem: string
    solution: string
    included: string[]
    pricing: string
    faqs: { q: string; a: string }[]
  }
> = {
  "web-app-development": {
    problem:
      "Most businesses waste 6–18 months and $50k+ on web apps that launch broken, miss the target audience, or crumble under real traffic. Off-the-shelf tools hit a ceiling fast.",
    solution:
      "We build full-stack web applications from the ground up — clean architecture, scalable infrastructure, and pixel-perfect UIs — so you ship fast and scale without rewrites.",
    included: [
      "Requirements & architecture planning session",
      "UI/UX wireframes & interactive prototype",
      "Full-stack development (Next.js, React, Node.js)",
      "Database design & API integration",
      "Authentication, roles & permissions",
      "Cloud deployment (Vercel / AWS / GCP)",
      "Performance optimization & SEO",
      "90-day post-launch support",
    ],
    pricing: "Starting from $3,500",
    faqs: [
      {
        q: "How long does a web app typically take?",
        a: "Simple MVPs ship in 4–6 weeks. Full-featured platforms typically take 8–16 weeks depending on complexity, integrations, and feedback cycles.",
      },
      {
        q: "What tech stack do you use?",
        a: "We default to Next.js 15, TypeScript, Tailwind CSS, and PostgreSQL/Supabase. We adapt the stack to match your needs and existing infrastructure.",
      },
      {
        q: "Do you handle hosting and DevOps?",
        a: "Yes. We set up CI/CD pipelines, monitoring, and cloud deployments. We also provide guidance on scaling your infrastructure as you grow.",
      },
      {
        q: "Can you work on an existing codebase?",
        a: "Absolutely. We do code audits, refactors, and feature additions on existing projects. We'll assess the current state and give you a clear plan before touching anything.",
      },
      {
        q: "What happens after launch?",
        a: "Every project includes 90 days of post-launch support. After that, we offer monthly retainer plans for ongoing development, maintenance, and feature work.",
      },
    ],
  },
  "mobile-app-development": {
    problem:
      "Maintaining separate iOS and Android codebases is expensive, slow, and inconsistent. Native development costs multiply quickly while cross-platform tools often sacrifice quality.",
    solution:
      "We build high-performance cross-platform apps with Flutter or React Native — one codebase, two stores, full native feel — shipping to both platforms simultaneously.",
    included: [
      "Platform strategy & tech stack selection",
      "App architecture & UI/UX design",
      "Cross-platform development (Flutter / React Native)",
      "Backend API development & integration",
      "Push notifications & analytics",
      "App Store & Google Play submission",
      "Performance testing on real devices",
      "90-day post-launch support",
    ],
    pricing: "Starting from $4,500",
    faqs: [
      {
        q: "Flutter or React Native — which do you recommend?",
        a: "Flutter for performance-heavy apps and pixel-perfect custom UIs. React Native when your team already uses JavaScript/React. We'll recommend the right fit for your project.",
      },
      {
        q: "How long does app development take?",
        a: "A focused MVP takes 8–12 weeks. Feature-rich consumer apps typically need 16–24 weeks. We use sprint-based delivery so you see progress every two weeks.",
      },
      {
        q: "Do you handle App Store submissions?",
        a: "Yes. We handle the entire submission process for both Apple App Store and Google Play, including asset creation, metadata, and review management.",
      },
      {
        q: "Can you add features to my existing app?",
        a: "Yes. We do feature additions, rewrites, and performance optimizations on existing Flutter and React Native codebases.",
      },
      {
        q: "Do you build the backend too?",
        a: "We can build the full stack. If you already have a backend, we'll integrate with it. If not, we'll design and build a scalable API alongside the app.",
      },
    ],
  },
  "digital-marketing": {
    problem:
      "Spending on ads without a strategy is burning money. Most businesses lack the cohesive content, SEO foundation, and data-driven approach needed to see consistent ROI.",
    solution:
      "We build and execute integrated digital marketing systems — organic SEO, paid media, social content, and video — designed around your specific growth goals.",
    included: [
      "Digital marketing audit & competitor analysis",
      "SEO strategy, keyword research & on-page optimization",
      "Social media strategy & content calendar",
      "Paid ads management (Meta, Google, LinkedIn)",
      "Content creation & copywriting",
      "Video editing & short-form content",
      "Monthly performance reports & analytics",
      "Conversion rate optimization",
    ],
    pricing: "Starting from $1,200/month",
    faqs: [
      {
        q: "How long before I see results?",
        a: "Paid ads can show results within 2–4 weeks. SEO is a longer game — expect meaningful organic growth in 3–6 months with consistent effort.",
      },
      {
        q: "Do you create the content or just strategy?",
        a: "Both. We handle strategy, copywriting, graphic design for social, and video editing. You supply raw footage or we guide what to record.",
      },
      {
        q: "Which ad platforms do you manage?",
        a: "Meta (Facebook/Instagram), Google Ads, YouTube, LinkedIn, and TikTok. We focus spend on the channels where your audience actually lives.",
      },
      {
        q: "What's included in the monthly report?",
        a: "Traffic growth, keyword rankings, ad performance (spend, ROAS, CPL), social metrics, and a written summary with next month's priorities.",
      },
      {
        q: "Do you require a minimum contract?",
        a: "We recommend a 3-month minimum for marketing engagements to give strategies time to compound. Month-to-month options are available at a slightly higher rate.",
      },
    ],
  },
  "ui-ux-design": {
    problem:
      "Beautiful-but-confusing interfaces kill conversion. Most design work focuses on aesthetics without considering user psychology, flow, and the actual path to revenue.",
    solution:
      "We design interfaces that are both visually stunning and strategically built to guide users toward the actions that matter — sign-ups, purchases, upgrades.",
    included: [
      "User research & persona development",
      "Information architecture & user flow mapping",
      "Low-fidelity wireframes",
      "High-fidelity UI design (Figma)",
      "Interactive prototype for testing",
      "Design system & component library",
      "Usability testing & iteration",
      "Developer handoff with specs",
    ],
    pricing: "Starting from $2,200",
    faqs: [
      {
        q: "Do you design in Figma?",
        a: "Yes. All designs are delivered as organized Figma files with named components, auto-layout, and developer mode enabled for seamless handoff.",
      },
      {
        q: "Can you design and build?",
        a: "Yes. We offer full design-to-development workflows. When the same team designs and builds, handoff is frictionless and the final product matches the vision.",
      },
      {
        q: "How many revision rounds are included?",
        a: "Two structured revision rounds per design phase. Additional revisions are available at an hourly rate. Clear feedback ensures rounds stay focused.",
      },
      {
        q: "Do you conduct user testing?",
        a: "We run moderated prototype testing sessions and use heatmap/session recording tools to validate designs with real users before development begins.",
      },
      {
        q: "What if I just need a design refresh?",
        a: "We offer UX audits and partial redesigns. We'll identify the highest-impact changes and execute them without rebuilding everything from scratch.",
      },
    ],
  },
  "custom-software": {
    problem:
      "Generic software forces you to work around its limitations instead of the other way around. Manual workarounds, data silos, and poor integrations cost time and money every single day.",
    solution:
      "We build software that fits your exact workflows — internal tools, industry-specific platforms, complex integrations — owned entirely by you.",
    included: [
      "Business process analysis & requirements gathering",
      "System architecture & database design",
      "Custom backend & API development",
      "Admin dashboards & reporting tools",
      "Third-party system integrations",
      "User roles, permissions & audit logs",
      "Comprehensive testing & QA",
      "Documentation & team training",
    ],
    pricing: "Custom quote",
    faqs: [
      {
        q: "How do you scope a custom software project?",
        a: "We start with a paid discovery sprint (1–2 weeks) to document requirements, create technical specs, and deliver a fixed-price proposal before any major development begins.",
      },
      {
        q: "Who owns the code?",
        a: "You do. 100%. Upon final payment, all source code, IP, and assets are transferred to you. No vendor lock-in, ever.",
      },
      {
        q: "What if requirements change mid-project?",
        a: "We use agile sprints. Scope changes are documented, sized, and added to the roadmap transparently. No surprise invoices.",
      },
      {
        q: "Can you integrate with our existing systems?",
        a: "Yes. ERP, CRM, accounting software, payment processors, HR platforms — if it has an API (or even if it doesn't), we'll find a way to connect it.",
      },
      {
        q: "What industries do you serve?",
        a: "Healthcare, logistics, e-commerce, finance, real estate, and more. Our approach is industry-agnostic; we learn your domain deeply before writing a line of code.",
      },
    ],
  },
  "ai-integration": {
    problem:
      "AI is moving fast and most businesses either ignore it (falling behind) or chase every trend (wasting resources). Integrating AI without a clear ROI plan rarely delivers value.",
    solution:
      "We identify the highest-value AI use cases for your specific business and implement production-ready integrations — LLMs, computer vision, predictive models — that solve real problems.",
    included: [
      "AI readiness assessment & use-case mapping",
      "LLM integration (OpenAI, Anthropic, Gemini)",
      "Custom AI workflow & prompt engineering",
      "RAG pipelines & knowledge base systems",
      "AI-powered automation flows",
      "Model fine-tuning & evaluation",
      "API wrappers & internal tooling",
      "Performance monitoring & cost optimization",
    ],
    pricing: "Starting from $2,800",
    faqs: [
      {
        q: "What AI models do you work with?",
        a: "OpenAI (GPT-4o, o1), Anthropic (Claude), Google (Gemini), Mistral, Llama, and custom fine-tuned models. We select the best model for each task based on quality, speed, and cost.",
      },
      {
        q: "Can AI work with our existing data?",
        a: "Yes. We build RAG (Retrieval-Augmented Generation) pipelines that let LLMs answer questions grounded in your proprietary documents, databases, and knowledge bases.",
      },
      {
        q: "How do you handle data privacy?",
        a: "We architect solutions with privacy first — on-premise models where required, data anonymization, and strict API usage policies. Your data is never used to train external models without consent.",
      },
      {
        q: "What's a realistic ROI from AI integration?",
        a: "It depends on the use case. Automating repetitive knowledge work typically shows 20–50% time savings. Customer-facing AI features can improve conversion and retention measurably.",
      },
      {
        q: "Do you handle ongoing AI maintenance?",
        a: "Yes. AI systems need monitoring, prompt tuning, and model updates. We offer maintenance retainers to keep your AI integrations performing as models evolve.",
      },
    ],
  },
  automations: {
    problem:
      "Most teams spend 30–40% of their time on repetitive tasks that should be automated. Copy-paste workflows, manual reporting, and human handoffs create bottlenecks and errors.",
    solution:
      "We map your workflows, identify automation opportunities, and build robust systems — Zapier, Make, custom code — that run 24/7 without human intervention.",
    included: [
      "Workflow audit & automation opportunity mapping",
      "No-code/low-code automation (Zapier, Make, n8n)",
      "Custom automation scripts & scheduled jobs",
      "CRM & email automation sequences",
      "Data pipeline & reporting automation",
      "Webhook integrations & event-driven triggers",
      "Error handling, logging & alerts",
      "Documentation & team handover",
    ],
    pricing: "Starting from $900",
    faqs: [
      {
        q: "What tools do you automate with?",
        a: "Zapier, Make (formerly Integromat), n8n, and custom code (Python/Node.js) for complex logic. We choose the right tool based on complexity, budget, and maintainability.",
      },
      {
        q: "How do you identify what to automate?",
        a: "We start with a workflow audit — interviewing your team, mapping processes, and quantifying time spent. We prioritize automations by ROI: highest time savings, lowest complexity.",
      },
      {
        q: "What if an automation breaks?",
        a: "All our automations include error handling, retry logic, and email/Slack alerts for failures. We also include documentation so your team can diagnose simple issues.",
      },
      {
        q: "Can you automate our client onboarding?",
        a: "Absolutely. Client onboarding is one of the highest-ROI automations — from CRM updates, welcome emails, document collection, to task creation in project management tools.",
      },
      {
        q: "Do you train our team on maintaining automations?",
        a: "Yes. Every project includes documentation and a handover session. We design automations to be as maintainable as possible by non-technical staff.",
      },
    ],
  },
}

/* ── Process steps ── */
const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn your business, goals, and constraints. No assumptions.",
  },
  {
    number: "02",
    title: "Design",
    description: "Architecture, wireframes, and a clear plan before any code is written.",
  },
  {
    number: "03",
    title: "Build",
    description: "Sprint-based development with demos every two weeks.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Deployment, QA, go-live support, and handover documentation.",
  },
]

/* ── generateStaticParams ── */
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

/* ── generateMetadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return { title: "Not Found" }

  return {
    title: `${service.name} — ${SITE_NAME}`,
    description: service.description,
    openGraph: {
      title: `${service.name} — ${SITE_NAME}`,
      description: service.description,
      url: `${SITE_URL}/services/${slug}`,
    },
  }
}

/* ── Page ── */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) notFound()

  const details = SERVICE_DETAILS[slug]
  const Icon = ICON_MAP[service.icon] ?? Globe

  // Related services: exclude current, pick 3
  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,102,255,0.15), transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Glowing icon */}
          <div className="flex justify-center mb-8">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center relative"
              style={{
                background: "rgba(0,168,255,0.12)",
                border: "1px solid rgba(0,168,255,0.3)",
                boxShadow: "0 0 60px rgba(0,168,255,0.25)",
              }}
            >
              <Icon size={36} className="text-[var(--accent-blue)]" />
            </div>
          </div>

          <Badge variant="blue" className="mb-6 text-xs">
            {service.tagline}
          </Badge>
          <h1 className="font-syne font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] leading-tight mb-6">
            {service.name}
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10">
            {service.description}
          </p>
          <Button asChild size="lg">
            <Link href="/contact" className="inline-flex items-center gap-2">
              Start This Project
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── Problem / Solution ── */}
      {details && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Problem */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(255,23,68,0.2)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,23,68,0.06), transparent)",
                }}
              />
              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#FF1744] block mb-4">
                  The Problem
                </span>
                <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                  {details.problem}
                </p>
              </div>
            </div>

            {/* Solution */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(0,168,255,0.2)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,102,255,0.08), transparent)",
                }}
              />
              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-blue)] block mb-4">
                  Our Solution
                </span>
                <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                  {details.solution}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── What's Included ── */}
      {details && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] mb-10 text-center">
              {`What's`}{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Included
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {details.included.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-default)",
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(0,168,255,0.15)" }}
                  >
                    <Check size={13} className="text-[var(--accent-blue)]" />
                  </div>
                  <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Process Timeline ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] mb-14 text-center">
          Our{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #0066FF, #00FFD1)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Process
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {i < PROCESS_STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px"
                  style={{ background: "var(--border-default)" }}
                />
              )}
              <div
                className="rounded-2xl p-6 text-center h-full"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "rgba(0,168,255,0.1)",
                    border: "1px solid rgba(0,168,255,0.3)",
                  }}
                >
                  <span className="font-syne font-bold text-sm text-[var(--accent-blue)]">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-syne font-bold text-lg text-[var(--text-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      {details && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="max-w-2xl mx-auto rounded-3xl p-10 text-center relative overflow-hidden"
            style={{
              background: "var(--bg-card)",
              border: "1px solid rgba(0,168,255,0.25)",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,102,255,0.1), transparent)",
              }}
            />
            <div className="relative z-10">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-blue)] block mb-4">
                Investment
              </span>
              <p className="font-syne font-extrabold text-4xl sm:text-5xl text-[var(--text-primary)] mb-3">
                {details.pricing}
              </p>
              <p className="text-sm text-[var(--text-muted)] mb-8">
                Final pricing depends on scope and complexity. Contact us for a free estimate.
              </p>
              <Button asChild size="lg">
                <Link href="/contact" className="inline-flex items-center gap-2">
                  Get a Free Quote
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {details && (
        <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] mb-10 text-center">
            Frequently Asked{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Questions
            </span>
          </h2>
          <ServiceFAQ faqs={details.faqs} />
        </section>
      )}

      {/* ── Related Services ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-syne font-extrabold text-3xl text-[var(--text-primary)] mb-10 text-center">
          Related Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map((s) => {
            const RelIcon = ICON_MAP[s.icon] ?? Globe
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group block rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 0 1px var(--accent-blue)",
                  }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(0,168,255,0.1)" }}
                >
                  <RelIcon size={20} className="text-[var(--accent-blue)]" />
                </div>
                <h3 className="font-syne font-bold text-base text-[var(--text-primary)] mb-1">
                  {s.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">{s.tagline}</p>
                <div className="flex items-center gap-1 text-xs font-medium text-[var(--accent-blue)] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore <ArrowRight size={12} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
