"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Upload,
  Send,
  Lightbulb,
  Bug,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  Star,
  Smile,
  Frown,
  Meh,
} from "lucide-react"

type FeedbackType = "feedback" | "feature" | "bug"
type FeedbackContext = "dashboard" | "learning" | "social" | "automation"

interface FeedbackForm {
  type: FeedbackType
  context: FeedbackContext
  rating: number | null
  title: string
  description: string
  files: File[]
}

const emojiRatings = [
  { value: 5, emoji: "😄", label: "Excellent", icon: Smile },
  { value: 4, emoji: "🙂", label: "Good", icon: Smile },
  { value: 3, emoji: "😐", label: "Neutral", icon: Meh },
  { value: 2, emoji: "😕", label: "Bad", icon: Meh },
  { value: 1, emoji: "😡", label: "Terrible", icon: Frown },
]

export function FeedbackCollectionPortal() {
  const [form, setForm] = useState<FeedbackForm>({
    type: "feedback",
    context: "dashboard",
    rating: null,
    title: "",
    description: "",
    files: [],
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [textAreaHeight, setTextAreaHeight] = useState(100)

  const handleRatingSelect = (rating: number) => {
    setForm({ ...form, rating })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setForm({ ...form, files: [...form.files, ...files] })
  }

  const handleTextChange = (value: string) => {
    setForm({ ...form, description: value })
    // Dynamic height adjustment
    const lines = value.split("\n").length
    setTextAreaHeight(Math.min(Math.max(lines * 24, 100), 400))
  }

  const handleSubmit = async () => {
    if (!form.title || !form.description) return

    setSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitting(false)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setForm({
        type: "feedback",
        context: "dashboard",
        rating: null,
        title: "",
        description: "",
        files: [],
      })
      setTextAreaHeight(100)
      setSubmitted(false)
    }, 3000)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Thank You! 💡</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your feedback has been securely sent to the AI governance team.
            </p>
            <Badge variant="outline" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Submitted successfully
            </Badge>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Help us improve EduVerse 2.0 💡
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Feedback Type */}
            <div className="space-y-2">
              <Label>What would you like to do?</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={form.type === "feedback" ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => setForm({ ...form, type: "feedback" })}
                >
                  <FileText className="h-4 w-4" />
                  Send Feedback
                </Button>
                <Button
                  variant={form.type === "feature" ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => setForm({ ...form, type: "feature" })}
                >
                  <Lightbulb className="h-4 w-4" />
                  Suggest Feature
                </Button>
                <Button
                  variant={form.type === "bug" ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => setForm({ ...form, type: "bug" })}
                >
                  <Bug className="h-4 w-4" />
                  Report Bug
                </Button>
              </div>
            </div>

            {/* Context */}
            <div className="space-y-2">
              <Label htmlFor="context">Context</Label>
              <Select
                value={form.context}
                onValueChange={(value) => setForm({ ...form, context: value as FeedbackContext })}
              >
                <SelectTrigger id="context">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="learning">Learning Hub</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Emoji Rating */}
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-2 justify-center">
                {emojiRatings.map((rating) => {
                  const Icon = rating.icon
                  return (
                    <Button
                      key={rating.value}
                      variant={form.rating === rating.value ? "default" : "outline"}
                      size="lg"
                      className="flex flex-col gap-1 h-auto p-3"
                      onClick={() => handleRatingSelect(rating.value)}
                    >
                      <span className="text-2xl">{rating.emoji}</span>
                      <span className="text-xs">{rating.label}</span>
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Brief title for your feedback..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* Description (Dynamic Height) */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your feedback in detail..."
                value={form.description}
                onChange={(e) => handleTextChange(e.target.value)}
                rows={Math.ceil(textAreaHeight / 24)}
                className="resize-none"
              />
              <div className="text-xs text-muted-foreground">
                {form.description.length} characters
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>Attachments (Screenshots/Logs)</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
                <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm text-muted-foreground mb-2">
                  Click to upload or drag & drop files here
                </div>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileUpload}
                  accept="image/*,.txt,.log"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Choose Files
                </Button>
              </div>
              {form.files.length > 0 && (
                <div className="space-y-2 mt-2">
                  {form.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded bg-muted text-xs"
                    >
                      <span className="truncate flex-1">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() =>
                          setForm({
                            ...form,
                            files: form.files.filter((_, i) => i !== index),
                          })
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-border">
              <Button
                onClick={handleSubmit}
                disabled={submitting || !form.title || !form.description}
                className="w-full gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

