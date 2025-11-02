"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  UserPlus,
  Shield,
  Edit,
  Eye,
  Trash2,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const roles = [
  { id: "1", name: "Mentor", description: "Full access to teach and manage students", permissions: ["read", "write", "admin"] },
  { id: "2", name: "Student", description: "Access to courses and learning resources", permissions: ["read"] },
  { id: "3", name: "Editor", description: "Can create and edit content", permissions: ["read", "write"] },
  { id: "4", name: "Viewer", description: "Read-only access", permissions: ["read"] },
]

const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Mentor", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Student", status: "active" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "active" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "Viewer", status: "inactive" },
]

export function RoleDashboard() {
  const [selectedRole, setSelectedRole] = useState<string>("all")

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Mentor":
        return "bg-purple-100 text-purple-700 border-purple-300"
      case "Student":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "Editor":
        return "bg-green-100 text-green-700 border-green-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <Card className="border-border shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Role Dashboard</CardTitle>
              <CardDescription className="text-xs">
                Manage user hierarchy and permissions
              </CardDescription>
            </div>
          </div>
          <Button size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col min-h-0">
        {/* Role Filter */}
        <div className="flex items-center gap-2">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Roles Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {roles.map((role) => (
            <Card key={role.id} className="border-border">
              <CardContent className="p-3">
                <div className="text-xs text-muted-foreground mb-1">{role.name}</div>
                <div className="text-lg font-bold mb-1">
                  {users.filter((u) => u.role === role.name).length}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {role.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Users Table */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users
                .filter((user) => selectedRole === "all" || user.role === roles.find((r) => r.id === selectedRole)?.name)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${getRoleColor(user.role)}`}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "outline" : "secondary"} className="text-xs">
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

