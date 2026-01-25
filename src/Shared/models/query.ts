export interface QueryData {
  pageParams: number[];
  pages: Array<{data: number[], nextPage: number}>;
}