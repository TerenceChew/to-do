import "./project.css";
import penIcon from "./pencil-outline.svg";
import deleteIcon from "./delete.svg";
import { createFormUI } from "../todoForm/todoForm";
import { createDelConfirmationUI } from "../delConfirmation/delConfirmation";
import * as domController from "../../domController/domController";

const projectFactory = (title, todoItems) => {
  // Getting
  const getTitle = () => title;
  const getTodoItems = () => todoItems;

  // Editing
  const editTitle = (newTitle) => {
    title = newTitle;
  }
  const editTodoItems = (newTodoItems) => {
    todoItems = newTodoItems;
  }

  return {
    getTitle,
    getTodoItems,
    editTitle,
    editTodoItems
  };
}

const createProjectUI = (project) => {
  const container = document.createElement("div");
  const title = document.createElement("p");
  const viewBtn = document.createElement("button");
  const editIcon = document.createElement("img");
  const trashIcon = document.createElement("img");

  container.classList.add("project-container", "flex", "center");

  title.classList.add("project-title");
  title.innerText = project.getTitle();

  viewBtn.classList.add("project-view-btn");
  viewBtn.innerText = "VIEW";

  editIcon.classList.add("project-edit-icon");
  editIcon.src = penIcon;
  editIcon.addEventListener("pointerdown", () => {
    domController.appendToRoot(createFormUI("edit-project", null, project));
    domController.getAppContainer().classList.add("disabled");
  })

  trashIcon.classList.add("project-trash-icon");
  trashIcon.src = deleteIcon;
  trashIcon.addEventListener("pointerdown", () => {
    domController.appendToRoot(createDelConfirmationUI(project, container));
    domController.getAppContainer().classList.add("disabled");
  })

  container.append(title, viewBtn, editIcon, trashIcon);

  return container;
}

export { projectFactory, createProjectUI };