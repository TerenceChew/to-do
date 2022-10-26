import "./holderBox.css";
import { todoItemFactory, createTodoItemUI } from "../todoItem/todoItem";
import { projectFactory, createProjectUI } from "../project/project";

let arr = new Array(2).fill('');

const createHolderBoxUI = () => {
  const container = document.createElement("div");

  container.classList.add("holder-box-container", "flex-column",);

  container.append(...arr.map(e => createTodoItemUI(todoItemFactory(false, 'No Title', 'No Notes', '2022-11-25', 'low'))));

  // container.append(...arr.map(e => createProjectUI({getTitle() { return "Test Title"}})));

  return container;
}

export { createHolderBoxUI };
