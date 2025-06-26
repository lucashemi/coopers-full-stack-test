import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import type { Task } from "../../../types/Task";
import { TOP_OF_LIST_POSITION } from "../../../constants/taskConstants";

export function useToggleDoneTaskApi() {
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
