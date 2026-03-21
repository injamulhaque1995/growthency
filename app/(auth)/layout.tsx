import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In | Growthency",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#050810] flex flex-col">
      {/* subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,168,255,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,229,255,0.04) 0%, transparent 50%)",
        }}
      />
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      <footer className="relative z-10 py-4 text-center text-xs text-[#4A5878]">
        &copy; {new Date().getFullYear()} Growthency. All rights reserved.
      </footer>
    </div>
  )
}
