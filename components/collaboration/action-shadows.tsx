"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Lock, Eye } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActionShadowsProps {
  children: React.ReactNode
  role: "owner" | "editor" | "viewer"
  requiredRole: "owner" | "editor" | "viewer"
  tooltip?: string
}

const roleHierarchy = {
  owner: 3,
  editor: 2,
  viewer: 1,
}

export function ActionShadows({
  children,
  role,
  requiredRole,
  tooltip,
}: ActionShadowsProps) {
  const hasPermission = roleHierarchy[role] >= roleHierarchy[requiredRole]
  const canView = roleHierarchy[role] >= roleHierarchy.viewer

  if (hasPermission) {
    return <>{children}</>
  }

  if (!canView) {
    return null
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="relative cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
          >
            {/* Blurred Original */}
            <div className="blur-sm opacity-50 pointer-events-none select-none">
              {children}
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg border border-border">
              <div className="flex flex-col items-center gap-2">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">
                  {requiredRole.charAt(0).toUpperCase() + requiredRole.slice(1)} only
                </span>
              </div>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{tooltip || `Requires ${requiredRole} role`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

