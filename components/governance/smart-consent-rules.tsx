"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ConsentRule {
  id: string
  name: string
  condition: string
  action: string
  enabled: boolean
}

const defaultRules: ConsentRule[] = [
  {
    id: "1",
    name: "Auto-Grant Social Media Posts",
    condition: "If AI wants to post to social media",
    action: "Grant temporary write access (24h)",
    enabled: true,
  },
  {
    id: "2",
    name: "Auto-Deny Financial Access",
    condition: "If AI requests financial data access",
    action: "Deny and notify user",
    enabled: true,
  },
  {
    id: "3",
    name: "Auto-Grant Portfolio Updates",
    condition: "If AI wants to update portfolio",
    action: "Grant write access (12h)",
    enabled: false,
  },
]

function SmartConsentRules() {
  const [rules, setRules] = useState<ConsentRule[]>(defaultRules)
  const [newRule, setNewRule] = useState<Partial<ConsentRule>>({
    name: "",
    condition: "",
    action: "",
    enabled: true,
  })

  const handleToggle = (ruleId: string) => {
    setRules((prev) =>
      prev.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule))
    )
  }

  const handleDelete = (ruleId: string) => {
    setRules((prev) => prev.filter((rule) => rule.id !== ruleId))
  }

  const handleAddRule = () => {
    if (newRule.name && newRule.condition && newRule.action) {
      setRules([
        ...rules,
        {
          id: Date.now().toString(),
          name: newRule.name!,
          condition: newRule.condition!,
          action: newRule.action!,
          enabled: newRule.enabled ?? true,
        },
      ])
      setNewRule({
        name: "",
        condition: "",
        action: "",
        enabled: true,
      })
    }
  }

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-4">
        {/* New Rule Form */}
        <div className="p-4 bg-muted rounded-lg border border-border">
          <div className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Create New Consent Rule
          </div>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="rule-name" className="text-xs">
                Rule Name
              </Label>
              <Input
                id="rule-name"
                placeholder="e.g., Auto-Grant Social Media Posts"
                value={newRule.name}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rule-condition" className="text-xs">
                Condition
              </Label>
              <Input
                id="rule-condition"
                placeholder="e.g., If AI wants to post to social media"
                value={newRule.condition}
                onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rule-action" className="text-xs">
                Action
              </Label>
              <Input
                id="rule-action"
                placeholder="e.g., Grant temporary write access (24h)"
                value={newRule.action}
                onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
              />
            </div>
            <Button onClick={handleAddRule} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
        </div>

        {/* Rules List */}
        <div className="space-y-2">
          <div className="text-sm font-semibold">Proactive Consent Rules</div>
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 border rounded-lg transition-all ${
                rule.enabled
                  ? "border-primary/50 bg-primary/5"
                  : "border-border bg-muted/50 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-semibold text-sm">{rule.name}</div>
                    {rule.enabled && (
                      <Badge variant="default" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    <span className="font-medium">Condition:</span> {rule.condition}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Action:</span> {rule.action}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Label htmlFor={`rule-${rule.id}`} className="text-xs cursor-pointer">
                    {rule.enabled ? "Enabled" : "Disabled"}
                  </Label>
                  <Switch
                    id={`rule-${rule.id}`}
                    checked={rule.enabled}
                    onCheckedChange={() => handleToggle(rule.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleDelete(rule.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
          <div className="text-xs text-muted-foreground">
            Smart Consent Rules allow you to proactively approve future AI actions based on
            conditions. Users can approve future requests proactively via these rules.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { SmartConsentRules }
