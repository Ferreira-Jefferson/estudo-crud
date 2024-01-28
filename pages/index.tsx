import React from "react";
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { todoControllerApi } from "@ui/controller/api/todos";

interface HomeTodo {
  id: string;
  content: string;
}

function criarTodoList(
  todos: HomeTodo[],
  setTodos: React.Dispatch<React.SetStateAction<HomeTodo[]>>,
  page: number,
  setTotalPage: React.Dispatch<React.SetStateAction<number>>,
) {
  React.useEffect(() => {
    todoControllerApi.get({ page }).then(({ todos, pages }) => {
      setTodos((oldTodos) => [...oldTodos, ...todos]);
      setTotalPage(pages);
    });
  }, [page]);

  return todos.map((todo) => (
    <tr key={todo.id}>
      <td>
        <input type="checkbox" />
      </td>
      <td>{todo.id.substring(0, 5)}</td>
      <td>{todo.content}</td>
      <td align="right">
        <button data-type="delete" data-id={todo.id}>
          Apagar
        </button>
      </td>
    </tr>
  ));
}

export default function Page() {
  const [todos, setTodos] = React.useState<HomeTodo[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const homeTodos = todoControllerApi.filterTodosByContent<HomeTodo>(
    todos,
    search,
  );

  const hasMorePages = totalPage > page;

  return (
    <main>
      <GlobalStyles themeName="red" />
      <header
        style={{
          backgroundImage: `url('${"/bg.avif"}')`,
        }}
      >
        <div className="typewriter">
          <h1>O que fazer hoje?</h1>
        </div>
        <form>
          <input type="text" placeholder="Correr, Estudar..." />
          <button type="submit" aria-label="Adicionar novo item">
            +
          </button>
        </form>
      </header>

      <section>
        <form>
          <input
            type="text"
            placeholder="Filtrar lista atual, ex: Dentista"
            onChange={function handleSearch(ev) {
              const search = ev.target.value.toLowerCase();
              setSearch(search);
            }}
          />
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th align="left">
                <input type="checkbox" disabled />
              </th>
              <th align="left">Id</th>
              <th align="left">Conteúdo</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {criarTodoList(homeTodos, setTodos, page, setTotalPage)}
            <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                Carregando...
              </td>
            </tr>
            <tr>
              <td colSpan={4} align="center">
                Nenhum item encontrado
              </td>
            </tr>

            {hasMorePages && (
              <tr>
                <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                  <button
                    data-type="load-more"
                    onClick={() => setPage(page + 1)}
                  >
                    Página {page} | Carregar mais{" "}
                    <span
                      style={{
                        display: "inline-block",
                        marginLeft: "4px",
                        fontSize: "1.2em",
                      }}
                    >
                      ↓
                    </span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
