"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface PresenceState {
  userId: string
  userName: string
  userColor: string
  status: "online" | "away" | "offline"
  cursor: { x: number; y: number } | null
  activity: "editing" | "viewing" | "commenting" | "idle"
  selectedElementId?: string
}

interface EditState {
  userId: string
  elementId: string
  elementType: "node" | "prompt" | "chart" | "comment"
  timestamp: number
}

interface CollaborationStateContextType {
  presenceState: Map<string, PresenceState>
  editState: Map<string, EditState>
  updatePresence: (userId: string, presence: Partial<PresenceState>) => void
  updateEdit: (userId: string, edit: EditState) => void
  removePresence: (userId: string) => void
  removeEdit: (userId: string) => void
}

const CollaborationStateContext = createContext<CollaborationStateContextType | undefined>(
  undefined
)

function PresenceStateManager({ children }: { children: ReactNode }) {
  const [presenceState, setPresenceState] = useState<Map<string, PresenceState>>(new Map())
  const [editState, setEditState] = useState<Map<string, EditState>>(new Map())

  const updatePresence = (userId: string, presence: Partial<PresenceState>) => {
    setPresenceState((prev) => {
      const newMap = new Map(prev)
      const existing = newMap.get(userId) || {
        userId,
        userName: "",
        userColor: "#3b82f6",
        status: "online",
        cursor: null,
        activity: "idle",
      }
      newMap.set(userId, { ...existing, ...presence })
      return newMap
    })
  }

  const updateEdit = (userId: string, edit: EditState) => {
    setEditState((prev) => {
      const newMap = new Map(prev)
      newMap.set(userId, edit)
      return newMap
    })
  }

  const removePresence = (userId: string) => {
    setPresenceState((prev) => {
      const newMap = new Map(prev)
      newMap.delete(userId)
      return newMap
    })
  }

  const removeEdit = (userId: string) => {
    setEditState((prev) => {
      const newMap = new Map(prev)
      newMap.delete(userId)
      return newMap
    })
  }

  return (
    <CollaborationStateContext.Provider
      value={{
        presenceState,
        editState,
        updatePresence,
        updateEdit,
        removePresence,
        removeEdit,
      }}
    >
      {children}
    </CollaborationStateContext.Provider>
  )
}

export function useCollaborationState() {
  const context = useContext(CollaborationStateContext)
  if (!context) {
    throw new Error("useCollaborationState must be used within PresenceStateManager")
  }
  return context
}

export default PresenceStateManager

