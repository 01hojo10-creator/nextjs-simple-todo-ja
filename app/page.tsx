"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const STORAGE_KEY = "simple-todo-items";
const STORAGE_EVENT = "simple-todo-items-change";
const EMPTY_TODOS: Todo[] = [];

let cachedStorageValue: string | null = null;
let cachedTodos: Todo[] = EMPTY_TODOS;
let useMemoryTodos = false;

function isTodo(value: unknown): value is Todo {
  if (typeof value !== "object" || value === null) return false;

  const todo = value as Todo;
  return (
    typeof todo.id === "number" &&
    typeof todo.title === "string" &&
    typeof todo.completed === "boolean"
  );
}

function parseTodos(value: string | null): Todo[] {
  if (value === null) return EMPTY_TODOS;

  try {
    const parsedTodos: unknown = JSON.parse(value);
    return Array.isArray(parsedTodos) ? parsedTodos.filter(isTodo) : EMPTY_TODOS;
  } catch {
    return EMPTY_TODOS;
  }
}

function readTodosSnapshot() {
  if (typeof window === "undefined") return EMPTY_TODOS;
  if (useMemoryTodos) return cachedTodos;

  try {
    const savedTodos = window.localStorage.getItem(STORAGE_KEY);

    if (savedTodos === cachedStorageValue) return cachedTodos;

    cachedStorageValue = savedTodos;
    cachedTodos = parseTodos(savedTodos);
    return cachedTodos;
  } catch {
    useMemoryTodos = true;
    return cachedTodos;
  }
}

function subscribeTodos(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(STORAGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(STORAGE_EVENT, onStoreChange);
  };
}

function saveTodos(nextTodos: Todo[]) {
  if (typeof window === "undefined") return;

  const serializedTodos = JSON.stringify(nextTodos);
  cachedStorageValue = serializedTodos;
  cachedTodos = nextTodos;
  useMemoryTodos = false;

  try {
    window.localStorage.setItem(STORAGE_KEY, serializedTodos);
  } catch {
    useMemoryTodos = true;
  } finally {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
}

export default function Home() {
  const todos = useSyncExternalStore(
    subscribeTodos,
    readTodosSnapshot,
    () => EMPTY_TODOS
  );
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

    saveTodos([newTodo, ...todos]);
    setInputText("");
  }

  function toggleTodo(id: number) {
    saveTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id: number) {
    saveTodos(todos.filter((todo) => todo.id !== id));
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
