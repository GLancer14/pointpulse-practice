import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type {
  Task,
  TaskDto,
  ResponseTaskDto,
} from "../../../Shared/models";
import { queryClient } from "../../../Shared/api";

export function useCreateTaskMutation(): UseMutationResult<Task, Error, TaskDto, unknown> {
  return useMutation({
    mutationFn: async (taskData: TaskDto) => {
      const response: Response = await fetch(import.meta.env.VITE_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      const responseJson: ResponseTaskDto = await response.json();
      if (responseJson.status === "error") {
        throw new Error(responseJson.message);
      }

      return responseJson.data as Task;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks", "infinite"] });
    }
  });
}