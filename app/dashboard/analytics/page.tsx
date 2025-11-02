"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AnalyticsPage } from "@/components/analytics/analytics-page"
import { isAuthenticated } from "@/lib/auth"

export default function Analytics() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
    }
  }, [router])

  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null
  }

  return <AnalyticsPage />
}

