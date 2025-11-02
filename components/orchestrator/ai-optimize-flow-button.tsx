"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { WorkflowOptimizationModal } from "./workflow-optimization-modal"

interface AIOptimizeFlowButtonProps {
  workflowId: string
  workflowName: string
  className?: string
}

export function AIOptimizeFlowButton({
  workflowId,
  workflowName,
  className,
}: AIOptimizeFlowButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={`gap-2 ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        <Sparkles className="h-4 w-4" />
        Optimize Flow
      </Button>

      <WorkflowOptimizationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workflowId={workflowId}
        workflowName={workflowName}
      />
    </>
  )
}
