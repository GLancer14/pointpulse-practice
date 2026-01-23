import { useInfiniteQuery, useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import { tasks } from "../model/tasks";
import type { Task, TaskDto } from "../models/models";
import { v4 as uuid } from "uuid";
import { queryClient } from "./client";

export function useInfiniteTasks(perPage: number = 3) {
  return useInfiniteQuery({
    queryKey: ["tasks", "infinite", perPage],
    queryFn: async ({ pageParam = 1 }): Promise<{data: Array<Task>, nextPage: number | null}> => {
      const startIndex = perPage * (pageParam - 1);
      const endIndex = startIndex + perPage;

      await new Promise(resolve => setTimeout(() => resolve(null), 1500));
      
      return {
        data: tasks.slice(startIndex, endIndex),
        nextPage: tasks.length > endIndex ? pageParam + 1 : null,
      };
    },
    getNextPageParam: lastpage => lastpage.nextPage,
    initialPageParam: 1,
  });
}

export function useGetTaskById(id: string | undefined): UseQueryResult<Task | null, Error> {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: async (): Promise<Task | null> => {
      if (!id) {
        throw Error("ID задачи не предоставлен");
      }

      const foundTask = tasks.find(task => task.id === id);
      if (foundTask) {
        return foundTask;
      } else {
        throw new Error("Такой задачи не существует");
      }
    },
    enabled: !!id,
    retry: false,
  });
}

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
    
      tasks.push(newTask);
      return newTask;
    },
  });
}

export function useUpdateTaskMutation(): UseMutationResult<{
    id: string;
    title: string;
    description: string;
}, Error, Partial<Task>, unknown> {
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
        title: taskData.title === "" || taskData.title === undefined ? tasks[foundTask].title : taskData.title,
        description: taskData.description === "" || taskData.description === undefined ? tasks[foundTask].description : taskData.description,
      }
    
      tasks[foundTask] = modifiedTask

      return modifiedTask;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks", "infinite"] });
    }
  });
}

export function useDeleteTaskMutation(): UseMutationResult<Task, Error, string, unknown> {
  return useMutation({
    mutationFn: async (id: string) => {
      const foundTask = tasks.findIndex(task => {
        return task.id === id;
      });
      if (foundTask === -1) {
        throw new Error("Такой задачи не существует");
      }

      return tasks.splice(foundTask, 1)[0];
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks", "infinite"] });
    }
  });
}