"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Shield, CheckCircle2, Network } from "lucide-react"

interface TrustedSystem {
  id: string
  name: string
  trustLevel: number // 0-100
  type: "IPFS" | "DID" | "Smart Contract" | "Node"
}

const trustedSystems: TrustedSystem[] = [
  {
    id: "1",
    name: "IPFS Cluster Alpha",
    trustLevel: 95,
    type: "IPFS",
  },
  {
    id: "2",
    name: "DID Registry",
    trustLevel: 92,
    type: "DID",
  },
  {
    id: "3",
    name: "Smart Contract A",
    trustLevel: 88,
    type: "Smart Contract",
  },
  {
    id: "4",
    name: "Decentralized Node Beta",
    trustLevel: 85,
    type: "Node",
  },
]

function ReputationOrbit() {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null)

  // Calculate orbit positions (D3.js would be used in production)
  const calculateOrbitPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI
    const radius = 80
    const centerX = 50 // percentage
    const centerY = 50 // percentage
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    return { x, y }
  }

  const getTrustColor = (level: number) => {
    if (level >= 90) return "text-green-600 bg-green-500/10 border-green-500/20"
    if (level >= 75) return "text-yellow-600 bg-yellow-500/10 border-yellow-500/20"
    return "text-red-600 bg-red-500/10 border-red-500/20"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "IPFS":
        return <Network className="h-4 w-4" />
      case "DID":
        return <Shield className="h-4 w-4" />
      case "Smart Contract":
        return <CheckCircle2 className="h-4 w-4" />
      case "Node":
        return <Network className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <Network className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Reputation Orbit</CardTitle>
            <CardDescription className="text-xs">
              Visual rings showing how many systems trust each key (D3.js in production)
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Orbit Visualization Placeholder */}
        <div className="relative w-full h-64 bg-muted rounded-lg border border-border overflow-hidden">
          {/* Center Key */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-lg">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          {/* Orbit Rings */}
          {trustedSystems.map((system, index) => {
            const position = calculateOrbitPosition(index, trustedSystems.length)
            const trustColor = getTrustColor(system.trustLevel)

            return (
              <TooltipProvider key={system.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className={`absolute w-12 h-12 rounded-full border-2 ${trustColor} flex items-center justify-center cursor-pointer transition-all hover:scale-125 hover:shadow-lg z-20`}
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      onClick={() => setSelectedSystem(system.id)}
                    >
                      {getTypeIcon(system.type)}
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs">
                      <div className="font-semibold">{system.name}</div>
                      <div>Trust Level: {system.trustLevel}%</div>
                      <div>Type: {system.type}</div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}

          {/* Orbit Paths (Visual rings) */}
          <svg className="absolute inset-0 w-full h-full">
            {trustedSystems.map((_, index) => {
              const position = calculateOrbitPosition(index, trustedSystems.length)
              const centerX = 50
              const centerY = 50
              const radius = 80

              return (
                <circle
                  key={index}
                  cx={`${centerX}%`}
                  cy={`${centerY}%`}
                  r={`${radius}%`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="text-primary/20"
                />
              )
            })}
          </svg>

          {/* Info Text */}
          <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
            D3.js Orbit Visualization (placeholder)
          </div>
        </div>

        {/* System Details */}
        {selectedSystem && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-muted rounded-lg border border-border"
          >
            {(() => {
              const system = trustedSystems.find((s) => s.id === selectedSystem)
              if (!system) return null

              return (
                <div>
                  <div className="font-semibold text-sm mb-2">{system.name}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {system.type}
                    </Badge>
                    <Badge
                      variant={system.trustLevel >= 90 ? "default" : "secondary"}
                      className="text-xs"
                    >
                      Trust: {system.trustLevel}%
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    This system trusts your key and uses it for verification. Higher trust levels
                    indicate more reliable and secure connections.
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}

        {/* System List */}
        <div className="space-y-2">
          {trustedSystems.map((system) => (
            <div
              key={system.id}
              className={`p-2 border rounded-lg transition-all hover:border-primary/50 cursor-pointer ${
                selectedSystem === system.id ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => setSelectedSystem(selectedSystem === system.id ? null : system.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getTypeIcon(system.type)}
                  <div className="text-sm font-medium truncate">{system.name}</div>
                </div>
                <Badge
                  variant={system.trustLevel >= 90 ? "default" : "secondary"}
                  className="text-xs shrink-0"
                >
                  {system.trustLevel}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export { ReputationOrbit }
