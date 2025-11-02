"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardPage } from "@/components/dashboard/dashboard-page"
import { isAuthenticated } from "@/lib/auth"

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication on client side
    if (!isAuthenticated()) {
      router.push("/auth/login")
    }
  }, [router])

  // Show loading or redirect immediately
  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null // Or a loading spinner
  }

  return <DashboardPage />
}

