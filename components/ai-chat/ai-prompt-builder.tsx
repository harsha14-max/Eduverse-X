"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GrowthPromptStudio } from "./growth-prompt-studio"
import { AutomationPromptStudio } from "./automation-prompt-studio"

export function AIPromptBuilder() {
  const [activeTab, setActiveTab] = useState("growth")

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold">AI Prompt Builder + Growth Prompt Studio</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Create and manage reusable prompts for automation and growth
        </p>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="growth">Growth Prompts</TabsTrigger>
            <TabsTrigger value="automation">Automation Prompts</TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="mt-0">
            <GrowthPromptStudio />
          </TabsContent>

          <TabsContent value="automation" className="mt-0">
            <AutomationPromptStudio />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

