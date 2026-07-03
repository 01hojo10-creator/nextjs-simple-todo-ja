"use client";

import { FormEvent, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");

  function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = inputText.trim();
    if (!title) return;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false
    };

    setTodos((currentTodos) => [newTodo, ...currentTodos]);
    setInputText("");
  }

  function toggleTodo(id: number) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id: number) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  return (
    <main className="pageShell">
      <section className="todoCard" aria-labelledby="app-title">
        <div className="hero">
          <p className="eyebrow">Next.js Practice</p>
          <h1 id="app-title">シンプルToDo</h1>
        </div>

        <form className="inputArea" onSubmit={addTodo}>
          <label className="srOnly" htmlFor="todo-input">
            タスク名
          </label>
          <input
            id="todo-input"
            type="text"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder="例：買い物に行く"
            aria-label="タスク名を入力"
          />
          <button type="submit">追加</button>
        </form>

        <div className="todoList" aria-label="タスク一覧">
          {todos.length === 0 ? (
            <div className="emptyState">
              <span aria-hidden="true">✓</span>
              <p>まだタスクはありません。上の入力欄から追加してください。</p>
            </div>
          ) : (
            todos.map((todo) => (
              <article
                className={`todoItem ${todo.completed ? "completed" : ""}`}
                key={todo.id}
              >
                <label className="checkArea">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.title}</span>
                </label>
                <button
                  className="deleteButton"
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`${todo.title}を削除`}
                >
                  削除
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
