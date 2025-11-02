"use client"

import { motion } from "framer-motion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle2, Network } from "lucide-react"

interface NodeTrustBadgeProps {
  ipfsCluster?: number
  isVerified?: boolean
  integrity?: "verified" | "pending" | "unknown"
  className?: string
}

export function NodeTrustBadge({ 
  ipfsCluster, 
  isVerified = false, 
  integrity = "verified",
  className 
}: NodeTrustBadgeProps) {
  const clusterInfo = ipfsCluster !== undefined ? `IPFS Cluster #${ipfsCluster}` : "IPFS Cluster"
  const integrityText = integrity === "verified" ? "Verified Integrity" : 
                         integrity === "pending" ? "Verification Pending" : 
                         "Verification Unknown"

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={className}
          >
            <Badge 
              variant="outline" 
              className={`text-xs gap-1 ${
                integrity === "verified" ? "bg-green-50 text-green-700 border-green-300" :
                integrity === "pending" ? "bg-yellow-50 text-yellow-700 border-yellow-300" :
                "bg-gray-50 text-gray-700 border-gray-300"
              }`}
            >
              {integrity === "verified" ? (
                <CheckCircle2 className="h-3 w-3 text-green-600" />
              ) : integrity === "pending" ? (
                <Shield className="h-3 w-3 text-yellow-600" />
              ) : (
                <Network className="h-3 w-3 text-gray-600" />
              )}
              Decentralized
            </Badge>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-primary" />
              <div className="font-semibold text-sm">{clusterInfo}</div>
            </div>
            <div className="text-xs text-muted-foreground">
              {integrityText}
            </div>
            {isVerified && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                <span>Hash verified on blockchain</span>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

