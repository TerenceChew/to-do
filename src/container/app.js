import './app.css';
import { todoItemFactory, createTodoItemUI } from "../components/todoItem/todoItem";
import { createTodoDetailsUI } from "../components/todoDetails/todoDetails";
import { createFormUI } from "../components/todoForm/todoForm";

let todoItemSample = todoItemFactory(false, 'No Title', 'No Notes', '11-11-22', 'High');

export default function app() {
  const todoItemsArray = [];

  const container = document.createElement('div');
  container.classList.add("app-container", "flex", "center")
  container.style.minHeight = "100vh";

  // container.append(createTodoItemUI(todoItemSample, container));

  // container.append(createTodoDetailsUI(todoItemSample));

  container.append(createFormUI());

  return container;
}