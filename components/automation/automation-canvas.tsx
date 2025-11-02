"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  NodeTypes,
  BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Zap,
  Brain,
  Code,
  Play,
  Save,
  Eye,
  Settings,
  AlertCircle,
  CheckCircle2,
  FileCode,
} from "lucide-react"
import { CustomNode } from "./custom-node"
import { SubFlowNode } from "./sub-flow-node"
import { GhostNode } from "./ghost-node"
import { SmartLinkingPanel } from "./smart-linking"
import { Badge } from "@/components/ui/badge"
import { AINodeSuggestions } from "./ai-node-suggestions"
import { AIRepairMode, detectFailurePattern } from "./ai-repair-mode"
import { CrossAppIntelligence } from "./cross-app-intelligence"
import { SmartSocialSync } from "./smart-social-sync"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

const initialNodes: Node[] = [
  {
    id: "1",
    type: "aiPrompt",
    position: { x: 250, y: 100 },
    data: { label: "AI Prompt Node", prompt: "Create LinkedIn post", type: "prompt" },
  },
  {
    id: "2",
    type: "aiReasoning",
    position: { x: 450, y: 100 },
    data: { label: "AI Reasoning Node", reasoning: "Analyze content", type: "reasoning" },
  },
  {
    id: "3",
    type: "aiDecision",
    position: { x: 650, y: 100 },
    data: { label: "AI Decision Node", decision: "Approve or reject", type: "decision" },
  },
  {
    id: "4",
    type: "action",
    position: { x: 850, y: 100 },
    data: { label: "LinkedIn Post Action", action: "post", type: "action" },
  },
]

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
  },
]

const nodeTypes: NodeTypes = {
  aiPrompt: CustomNode as any,
  aiReasoning: CustomNode as any,
  aiDecision: CustomNode as any,
  action: CustomNode as any,
  subflow: SubFlowNode as any,
  ghost: GhostNode as any,
}

export function AutomationCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [showCodePeek, setShowCodePeek] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [flowStatus, setFlowStatus] = useState<"draft" | "running" | "error" | "success">("draft")
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [nodeSuggestions, setNodeSuggestions] = useState<any[]>([])
  const [ghostNodes, setGhostNodes] = useState<Node[]>([])
  const [repairSuggestion, setRepairSuggestion] = useState<any | null>(null)
  const [crossAppInfo, setCrossAppInfo] = useState<{ apps: string[]; explanation: string } | null>(null)
  const [publishResultNode, setPublishResultNode] = useState<{ id: string; label: string } | null>(null)
  
  // Mock historical cache data for performance glow
  // In production, this would fetch from analytics/execution history
  const historicalCache: Record<string, number> = {
    "1": 95, // AI Prompt Node - 95% success rate
    "2": 88, // AI Reasoning Node - 88% success rate
    "3": 92, // AI Decision Node - 92% success rate
    "4": 85, // LinkedIn Post Action - 85% success rate
  }
  
  // Attach historical cache to window for node components to access
  if (typeof window !== "undefined") {
    (window as any).historicalCache = historicalCache
  }
  
  // Enhance nodes with historical success rate data
  const enhancedNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        successRate: historicalCache[node.id] || node.data?.successRate || 90,
      },
    }))
  }, [nodes])

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds))
      toast.success("Nodes connected", {
        description: "Connection established between nodes",
      })
    },
    [setEdges]
  )

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id)
  }, [])

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null)
  }, [])

  const handleAddNode = useCallback((nodeType: string, label: string) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: nodeType,
      position: {
        x: Math.random() * 400 + 300,
        y: Math.random() * 300 + 200,
      },
      data: {
        label,
        type: nodeType === "subflow" ? "subflow" : nodeType.replace("ai", "").toLowerCase(),
        ...(nodeType === "subflow" && {
          subFlowId: `subflow-${Date.now()}`,
          subFlowName: label,
          nodeCount: 3,
          isCollapsed: true,
        }),
      },
    }
    setNodes((nds) => [...nds, newNode])
    toast.success("Node added", {
      description: `Added ${label} to canvas`,
    })
    setSelectedNodeId(null)
  }, [setNodes])

  const flowJson = useMemo(() => {
    return JSON.stringify(
      {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
        })),
      },
      null,
      2
    )
  }, [nodes, edges])

  const [executionData, setExecutionData] = useState<any>(null)

  const handleSimulate = () => {
    setIsSimulating(true)
    setFlowStatus("running")
    
    // Generate execution data for visualizer
    const execution = {
      id: `exec-${Date.now()}`,
      flowName: "LinkedIn Auto Poster",
      startTime: Date.now() - 10000,
      endTime: Date.now(),
      status: "success" as const,
      traces: nodes.map((node, index) => ({
        nodeId: node.id,
        nodeName: node.data.label,
        status: index === 2 ? "error" : "success",
        startTime: Date.now() - (10000 - index * 2000),
        endTime: Date.now() - (10000 - index * 2000) + 2000,
        data: { result: `Node ${index + 1} executed successfully` },
      })),
    }
    setExecutionData(execution)
    
    // Simulate AI node suggestions with ghost-nodes
    setTimeout(() => {
      // Add ghost-node for AI suggestion
      const ghostNode: Node = {
        id: "ghost-1",
        type: "ghost",
        position: { x: 550, y: 200 },
        data: {
          label: "Summarize Text",
          type: "reasoning",
          reason: "Text summarization would improve content quality",
          onAccept: () => {
            handleAddNode("aiReasoning", "Summarize Text")
            setGhostNodes(ghostNodes.filter((n) => n.id !== "ghost-1"))
          },
          onDismiss: () => {
            setGhostNodes(ghostNodes.filter((n) => n.id !== "ghost-1"))
          },
        },
      }
      setGhostNodes([ghostNode])
      
      // Also show card-based suggestions
      setNodeSuggestions([
        {
          id: "suggestion-1",
          suggestion: "Add 'Summarize Text' after 'Fetch YouTube Transcript'",
          nodeType: "aiReasoning",
          position: { x: 550, y: 150 },
          reason: "Text summarization would improve content quality",
        },
      ])
    }, 1000)

    // Enhanced cross-app intelligence detection
    const detectedApps: string[] = []
    const appMap: Record<string, string> = {
      "aiPrompt": "AI Service",
      "aiReasoning": "AI Service",
      "aiDecision": "AI Service",
      "action": "LinkedIn",
    }
    
    // Detect apps from node labels and types
    nodes.forEach((node) => {
      const label = typeof node.data?.label === 'string' ? node.data.label.toLowerCase() : ""
      if (label.includes("linkedin")) detectedApps.push("LinkedIn")
      if (label.includes("slack")) detectedApps.push("Slack")
      if (label.includes("github")) detectedApps.push("GitHub")
      if (label.includes("notion")) detectedApps.push("Notion")
      if (label.includes("drive")) detectedApps.push("Google Drive")
      if (label.includes("gmail")) detectedApps.push("Gmail")
    })
    
    // Remove duplicates
    const uniqueApps = Array.from(new Set(detectedApps))
    
    if (uniqueApps.length >= 2) {
      let explanation = `These nodes connect ${uniqueApps.join(", ")}. `
      if (uniqueApps.includes("Drive") && uniqueApps.includes("Notion") && uniqueApps.includes("Slack")) {
        explanation += "Forms a cross-knowledge loop: content → notes → notification."
      } else if (uniqueApps.includes("LinkedIn") && uniqueApps.includes("GitHub")) {
        explanation += "Enables portfolio auto-sync: GitHub projects → LinkedIn posts."
      } else {
        explanation += "Creates a multi-platform automation workflow."
      }
      
      setCrossAppInfo({
        apps: uniqueApps,
        explanation,
      })
    }

    // Simulate repair mode if error occurs (enhanced AI detection)
    const errorNode = execution.traces.find((t: any) => t.status === "error")
    if (errorNode) {
      setTimeout(() => {
        // Use frontend AI detection function for common failure patterns
        const node = nodes.find((n) => n.id === errorNode.nodeId)
        const nodeLabel = typeof node?.data?.label === 'string' ? node.data.label : 
                         typeof errorNode.nodeName === 'string' ? errorNode.nodeName : "Unknown Node"
        const nodeType = typeof node?.data?.type === 'string' ? node.data.type : "unknown"
        
        // Mock error message (in production, this would come from execution logs)
        const errorMessage = (errorNode as any).error?.message || 
          (nodeType === "action" ? "API key authentication failed" :
           nodeType === "reasoning" ? "Connection timeout" :
           "Unknown error occurred")
        
        // Use AI detection function
        const detectedSuggestion = detectFailurePattern(String(errorMessage), String(nodeLabel), String(nodeType))
        
        if (detectedSuggestion) {
          setRepairSuggestion({
            ...detectedSuggestion,
            nodeId: errorNode.nodeId,
          })
        } else {
          // Fallback to generic suggestion
          setRepairSuggestion({
            id: `repair-${Date.now()}`,
            nodeId: errorNode.nodeId,
            issue: `Node "${errorNode.nodeName}" execution failed`,
            possibleFix: "Node execution failed. Check API connection and configuration.",
            action: "Check Configuration",
            confidence: 60,
            errorType: "unknown",
          })
        }
      }, 2500)
    }
    
    // Check for Publish Result node
    const publishNode = nodes.find((n) => {
      const label = typeof n.data?.label === 'string' ? n.data.label : ''
      return label.toLowerCase().includes("publish") || 
             (n.type === "action" && label.toLowerCase().includes("publish"))
    })
    
    if (publishNode) {
      const label = typeof publishNode.data?.label === 'string' ? publishNode.data.label : "Publish Result"
      setPublishResultNode({
        id: publishNode.id,
        label: label,
      })
    }

    // Simulate flow execution
    setTimeout(() => {
      setIsSimulating(false)
      setFlowStatus("success")
      setTimeout(() => {
        setFlowStatus("draft")
      }, 3000)
    }, 2000)
  }

  const getStatusIcon = () => {
    switch (flowStatus) {
      case "running":
        return <Play className="h-3 w-3 text-blue-600 animate-spin" />
      case "error":
        return <AlertCircle className="h-3 w-3 text-red-600" />
      case "success":
        return <CheckCircle2 className="h-3 w-3 text-green-600" />
      default:
        return <Zap className="h-3 w-3 text-muted-foreground" />
    }
  }

  return (
    <div className="flex-1 flex flex-col relative bg-muted/30">
      {/* Canvas Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">Automation Flow Builder</h2>
          <Badge variant="outline" className="gap-1.5 text-xs">
            {getStatusIcon()}
            <span className="capitalize">{flowStatus}</span>
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSimulate}
            disabled={isSimulating}
            className="gap-2"
          >
            <Play className="h-3 w-3" />
            Simulate Flow
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Save className="h-3 w-3" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCodePeek(!showCodePeek)}
            className="gap-2"
          >
            <FileCode className="h-3 w-3" />
            Code Peek
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ReactFlow Canvas */}
      <div className="flex-1 relative min-w-0 min-h-0 overflow-hidden">
        <ReactFlow
          nodes={[...enhancedNodes, ...ghostNodes]}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[20, 20]}
          connectionLineType={"smoothstep" as any}
          defaultEdgeOptions={{
            type: "smoothstep",
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed },
            style: {
              stroke: "url(#gradient-blue-purple)",
              strokeWidth: 2,
              filter: "drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))",
            },
          }}
          className="bg-background"
        >
          {/* Gradient Definition for Edges */}
          <defs>
            <linearGradient id="gradient-blue-purple" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#6366f1" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="currentColor"
            className="text-muted"
          />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              if (node.type === "aiPrompt") return "#a855f7"
              if (node.type === "aiReasoning") return "#3b82f6"
              if (node.type === "aiDecision") return "#10b981"
              return "#6b7280"
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
        </ReactFlow>

        {/* AI Glow Effect */}
        {isSimulating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 pointer-events-none z-10"
          >
            <div className="absolute inset-0 bg-primary/10 blur-3xl" />
          </motion.div>
        )}

        {/* Smart Linking Panel */}
        <SmartLinkingPanel
          currentNodeId={selectedNodeId}
          onAddNode={handleAddNode}
        />

        {/* AI Node Suggestions */}
        <AINodeSuggestions
          suggestions={nodeSuggestions}
          onAccept={(suggestion) => {
            handleAddNode(suggestion.nodeType, suggestion.suggestion)
            setNodeSuggestions(nodeSuggestions.filter((s) => s.id !== suggestion.id))
          }}
          onDismiss={(id) => setNodeSuggestions(nodeSuggestions.filter((s) => s.id !== id))}
        />

        {/* AI Repair Mode */}
        <AIRepairMode
          suggestion={repairSuggestion}
          onFix={(suggestion) => {
            // In real app, fix the issue
            toast.success("Issue fixed", {
              description: suggestion.possibleFix,
            })
            setRepairSuggestion(null)
          }}
          onDismiss={() => setRepairSuggestion(null)}
        />

        {/* Cross-App Intelligence */}
        {crossAppInfo && (
          <CrossAppIntelligence
            apps={crossAppInfo.apps}
            explanation={crossAppInfo.explanation}
          />
        )}

        {/* Smart Social Sync - Show when automation ends with Publish Result node */}
        {flowStatus === "success" && publishResultNode && (
          <SmartSocialSync
            showWhenPublishResult={true}
            publishResultNode={publishResultNode}
            onPublish={(platforms) => {
              toast.success("Publishing to platforms", {
                description: `Publishing to ${platforms.join(", ")} via n8n webhooks`,
              })
              setPublishResultNode(null)
            }}
          />
        )}
      </div>

      {/* Code Peek Dialog */}
      <Dialog open={showCodePeek} onOpenChange={setShowCodePeek}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Flow JSON Representation</DialogTitle>
            <DialogDescription>
              Auto-generated JSON / YAML representation of your flow
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">JSON Format</span>
              <Button variant="outline" size="sm" className="gap-2">
                <Code className="h-3 w-3" />
                Copy
              </Button>
            </div>
            <pre className="p-4 rounded-lg bg-muted text-xs overflow-auto max-h-[60vh]">
              <code>{flowJson}</code>
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

