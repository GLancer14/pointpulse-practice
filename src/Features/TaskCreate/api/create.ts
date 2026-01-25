import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { Task, TaskDto } from "../../../Shared/models";
import { v4 as uuid } from "uuid";
import { tasks } from "../../../Shared/model/tasks";
import { queryClient } from "../../../Shared/api";

export function useCreateTaskMutation(): UseMutationResult<Task, Error, TaskDto, unknown> {
  return useMutation({
    mutationFn: async (taskData: TaskDto) => {
      const newTask = {
        id: uuid(),
        ...taskData,
      };
    
      tasks.unshift(newTask);
      return newTask;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks", "infinite"] });
    }
  });
}