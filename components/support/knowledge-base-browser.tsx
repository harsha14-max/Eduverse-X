"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  MessageSquare,
  FileText,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// Note: react-markdown would need to be installed for markdown rendering
// import ReactMarkdown from "react-markdown"

interface KnowledgeBaseArticle {
  id: string
  title: string
  description: string
  category: string
  content: string
  tags: string[]
  author: string
  updatedAt: string
}

const knowledgeBaseArticles: KnowledgeBaseArticle[] = [
  {
    id: "1",
    title: "Getting Started with AI Automations",
    description: "Learn how to create your first AI-powered automation workflow",
    category: "AI Automations",
    content: `# Getting Started with AI Automations

## Introduction
This guide will help you create your first AI-powered automation workflow in EduVerse 2.0.

## Step 1: Create a New Workflow
1. Navigate to the Automation section
2. Click "Create New Workflow"
3. Give your workflow a name

## Step 2: Add Nodes
- **Prompt Node**: Starting point for your workflow
- **Reasoning Node**: AI processing and analysis
- **Decision Node**: Conditional logic
- **Action Node**: Execute actions (post to social media, send emails, etc.)

## Step 3: Connect Integrations
Before running your workflow, ensure all required integrations are connected:
- Go to Automation → Integrations
- Connect your social media accounts, APIs, etc.

## Step 4: Test and Deploy
1. Click "Test" to run a test execution
2. Review the execution logs
3. If successful, enable the workflow

## Best Practices
- Start with simple workflows
- Test each node individually
- Use AI reasoning nodes for intelligent decisions
- Monitor workflow performance regularly

## Troubleshooting
If your workflow fails:
1. Check execution logs
2. Verify all integrations are connected
3. Test each node individually
4. Contact support if issues persist`,
    tags: ["automation", "AI", "workflows", "getting-started"],
    author: "EduVerse Team",
    updatedAt: "2024-12-15",
  },
  {
    id: "2",
    title: "Learning Hub Integration Guide",
    description: "Connect your learning platforms and sync progress automatically",
    category: "Learning Hub",
    content: `# Learning Hub Integration Guide

## Supported Platforms
- Coursera
- Udemy
- Khan Academy
- Notion (for note-taking)

## Integration Steps
1. Go to Account → Integrations
2. Select your learning platform
3. Complete OAuth authorization
4. Configure sync settings

## Auto-Sync Features
- Course progress updates
- Certificate tracking
- Note synchronization
- Achievement sharing

## Privacy Settings
Control what data is synced and shared in Privacy settings.`,
    tags: ["learning", "integration", "sync"],
    author: "EduVerse Team",
    updatedAt: "2024-12-10",
  },
  {
    id: "3",
    title: "Social Media Posting Best Practices",
    description: "Optimize your social media presence with AI-powered content",
    category: "Social Media Posting",
    content: `# Social Media Posting Best Practices

## Content Strategy
- Use AI to generate engaging posts
- Schedule posts for optimal timing
- Maintain consistent brand voice

## Platform-Specific Tips
### LinkedIn
- Professional tone
- Industry insights
- Career achievements

### Twitter/X
- Concise and engaging
- Trending topics
- Real-time updates

### Instagram
- Visual content focus
- Story updates
- Engagement-driven captions

## AI Content Generation
Our AI can help you:
- Generate post ideas
- Optimize content for each platform
- Schedule posts automatically
- Track engagement metrics`,
    tags: ["social-media", "content", "AI", "posting"],
    author: "EduVerse Team",
    updatedAt: "2024-12-12",
  },
  {
    id: "4",
    title: "Data Privacy & Security",
    description: "Understand how your data is protected in EduVerse 2.0",
    category: "Data & Privacy",
    content: `# Data Privacy & Security

## Privacy Protection
- End-to-end encryption
- Decentralized storage (IPFS)
- Zero-knowledge architecture
- User-controlled permissions

## Data Control
You have full control over:
- What data is shared
- Which AI systems can access your data
- How data is stored and backed up

## Security Features
- Multi-factor authentication
- API key encryption
- Audit logs
- Regular security updates

## GDPR Compliance
EduVerse 2.0 is fully GDPR compliant.`,
    tags: ["privacy", "security", "data", "GDPR"],
    author: "EduVerse Team",
    updatedAt: "2024-12-08",
  },
]

export function KnowledgeBaseBrowser() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([])

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("knowledgeBaseBookmarks")
    if (saved) {
      try {
        setBookmarkedArticles(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load bookmarks", e)
      }
    }
  }, [])

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem("knowledgeBaseBookmarks", JSON.stringify(bookmarkedArticles))
  }, [bookmarkedArticles])

  const categories = ["all", "AI Automations", "Learning Hub", "Social Media Posting", "Data & Privacy"]

  const filteredArticles = knowledgeBaseArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    )
  }

  const selectedArticleData = knowledgeBaseArticles.find((a) => a.id === selectedArticle)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Knowledge Base Browser
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <FileText className="h-3 w-3" />
              {knowledgeBaseArticles.length} Articles
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search knowledge base..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article, index) => (
          <KnowledgeBaseCard
            key={article.id}
            article={article}
            index={index}
            isBookmarked={bookmarkedArticles.includes(article.id)}
            onBookmark={() => toggleBookmark(article.id)}
            onSelect={() => setSelectedArticle(article.id)}
          />
        ))}
      </div>

      {/* Article Modal */}
      {selectedArticleData && (
        <Dialog open={selectedArticle !== null} onOpenChange={() => setSelectedArticle(null)}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <DialogTitle>{selectedArticleData.title}</DialogTitle>
                  <DialogDescription>{selectedArticleData.description}</DialogDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleBookmark(selectedArticleData.id)}
                >
                  {bookmarkedArticles.includes(selectedArticleData.id) ? (
                    <BookmarkCheck className="h-5 w-5 text-primary" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <Badge variant="outline">{selectedArticleData.category}</Badge>
                <span>By {selectedArticleData.author}</span>
                <span>Updated {selectedArticleData.updatedAt}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedArticleData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Content */}
              <ScrollArea className="h-[500px] pr-4">
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm">
                  {selectedArticleData.content}
                </div>
              </ScrollArea>

              {/* Ask AI Button */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    // Navigate to AI chat with context
                    window.location.href = "/dashboard/support?tab=chat&context=" + selectedArticleData.id
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                  Ask AI about this topic
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function KnowledgeBaseCard({
  article,
  index,
  isBookmarked,
  onBookmark,
  onSelect,
}: {
  article: KnowledgeBaseArticle
  index: number
  isBookmarked: boolean
  onBookmark: () => void
  onSelect: () => void
}) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AI Automations":
        return <Zap className="h-4 w-4" />
      case "Learning Hub":
        return <BookOpen className="h-4 w-4" />
      case "Social Media Posting":
        return <MessageSquare className="h-4 w-4" />
      case "Data & Privacy":
        return <Shield className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        className="border-border hover:border-primary transition-colors cursor-pointer h-full"
        onClick={onSelect}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-1">
                {getCategoryIcon(article.category)}
                <h3 className="font-semibold text-sm flex-1">{article.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={(e) => {
                  e.stopPropagation()
                  onBookmark()
                }}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground line-clamp-2">{article.description}</p>

            {/* Category & Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {article.category}
              </Badge>
              {article.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {article.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{article.tags.length - 2}
                </Badge>
              )}
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
              <span>{article.author}</span>
              <span>{article.updatedAt}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

