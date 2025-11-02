"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Save } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ConsentSchema {
  id: string
  name: string
  description: string
  resource: string
  duration: string
  permissions: string[]
}

function ConsentSchemaBuilder() {
  const [schemas, setSchemas] = useState<ConsentSchema[]>([])
  const [newSchema, setNewSchema] = useState<Partial<ConsentSchema>>({
    name: "",
    description: "",
    resource: "",
    duration: "24",
    permissions: [],
  })

  const handleAddSchema = () => {
    if (newSchema.name && newSchema.resource) {
      setSchemas([
        ...schemas,
        {
          id: Date.now().toString(),
          name: newSchema.name!,
          description: newSchema.description || "",
          resource: newSchema.resource!,
          duration: newSchema.duration || "24",
          permissions: newSchema.permissions || [],
        },
      ])
      setNewSchema({
        name: "",
        description: "",
        resource: "",
        duration: "24",
        permissions: [],
      })
    }
  }

  const handleDeleteSchema = (id: string) => {
    setSchemas(schemas.filter((s) => s.id !== id))
  }

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-4">
        {/* New Schema Form */}
        <div className="p-4 bg-muted rounded-lg border border-border">
          <div className="text-sm font-semibold mb-3">Create New Consent Schema</div>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="schema-name" className="text-xs">
                Schema Name
              </Label>
              <Input
                id="schema-name"
                placeholder="e.g., Auto-Post to Social Media"
                value={newSchema.name}
                onChange={(e) => setNewSchema({ ...newSchema, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schema-description" className="text-xs">
                Description
              </Label>
              <Textarea
                id="schema-description"
                placeholder="Describe what this consent schema allows"
                value={newSchema.description}
                onChange={(e) => setNewSchema({ ...newSchema, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="schema-resource" className="text-xs">
                  Resource
                </Label>
                <Input
                  id="schema-resource"
                  placeholder="e.g., Twitter Account"
                  value={newSchema.resource}
                  onChange={(e) => setNewSchema({ ...newSchema, resource: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schema-duration" className="text-xs">
                  Duration (hours)
                </Label>
                <Select
                  value={newSchema.duration}
                  onValueChange={(value) => setNewSchema({ ...newSchema, duration: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="12">12 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="72">3 days</SelectItem>
                    <SelectItem value="168">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddSchema} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Add Schema
            </Button>
          </div>
        </div>

        {/* Schemas List */}
        <div className="space-y-2">
          <div className="text-sm font-semibold">Consent Schemas</div>
          {schemas.length === 0 ? (
            <div className="text-center p-8 bg-muted rounded-lg border border-dashed border-border">
              <div className="text-xs text-muted-foreground">
                No consent schemas created yet. Create one above.
              </div>
            </div>
          ) : (
            schemas.map((schema, index) => (
              <motion.div
                key={schema.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 border rounded-lg border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm mb-1">{schema.name}</div>
                    <div className="text-xs text-muted-foreground mb-2">{schema.description}</div>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="text-xs">
                        {schema.resource}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {schema.duration}h
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleDeleteSchema(schema.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { ConsentSchemaBuilder }
