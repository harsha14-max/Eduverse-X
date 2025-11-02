"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, TrendingDown, TrendingUp, AlertCircle } from "lucide-react"

interface CarbonFootprint {
  storageType: string
  energyUsed: number // kWh
  carbonEmitted: number // kg CO2
  efficiency: "high" | "medium" | "low"
}

const carbonFootprints: CarbonFootprint[] = [
  {
    storageType: "IPFS",
    energyUsed: 0.05,
    carbonEmitted: 0.02,
    efficiency: "high",
  },
  {
    storageType: "Filecoin",
    energyUsed: 0.08,
    carbonEmitted: 0.03,
    efficiency: "high",
  },
  {
    storageType: "Traditional Cloud",
    energyUsed: 0.15,
    carbonEmitted: 0.06,
    efficiency: "medium",
  },
  {
    storageType: "On-Premises",
    energyUsed: 0.25,
    carbonEmitted: 0.1,
    efficiency: "low",
  },
]

function CarbonFootprintMeter() {
  const totalEnergy = carbonFootprints.reduce((sum, cf) => sum + cf.energyUsed, 0)
  const totalCarbon = carbonFootprints.reduce((sum, cf) => sum + cf.carbonEmitted, 0)
  const averageEfficiency =
    carbonFootprints.filter((cf) => cf.efficiency === "high").length /
    carbonFootprints.length

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case "high":
        return "bg-green-500/10 text-green-700 border-green-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
      case "low":
        return "bg-red-500/10 text-red-700 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20"
    }
  }

  const getEfficiencyIcon = (efficiency: string) => {
    switch (efficiency) {
      case "high":
        return <TrendingDown className="h-4 w-4 text-green-600" />
      case "medium":
        return <TrendingUp className="h-4 w-4 text-yellow-600" />
      case "low":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Carbon Footprint Meter</CardTitle>
            <CardDescription className="text-xs">
              Shows storage energy impact
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Total Carbon Footprint */}
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">Total Carbon Footprint</div>
            <Badge variant="default" className="text-xs">
              {totalCarbon.toFixed(2)} kg CO2
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="text-muted-foreground mb-1">Energy Used</div>
              <div className="text-lg font-bold text-primary">{totalEnergy.toFixed(2)} kWh</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Carbon Emitted</div>
              <div className="text-lg font-bold text-green-600">{totalCarbon.toFixed(2)} kg CO2</div>
            </div>
          </div>
          <Progress value={averageEfficiency * 100} className="h-2 mt-3" />
        </div>

        {/* Storage Type Breakdown */}
        <div className="space-y-2">
          <div className="text-sm font-semibold">Storage Type Breakdown</div>
          {carbonFootprints.map((cf, index) => (
            <motion.div
              key={cf.storageType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 border rounded-lg transition-all ${getEfficiencyColor(cf.efficiency)}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getEfficiencyIcon(cf.efficiency)}
                  <div className="font-semibold text-sm">{cf.storageType}</div>
                </div>
                <Badge
                  variant={
                    cf.efficiency === "high"
                      ? "default"
                      : cf.efficiency === "medium"
                      ? "secondary"
                      : "destructive"
                  }
                  className="text-xs shrink-0"
                >
                  {cf.efficiency}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <span className="font-medium">Energy:</span> {cf.energyUsed.toFixed(3)} kWh
                </div>
                <div>
                  <span className="font-medium">Carbon:</span> {cf.carbonEmitted.toFixed(3)} kg CO2
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="text-xs text-muted-foreground">
            Decentralized storage (IPFS, Filecoin) has lower carbon footprint compared to
            traditional cloud storage. Higher efficiency = lower environmental impact.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { CarbonFootprintMeter }
