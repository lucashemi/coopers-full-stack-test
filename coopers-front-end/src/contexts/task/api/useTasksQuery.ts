import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import type { Task } from "../../../types/Task";
import { useAuth } from "../../auth/useAuthContext";
import { useEffect } from "react";

export function useTasksApi() {
  const { isAuthenticated } = useAuth();

  const query = useQuery<Task[]>({
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

  // Refetch the tasks when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      query.refetch();
    }
  }, [isAuthenticated, query]);

  return query;
}
