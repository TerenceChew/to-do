import './app.css';
import { todoItemFactory, createTodoItemUI } from "../components/todoItem/todoItem";
import { createTodoDetailsUI } from "../components/todoDetails/todoDetails";
import { createFormUI } from "../components/todoForm/todoForm";
import { createProjectUI } from "../components/project/project";
import { createDelConfirmationUI } from "../components/delConfirmation/delConfirmation";
import * as displayController from "../displayController/displayController";
import * as domController from "../domController/domController";
import { createNavbarUI } from "../components/navbar/navbar";
import { createContentBoxUI } from "../components/contentBox/contentBox";

let todoItemSample = todoItemFactory(false, 'No Title', 'No Notes', '11-11-22', 'High');

let testObj = {
  name: "JJ",
  getName() {
    return this.name;
  },
  editName(nName) {
    this.name = nName;
  }
}

export default function app() {
  const todoItemsArray = [];

  const container = document.createElement('div');
  container.classList.add("app-container", "flex-column", "center")

  // container.append(...[createTodoItemUI(todoItemSample, container), createTodoItemUI(todoItemSample, container)]);

  // container.append(createTodoDetailsUI(todoItemSample));

  // container.append(createFormUI("add", null, null));

  // container.append(createProjectUI({getTitle() {return "sampleTitle"}}));

  // domController.appendToRoot(createDelConfirmationUI());

  // displayController.addFilterToElem(container, "blur(4px) brightness(.3)");

  container.append(createContentBoxUI());

  return container;
}