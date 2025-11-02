"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import TrustPage from "@/components/trust/trust-page"
import { isAuthenticated } from "@/lib/auth"

export default function Trust() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
    }
  }, [router])

  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null
  }

  return <TrustPage />
}

