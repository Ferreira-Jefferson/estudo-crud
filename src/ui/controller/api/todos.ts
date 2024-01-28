import { todosRepository } from "@ui/repository/todos";

interface TodoControllerGetParams {
  page?: number;
}

async function get({ page }: TodoControllerGetParams = {}) {
  return todosRepository.get({ page: page || 1, limit: 2 });
}

function filterTodosByContent<Todo>(
  todos: Array<Todo & { content: string }>,
  search: string,
): Todo[] {
  return todos.filter((todo) => todo.content.toLowerCase().includes(search));
}

export const todoControllerApi = {
  get,
  filterTodosByContent,
};
