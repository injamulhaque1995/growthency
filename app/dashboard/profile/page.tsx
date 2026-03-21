import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/dashboard/ProfileForm"
import { User, Shield, Bell } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile",
}

export default async function ProfilePage() {
  const user = await currentUser()
  if (!user) redirect("/sign-in")

  const userData = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.emailAddresses?.[0]?.emailAddress || "",
    imageUrl: user.imageUrl,
    createdAt: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "—",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl text-[#F0F4FF] mb-1">
          Profile
        </h1>
        <p className="text-[#8899BB] text-sm">
          Manage your personal information and preferences.
        </p>
      </div>

      {/* Avatar + basic info */}
      <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-4 h-4 text-[#00A8FF]" />
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[#F0F4FF]">
            Account Info
          </h2>
        </div>
        <div className="flex items-center gap-4 mb-6">
          {userData.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={userData.imageUrl}
              alt={`${userData.firstName} ${userData.lastName}`}
              className="w-16 h-16 rounded-full border-2 border-[#1A2440]"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00FFD1] flex items-center justify-center text-white font-bold text-xl">
              {userData.firstName?.[0] || userData.email[0].toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-[family-name:var(--font-syne)] font-extrabold text-lg text-[#F0F4FF]">
              {userData.firstName} {userData.lastName}
            </p>
            <p className="text-sm text-[#8899BB]">{userData.email}</p>
            <p className="text-xs text-[#4A5878] mt-0.5">
              Member since {userData.createdAt}
            </p>
          </div>
        </div>
        <p className="text-xs text-[#4A5878] bg-[#0D1428] border border-[#1A2440] rounded-lg px-3 py-2">
          Profile picture and name are managed through Clerk. Click your avatar in the sidebar to update them.
        </p>
      </div>

      {/* Preferences form */}
      <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-4 h-4 text-[#00A8FF]" />
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[#F0F4FF]">
            Notification Preferences
          </h2>
        </div>
        <ProfileForm email={userData.email} />
      </div>

      {/* Security */}
      <div className="bg-[#0A0F1E] border border-[#1A2440] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-[#00A8FF]" />
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[#F0F4FF]">
            Security
          </h2>
        </div>
        <p className="text-sm text-[#8899BB] mb-4">
          Password and two-factor authentication are managed through Clerk.
        </p>
        <a
          href={`${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? "" : ""}https://accounts.growthency.com/user`}
          className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium text-[#8899BB] border border-[#1A2440] rounded-[10px] hover:border-[#00A8FF] hover:text-[#00A8FF] transition-all duration-200"
        >
          <Shield className="w-4 h-4" />
          Manage Security Settings
        </a>
      </div>

      {/* Danger zone */}
      <div className="bg-[#0A0F1E] border border-[#FF1744]/30 rounded-2xl p-6">
        <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-base text-[#FF1744] mb-2">
          Danger Zone
        </h2>
        <p className="text-sm text-[#8899BB] mb-4">
          Once you delete your account, all your data will be permanently removed. This action cannot be undone.
        </p>
        <button
          className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium text-[#FF1744] border border-[#FF1744]/30 rounded-[10px] hover:bg-[#FF1744]/10 transition-all duration-200"
          onClick={undefined}
          type="button"
        >
          Delete Account
        </button>
        <p className="text-xs text-[#4A5878] mt-2">
          Contact support to delete your account and all associated data.
        </p>
      </div>
    </div>
  )
}
