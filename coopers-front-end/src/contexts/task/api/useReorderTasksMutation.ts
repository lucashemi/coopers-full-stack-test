import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import type { Task } from "../../../types/Task";

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
  });
}
