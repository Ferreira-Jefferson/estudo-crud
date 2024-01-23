import { todosRepository } from "@ui/repository/todos";

interface TodoControllerGetParams {
  page?: number;
}

async function get({ page }: TodoControllerGetParams = {}) {
  return todosRepository.get({ page: page || 1, limit: 2 });
}

export const todoControllerApi = {
  get,
};
