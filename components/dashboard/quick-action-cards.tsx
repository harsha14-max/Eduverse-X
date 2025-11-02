"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  Send, 
  Settings, 
  BarChart3, 
  Link2,
  FileText,
  Calendar,
  Zap
} from "lucide-react"
import { QuickActionModal } from "./quick-action-modal"
import { PermissionModal } from "./permission-modal"

interface ActionCard {
  id: string
  title: string
  description: string
  icon: any
  color: string
  action: () => void
}

export function QuickActionCards() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [showPermissionModal, setShowPermissionModal] = useState(false)
  const [pendingAction, setPendingAction] = useState<any>(null)
  const [isExecuting, setIsExecuting] = useState(false)

  const actions: ActionCard[] = [
    {
      id: "weekly-summary",
      title: "Generate Weekly Summary",
      description: "AI-generated summary of your learning progress",
      icon: FileText,
      color: "hover:bg-blue-50 hover:border-blue-300",
      action: () => setSelectedAction("weekly-summary"),
    },
    {
      id: "create-post",
      title: "Create LinkedIn Post",
      description: "Auto-generate post about your achievements",
      icon: Send,
      color: "hover:bg-blue-50 hover:border-blue-300",
      action: () => setSelectedAction("create-post"),
    },
    {
      id: "configure-automation",
      title: "Configure Automation",
      description: "Set up new workflow or automation",
      icon: Settings,
      color: "hover:bg-purple-50 hover:border-purple-300",
      action: () => setSelectedAction("configure-automation"),
    },
    {
      id: "view-analytics",
      title: "View Learning Analytics",
      description: "See detailed insights and reports",
      icon: BarChart3,
      color: "hover:bg-green-50 hover:border-green-300",
      action: () => setSelectedAction("view-analytics"),
    },
    {
      id: "add-integration",
      title: "Add Integration",
      description: "Connect new app or service",
      icon: Link2,
      color: "hover:bg-orange-50 hover:border-orange-300",
      action: () => setSelectedAction("add-integration"),
    },
    {
      id: "schedule-post",
      title: "Schedule Post",
      description: "Plan content for later",
      icon: Calendar,
      color: "hover:bg-indigo-50 hover:border-indigo-300",
      action: () => setSelectedAction("schedule-post"),
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`h-full border-border cursor-pointer transition-all ${action.color} group`}
                onClick={action.action}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* AI-Assisted Modal */}
      <QuickActionModal
        open={selectedAction !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedAction(null)
        }}
        actionType={selectedAction as any}
      />

      {/* Permission Modal */}
      <PermissionModal
        open={showPermissionModal}
        onOpenChange={setShowPermissionModal}
        onConfirm={() => {
          setIsExecuting(true)
          // Simulate action execution
          setTimeout(() => {
            setIsExecuting(false)
            setShowPermissionModal(false)
            setPendingAction(null)
            // Show success notification
            console.log("Action executed successfully!")
          }, 2000)
        }}
        onCancel={() => {
          setPendingAction(null)
        }}
        action={pendingAction}
        isLoading={isExecuting}
      />
    </div>
  )
}

