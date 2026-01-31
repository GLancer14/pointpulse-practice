import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import type {
  Task,
  InfiniteQueryResult,
  ResponseTaskDto,
  ResponseTasksDto,
} from "../models";
import { queryClient } from "./";

export function useInfiniteTasks(perPage: number = 3) {
  return useInfiniteQuery({
    queryKey: ["tasks", "infinite"],
    queryFn: async ({ pageParam = 1 }): Promise<InfiniteQueryResult> => {
      const startIndex = perPage * (pageParam - 1);
      const endIndex = startIndex + perPage;

      const url = new URL(import.meta.env.VITE_SERVER_URL);
      url.search = new URLSearchParams({
        startIndex: String(startIndex),
        endIndex: String(endIndex),
      }).toString();
      const response: Response = await fetch(url);
      const responseJson: ResponseTasksDto = await response.json();
      if (responseJson.status === "error") {
        throw new Error(responseJson.message);
      }

      return {
        data: responseJson.data as Task[],
        nextPage: (responseJson.data as Task[]).length === perPage ? pageParam + 1 : null,
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
        throw new Error("ID задачи не предоставлен");
      }

      const response: Response = await fetch(`${import.meta.env.VITE_SERVER_URL}/${id}`);
      const responseJson: ResponseTaskDto = await response.json();
      if (responseJson.status === "error") {
        throw new Error(responseJson.message);
      }

      return responseJson.data as Task;
    },
    enabled: !!id,
    retry: false,
  });
}

export function useDeleteTaskMutation(): UseMutationResult<Task, Error, string, unknown> {
  return useMutation({
    mutationFn: async (id: string) => {
      const response: Response = await fetch(`${import.meta.env.VITE_SERVER_URL}/${id}`, {
        method: "DELETE",
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