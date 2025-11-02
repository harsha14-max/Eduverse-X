"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AIChatPage from "@/components/ai-chat/ai-chat-page"
import { isAuthenticated } from "@/lib/auth"

export default function AIChat() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
    }
  }, [router])

  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null
  }

  return <AIChatPage />
}

