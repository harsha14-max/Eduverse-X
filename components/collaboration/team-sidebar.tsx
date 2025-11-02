"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, Circle, ChevronRight } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TeamMember {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "offline"
  currentLocation?: string
  activity: "editing" | "viewing" | "commenting" | "idle"
  color: string
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "AJ",
    status: "online",
    currentLocation: "Editing /analytics chart #2",
    activity: "editing",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "BS",
    status: "online",
    currentLocation: "Viewing /automation workflow #5",
    activity: "viewing",
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Charlie Brown",
    avatar: "CB",
    status: "away",
    currentLocation: undefined,
    activity: "idle",
    color: "bg-yellow-500",
  },
  {
    id: "4",
    name: "Diana Prince",
    avatar: "DP",
    status: "offline",
    currentLocation: undefined,
    activity: "idle",
    color: "bg-gray-400",
  },
]

export default function TeamSidebar() {
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "editing":
        return "border-blue-500 bg-blue-50"
      case "viewing":
        return "border-green-500 bg-green-50"
      case "commenting":
        return "border-purple-500 bg-purple-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-bold">Team Sidebar</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Online/offline teammates with current locations
        </p>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-3">
            {teamMembers.map((member) => {
              const isExpanded = expandedMember === member.id
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    isExpanded ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setExpandedMember(isExpanded ? null : member.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10 border-2 border-background">
                        <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold">{member.name}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getActivityColor(member.activity)}`}
                        >
                          {member.activity}
                        </Badge>
                      </div>
                      {member.currentLocation && (
                        <div className="text-xs text-muted-foreground truncate">
                          {member.currentLocation}
                        </div>
                      )}
                      {member.status === "offline" && (
                        <div className="text-xs text-muted-foreground">Last seen 2h ago</div>
                      )}
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 pt-3 border-t border-border"
                      >
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            <Circle className="h-3 w-3 text-primary" />
                            <span className="text-muted-foreground">Status:</span>
                            <span className="capitalize">{member.status}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Circle className="h-3 w-3" style={{ color: member.color }} />
                            <span className="text-muted-foreground">Activity:</span>
                            <span className="capitalize">{member.activity}</span>
                          </div>
                          {member.currentLocation && (
                            <div className="flex items-center gap-2">
                              <Circle className="h-3 w-3 text-blue-500" />
                              <span className="text-muted-foreground">Location:</span>
                              <span>{member.currentLocation}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
