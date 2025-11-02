"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AccountPage } from "@/components/account/account-page"
import { isAuthenticated } from "@/lib/auth"

export default function Account() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
    }
  }, [router])

  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null
  }

  return <AccountPage />
}

