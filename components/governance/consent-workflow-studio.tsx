"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, CheckCircle2, Clock, AlertCircle, Shield } from "lucide-react"
import { ImmutableAuditChainViewer } from "./immutable-audit-chain-viewer"
import { AuditLogExplorer } from "./audit-log-explorer"
import { ConsentSchemaBuilder } from "./consent-schema-builder"
import { SmartConsentRules } from "./smart-consent-rules"

function ConsentWorkflowStudio() {
  const [activeTab, setActiveTab] = useState("timeline")

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Consent Workflow Studio</CardTitle>
            <CardDescription className="text-xs">
              Timeline of consent events and pre-authorize future AI actions
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="schema">Schema Builder</TabsTrigger>
            <TabsTrigger value="rules">Smart Rules</TabsTrigger>
            <TabsTrigger value="audit">Audit Chain</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="flex-1 mt-0 overflow-y-auto">
            <AuditLogExplorer />
          </TabsContent>

          <TabsContent value="schema" className="flex-1 mt-0 overflow-y-auto">
            <ConsentSchemaBuilder />
          </TabsContent>

          <TabsContent value="rules" className="flex-1 mt-0 overflow-y-auto">
            <SmartConsentRules />
          </TabsContent>

          <TabsContent value="audit" className="flex-1 mt-0 overflow-y-auto">
            <ImmutableAuditChainViewer />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export { ConsentWorkflowStudio }
