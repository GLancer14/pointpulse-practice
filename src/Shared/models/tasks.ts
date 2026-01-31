export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface TaskDto {
  id?: string;
  title: string;
  description: string;
}

export type StatusMessage = "ok" | "error";

export interface ResponseTaskDto {
  status: StatusMessage;
  message?: string;
  data?: Task;
}

export interface ResponseTasksDto {
  status: StatusMessage;
  message?: string;
  data?: Task[];
}