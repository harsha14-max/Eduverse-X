"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Star,
  Download,
  Clock,
  Users,
  CheckCircle2,
  CreditCard,
  Wallet,
  Sparkles,
} from "lucide-react"
// Note: canvas-confetti would need to be installed for confetti animation
// import confetti from "canvas-confetti"

interface Template {
  id: string
  name: string
  description: string
  rating: number
  reviews: number
  price: "Free" | string
  estimatedSetupTime: string
  compatibility: {
    easeOfUse: number
    speed: number
    reliability: number
  }
}

interface Review {
  id: string
  user: string
  rating: number
  comment: string
  date: string
  helpful: number
}

interface PurchaseExperienceProps {
  template: Template
  userIntegrations?: string[]
  onPurchase: (templateId: string, method: "free" | "token" | "card") => void
  onClose: () => void
}

export function AIReviewPurchaseExperience({
  template,
  userIntegrations = ["Notion", "Telegram", "Google Drive"],
  onPurchase,
  onClose,
}: PurchaseExperienceProps) {
  const [purchasing, setPurchasing] = useState(false)
  const [purchaseMethod, setPurchaseMethod] = useState<"free" | "token" | "card">("free")

  const reviews: Review[] = [
    {
      id: "1",
      user: "Sara J.",
      rating: 5,
      comment: "This automation saved me hours every week! Highly recommend.",
      date: "2 days ago",
      helpful: 12,
    },
    {
      id: "2",
      user: "Mike C.",
      rating: 4,
      comment: "Great workflow, easy to set up and works perfectly.",
      date: "1 week ago",
      helpful: 8,
    },
    {
      id: "3",
      user: "Riya P.",
      rating: 5,
      comment: "Love how it simplifies my social scheduling.",
      date: "2 weeks ago",
      helpful: 15,
    },
  ]

  const handlePurchase = async () => {
    setPurchasing(true)
    // Simulate purchase
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onPurchase(template.id, purchaseMethod)

    // Confetti animation (would require canvas-confetti package)
    // if (typeof window !== "undefined") {
    //   confetti({
    //     particleCount: 100,
    //     spread: 70,
    //     origin: { y: 0.6 },
    //   })
    // }

    setPurchasing(false)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {template.name}
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Compatible
            </Badge>
          </DialogTitle>
          <DialogDescription>{template.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Rating Heatmap */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Ease of Use</span>
                    <span className="text-sm text-muted-foreground">
                      {template.compatibility.easeOfUse}/5
                    </span>
                  </div>
                  <Progress value={(template.compatibility.easeOfUse / 5) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Speed</span>
                    <span className="text-sm text-muted-foreground">
                      {template.compatibility.speed}/5
                    </span>
                  </div>
                  <Progress value={(template.compatibility.speed / 5) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Reliability</span>
                    <span className="text-sm text-muted-foreground">
                      {template.compatibility.reliability}/5
                    </span>
                  </div>
                  <Progress value={(template.compatibility.reliability / 5) * 100} className="h-2" />
                </div>
              </div>

              {/* AI Summary */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1">AI Summary</div>
                    <div className="text-xs text-muted-foreground">
                      Users love how this workflow simplifies social scheduling. Compatible with your
                      connected apps: {userIntegrations.join(", ")}.
                    </div>
                  </div>
                </div>
              </div>

              {/* Setup Info */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Estimated setup: {template.estimatedSetupTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{template.reviews} reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{template.rating}★</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="p-3 rounded-lg bg-muted border border-border">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold">{review.user}</div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Purchase */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Purchase</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {template.price === "Free" ? (
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-semibold">Free Template</div>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                      Free
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add this template to your workspace for free
                  </p>
                  <Button onClick={handlePurchase} disabled={purchasing} className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    {purchasing ? "Adding to Workspace..." : "Add to Workspace"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-lg font-semibold">Purchase Options</div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={purchaseMethod === "free" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPurchaseMethod("free")}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Free
                    </Button>
                    <Button
                      variant={purchaseMethod === "token" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPurchaseMethod("token")}
                      className="gap-2"
                    >
                      <Wallet className="h-4 w-4" />
                      Token
                    </Button>
                    <Button
                      variant={purchaseMethod === "card" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPurchaseMethod("card")}
                      className="gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      Card
                    </Button>
                  </div>
                  <div className="p-4 rounded-lg bg-muted border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-lg font-semibold">Price</div>
                      <div className="text-2xl font-bold">{template.price}</div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      {purchaseMethod === "token"
                        ? "Pay with platform tokens"
                        : purchaseMethod === "card"
                        ? "Secure payment via Stripe"
                        : "Free to install"}
                    </p>
                    <Button
                      onClick={handlePurchase}
                      disabled={purchasing}
                      className="w-full gap-2"
                    >
                      <Download className="h-4 w-4" />
                      {purchasing ? "Processing..." : `Buy for ${template.price}`}
                    </Button>
                  </div>
                </div>
              )}

              {/* Post-Purchase Suggestions */}
              {purchasing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-primary/5 border border-primary/20"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-semibold mb-1">Try Related Automations</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        AI suggests these related templates based on your purchase
                      </div>
                      <div className="flex gap-2">
                        {["Social Media Pack", "Portfolio Updater", "AI Brand Voice"].map(
                          (suggestion, index) => (
                            <Badge key={index} variant="outline" className="text-xs cursor-pointer">
                              {suggestion}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

