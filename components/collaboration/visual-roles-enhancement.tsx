"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Crown, Edit, Eye, Lock } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  avatar: string
  role: "owner" | "editor" | "viewer"
}

interface VisualRolesEnhancementProps {
  member: TeamMember
}

export function VisualRolesEnhancement({ member }: VisualRolesEnhancementProps) {
  const getRoleFrame = (role: string) => {
    switch (role) {
      case "owner":
        return "border-yellow-500 bg-yellow-50 ring-2 ring-yellow-500/20"
      case "editor":
        return "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
      case "viewer":
        return "border-gray-400 bg-gray-50 ring-2 ring-gray-400/20"
      default:
        return "border-border bg-muted"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return Crown
      case "editor":
        return Edit
      case "viewer":
        return Eye
      default:
        return Lock
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "text-yellow-600"
      case "editor":
        return "text-blue-600"
      case "viewer":
        return "text-gray-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getRoleTooltip = (role: string) => {
    switch (role) {
      case "owner":
        return "Owner — Full access to all features"
      case "editor":
        return "Editor — Can edit workflows and comments"
      case "viewer":
        return "Viewer — Can view but not edit"
      default:
        return "Unknown role"
    }
  }

  const Icon = getRoleIcon(member.role)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`relative ${getRoleFrame(member.role)} rounded-full p-1 cursor-pointer`}
          >
            <Avatar className="h-10 w-10 border-2 border-background">
              <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
            </Avatar>
            <div
              className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background ${getRoleFrame(member.role)} flex items-center justify-center`}
            >
              <Icon className={`h-3 w-3 ${getRoleColor(member.role)}`} />
            </div>
            <Badge
              variant="outline"
              className={`absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs ${getRoleFrame(member.role)}`}
            >
              {member.role}
            </Badge>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">
            <div className="font-semibold mb-1">{member.name}</div>
            <div className="text-muted-foreground">{getRoleTooltip(member.role)}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

