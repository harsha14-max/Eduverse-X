"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileImage, FileText, Video, Loader2, CheckCircle2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ExportVisualizationsProps {
  targetElementRef?: React.RefObject<HTMLElement>
  fileName?: string
}

export function ExportVisualizations({
  targetElementRef,
  fileName = "export",
}: ExportVisualizationsProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportedFormat, setExportedFormat] = useState<string | null>(null)

  const handleExport = async (format: "png" | "pdf" | "video") => {
    setIsExporting(true)
    setExportedFormat(null)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In real app, would use html2canvas for PNG, jsPDF for PDF, or canvas recorder for video
    console.log(`Exporting as ${format.toUpperCase()}...`)

    setExportedFormat(format)
    setIsExporting(false)

    // Reset after 2 seconds
    setTimeout(() => setExportedFormat(null), 2000)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export
          {isExporting && <Loader2 className="h-3 w-3 animate-spin" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => handleExport("png")}
          disabled={isExporting}
          className="gap-2"
        >
          {exportedFormat === "png" ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <FileImage className="h-4 w-4" />
          )}
          <span>Export as PNG</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport("pdf")}
          disabled={isExporting}
          className="gap-2"
        >
          {exportedFormat === "pdf" ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
          <span>Export as PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport("video")}
          disabled={isExporting}
          className="gap-2"
        >
          {exportedFormat === "video" ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <Video className="h-4 w-4" />
          )}
          <span>Export as Video</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {isExporting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 right-4 p-3 rounded-lg border border-border bg-background shadow-lg z-50"
        >
          <div className="flex items-center gap-2 text-sm">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span>Exporting visualization...</span>
          </div>
        </motion.div>
      )}
      {exportedFormat && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-4 right-4 p-3 rounded-lg border border-green-300 bg-green-50 shadow-lg z-50"
        >
          <div className="flex items-center gap-2 text-sm text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            <span>Exported as {exportedFormat.toUpperCase()}!</span>
          </div>
        </motion.div>
      )}
    </DropdownMenu>
  )
}

