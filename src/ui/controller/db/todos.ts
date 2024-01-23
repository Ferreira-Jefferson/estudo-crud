import { read } from "@db-crud-todo";

function get() {
  const allTodos = read();
  return allTodos;
}

export const todoControllerDB = {
  get,
};
