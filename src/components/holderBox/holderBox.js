import "./holderBox.css";
import { createTodoItemUI, todoItemFactory } from "../todoItem/todoItem";
import { createProjectUI } from "../project/project";

let todoItemSample = todoItemFactory(false, 'No Title', 'No Notes', '11-11-22', 'High');

let testArr = new Array(20).fill('');

const createHolderBoxUI = () => {
  const container = document.createElement("div");

  container.classList.add("holder-box-container", "flex-column",);

  container.append(...testArr.map(e => createTodoItemUI(todoItemSample)));

  // container.append(...testArr.map(e => createProjectUI({getTitle() { return "Test Title"}})))

  return container;
}

export { createHolderBoxUI };