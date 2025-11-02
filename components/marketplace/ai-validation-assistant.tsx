"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Sparkles, X } from "lucide-react"

interface UploadForm {
  title: string
  description: string
  tags: string
  category: string
  price: string
  version: string
}

export function AIValidationAssistant({
  form,
  suggestions,
  onSuggest,
}: {
  form: UploadForm
  suggestions: string[]
  onSuggest: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleValidate = () => {
    onSuggest()
    setValidated(true)
    setIsOpen(true)
    // Simulate AI validation
    setTimeout(() => {
      // Validation complete
    }, 1000)
  }

  const validationStatus = {
    hasTitle: form.title.length > 0,
    hasDescription: form.description.length > 20,
    hasTags: form.tags.length > 0,
    hasCategory: form.category.length > 0,
    hasVersion: form.version.length > 0,
  }

  const allValid = Object.values(validationStatus).every(Boolean)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">AI Validation Assistant</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleValidate} className="gap-2 text-xs">
          <Sparkles className="h-3 w-3" />
          Validate & Suggest
        </Button>
      </div>

      {/* Validation Status */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {Object.entries(validationStatus).map(([key, valid]) => (
          <div
            key={key}
            className={`flex items-center gap-2 p-2 rounded text-xs ${
              valid ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
            }`}
          >
            {valid ? (
              <CheckCircle2 className="h-3 w-3 text-green-600" />
            ) : (
              <AlertCircle className="h-3 w-3 text-yellow-600" />
            )}
            <span className="capitalize">{key.replace("has", "").replace(/([A-Z])/g, " $1").trim()}</span>
          </div>
        ))}
      </div>

      {/* AI Suggestions */}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">AI Suggestions</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-300 shrink-0">
                        Tip
                      </Badge>
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

