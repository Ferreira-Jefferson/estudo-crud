export interface Todo {
  id: string;
  content: string;
  date: Date;
  done: boolean;
}

export interface TodoRepositoryGetParams {
  page: number;
  limit: number;
}

export interface TodoRepositoryGetOutput {
  todos: Todo[];
  total: number;
  pages: number;
}
