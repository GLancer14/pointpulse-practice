import type { Task } from "./";

export interface QueryData {
  pageParams: number[];
  pages: Array<{data: number[], nextPage: number}>;
}

export interface InfiniteQueryResult {
  data: Array<Task>;
  nextPage: number | null;
}