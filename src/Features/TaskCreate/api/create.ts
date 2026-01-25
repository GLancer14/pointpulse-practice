import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { TaskDto } from "../../../Shared/models";
import { v4 as uuid } from "uuid";
import { tasks } from "../../../Shared/model/tasks";

export function useCreateTaskMutation(): UseMutationResult<{
    id: string;
    title: string;
    description: string;
}, Error, TaskDto, unknown> {
  return useMutation({
    mutationFn: async (taskData: TaskDto) => {
      const newTask = {
        id: uuid(),
        ...taskData,
      };
    
      tasks.unshift(newTask);
      return newTask;
    },
  });
}