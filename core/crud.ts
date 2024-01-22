import fs from "fs";

const DB_FILE_PATH = "./core/db";

console.log("Crud");

function createDB() {
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({}));
}


interface Todo {
 date: string
 content: string
 done: boolean
}

function create(content: string) {
  const todo: Todo = {
    date: new Date().toISOString(),
    content,
    done: false
  }

  const todos: Array<Todo> = [
    ...read(),
    todo
  ]

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
}

function read(): Array<Todo> {
  const dbString: string = fs.readFileSync(DB_FILE_PATH, "utf-8")
  const db = JSON.parse(dbString)
  if(!db.todos) return []  
  return db.todos
}

createDB();
create("Concluir create")
create("Concluir read")
console.log(read())
