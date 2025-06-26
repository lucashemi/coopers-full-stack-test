import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import type { Task } from "../../../types/Task";
import { TOP_OF_LIST_POSITION } from "../../../constants/taskConstants";

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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
