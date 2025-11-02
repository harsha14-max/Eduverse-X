"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  User,
  Edit,
  Eye,
  MessageSquare,
} from "lucide-react"

interface TeamMember {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "offline"
  currentNodeId?: string
  activity: "editing" | "viewing" | "commenting"
  cursor?: { x: number; y: number }
}

interface TeamPresenceIndicatorProps {
  members: TeamMember[]
  nodeId?: string
  className?: string
}

export function TeamPresenceIndicator({ members, nodeId, className }: TeamPresenceIndicatorProps) {
  // Filter members active on this node
  const activeMembers = members.filter(
    (member) => member.status === "online" && (nodeId ? member.currentNodeId === nodeId : true)
  )

  if (activeMembers.length === 0) return null

  const getActivityIcon = (activity: TeamMember["activity"]) => {
    switch (activity) {
      case "editing":
        return <Edit className="h-2 w-2 text-blue-600" />
      case "commenting":
        return <MessageSquare className="h-2 w-2 text-purple-600" />
      case "viewing":
        return <Eye className="h-2 w-2 text-green-600" />
    }
  }

  const getActivityColor = (activity: TeamMember["activity"]) => {
    switch (activity) {
      case "editing":
        return "border-blue-500 bg-blue-50"
      case "commenting":
        return "border-purple-500 bg-purple-50"
      case "viewing":
        return "border-green-500 bg-green-50"
    }
  }

  return (
    <TooltipProvider>
      <div className={`flex items-center gap-1 ${className}`}>
        <AnimatePresence>
          {activeMembers.slice(0, 3).map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative cursor-pointer"
                  >
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-background ${
                      member.status === "online" ? "bg-green-500" :
                      member.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                    }`} />
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getActivityColor(member.activity)} flex items-center justify-center`}>
                      {getActivityIcon(member.activity)}
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="space-y-1">
                    <div className="font-semibold text-sm">{member.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {member.activity} {nodeId ? "this node" : ""}
                    </div>
                    {member.cursor && (
                      <div className="text-xs text-muted-foreground">
                        Position: ({member.cursor.x}, {member.cursor.y})
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </AnimatePresence>
        {activeMembers.length > 3 && (
          <Badge variant="outline" className="text-xs h-6 px-2">
            +{activeMembers.length - 3}
          </Badge>
        )}
      </div>
    </TooltipProvider>
  )
}

