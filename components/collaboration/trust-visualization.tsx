"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle2, AlertTriangle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TrustVisualizationProps {
  verified: boolean
  nodeHash?: string
  verificationType?: "node" | "decentralized" | "manual"
  showDetails?: boolean
}

export function TrustVisualization({
  verified,
  nodeHash,
  verificationType = "node",
  showDetails = false,
}: TrustVisualizationProps) {
  const getVerificationLabel = () => {
    switch (verificationType) {
      case "node":
        return "Verified by Node"
      case "decentralized":
        return "Verified on Decentralized Log"
      case "manual":
        return "Manually Verified"
      default:
        return "Verified"
    }
  }

  if (!verified) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-300">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Unverified
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">This asset has not been verified</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-1"
          >
            <Badge
              variant="outline"
              className="text-xs bg-green-50 text-green-700 border-green-300"
            >
              <Shield className="h-3 w-3 mr-1" />
              {getVerificationLabel()}
            </Badge>
            {showDetails && nodeHash && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300">
                #{nodeHash.substring(0, 8)}
              </Badge>
            )}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs space-y-1">
            <div className="font-semibold">{getVerificationLabel()}</div>
            {nodeHash && (
              <div className="text-muted-foreground">
                Hash: {nodeHash.substring(0, 16)}...
              </div>
            )}
            <div className="text-muted-foreground">
              This edit was recorded on {verificationType === "decentralized" ? "decentralized" : "verified"} log
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

