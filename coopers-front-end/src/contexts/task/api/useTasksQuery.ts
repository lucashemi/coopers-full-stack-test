import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import type { Task } from "../../../types/Task";
import { useAuth } from "../../auth/useAuthContext";

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
