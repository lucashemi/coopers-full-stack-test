import type { Task } from "../../types/Task";
import {
  useAddTaskApi,
  useToggleDoneTaskApi,
  useDeleteTaskApi,
  useTasksApi,
  useDeleteAllTasksApi,
  useEditTaskApi,
  useReorderTasksApi,
} from "./api";
import { useTaskContext } from "../../contexts/task/useTaskContext";
import { useAuth } from "../../contexts/auth/useAuthContext";
import { useEffect, useState } from "react";
import { defaultTasks } from "../../constants/defaultTasks";
import type { ColumnName } from "../../types/ColumnName";

type UseTasksManagerReturn = {
  tasks: Task[];
  addTask: (name: string) => void;
  toggleDone: (task: { id: number; done: boolean }) => void;
  editTask: (task: { id: number; name: string }) => void;
  deleteTask: (id: number) => void;
  deleteAllTasks: (columnName: ColumnName) => void;
  reorderTasks: (tasks: Task[]) => void;
};

export function useTasksManager(): UseTasksManagerReturn {
  const { isAuthenticated } = useAuth();

  // State and local functions
  const { tasks, dispatch } = useTaskContext();

  // API state and functions
  const { data: apiTasks } = useTasksApi();
  const addTaskMutation = useAddTaskApi();
  const toggleDoneMutation = useToggleDoneTaskApi();
  const editTaskMutation = useEditTaskApi();
  const deleteTaskMutation = useDeleteTaskApi();
  const deleteAllTasksMutation = useDeleteAllTasksApi();
  const reorderTasksMutation = useReorderTasksApi();

  const [hasLoggedOut, setHasLoggedOut] = useState(true);

  // Sync API tasks with local state when the user is authenticated
  useEffect(() => {
    if (isAuthenticated && apiTasks) {
      dispatch({ type: "SET_TASKS", payload: { tasks: apiTasks } });
      setHasLoggedOut(false);
    } else if (!isAuthenticated && !hasLoggedOut) {
      dispatch({ type: "SET_TASKS", payload: { tasks: defaultTasks } });
      setHasLoggedOut(true);
    }
  }, [isAuthenticated, apiTasks, dispatch, hasLoggedOut]);

  // Local functions
  function addTaskLocal(taskName: string) {
    dispatch({ type: "ADD_TASK", payload: { name: taskName } });
  }

  function toggleTaskDoneLocal(task: { id: number; done: boolean }) {
    dispatch({ type: "TOGGLE_DONE", payload: { id: task.id } });
  }

  function editTaskLocal(task: { id: number; name: string }) {
    dispatch({ type: "EDIT_TASK", payload: { id: task.id, name: task.name } });
  }

  function deleteTaskLocal(id: number) {
    dispatch({ type: "DELETE_TASK", payload: { id } });
  }

  function deleteAllTasksLocal(columnName: ColumnName) {
    dispatch({ type: "DELETE_ALL", payload: { columnName } });
  }

  function reorderTasksLocal(newOrder: Task[]) {
    dispatch({ type: "SET_TASKS", payload: { tasks: newOrder } });
  }

  // Return values and functions based on authentication
  return {
    tasks,
    addTask: isAuthenticated
      ? (name) => addTaskMutation.mutate({ name })
      : addTaskLocal,
    toggleDone: isAuthenticated
      ? (task) => toggleDoneMutation.mutate(task)
      : toggleTaskDoneLocal,
    editTask: isAuthenticated
      ? (task) => editTaskMutation.mutate(task)
      : editTaskLocal,
    deleteTask: isAuthenticated
      ? (id) => deleteTaskMutation.mutate(id)
      : deleteTaskLocal,
    deleteAllTasks: isAuthenticated
      ? (columnName) => deleteAllTasksMutation.mutate(columnName)
      : deleteAllTasksLocal,
    reorderTasks: isAuthenticated
      ? (newOrder) => reorderTasksMutation.mutate(newOrder)
      : reorderTasksLocal,
  };
}
