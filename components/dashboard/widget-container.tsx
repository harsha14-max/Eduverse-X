"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { DraggableWidget } from "./draggable-widgets"

interface Widget {
  id: string
  title: string
  component: React.ReactNode
}

interface WidgetContainerProps {
  widgets: Widget[]
  onWidgetReorder?: (newOrder: string[]) => void
  onWidgetRemove?: (id: string) => void
}

export function WidgetContainer({ widgets, onWidgetReorder, onWidgetRemove }: WidgetContainerProps) {
  const [widgetOrder, setWidgetOrder] = useState(widgets.map((w) => w.id))

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setWidgetOrder((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        const newOrder = arrayMove(items, oldIndex, newIndex)
        onWidgetReorder?.(newOrder)
        return newOrder
      })
    }
  }

  const orderedWidgets = widgetOrder
    .map((id) => widgets.find((w) => w.id === id))
    .filter(Boolean) as Widget[]

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={widgetOrder} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orderedWidgets.map((widget) => (
            <DraggableWidget
              key={widget.id}
              id={widget.id}
              title={widget.title}
              onRemove={() => onWidgetRemove?.(widget.id)}
            >
              {widget.component}
            </DraggableWidget>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

