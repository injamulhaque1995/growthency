import Link from "next/link"

const hasClerk =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("xxx")

function AuthPlaceholder({ type }: { type: "sign-in" | "sign-up" }) {
  const isSignIn = type === "sign-in"
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050810] px-4">
      <div
        className="w-full max-w-md rounded-2xl p-10 text-center"
        style={{
          background: "rgba(13,20,40,0.95)",
          border: "1px solid rgba(0,168,255,0.2)",
          boxShadow: "0 0 60px rgba(0,102,255,0.1)",
        }}
      >
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-12 h-12">
            <defs>
              <linearGradient id="auth-grad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0066FF" />
                <stop offset="100%" stopColor="#00FFD1" />
              </linearGradient>
            </defs>
            <rect width="40" height="40" rx="10" fill="url(#auth-grad2)" />
            <rect x="7" y="24" width="6" height="10" rx="2" fill="white" opacity="0.65" />
            <rect x="17" y="17" width="6" height="17" rx="2" fill="white" opacity="0.82" />
            <rect x="27" y="10" width="6" height="24" rx="2" fill="white" />
          </svg>
        </div>

        <h1 className="text-2xl font-extrabold mb-2" style={{ color: "#F0F4FF" }}>
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-sm mb-8" style={{ color: "#4A5878" }}>
          {isSignIn
            ? "Authentication is being set up. Check back soon."
            : "Account creation is coming soon. Stay tuned!"}
        </p>

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
          style={{
            background: "rgba(0,168,255,0.1)",
            border: "1px solid rgba(0,168,255,0.25)",
            color: "#00A8FF",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00A8FF] animate-pulse inline-block" />
          Coming Soon
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center text-white"
            style={{ background: "linear-gradient(135deg, #0066FF, #00FFD1)" }}
          >
            Back to Home
          </Link>
          <Link
            href="/pricing"
            className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center"
            style={{
              background: "transparent",
              border: "1px solid rgba(0,168,255,0.25)",
              color: "#8899BB",
            }}
          >
            View Pricing
          </Link>
        </div>

        <p className="text-xs mt-6" style={{ color: "#2A3450" }}>
          {isSignIn ? (
            <>Don&apos;t have an account?{" "}
              <Link href="/sign-up" style={{ color: "#00A8FF" }}>Sign up</Link>
            </>
          ) : (
            <>Already have an account?{" "}
              <Link href="/sign-in" style={{ color: "#00A8FF" }}>Sign in</Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  if (!hasClerk) {
    return <AuthPlaceholder type="sign-up" />
  }
  const { SignUp } = require("@clerk/nextjs")
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050810]">
      <SignUp />
    </div>
  )
}
