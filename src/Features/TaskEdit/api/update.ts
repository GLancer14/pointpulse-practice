import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { Task } from "../../../Shared/models";
import { queryClient } from "../../../Shared/api";

export function useUpdateTaskMutation(): UseMutationResult<Task, Error, Partial<Task>, unknown> {
  return useMutation({
    mutationFn: async (taskData: Partial<Task>) => {
      const response: Response = await fetch(`${import.meta.env.VITE_SERVER_URL}/${taskData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      if (response.status !== 200) {
        throw new Error("Server error");
      }

      return await response.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks", "infinite"] });
    }
  });
}