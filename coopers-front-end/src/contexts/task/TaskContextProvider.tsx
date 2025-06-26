import { useReducer } from "react";
import { taskReducer } from "./taskReducer";
import { TaskContext } from "./TaskContext";
import { defaultTasks } from "../../constants/defaultTasks";

interface TaskProviderProps {
  children: React.ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, dispatch] = useReducer(taskReducer, defaultTasks);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
