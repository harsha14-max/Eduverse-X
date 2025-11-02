"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PortfolioPage } from "@/components/portfolio/portfolio-page"
import { isAuthenticated } from "@/lib/auth"

export default function Portfolio() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
    }
  }, [router])

  if (typeof window !== "undefined" && !isAuthenticated()) {
    return null
  }

  return <PortfolioPage />
}

