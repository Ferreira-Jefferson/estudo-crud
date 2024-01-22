import fs from "fs";
import { v4 as uuid } from "uuid"

const DB_FILE_PATH = "./core/db";

console.log("Crud");

function createDB() {
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({}));
}

interface Todo {
  id: string;
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

function find(id: string): Todo | {} {
  const allTodos = read()
  const todo = allTodos.find(todo => todo.id == id)
  return todo ? todo : {}
}

function update(id: string, partialTodo: Partial<Todo>): Todo {
  const allTodos = read()
  const indexTodo = allTodos.findIndex(todo => todo.id == id)
  
  const todoNotExist = indexTodo == -1
  if(todoNotExist) throw new Error("Invalid ID");  

  const todoUpdated = Object.assign(allTodos[indexTodo], partialTodo)
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos: allTodos }, null, 2));
  return todoUpdated
}

function updateContentById(id: string, content: string): Todo {
  return update(id, { content })
}

createDB();
create("Concluir create");
create("Concluir read");
const todo = create("Concluir");
update(todo.id, { content: "Concluir up" })
updateContentById(todo.id,  "Concluir update")
