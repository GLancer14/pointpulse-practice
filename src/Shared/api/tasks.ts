import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { tasks } from "../model/tasks";
import type { Task, QueryData } from "../models";
import { queryClient } from "./client";
import { useRef } from "react";

export function useInfiniteTasks(perPage: number = 3) {
  const lastCallRef = useRef(1);

  return useInfiniteQuery({
    queryKey: ["tasks", "infinite", perPage],
    queryFn: async ({ pageParam = 1 }): Promise<{data: Array<Task>, nextPage: number | null}> => {
      const startIndex = perPage * (pageParam - 1);
      const endIndex = startIndex + perPage;

      if (pageParam > 1) {
        const currentQueryPagesNumber = (queryClient.getQueryData(["tasks", "infinite", perPage]) as QueryData).pages.length;
        if (currentQueryPagesNumber !== lastCallRef.current) {
          await new Promise(resolve => setTimeout(() => resolve(null), 1500));
          lastCallRef.current = currentQueryPagesNumber;
        }
      }
      
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