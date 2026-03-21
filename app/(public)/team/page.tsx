import type { Metadata } from "next"
import Link from "next/link"
import { Github, Linkedin, Twitter, Globe, ArrowRight, Users } from "lucide-react"
import { SITE_NAME, SITE_URL } from "@/lib/constants"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

/* ── Metadata ── */
export const metadata: Metadata = {
  title: `Team — ${SITE_NAME}`,
  description:
    "Meet the builders behind Growthency — engineers, designers, and marketers obsessed with your growth.",
  openGraph: {
    title: `Team — ${SITE_NAME}`,
    url: `${SITE_URL}/team`,
  },
}

/* ── Static team data ── */
interface TeamMemberData {
  name: string
  role: string
  bio: string
  skills: string[]
  social: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
  }
  initials: string
  gradientFrom: string
  gradientTo: string
}

const TEAM: TeamMemberData[] = [
  {
    name: "Alex Rivera",
    role: "Founder & Lead Engineer",
    bio: "Full-stack engineer with 8+ years building SaaS products. Passionate about scalable architecture and product-led growth. Previously at two YC-backed startups.",
    skills: ["Next.js", "TypeScript", "Postgres", "AWS", "System Design"],
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
    initials: "AR",
    gradientFrom: "#0066FF",
    gradientTo: "#00FFD1",
  },
  {
    name: "Sam Chen",
    role: "Head of Design",
    bio: "Product designer who bridges business goals with delightful user experiences. 6 years crafting interfaces for consumer apps and B2B platforms. Ex-Google UX.",
    skills: ["Figma", "UI/UX", "Design Systems", "Prototyping", "User Research"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      website: "https://example.com",
    },
    initials: "SC",
    gradientFrom: "#8B5CF6",
    gradientTo: "#EC4899",
  },
  {
    name: "Jordan Mills",
    role: "Growth & Marketing Lead",
    bio: "Growth marketer who has scaled organic traffic 10x and managed $500k+ in paid ad spend. Expert in SEO, content, and performance marketing across every major channel.",
    skills: ["SEO", "Paid Ads", "Content Strategy", "Analytics", "Email Marketing"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    initials: "JM",
    gradientFrom: "#F59E0B",
    gradientTo: "#EF4444",
  },
]

/* ── Team Card ── */
function TeamCard({ member }: { member: TeamMemberData }) {
  return (
    <div
      className="rounded-2xl p-8 flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
      }}
    >
      {/* Hover top line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${member.gradientFrom}, ${member.gradientTo})`,
        }}
      />

      {/* Avatar placeholder */}
      <div className="flex items-start gap-5 mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-syne font-extrabold text-xl text-white"
          style={{
            background: `linear-gradient(135deg, ${member.gradientFrom}, ${member.gradientTo})`,
            boxShadow: `0 4px 20px ${member.gradientFrom}40`,
          }}
        >
          {member.initials}
        </div>
        <div>
          <h3 className="font-syne font-extrabold text-xl text-[var(--text-primary)] mb-0.5">
            {member.name}
          </h3>
          <p className="text-sm font-medium" style={{ color: member.gradientFrom }}>
            {member.role}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 flex-1">
        {member.bio}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {member.skills.map((skill) => (
          <Badge key={skill} variant="default" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>

      {/* Social links */}
      <div className="flex items-center gap-3">
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "rgba(0,168,255,0.08)",
              border: "1px solid var(--border-default)",
              color: "var(--text-muted)",
            }}
            aria-label={`${member.name} on LinkedIn`}
          >
            <Linkedin size={15} />
          </a>
        )}
        {member.social.twitter && (
          <a
            href={member.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "rgba(0,168,255,0.08)",
              border: "1px solid var(--border-default)",
              color: "var(--text-muted)",
            }}
            aria-label={`${member.name} on Twitter`}
          >
            <Twitter size={15} />
          </a>
        )}
        {member.social.github && (
          <a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "rgba(0,168,255,0.08)",
              border: "1px solid var(--border-default)",
              color: "var(--text-muted)",
            }}
            aria-label={`${member.name} on GitHub`}
          >
            <Github size={15} />
          </a>
        )}
        {member.social.website && (
          <a
            href={member.social.website}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "rgba(0,168,255,0.08)",
              border: "1px solid var(--border-default)",
              color: "var(--text-muted)",
            }}
            aria-label={`${member.name}'s website`}
          >
            <Globe size={15} />
          </a>
        )}
      </div>
    </div>
  )
}

/* ── Page ── */
export default function TeamPage() {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,102,255,0.12), transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue)] mb-4">
            The People
          </span>
          <h1 className="font-syne font-extrabold text-5xl sm:text-6xl text-[var(--text-primary)] leading-tight mb-6">
            Meet the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0066FF, #00FFD1)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Builders
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            A senior-only team of engineers, designers, and marketers. No junior guesswork — just
            focused execution from people who have done it before.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      {/* Hiring CTA */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="rounded-3xl p-12 relative overflow-hidden"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-default)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,102,255,0.1), transparent)",
            }}
          />
          <div className="relative z-10">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                background: "rgba(0,168,255,0.1)",
                border: "1px solid rgba(0,168,255,0.2)",
              }}
            >
              <Users size={28} className="text-[var(--accent-blue)]" />
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)] mb-4">
              {`We're growing the team`}
            </h2>
            <p className="text-base text-[var(--text-secondary)] mb-8 max-w-lg mx-auto">
              {`We're always looking for exceptional engineers, designers, and marketers who are obsessed with craft and growth. If that's you, let's talk.`}
            </p>
            <Button asChild size="lg">
              <Link href="/contact" className="inline-flex items-center gap-2">
                Get In Touch
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
