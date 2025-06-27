import { useSortable } from "@dnd-kit/sortable";
import { ToDoItem } from "../ToDoItem";
import type { Task } from "../../types/Task";
import { CSS } from "@dnd-kit/utilities";

interface SortableTaskProps {
  task: Task;
}

export function SortableTask({ task }: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        task,
      },
    });

  return (
    <ToDoItem
      ref={setNodeRef}
      id={task.id}
      name={task.name}
      done={task.done}
      dragHandleProps={{ ...listeners, ...attributes }}
      transformationStyle={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    />
  );
}
