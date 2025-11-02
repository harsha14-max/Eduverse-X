"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import CollaborationPage from "@/components/collaboration/collaboration-page"
import { isAuthenticated } from "@/lib/auth"

export default function Collaboration() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
    }
  }, [router])

  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null
  }

  return <CollaborationPage />
}

