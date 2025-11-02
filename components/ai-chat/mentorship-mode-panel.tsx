"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIChatConsole } from "../dashboard/ai-chat-console"
import { AIAutomationMentor } from "../automation/ai-automation-mentor"
import { MentorConnect } from "./mentor-connect"
import { MentorFeed } from "./mentor-feed"

export function MentorshipModePanel() {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      {/* Main Chat */}
      <div className="lg:col-span-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="feed">Feed</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-0">
            <AIChatConsole />
          </TabsContent>

          <TabsContent value="mentors" className="mt-0">
            <MentorConnect />
          </TabsContent>

          <TabsContent value="feed" className="mt-0">
            <MentorFeed />
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Mentor */}
      <div className="lg:col-span-1">
        <AIAutomationMentor />
      </div>
    </div>
  )
}

