// Mock authentication utilities
// In production, this would use proper authentication (NextAuth, Supabase, etc.)

const AUTH_KEY = "eduverse-auth"
const ONBOARDING_KEY = "eduverse-onboarding-complete"

export interface AuthUser {
  email: string
  name?: string
  identityType?: "student" | "educator"
  isGuest?: boolean
}

export function setAuth(user: AuthUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
  }
}

export function getAuth(): AuthUser | null {
  if (typeof window !== "undefined") {
    const authData = localStorage.getItem(AUTH_KEY)
    if (authData) {
      try {
        return JSON.parse(authData)
      } catch {
        return null
      }
    }
  }
  return null
}

export function clearAuth() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(ONBOARDING_KEY)
  }
}

export function isAuthenticated(): boolean {
  return getAuth() !== null
}

export function setOnboardingComplete(completed: boolean = true) {
  if (typeof window !== "undefined") {
    localStorage.setItem(ONBOARDING_KEY, String(completed))
  }
}

export function isOnboardingComplete(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ONBOARDING_KEY) === "true"
  }
  return false
}

