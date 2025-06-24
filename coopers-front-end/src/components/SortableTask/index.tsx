import { useSortable } from "@dnd-kit/sortable";
import { ToDoItem } from "../ToDoItem";
import type { Task } from "../../types/Task";

interface SortableTaskProps {
  task: Task;
}

export function SortableTask({ task }: SortableTaskProps) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: task.id });

  return (
    <ToDoItem
      ref={setNodeRef}
      id={task.id}
      name={task.name}
      done={task.done}
      dragHandleProps={listeners}
      {...attributes}
    />
  );
}
