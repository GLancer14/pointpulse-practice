import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import type { Task } from "../../../Shared/models";
import { tasks } from "../../../Shared/model/tasks";
import { queryClient } from "../../../Shared/api";

export function useUpdateTaskMutation(): UseMutationResult<Task, Error, Partial<Task>, unknown> {
  return useMutation({
    mutationFn: async (taskData: Partial<Task>) => {
      const foundTask = tasks.findIndex(task => {
        if (taskData.id) {
          return task.id === taskData.id;
        }
      });
      if (foundTask === -1) {
        throw new Error("Такой задачи не существует");
      }

      const modifiedTask = {
        id: tasks[foundTask].id,
        title: taskData.title === "" || taskData.title === undefined
          ? tasks[foundTask].title
          : taskData.title,
        description: taskData.description === "" || taskData.description === undefined
          ? tasks[foundTask].description
          : taskData.description,
      };
    
      tasks[foundTask] = modifiedTask;

      return modifiedTask;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks", "infinite"] });
    }
  });
}