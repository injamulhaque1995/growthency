import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,102,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center max-w-lg">
        {/* Big 404 */}
        <div
          className="text-[160px] font-extrabold leading-none tracking-tighter select-none"
          style={{
            background: "linear-gradient(135deg, #0066FF 0%, #00FFD1 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Inter, sans-serif",
          }}
        >
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-2 mb-4">
          Page Not Found
        </h1>
        <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-10">
          Looks like this page took a detour. Let&apos;s get you back on the
          growth track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-primary h-11 px-7 text-sm font-semibold inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
          <Link
            href="/services"
            className="btn-ghost h-11 px-7 text-sm font-semibold inline-flex items-center gap-2"
          >
            View Services
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--text-secondary)]">
          {[
            { label: "Tools", href: "/tools" },
            { label: "Blog", href: "/blog" },
            { label: "Pricing", href: "/pricing" },
            { label: "About", href: "/about" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-[var(--accent-blue)] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
