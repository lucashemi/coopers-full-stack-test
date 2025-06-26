import { createContext } from "react";
import type { Task } from "../../types/Task";
import type { TaskActions } from "../../types/TaskActions";

interface TaskContextType {
  tasks: Task[];
  dispatch: React.Dispatch<TaskActions>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
