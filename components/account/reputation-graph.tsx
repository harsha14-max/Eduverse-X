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
import { Badge } from "@/components/ui/badge"
import {
  User,
  Brain,
  Workflow,
  Share2,
  CheckCircle2,
} from "lucide-react"

interface ReputationGraphProps {
  isExpanded: boolean
}

const initialNodes: Node[] = [
  {
    id: "you",
    type: "default",
    position: { x: 250, y: 150 },
    data: { label: "You", type: "user", verified: true },
  },
  {
    id: "sara",
    type: "default",
    position: { x: 150, y: 50 },
    data: { label: "Sara J.", type: "mentor", verified: true },
  },
  {
    id: "mike",
    type: "default",
    position: { x: 350, y: 50 },
    data: { label: "Mike C.", type: "collaborator", verified: true },
  },
  {
    id: "workflow1",
    type: "default",
    position: { x: 100, y: 250 },
    data: { label: "ML Workflow", type: "workflow", reused: 24 },
  },
  {
    id: "post1",
    type: "default",
    position: { x: 400, y: 250 },
    data: { label: "LinkedIn Post", type: "post", reused: 18 },
  },
]

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "you",
    target: "sara",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: "Mentorship",
  },
  {
    id: "e2",
    source: "you",
    target: "mike",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: "Collaboration",
  },
  {
    id: "e3",
    source: "you",
    target: "workflow1",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: "Created",
  },
  {
    id: "e4",
    source: "you",
    target: "post1",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    label: "Published",
  },
]

const nodeTypes: NodeTypes = {
  default: ({ data }: any) => {
    const getNodeIcon = () => {
      switch (data.type) {
        case "user":
          return <User className="h-5 w-5" />
        case "mentor":
        case "collaborator":
          return <Brain className="h-5 w-5" />
        case "workflow":
          return <Workflow className="h-5 w-5" />
        case "post":
          return <Share2 className="h-5 w-5" />
        default:
          return <User className="h-5 w-5" />
      }
    }

    const getNodeColor = () => {
      switch (data.type) {
        case "user":
          return "border-primary bg-primary/10"
        case "mentor":
          return "border-purple-500 bg-purple-50"
        case "collaborator":
          return "border-blue-500 bg-blue-50"
        case "workflow":
          return "border-green-500 bg-green-50"
        case "post":
          return "border-orange-500 bg-orange-50"
        default:
          return "border-gray-500 bg-gray-50"
      }
    }

    return (
      <div className={`px-4 py-3 rounded-lg border-2 ${getNodeColor()} min-w-[120px]`}>
        <div className="flex items-center gap-2 mb-2">
          {getNodeIcon()}
          <div className="text-sm font-semibold">{data.label}</div>
          {data.verified && (
            <CheckCircle2 className="h-3 w-3 text-green-600" />
          )}
        </div>
        {data.reused && (
          <Badge variant="outline" className="text-xs gap-1">
            <Share2 className="h-3 w-3" />
            {data.reused} reuses
          </Badge>
        )}
      </div>
    )
  },
}

export function ReputationGraph({ isExpanded }: ReputationGraphProps) {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const onNodeClick = useCallback((_event: any, node: Node) => {
    setSelectedNode(node.id)
  }, [])

  return (
    <div className="w-full h-full min-h-[400px] relative">
      {/* SVG Gradient Definition - Must be outside ReactFlow */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="gradient-reputation" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
            <stop offset="50%" stopColor="#6366f1" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
          </linearGradient>
        </defs>
      </svg>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        snapToGrid
        snapGrid={[20, 20]}
        connectionLineType={"smoothstep" as any}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed },
          style: {
            stroke: "url(#gradient-reputation)",
            strokeWidth: 2,
          },
        }}
        className="bg-background"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="currentColor"
          className="text-muted"
        />
        <Controls />
        <MiniMap
          nodeColor={(node: Node) => {
            if (node.data.type === "user") return "#2563eb"
            if (node.data.type === "mentor") return "#a855f7"
            if (node.data.type === "workflow") return "#10b981"
            return "#6b7280"
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  )
}

