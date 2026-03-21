import { PostEditor } from "@/components/admin/PostEditor"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import type { Post } from "@/types"

// Static mock data — replace with Convex query once deployed
const MOCK_POSTS: Record<string, Partial<Post>> = {
  "1": {
    _id: "1",
    title: "5 Growth Hacks Every Startup Should Know in 2026",
    slug: "5-growth-hacks-every-startup-should-know",
    excerpt:
      "Discover the proven growth strategies that helped hundreds of startups double their user base in under 90 days.",
    content: `# 5 Growth Hacks Every Startup Should Know in 2026\n\nGrowth doesn't happen by accident...`,
    category: "Growth",
    tags: ["growth", "startups", "strategy", "marketing"],
    published: true,
    featured: true,
    views: 1247,
    readTimeMinutes: 7,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    author: { name: "Growthency Team" },
  },
  "2": {
    _id: "2",
    title: "How to Scale Your SaaS From 0 to 10K Users",
    slug: "how-to-scale-saas-0-to-10k-users",
    excerpt: "A step-by-step playbook for scaling your SaaS product from launch to 10,000 active users.",
    content: `# How to Scale Your SaaS From 0 to 10K Users\n\nScaling a SaaS product requires...`,
    category: "Startups",
    tags: ["saas", "growth", "scaling", "product"],
    published: true,
    featured: false,
    views: 3891,
    readTimeMinutes: 9,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    author: { name: "Growthency Team" },
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const post = MOCK_POSTS[id]
  return {
    title: post ? `Edit: ${post.title}` : "Edit Post",
  }
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = MOCK_POSTS[id]

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/posts"
          className="p-2 rounded-lg text-[#4A5878] hover:text-[#F0F4FF] hover:bg-[#0D1428] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl text-[#F0F4FF]">
            Edit Post
          </h1>
          <p className="text-[#8899BB] text-sm truncate max-w-xs">{post.title}</p>
        </div>
      </div>

      <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-6">
        <PostEditor initialData={post} postId={id} />
      </div>
    </div>
  )
}
