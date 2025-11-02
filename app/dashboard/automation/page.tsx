"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AutomationPage from "@/components/automation/automation-page"
import { isAuthenticated } from "@/lib/auth"

export default function Automation() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
    }
  }, [router])

  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null
  }

  return <AutomationPage />
}

