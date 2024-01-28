import {
  Todo,
  TodoRepositoryGetParams,
  TodoRepositoryGetOutput,
} from "@ui/model/todos";

function getTodosOfPage(allTodos: Todo[], page: number, limit: number): Todo[] {
  const sanitizedPage = page > 0 ? page : 1;
  const startIndex = (sanitizedPage - 1) * limit;
  const endIndex = sanitizedPage * limit;
  const paginatedTodos = allTodos.slice(startIndex, endIndex);
  return paginatedTodos;
}

function parseTodoFromServer(responseBody: unknown): Todo[] {
  const hasTodosInObj = (obj: unknown): boolean => {
    return (
      obj !== null &&
      typeof obj === "object" &&
      "todos" in obj === true &&
      Array.isArray(obj["todos"])
    );
  };

  const isTodo = (obj: unknown): obj is Todo => {
    if (obj == null || typeof obj !== "object") {
      return false;
    }
    return (
      Object.keys(obj).includes("id") &&
      Object.keys(obj).includes("content") &&
      Object.keys(obj).includes("date") &&
      Object.keys(obj).includes("done")
    );
  };

  const parseToAValidTodo = (todoString: object): Todo => {
    const { id, content, date, done } = todoString as {
      id: string;
      content: string;
      date: string;
      done: boolean;
    };
    const tempDate = new Date(date);

    if (tempDate == new Date("Invalid Date"))
      throw new Error("Invalid Date of Todo");

    if (typeof done !== "boolean") throw new Error("Invalid Done of Todo");

    const validTodo = {
      id,
      content,
      done,
      date: tempDate,
    };
    return validTodo;
  };

  if (hasTodosInObj(responseBody)) {
    const todos = Object(responseBody).todos.map((todo: unknown) => {
      if (isTodo(todo)) return parseToAValidTodo(todo);
    });
    return todos;
  }

  return [];
}

async function get({
  page,
  limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
  const response = await fetch("/api/v1/todos");
  const todosString = await response.text();
  const allTodos = parseTodoFromServer(JSON.parse(todosString));
  return {
    todos: getTodosOfPage(allTodos, page, limit),
    total: allTodos.length,
    pages: Math.ceil(allTodos.length / limit),
  };
}

export const todosRepository = {
  get,
};
