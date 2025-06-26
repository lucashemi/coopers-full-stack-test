import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import type { Task } from "../../../types/Task";
import type { ColumnName } from "../../../types/ColumnName";

export function useDeleteAllTasksApi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (columnName: ColumnName) => {
      const done = columnName === "Done" ? "true" : "false";
      await api.delete(`/api/tasks?done=${done}`);
    },
    onMutate: async (columnName: ColumnName) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
      const done = columnName === "Done" ? true : false;

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
