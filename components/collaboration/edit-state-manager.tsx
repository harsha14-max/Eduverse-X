"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface EditState {
  userId: string
  elementId: string
  elementType: "node" | "prompt" | "chart" | "comment"
  timestamp: number
  changes: Record<string, any>
}

interface EditStateContextType {
  activeEdits: Map<string, EditState>
  conflicts: Map<string, EditState[]>
  startEdit: (edit: EditState) => void
  endEdit: (userId: string, elementId: string) => void
  updateEdit: (userId: string, elementId: string, changes: Record<string, any>) => void
  checkConflicts: (elementId: string) => EditState[]
}

const EditStateContext = createContext<EditStateContextType | undefined>(undefined)

function EditStateManager({ children }: { children: ReactNode }) {
  const [activeEdits, setActiveEdits] = useState<Map<string, EditState>>(new Map())
  const [conflicts, setConflicts] = useState<Map<string, EditState[]>>(new Map())

  const startEdit = (edit: EditState) => {
    setActiveEdits((prev) => {
      const newMap = new Map(prev)
      const key = `${edit.userId}-${edit.elementId}`
      newMap.set(key, edit)
      return newMap
    })

    // Check for conflicts
    checkConflicts(edit.elementId)
  }

  const endEdit = (userId: string, elementId: string) => {
    setActiveEdits((prev) => {
      const newMap = new Map(prev)
      const key = `${userId}-${elementId}`
      newMap.delete(key)
      return newMap
    })

    // Clear conflicts for this element
    setConflicts((prev) => {
      const newMap = new Map(prev)
      newMap.delete(elementId)
      return newMap
    })
  }

  const updateEdit = (userId: string, elementId: string, changes: Record<string, any>) => {
    setActiveEdits((prev) => {
      const newMap = new Map(prev)
      const key = `${userId}-${elementId}`
      const existing = newMap.get(key)
      if (existing) {
        newMap.set(key, {
          ...existing,
          changes: { ...existing.changes, ...changes },
          timestamp: Date.now(),
        })
      }
      return newMap
    })

    checkConflicts(elementId)
  }

  const checkConflicts = (elementId: string): EditState[] => {
    const editsForElement = Array.from(activeEdits.values()).filter(
      (edit) => edit.elementId === elementId
    )

    if (editsForElement.length > 1) {
      setConflicts((prev) => {
        const newMap = new Map(prev)
        newMap.set(elementId, editsForElement)
        return newMap
      })
      return editsForElement
    }

    return []
  }

  return (
    <EditStateContext.Provider
      value={{
        activeEdits,
        conflicts,
        startEdit,
        endEdit,
        updateEdit,
        checkConflicts,
      }}
    >
      {children}
    </EditStateContext.Provider>
  )
}

export function useEditState() {
  const context = useContext(EditStateContext)
  if (!context) {
    throw new Error("useEditState must be used within EditStateManager")
  }
  return context
}

export default EditStateManager

