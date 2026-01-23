import { tasks } from "../model/tasks";
import type { GetTasksParams, Task, TaskDto } from "../models/models";
import { v4 as uuid } from "uuid";

export function getTasks(params: GetTasksParams): Task[] {
  return tasks.slice(params.per_page * params.page, params.per_page * params.page + Number(params.per_page));
}

export function getTaskById(id: string): Task | null {
  const foundTask = tasks.find(task => task.id === id);
  if (foundTask) {
    return foundTask;
  } else {
    return null;
  }
}

export function createTask(taskData: TaskDto): Task {
  const newTask = {
    id: uuid(),
    ...taskData,
  };

  tasks.push(newTask);
  return newTask;
}

export function updateTask(taskData: Partial<Task>): Task {
  const foundTask = tasks.findIndex(task => {
    if (taskData.id) {
      return task.id === taskData.id;
    }
  });

  if (foundTask === -1) {
    throw new Error("Такой задачи не существует");
  }

  tasks[foundTask] = {
    id: tasks[foundTask].id,
    title: taskData.title === "" || taskData.title === undefined ? tasks[foundTask].title : taskData.title,
    description: taskData.description === "" || taskData.description === undefined ? tasks[foundTask].description : taskData.description,
  }

  return tasks[foundTask];
}

export function deleteTask(id: string): Task {
  const foundTask = tasks.findIndex(task => {
    return task.id === id;
  });

  if (foundTask === -1) {
    throw new Error("Такой задачи не существует");
  }

  return tasks.splice(foundTask, 1)[0];
}