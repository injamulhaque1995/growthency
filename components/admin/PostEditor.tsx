"use client"

import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Save, Send, Tag, X } from "lucide-react"
import { BLOG_CATEGORIES } from "@/lib/constants"
import type { Post } from "@/types"

type PostFormData = {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  coverImage: string
  seoTitle: string
  seoDescription: string
  published: boolean
}

interface PostEditorProps {
  initialData?: Partial<Post>
  postId?: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function PostEditor({ initialData, postId }: PostEditorProps) {
  const router = useRouter()
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [tagInput, setTagInput] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [slugEdited, setSlugEdited] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      category: initialData?.category || "Growth",
      coverImage: initialData?.coverImage || "",
      seoTitle: initialData?.title || "",
      seoDescription: initialData?.excerpt || "",
      published: initialData?.published ?? false,
    },
  })

  const titleValue = watch("title")

  // Auto-generate slug from title (unless manually edited)
  useEffect(() => {
    if (!slugEdited && titleValue) {
      setValue("slug", slugify(titleValue))
    }
  }, [titleValue, slugEdited, setValue])

  function addTag() {
    const trimmed = tagInput.trim().toLowerCase()
    if (trimmed && !tags.includes(trimmed) && tags.length < 8) {
      setTags((prev) => [...prev, trimmed])
      setTagInput("")
    }
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  async function onSubmit(data: PostFormData, published: boolean) {
    setSaving(true)
    // Simulate save — replace with Convex mutation once deployed
    await new Promise((r) => setTimeout(r, 800))
    console.log("Save post:", { ...data, tags, published })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    if (published) {
      router.push("/admin/posts")
    }
  }

  const inputClass =
    "w-full bg-[#0D1428] border border-[#1A2440] text-[#F0F4FF] text-sm rounded-[8px] px-3 py-2.5 placeholder:text-[#4A5878] focus:outline-none focus:border-[#00A8FF] focus:ring-1 focus:ring-[#00A8FF]/30 transition-colors"

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, true))}
      className="space-y-6"
    >
      {/* Title */}
      <div>
        <label className="block text-xs font-medium text-[#8899BB] uppercase tracking-wide mb-1.5">
          Title *
        </label>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Enter post title…"
          className={inputClass}
        />
        {errors.title && (
          <p className="text-xs text-[#FF1744] mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label className="block text-xs font-medium text-[#8899BB] uppercase tracking-wide mb-1.5">
          Slug *
        </label>
        <input
          {...register("slug", { required: "Slug is required" })}
          placeholder="auto-generated-from-title"
          className={inputClass}
          onChange={(e) => {
            setSlugEdited(true)
            setValue("slug", e.target.value)
          }}
        />
        <p className="text-[10px] text-[#4A5878] mt-1">
          URL: /blog/{watch("slug") || "your-slug-here"}
        </p>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-xs font-medium text-[#8899BB] uppercase tracking-wide mb-1.5">
          Excerpt
        </label>
        <textarea
          {...register("excerpt")}
          rows={2}
          placeholder="Brief description for SEO and previews…"
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-xs font-medium text-[#8899BB] uppercase tracking-wide mb-1.5">
          Content (Markdown) *
        </label>
        <textarea
          {...register("content", { required: "Content is required" })}
          rows={16}
          placeholder="Write your post content in Markdown…"
          className={`${inputClass} resize-y font-[family-name:var(--font-mono)] text-xs leading-relaxed`}
        />
        {errors.content && (
          <p className="text-xs text-[#FF1744] mt-1">{errors.content.message}</p>
        )}
      </div>

      {/* Category + Cover Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[#8899BB] uppercase tracking-wide mb-1.5">
            Category
          </label>
          <select
            {...register("category")}
            className={`${inputClass} cursor-pointer`}
          >
            {BLOG_CATEGORIES.filter((c) => c !== "All").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#8899BB] uppercase tracking-wide mb-1.5">
            Cover Image URL
          </label>
          <input
            {...register("coverImage")}
            placeholder="https://…"
            className={inputClass}
          />
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-xs font-medium text-[#8899BB] uppercase tracking-wide mb-1.5">
          Tags (max 8)
        </label>
        <div className="flex gap-2 mb-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#00A8FF]"
            >
              <Tag className="w-3 h-3" />
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-[#FF1744] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addTag()
              }
            }}
            placeholder="Add tag and press Enter"
            className={`${inputClass} flex-1`}
          />
          <button
            type="button"
            onClick={addTag}
            className="h-10 px-4 text-sm font-medium text-[#8899BB] border border-[#1A2440] rounded-[8px] hover:border-[#00A8FF] hover:text-[#00A8FF] transition-all"
          >
            Add
          </button>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-[#0D1428] border border-[#1A2440] rounded-xl p-4 space-y-3">
        <p className="text-xs font-medium text-[#8899BB] uppercase tracking-wide">
          SEO Settings
        </p>
        <div>
          <label className="block text-xs text-[#4A5878] mb-1">
            SEO Title (60 chars max)
          </label>
          <input
            {...register("seoTitle")}
            placeholder="SEO-optimised title"
            maxLength={60}
            className={inputClass}
          />
          <p className="text-[10px] text-[#4A5878] mt-0.5">
            {watch("seoTitle")?.length || 0}/60
          </p>
        </div>
        <div>
          <label className="block text-xs text-[#4A5878] mb-1">
            Meta Description (160 chars max)
          </label>
          <textarea
            {...register("seoDescription")}
            rows={2}
            placeholder="Search engine description"
            maxLength={160}
            className={`${inputClass} resize-none`}
          />
          <p className="text-[10px] text-[#4A5878] mt-0.5">
            {watch("seoDescription")?.length || 0}/160
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 flex-wrap pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 h-10 px-6 text-sm font-medium text-white bg-[linear-gradient(135deg,#0066FF,#00FFD1)] rounded-[10px] shadow-[0_2px_12px_rgba(0,102,255,0.3)] hover:shadow-[0_0_30px_rgba(0,102,255,0.5)] hover:-translate-y-px transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          Publish
        </button>

        <button
          type="button"
          disabled={saving}
          onClick={handleSubmit((data) => onSubmit(data, false))}
          className="inline-flex items-center gap-2 h-10 px-5 text-sm font-medium text-[#8899BB] border border-[#1A2440] rounded-[10px] hover:border-[#00A8FF] hover:text-[#00A8FF] transition-all duration-200 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Save Draft
        </button>

        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-[#00E676]">
            <CheckCircle className="w-4 h-4" />
            Saved!
          </span>
        )}
      </div>
    </form>
  )
}
