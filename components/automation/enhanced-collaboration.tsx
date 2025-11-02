"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  MessageSquare,
  Pin,
  Users,
  Clock,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AIThreadSummaries } from "../collaboration/ai-thread-summaries"

interface Comment {
  id: string
  nodeId: string
  author: string
  avatar: string
  content: string
  timestamp: string
  isPinned: boolean
  resolved: boolean
}

interface CollaborationData {
  nodeId: string
  comments: Comment[]
  activeUsers: {
    id: string
    name: string
    avatar: string
    cursor?: { x: number; y: number }
    status: "editing" | "viewing" | "commenting"
  }[]
}

interface SessionTimelineEntry {
  id: string
  user: string
  action: string
  timestamp: string
  nodeId?: string
  details: string
}

export function EnhancedCollaboration({ nodeId }: { nodeId?: string }) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      nodeId: "node-1",
      author: "Alice Johnson",
      avatar: "AJ",
      content: "Should we add error handling for API failures here?",
      timestamp: "2 hours ago",
      isPinned: true,
      resolved: false,
    },
    {
      id: "2",
      nodeId: "node-2",
      author: "Bob Smith",
      avatar: "BS",
      content: "Fix API key here - use environment variable",
      timestamp: "1 hour ago",
      isPinned: true,
      resolved: false,
    },
    {
      id: "3",
      nodeId: "node-3",
      author: "Charlie Brown",
      avatar: "CB",
      content: "Looks good! Approved.",
      timestamp: "30 minutes ago",
      isPinned: false,
      resolved: true,
    },
  ])

  const [activeUsers, setActiveUsers] = useState([
    {
      id: "1",
      name: "Alice Johnson",
      avatar: "AJ",
      status: "editing" as const,
      cursor: { x: 100, y: 200 },
    },
    {
      id: "2",
      name: "Bob Smith",
      avatar: "BS",
      status: "commenting" as const,
    },
  ])

  const [sessionTimeline, setSessionTimeline] = useState<SessionTimelineEntry[]>([
    {
      id: "1",
      user: "Alice Johnson",
      action: "Created",
      timestamp: "2 hours ago",
      nodeId: "node-1",
      details: "Added AI Prompt Node",
    },
    {
      id: "2",
      user: "Bob Smith",
      action: "Modified",
      timestamp: "1 hour ago",
      nodeId: "node-2",
      details: "Updated API configuration",
    },
    {
      id: "3",
      user: "Charlie Brown",
      action: "Commented",
      timestamp: "30 minutes ago",
      nodeId: "node-3",
      details: "Reviewed and approved",
    },
    {
      id: "4",
      user: "Alice Johnson",
      action: "Connected",
      timestamp: "15 minutes ago",
      details: "Connected node-1 to node-2",
    },
  ])

  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      nodeId: nodeId || "current-node",
      author: "You",
      avatar: "YO",
      content: newComment,
      timestamp: "Just now",
      isPinned: false,
      resolved: false,
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const handleTogglePin = (commentId: string) => {
    setComments(
      comments.map((c) => (c.id === commentId ? { ...c, isPinned: !c.isPinned } : c))
    )
  }

  const handleResolve = (commentId: string) => {
    setComments(comments.map((c) => (c.id === commentId ? { ...c, resolved: true } : c)))
  }

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-4">
        {/* Active Users */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Active Collaborators</span>
            <Badge variant="outline" className="text-xs">
              {activeUsers.length} online
            </Badge>
          </div>
          <div className="flex gap-2">
            {activeUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border"
              >
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{user.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{user.status}</div>
                </div>
                {user.cursor && (
                  <Badge variant="outline" className="text-xs">
                    Editing
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Inline Comments */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">Inline Comments</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {comments.filter((c) => !c.resolved).length} active
            </Badge>
          </div>

          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg border ${
                    comment.isPinned
                      ? "border-primary bg-primary/5"
                      : comment.resolved
                      ? "border-gray-200 bg-gray-50/50"
                      : "border-border bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{comment.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-xs font-medium">{comment.author}</div>
                        <div className="text-xs text-muted-foreground">
                          {comment.nodeId} • {comment.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {comment.isPinned && (
                        <Pin className="h-3 w-3 text-primary fill-primary" />
                      )}
                      {comment.resolved && (
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                      )}
                    </div>
                  </div>

                  <div className="text-sm mb-2">{comment.content}</div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleTogglePin(comment.id)}
                    >
                      <Pin className="h-3 w-3 mr-1" />
                      {comment.isPinned ? "Unpin" : "Pin"}
                    </Button>
                    {!comment.resolved && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleResolve(comment.id)}
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          {/* AI Thread Summaries */}
          <div className="mt-3 pt-3 border-t border-border">
            <AIThreadSummaries
              threadId={nodeId || "current-thread"}
              messages={comments.map((c) => ({
                id: c.id,
                user: c.author,
                content: c.content,
                timestamp: c.timestamp,
              }))}
            />
          </div>

          {/* Add Comment */}
          <div className="mt-3 flex gap-2">
            <Input
              type="text"
              placeholder="Add inline comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
              className="flex-1 text-sm"
            />
            <Button size="sm" onClick={handleAddComment}>
              <MessageSquare className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Session Timeline */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <Clock className="h-4 w-4" />
              View Session Timeline
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Session Timeline</DialogTitle>
              <DialogDescription>
                Replay who did what, when
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[500px]">
              <div className="space-y-4">
                {sessionTimeline.map((entry, index) => (
                  <div key={entry.id} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {entry.user.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {index < sessionTimeline.length - 1 && (
                          <div className="w-0.5 h-16 bg-border" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{entry.user}</span>
                          <Badge variant="outline" className="text-xs">
                            {entry.action}
                          </Badge>
                          {entry.nodeId && (
                            <Badge variant="outline" className="text-xs">
                              {entry.nodeId}
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">{entry.details}</div>
                        <div className="text-xs text-muted-foreground">{entry.timestamp}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

