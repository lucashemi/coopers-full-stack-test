import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import type { Task } from "../types/Task";
import { TOP_OF_LIST_POSITION } from "../constants/taskConstants";
import { useAuth } from "../contexts/auth/useAuthContext";
import type { CardNames } from "../types/CardNames";

export function useTasksApi() {
  const { isAuthenticated } = useAuth();

  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await api.get("/api/tasks");

      const tasks = data.map(
        (task: {
          id: number;
          name: string;
          done: number;
          position: number;
        }) => ({
          ...task,
          done: task.done === 1,
        })
      );

      return tasks;
    },
    staleTime: 5 * 60 * 1000,
    enabled: isAuthenticated,
  });
}

export function useAddTaskApi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask: { name: string }) => {
      const { data } = await api.post("/api/tasks", newTask);
      return data;
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old
          ? [
              {
                id: Date.now(),
                name: newTask.name,
                done: false,
                position: TOP_OF_LIST_POSITION,
              },
              ...old.map((t) => ({ ...t, position: t.position + 1 })),
            ]
          : [
              {
                id: Date.now(),
                name: newTask.name,
                done: false,
                position: TOP_OF_LIST_POSITION,
              },
            ]
      );

      return { previousTasks };
    },
    onError: (_err, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old
          ? [createdTask, ...old.filter((t) => t.id !== createdTask.id)]
          : [createdTask]
      );
    },
  });
}

export function useToggleDoneApi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: { id: number; done: boolean }) => {
      const { data } = await api.patch(`/api/tasks/${task.id}`, {
        done: !task.done,
      });
      return data;
    },
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((t) =>
          t.id === task.id
            ? { ...t, done: !t.done, position: TOP_OF_LIST_POSITION }
            : t
        )
      );

      return { previousTasks };
    },
    onError: (_err, _task, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useEditTaskApi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: { id: number; name: string }) => {
      const { data } = await api.patch(`/api/tasks/${task.id}`, {
        name: task.name,
      });
      return data;
    },
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
      );

      return { previousTasks };
    },
    onError: (_err, _task, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTaskApi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/tasks/${id}`);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(
        ["tasks"],
        (old) => old?.filter((t) => t.id !== id) ?? []
      );

      return { previousTasks };
    },
    onError: (_err, _id, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteAllApi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cardName: CardNames) => {
      const done = cardName === "Done" ? "true" : "false";
      await api.delete(`/api/tasks?done=${done}`);
    },
    onMutate: async (cardName: CardNames) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
      const done = cardName === "Done" ? true : false;

      queryClient.setQueryData<Task[]>(
        ["tasks"],
        (old) => old?.filter((t) => t.done !== done) ?? []
      );

      return { previousTasks };
    },
    onError: (_err, _id, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useReorderTasksApi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newOrder: Task[]) => {
      await api.put("/api/tasks/reorder", newOrder);
    },
    onMutate: async (newOrder: Task[]) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], newOrder);

      return { previousTasks };
    },
    onError: (_err, _id, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
