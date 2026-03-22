"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { UserButton, SignInButton } from "@clerk/nextjs"
import { useClerkUser } from "@/hooks/useClerkUser"
import { ThemeToggle } from "./ThemeToggle"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────────────────
   Clerk auth — separate components so useUser() only runs inside ClerkProvider
   These are ONLY rendered when hasClerk === true (see below)
───────────────────────────────────────────────────────────────────────── */
function ClerkDesktopAuth() {
  const { isSignedIn } = useClerkUser()
  return isSignedIn ? (
    <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
  ) : (
    <>
      <SignInButton mode="modal">
        <button className="btn-ghost text-sm px-4 py-2">Sign In</button>
      </SignInButton>
      <Link href="https://growthency.com/15-minute-meeting" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-4 py-2">Book a Call</Link>
    </>
  )
}

function ClerkMobileAuth() {
  const { isSignedIn } = useClerkUser()
  return isSignedIn ? (
    <div className="p-4 border-t border-[var(--border-default)]">
      <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
    </div>
  ) : (
    <div className="p-4 border-t border-[var(--border-default)] flex flex-col gap-2">
      <SignInButton mode="modal">
        <button className="btn-ghost w-full text-sm py-2.5">Sign In</button>
      </SignInButton>
      <Link href="https://growthency.com/15-minute-meeting" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-sm py-2.5 text-center">Book a Call</Link>
    </div>
  )
}

/* ─── Simple fallback when no Clerk key ─── */
function FallbackDesktopAuth() {
  return (
    <>
      <Link href="/sign-in" className="btn-ghost text-sm px-4 py-2">Sign In</Link>
      <Link href="https://growthency.com/15-minute-meeting" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-4 py-2">Book a Call</Link>
    </>
  )
}
function FallbackMobileAuth() {
  return (
    <div className="p-4 border-t border-[var(--border-default)] flex flex-col gap-2">
      <Link href="/sign-in" className="btn-ghost w-full text-sm py-2.5 text-center">Sign In</Link>
      <Link href="https://growthency.com/15-minute-meeting" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-sm py-2.5 text-center">Book a Call</Link>
    </div>
  )
}

const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("xxx")

/* ─────────────────────────────────────────────────────────────────────────
   Main Navbar
───────────────────────────────────────────────────────────────────────── */
export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-[var(--bg-primary)]/80 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-8 h-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <defs>
                  <linearGradient id="nav-logo-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0066FF"/>
                    <stop offset="100%" stopColor="#00FFD1"/>
                  </linearGradient>
                </defs>
                <rect width="36" height="36" rx="9" fill="url(#nav-logo-grad)"/>
                <rect x="6" y="22" width="5.5" height="9" rx="1.5" fill="white" opacity="0.65"/>
                <rect x="15" y="15" width="5.5" height="16" rx="1.5" fill="white" opacity="0.82"/>
                <rect x="24.5" y="8" width="5.5" height="23" rx="1.5" fill="white"/>
              </svg>
              <span className="font-extrabold text-xl tracking-tight text-[var(--text-primary)] group-hover:opacity-90 transition-opacity">
                GROWTH
                <span style={{ background: "linear-gradient(135deg,#0066FF,#00FFD1)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  ENCY
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/")
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                        isActive ? "text-[var(--accent-blue)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      {label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                          style={{ background: "linear-gradient(90deg,#0066FF,#00FFD1)" }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              {hasClerk ? <ClerkDesktopAuth /> : <FallbackDesktopAuth />}
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(p => !p)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[var(--bg-surface)] border-l border-[var(--border-default)] shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--border-default)]">
                <Link href="/" className="flex items-center gap-2">
                  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-7 h-7 flex-shrink-0">
                    <defs>
                      <linearGradient id="mob-logo-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#0066FF"/>
                        <stop offset="100%" stopColor="#00FFD1"/>
                      </linearGradient>
                    </defs>
                    <rect width="36" height="36" rx="9" fill="url(#mob-logo-grad)"/>
                    <rect x="6" y="22" width="5.5" height="9" rx="1.5" fill="white" opacity="0.65"/>
                    <rect x="15" y="15" width="5.5" height="16" rx="1.5" fill="white" opacity="0.82"/>
                    <rect x="24.5" y="8" width="5.5" height="23" rx="1.5" fill="white"/>
                  </svg>
                  <span className="font-extrabold text-lg">GROWTH<span style={{ background: "linear-gradient(135deg,#0066FF,#00FFD1)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>ENCY</span></span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-card)] transition-colors">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map(({ label, href }, i) => {
                    const isActive = pathname === href || pathname.startsWith(href + "/")
                    return (
                      <motion.li key={href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                        <Link
                          href={href}
                          className={cn(
                            "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors",
                            isActive ? "text-[var(--accent-blue)] bg-[var(--bg-card)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                          )}
                        >
                          {label}
                          {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-blue)" }} />}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>

              {hasClerk ? <ClerkMobileAuth /> : <FallbackMobileAuth />}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
