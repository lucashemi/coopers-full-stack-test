import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import React from "react";
import type { Task } from "../types/Task";

interface UseDndSortableParams {
  tasks: Task[];
  onReorder: (newOrder: Task[]) => void;
}

export function useDndSortable({ tasks, onReorder }: UseDndSortableParams) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // arrasta só depois de mover um pouco
      },
    })
  );

  const DndWrapper = React.useCallback(
    ({ children }: { children: React.ReactNode }) => {
      function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = tasks.findIndex((t) => t.id === active.id);
        const newIndex = tasks.findIndex((t) => t.id === over.id);

        const newOrder = arrayMove(tasks, oldIndex, newIndex);
        onReorder(newOrder);
      }
      return (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {children}
        </DndContext>
      );
    },
    [onReorder, tasks, sensors]
  );

  return {
    DndWrapper,
  };
}
