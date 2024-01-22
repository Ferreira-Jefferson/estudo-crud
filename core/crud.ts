import fs from "fs";
import { v4 as uuid } from "uuid";

const DB_FILE_PATH = "./core/db";

console.log("Crud");

function createDB() {
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({}));
}

type UUID = string;

interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content,
    done: false,
  };

  const todos: Array<Todo> = [...read(), todo];
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));

  return todo;
}

function read(): Array<Todo> {
  const dbString: string = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString);
  if (!db.todos) return [];
  return db.todos;
}

function find(id: UUID): Todo | {} {
  const allTodos = read();
  const todo = allTodos.find((todo) => todo.id == id);
  return todo ? todo : {};
}

function update(id: UUID, partialTodo: Partial<Todo>): Todo {
  const allTodos = read();
  const indexTodo = allTodos.findIndex((todo) => todo.id == id);

  const todoNotExist = indexTodo == -1;
  if (todoNotExist) throw new Error("Invalid ID");

  const todoUpdated = Object.assign(allTodos[indexTodo], partialTodo);
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos: allTodos }, null, 2));
  return todoUpdated;
}

function updateContentById(id: UUID, content: string): Todo {
  return update(id, { content });
}

function remove(id: UUID) {
  const allTodos = read();
  const filterTodos = allTodos.filter((todo) => todo.id != id);
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify({ todos: filterTodos }, null, 2),
  );
}

createDB();
create("Concluir create");
create("Concluir read");
const deleteTodo = create("Delete");
const todo = create("Concluir");

update(todo.id, { content: "Concluir up" });
updateContentById(todo.id, "Concluir update");

remove(deleteTodo.id);

export { read };
