import React from "react";
import { GlobalStyles } from "@ui/theme/GlobalStyles";
import { todoControllerApi } from "@ui/controller/api/todos";

interface HomeTodo {
  id: string;
  content: string;
}

function criarTodoList(page: any) {
  const [todos, setTodos] = React.useState<HomeTodo[]>([]);
  React.useEffect(() => {
    todoControllerApi.get({ page }).then(({ todos }) => {
      setTodos(todos);
    });
  }, []);

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
  const [page, setPage] = React.useState(1);

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
          <input type="text" placeholder="Filtrar lista atual, ex: Dentista" />
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
            {criarTodoList(page)}

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

            <tr>
              <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                <button data-type="load-more" onClick={() => setPage(page + 1)}>
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
          </tbody>
        </table>
      </section>
    </main>
  );
}
