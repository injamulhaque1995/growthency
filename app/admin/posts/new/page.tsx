import { PostEditor } from "@/components/admin/PostEditor"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Post",
}

export default function NewPostPage() {
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
            New Post
          </h1>
          <p className="text-[#8899BB] text-sm">Create and publish a new blog post.</p>
        </div>
      </div>

      <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-6">
        <PostEditor />
      </div>
    </div>
  )
}
