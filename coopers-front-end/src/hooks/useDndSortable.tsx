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
import type { ColumnName } from "../types/ColumnName";
import { TOP_OF_LIST_POSITION } from "../constants/taskConstants";

interface UseDndSortableParams {
  tasks: Task[];
  onReorder: (newOrder: Task[]) => void;
}

export function useDndSortable({ tasks, onReorder }: UseDndSortableParams) {
  const sensors = useSensors(useSensor(PointerSensor));

  const toDoTasks = tasks.filter((t) => !t.done);
  const doneTasks = tasks.filter((t) => t.done);

  const DndWrapper = React.useCallback(
    ({ children }: { children: React.ReactNode }) => {
      function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        // Get active and over data
        const activeTask = active.data.current?.task as Task | undefined;
        const overTask = over.data.current?.task as Task | undefined;
        const overColumn = over.data.current?.column as ColumnName | undefined;

        if (!activeTask) return;

        // Get source and target column, then check if they are in the same column
        const sourceColumn = activeTask.done ? "Done" : "To-do";
        const targetColumn = overTask
          ? overTask.done
            ? "Done"
            : "To-do"
          : overColumn;

        const isSameColumn = sourceColumn === targetColumn;

        // If they are in the same, reorder the list, otherwise move the task to the top of the other column
        if (isSameColumn && overTask) {
          const list = sourceColumn === "Done" ? doneTasks : toDoTasks;
          const otherList = sourceColumn !== "Done" ? doneTasks : toDoTasks;
          const oldIndex = list.findIndex((t) => t.id === activeTask.id);
          const newIndex = list.findIndex((t) => t.id === overTask.id);

          const reorderedList = arrayMove(list, oldIndex, newIndex).map(
            (t, i) => ({
              ...t,
              position: i,
            })
          );

          onReorder([...reorderedList, ...otherList]);
        } else if (targetColumn && !isSameColumn) {
          // Toggle done and reorder lists
          const fromList = sourceColumn === "Done" ? doneTasks : toDoTasks;
          const toList = targetColumn === "Done" ? doneTasks : toDoTasks;

          // Moved task
          const movedTask: Task = {
            ...activeTask,
            done: targetColumn === "Done",
            position: TOP_OF_LIST_POSITION,
          };

          // New list with the moved task on the top
          const newToList = [movedTask, ...toList].map((t, i) => ({
            ...t,
            position: i,
          }));

          // New list without the moved task
          const newFromList = fromList
            .filter((t) => t.id !== activeTask.id)
            .map((t, i) => ({
              ...t,
              position: i,
            }));

          onReorder([...newToList, ...newFromList]);
        }
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
    [onReorder, toDoTasks, doneTasks, sensors]
  );

  return {
    DndWrapper,
  };
}
