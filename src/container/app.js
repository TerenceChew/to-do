import './app.css';
import { todoItemFactory, createTodoItemUI } from "../components/todoItem/todoItem";

let todoItemSample = todoItemFactory(false, 'title', 'notes', '2020-11-11', 'mid');

export default function app() {
  const container = document.createElement('div');

  container.append(createTodoItemUI(todoItemSample));

  return container;
}