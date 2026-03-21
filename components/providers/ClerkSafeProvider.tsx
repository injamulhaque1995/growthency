"use client"

import React, { createContext, useContext } from "react"
import { ClerkProvider } from "@clerk/nextjs"

/* ─── Safe user context (used when no real Clerk key) ─── */
interface SafeUser {
  isSignedIn: boolean
  isLoaded: boolean
  user: null
}

const SafeUserContext = createContext<SafeUser>({
  isSignedIn: false,
  isLoaded: true,
  user: null,
})

export function useSafeUser(): SafeUser {
  return useContext(SafeUserContext)
}

/* ─── Determine once at module load time ─── */
const hasClerk =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("xxx")

/* ─── Provider: real ClerkProvider OR safe mock ─── */
export function ClerkSafeProvider({ children }: { children: React.ReactNode }) {
  if (hasClerk) {
    return <ClerkProvider>{children}</ClerkProvider>
  }

  return (
    <SafeUserContext.Provider value={{ isSignedIn: false, isLoaded: true, user: null }}>
      {children}
    </SafeUserContext.Provider>
  )
}
