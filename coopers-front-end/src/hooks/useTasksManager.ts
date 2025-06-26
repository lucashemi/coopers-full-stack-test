import type { Task } from "../types/Task";
import {
  useAddTaskApi,
  useToggleDoneApi,
  useDeleteTaskApi,
  useTasksApi,
  useDeleteAllApi,
  useEditTaskApi,
  useReorderTasksApi,
} from "./useTasksApi";
import { useTaskContext } from "../contexts/task/useTaskContext";
import { useAuth } from "../contexts/auth/useAuthContext";
import { useEffect, useState } from "react";
import { defaultTasks } from "../constants/defaultTasks";
import type { CardNames } from "../types/CardNames";

type UseTasksManagerReturn = {
  tasks: Task[];
  addTask: (name: string) => void;
  toggleDone: (task: { id: number; done: boolean }) => void;
  editTask: (task: { id: number; name: string }) => void;
  deleteTask: (id: number) => void;
  deleteAllTasks: (cardName: CardNames) => void;
  reorderTasks: (tasks: Task[]) => void;
};

export function useTasksManager(): UseTasksManagerReturn {
  const { isAuthenticated } = useAuth();

  // State and local functions
  const { tasks, dispatch } = useTaskContext();

  // API state and functions
  const { data: apiTasks } = useTasksApi();
  const addTaskMutation = useAddTaskApi();
  const toggleDoneMutation = useToggleDoneApi();
  const editTaskMutation = useEditTaskApi();
  const deleteTaskMutation = useDeleteTaskApi();
  const deleteAllTasksMutation = useDeleteAllApi();
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

  function deleteAllTasksLocal(cardName: CardNames) {
    dispatch({ type: "DELETE_ALL", payload: { cardName } });
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
      ? (cardName) => deleteAllTasksMutation.mutate(cardName)
      : deleteAllTasksLocal,
    reorderTasks: isAuthenticated
      ? (newOrder) => reorderTasksMutation.mutate(newOrder)
      : reorderTasksLocal,
  };
}
