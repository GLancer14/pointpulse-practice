export type { Task } from "../models/tasks";
export {
  useInfiniteTasks,
  useGetTaskById,
  useDeleteTaskMutation,
} from "../api/tasks";
export { queryClient } from "./client";