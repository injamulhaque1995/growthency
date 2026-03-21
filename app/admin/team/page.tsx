import { Plus, Edit, Trash2, Linkedin, Twitter, Github, Globe } from "lucide-react"
import type { Metadata } from "next"
import type { TeamMember } from "@/types"

export const metadata: Metadata = {
  title: "Team",
}

const MOCK_TEAM: TeamMember[] = [
  {
    _id: "t1",
    name: "Omar Faruk",
    role: "Founder & CEO",
    bio: "Serial entrepreneur with 10+ years building digital products. Passionate about using technology to help businesses grow faster.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/omarfaruk",
      twitter: "https://twitter.com/omarfaruk",
      github: "https://github.com/omarfaruk",
    },
    order: 1,
    isActive: true,
    joinedAt: Date.now() - 2 * 365 * 86400_000,
  },
  {
    _id: "t2",
    name: "Priya Singh",
    role: "CTO",
    bio: "Full-stack engineer specializing in AI integrations and scalable cloud architecture. Ex-Google.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/priyasingh",
      github: "https://github.com/priyasingh",
    },
    order: 2,
    isActive: true,
    joinedAt: Date.now() - 18 * 30 * 86400_000,
  },
  {
    _id: "t3",
    name: "Lucas Mendes",
    role: "Lead Developer",
    bio: "Next.js and React specialist. Loves building smooth, performant UIs that users actually enjoy using.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/lucasmendes",
      github: "https://github.com/lucasmendes",
      website: "https://lucasmendes.dev",
    },
    order: 3,
    isActive: true,
    joinedAt: Date.now() - 12 * 30 * 86400_000,
  },
  {
    _id: "t4",
    name: "Aisha Rahman",
    role: "Designer",
    bio: "Brand identity and UI/UX designer. Creates design systems that scale from MVP to enterprise.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/aisharahman",
      twitter: "https://twitter.com/aisharahman",
    },
    order: 4,
    isActive: true,
    joinedAt: Date.now() - 8 * 30 * 86400_000,
  },
]

function formatJoinDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl text-[#F0F4FF] mb-1">
            Team
          </h1>
          <p className="text-[#8899BB] text-sm">
            {MOCK_TEAM.filter((m) => m.isActive).length} active members
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 h-10 px-5 text-sm font-medium text-white bg-[linear-gradient(135deg,#0066FF,#00FFD1)] rounded-[10px] shadow-[0_2px_12px_rgba(0,102,255,0.3)] hover:shadow-[0_0_24px_rgba(0,102,255,0.45)] hover:-translate-y-px transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOCK_TEAM.map((member) => (
          <div
            key={member._id}
            className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-5 hover:border-[#0066FF]/30 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                {member.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-12 h-12 rounded-full border-2 border-[#1A2440]"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FFD1] flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {member.name[0]}
                  </div>
                )}
                <div>
                  <p className="font-[family-name:var(--font-syne)] font-extrabold text-sm text-[#F0F4FF]">
                    {member.name}
                  </p>
                  <p className="text-xs text-[#00A8FF]">{member.role}</p>
                  <p className="text-[10px] text-[#4A5878] mt-0.5">
                    Since {formatJoinDate(member.joinedAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  className="p-1.5 rounded-lg text-[#4A5878] hover:text-[#00A8FF] hover:bg-[#0066FF]/10 transition-all"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-lg text-[#4A5878] hover:text-[#FF1744] hover:bg-[#FF1744]/10 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-[#8899BB] leading-relaxed mb-3">
              {member.bio}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2 pt-3 border-t border-[#1A2440]">
              {member.socialLinks.linkedin && (
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-[#4A5878] hover:text-[#0066FF] hover:bg-[#0066FF]/10 transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
              {member.socialLinks.twitter && (
                <a
                  href={member.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-[#4A5878] hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 transition-all"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              )}
              {member.socialLinks.github && (
                <a
                  href={member.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-[#4A5878] hover:text-[#F0F4FF] hover:bg-[#F0F4FF]/10 transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              {member.socialLinks.website && (
                <a
                  href={member.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-[#4A5878] hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                </a>
              )}
              <span
                className={`ml-auto px-2 py-0.5 rounded-full text-xs border ${
                  member.isActive
                    ? "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20"
                    : "bg-[#8899BB]/10 text-[#8899BB] border-[#8899BB]/20"
                }`}
              >
                {member.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add member form (inline, collapsed for now) */}
      <div className="bg-[#0A0F1E] border border-[#1A2440] border-dashed rounded-2xl p-6 text-center">
        <p className="text-sm text-[#4A5878] mb-3">
          Add a new team member to display on the About page.
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium text-[#8899BB] border border-[#1A2440] rounded-[10px] hover:border-[#00A8FF] hover:text-[#00A8FF] transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Team Member
        </button>
      </div>
    </div>
  )
}
