"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GrowthProfileCard } from "./growth-profile-card"
import { PortfolioSync } from "./portfolio-sync"
import { AISocialBotFeed } from "./ai-social-bot-feed"
import { DataTransparencyModal } from "./data-transparency-modal"
import {
  User,
  Shield,
  Wallet,
  CheckCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAuth } from "@/lib/auth"
import { useEffect } from "react"

export function AccountHub() {
  const [authUser, setAuthUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("growth")

  useEffect(() => {
    const user = getAuth()
    if (user) {
      setAuthUser(user)
    }
  }, [])

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Account Hub</CardTitle>
              <CardDescription className="text-xs">
                Identity + Growth Management
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {authUser?.did && (
              <Badge variant="outline" className="gap-2">
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                DID Linked
              </Badge>
            )}
            {authUser?.wallet && (
              <Badge variant="outline" className="gap-2">
                <Wallet className="h-3 w-3 text-blue-600" />
                Wallet Connected
              </Badge>
            )}
            <DataTransparencyModal />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="growth">Growth Profile</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio Sync</TabsTrigger>
            <TabsTrigger value="social">AI Social Bot</TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="mt-4">
            <GrowthProfileCard />
          </TabsContent>

          <TabsContent value="portfolio" className="mt-4">
            <PortfolioSync />
          </TabsContent>

          <TabsContent value="social" className="mt-4">
            <AISocialBotFeed />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

