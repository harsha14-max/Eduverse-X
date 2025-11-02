"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CollaborativeChatRooms } from "./collaborative-chat-rooms"
import { MentorConnect } from "./mentor-connect"
import { Users, Brain, MessageSquare } from "lucide-react"

export function HumanAICollaboration() {
  const [activeTab, setActiveTab] = useState("automation")

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-bold">Human–AI Collaboration Layer</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Collaborate with AI mentors and peers inside the chat
        </p>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="automation" className="mt-0">
            <CollaborativeChatRooms type="automation" />
          </TabsContent>

          <TabsContent value="mentorship" className="mt-0">
            <MentorConnect />
          </TabsContent>

          <TabsContent value="community" className="mt-0">
            <CollaborativeChatRooms type="community" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

