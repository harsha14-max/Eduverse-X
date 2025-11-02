"use client"

import { useState, useCallback } from "react"
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  NodeTypes,
  BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Network,
  Award,
  Workflow,
  Share2,
  User,
  CheckCircle2,
} from "lucide-react"

const initialNodes: Node[] = [
  {
    id: "you",
    type: "default",
    position: { x: 250, y: 150 },
    data: { label: "You", type: "user", verified: true },
  },
  {
    id: "project1",
    type: "default",
    position: { x: 150, y: 50 },
    data: { label: "Weather App", type: "project", verified: true },
  },
  {
    id: "skill1",
    type: "default",
    position: { x: 350, y: 50 },
    data: { label: "React", type: "skill", verified: true },
  },
  {
    id: "post1",
    type: "default",
    position: { x: 100, y: 250 },
    data: { label: "LinkedIn Post", type: "post", verified: true },
  },
  {
    id: "cert1",
    type: "default",
    position: { x: 400, y: 250 },
    data: { label: "ML Certificate", type: "certificate", verified: true },
  },
]

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "you",
    target: "project1",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: "Created",
  },
  {
    id: "e2",
    source: "you",
    target: "skill1",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: "Mastered",
  },
  {
    id: "e3",
    source: "project1",
    target: "post1",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: "Published",
  },
  {
    id: "e4",
    source: "skill1",
    target: "cert1",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: "Verified",
  },
]

export function DecentralizedReputationGraph() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  const onNodesChange = useCallback((changes: any[]) => {
    changes.forEach((change: any) => {
      if (change.type === "select") {
        const node = nodes.find((n) => n.id === change.id)
        if (node) {
          setSelectedNode(change.selected ? node : null)
        }
      }
    })
  }, [nodes])

  const getNodeColor = (type: string) => {
    switch (type) {
      case "user":
        return "bg-primary"
      case "project":
        return "bg-blue-500"
      case "skill":
        return "bg-green-500"
      case "post":
        return "bg-purple-500"
      case "certificate":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const nodeTypes: NodeTypes = {
    default: ({ data, selected }: any) => {
      const color = getNodeColor(data.type)
      return (
        <div
          className={`px-3 py-2 rounded-lg text-white text-xs font-medium shadow-md ${
            selected ? "ring-2 ring-primary ring-offset-2" : ""
          } ${color}`}
        >
          <div className="flex items-center gap-1">
            {data.label}
            {data.verified && <CheckCircle2 className="h-3 w-3" />}
          </div>
        </div>
      )
    },
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <Network className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">Decentralized Reputation Graph</CardTitle>
            <CardDescription className="text-xs">
              Interactive network showing verified achievements and connections
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[500px] rounded-lg border border-border bg-muted/30 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={(changes) => {}}
            nodeTypes={nodeTypes}
            fitView
            className="bg-transparent"
          >
            <Background variant={BackgroundVariant.Dots} />
            <Controls />
            <MiniMap />
          </ReactFlow>

          {/* Hover Tooltip */}
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 p-3 rounded-lg border border-border bg-background shadow-lg z-10 max-w-xs"
            >
              <div className="text-sm font-semibold mb-1">{String(selectedNode.data?.label || "")}</div>
              <div className="text-xs text-muted-foreground mb-2">Type: {String(selectedNode.data?.type || "")}</div>
              {(selectedNode.data as any)?.verified && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
              <div className="text-xs text-muted-foreground mt-2">
                Timestamp: {new Date().toLocaleDateString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Source Hash: {selectedNode.id.substring(0, 8)}...
              </div>
            </motion.div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { label: "User", color: "bg-primary" },
            { label: "Project", color: "bg-blue-500" },
            { label: "Skill", color: "bg-green-500" },
            { label: "Post", color: "bg-purple-500" },
            { label: "Certificate", color: "bg-orange-500" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

