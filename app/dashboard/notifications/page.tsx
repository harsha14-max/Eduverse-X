"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import NotificationCenterPage from "@/components/notifications/notification-center-page"
import { isAuthenticated } from "@/lib/auth"

export default function Notifications() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
    }
  }, [router])

  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null
  }

  return <NotificationCenterPage />
}

