// Enhanced Workflow Node Types
// Defines new node types for AI-Guided Workflow Builder (Section 12)

export interface WorkflowNode {
  id: string
  type: WorkflowNodeType
  title: string
  description: string
  icon: string
  color: string
  category: "social" | "ai" | "scheduler" | "notification"
}

export type WorkflowNodeType =
  | "social-post-node"
  | "ai-reasoning-node"
  | "scheduler-node"
  | "email-notification-node"

export interface NodeConfig {
  title: string
  triggerType: "manual" | "scheduled" | "webhook" | "event"
  apiEndpoint?: string
  parameters?: Record<string, any>
}

// Node type definitions
export const WORKFLOW_NODE_TYPES: Record<WorkflowNodeType, WorkflowNode> = {
  "social-post-node": {
    id: "social-post-node",
    type: "social-post-node",
    title: "Social Post Node",
    description: "Post content to LinkedIn, X, Dev.to, or other platforms",
    icon: "📤",
    color: "#3b82f6",
    category: "social",
  },
  "ai-reasoning-node": {
    id: "ai-reasoning-node",
    type: "ai-reasoning-node",
    title: "AI Reasoning Node",
    description: "Trigger AI reasoning via MCP backend for decision-making",
    icon: "🧠",
    color: "#8b5cf6",
    category: "ai",
  },
  "scheduler-node": {
    id: "scheduler-node",
    type: "scheduler-node",
    title: "Scheduler Node",
    description: "Schedule workflow execution at specific times or intervals",
    icon: "🕒",
    color: "#f59e0b",
    category: "scheduler",
  },
  "email-notification-node": {
    id: "email-notification-node",
    type: "email-notification-node",
    title: "Email/Notification Node",
    description: "Send email notifications or in-app notifications",
    icon: "📬",
    color: "#ec4899",
    category: "notification",
  },
}

/**
 * Get node configuration for editing
 */
export function getNodeConfig(nodeType: WorkflowNodeType): NodeConfig {
  const node = WORKFLOW_NODE_TYPES[nodeType]
  return {
    title: node.title,
    triggerType: "manual", // Default
    parameters: {},
  }
}

/**
 * Validate node configuration
 */
export function validateNodeConfig(config: NodeConfig): boolean {
  if (!config.title || config.title.trim().length === 0) {
    return false
  }
  if (!config.triggerType) {
    return false
  }
  return true
}

/**
 * Generate node schema for n8n backend integration
 */
export function generateNodeSchema(nodeType: WorkflowNodeType, config: NodeConfig) {
  return {
    type: nodeType,
    title: config.title,
    triggerType: config.triggerType,
    apiEndpoint: config.apiEndpoint || `/api/workflows/${nodeType}`,
    parameters: config.parameters || {},
    // This would be used by backend to create n8n node
  }
}

