"use client"

import { useSafeUser } from "@/components/providers/ClerkSafeProvider"

const hasClerk =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("xxx")

/* ─────────────────────────────────────────────────────────────
   useClerkUser — safe wrapper around Clerk's useUser()
   Returns { isSignedIn, isLoaded, user } whether or not
   ClerkProvider is present. Components should use THIS instead
   of useUser() directly.
───────────────────────────────────────────────────────────── */
export function useClerkUser() {
  // When Clerk IS configured, delegate to the real useUser.
  // The rule-of-hooks lint warning is suppressed intentionally:
  // hasClerk is a build-time constant so the branch never changes.
  if (hasClerk) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { useUser } = require("@clerk/nextjs") as typeof import("@clerk/nextjs")
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useUser()
  }

  // When no Clerk key — read from SafeUserContext (always returns guest)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSafeUser()
}
