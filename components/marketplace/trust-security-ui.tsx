"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Shield, CheckCircle2, Globe, Lock, FileText, Sparkles } from "lucide-react"

interface TrustSecurityBadgesProps {
  verified?: boolean
  decentralized?: boolean
  blockchainVerified?: boolean
  aiReviewed?: boolean
  ipfsHash?: string
  transactionHash?: string
}

export function TrustSecurityBadges({
  verified = false,
  decentralized = false,
  blockchainVerified = false,
  aiReviewed = false,
  ipfsHash,
  transactionHash,
}: TrustSecurityBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {verified && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300 cursor-help">
                <Shield className="h-3 w-3 mr-1" />
                Verified on IPFS
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>This template has been verified and stored on IPFS</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {decentralized && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300 cursor-help">
                <Globe className="h-3 w-3 mr-1" />
                Decentralized
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Metadata stored on decentralized network (IPFS)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {blockchainVerified && transactionHash && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-300 cursor-help">
                <Lock className="h-3 w-3 mr-1" />
                Blockchain Verified
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-2">
                <p>Transaction verified on blockchain</p>
                <p className="text-xs font-mono break-all">{transactionHash.slice(0, 20)}...</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {aiReviewed && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-300 cursor-help">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Reviewed
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>This review has been verified by AI sentiment analysis</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {ipfsHash && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-300 cursor-help">
                <FileText className="h-3 w-3 mr-1" />
                IPFS Hash
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-2">
                <p>IPFS Content Identifier</p>
                <p className="text-xs font-mono break-all">{ipfsHash.slice(0, 20)}...</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}

export function BlockchainTransactionVisualization({
  transactionHash,
  status = "completed",
}: {
  transactionHash?: string
  status?: "pending" | "completed" | "failed"
}) {
  if (!transactionHash) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 rounded-lg bg-purple-50/50 border border-purple-200"
    >
      <div className="flex items-center gap-2 mb-2">
        <Lock className="h-4 w-4 text-purple-600" />
        <span className="text-sm font-semibold">Blockchain Transaction</span>
        <Badge
          variant="outline"
          className={`text-xs ${
            status === "completed"
              ? "bg-green-50 text-green-700 border-green-300"
              : status === "pending"
              ? "bg-yellow-50 text-yellow-700 border-yellow-300"
              : "bg-red-50 text-red-700 border-red-300"
          }`}
        >
          {status === "completed" ? "Completed" : status === "pending" ? "Pending" : "Failed"}
        </Badge>
      </div>
      <div className="text-xs font-mono break-all text-muted-foreground">{transactionHash}</div>
    </motion.div>
  )
}

