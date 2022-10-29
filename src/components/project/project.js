import "./project.css";
import penIcon from "./pencil-outline.svg";
import deleteIcon from "./delete.svg";
import { createFormUI } from "../todoForm/todoForm";
import { createDelConfirmationUI } from "../delConfirmation/delConfirmation";
import * as domController from "../../domController/domController";
import * as utilityFunctions from "../../utilityFunctions/utilityFunctions";

const projectFactory = (title) => {
  // Create ID
  const id = utilityFunctions.generateRandomID(title);
  
  const todosArr = [];

  // Getting
  const getTitle = () => title;
  const getTodoItemsArr = () => todosArr;
  const getId = () => id;

  // Editing
  const editTitle = (newTitle) => {
    title = newTitle;
  }

  const pushToTodosArr = (todoItem) => {
    todosArr.push(todoItem);
  }

  const removeFromTodosArr = (id) => {
    todosArr = todosArr.filter(e => e.id !== id);
  }



  return {
    id,
    getTitle,
    getTodoItemsArr,
    getId,
    editTitle,
    pushToTodosArr,
    removeFromTodosArr
  };
}

const createProjectUI = (project, app) => {
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
  editIcon.addEventListener("pointerup", (e) => {
    e.stopPropagation();

    const navbarMode = document.querySelector(`.navbar-container[data-mode]`).dataset.mode;

    domController.appendToRoot(createFormUI(app, navbarMode, "edit-project", null, project));
    domController.getAppContainer().classList.add("disabled");
  })

  trashIcon.classList.add("project-trash-icon");
  trashIcon.src = deleteIcon;
  trashIcon.addEventListener("pointerup", () => {
    domController.appendToRoot(createDelConfirmationUI(app, "project", project, container));
    domController.getAppContainer().classList.add("disabled");
  })

  container.append(title, viewBtn, editIcon, trashIcon);

  return container;
}

export { projectFactory, createProjectUI };