import "./project.css";
import plusIcon from "./plus.svg";
import penIcon from "./pencil-outline.svg";
import deleteIcon from "./delete.svg";
import { createFormUI } from "../todoForm/todoForm";
import { createDelConfirmationUI } from "../delConfirmation/delConfirmation";
import { createHolderBoxUI } from "../holderBox/holderBox";
import * as domController from "../../domController/domController";
import * as utilityFunctions from "../../utilityFunctions/utilityFunctions";

const projectFactory = (title, idFromData, todosArrFromData) => {
  const id = idFromData ? idFromData : utilityFunctions.generateRandomID(title);
  let todosArr = todosArrFromData ? todosArrFromData : [];

  // Getting
  const getTitle = () => title;
  const getTodosArr = () => todosArr;
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

  // Updating
  // const pushToTodosData = (todoData) => {
  //   todosData.push(todoData);
  // }

  // const removeFromTodosData = (id) => {
  //   todosData = todosData.filter(e => e.id !== id);
  // }

  return {
    id,
    getTitle,
    getTodosArr,
    getId,
    editTitle,
    pushToTodosArr,
    removeFromTodosArr
  };
}

const createProjectUI = (project, app) => {
  const container = document.createElement("div");
  const title = document.createElement("p");
  const addIcon = document.createElement("img");
  const editIcon = document.createElement("img");
  const trashIcon = document.createElement("img");

  container.classList.add("project-container", "flex", "center");
  container.dataset.id = project.getId();
  container.addEventListener("pointerup", (e) => {
    e.stopPropagation();

    const todosArr = project.getTodosArr();
    const projectId = container.dataset.id;

    console.log("todosArr:", todosArr);

    domController.getContentBox().append(createHolderBoxUI(app, "todos", todosArr, projectId));
  })

  title.classList.add("project-title");
  title.innerText = project.getTitle();

  addIcon.classList.add("project-add-icon");
  addIcon.src = plusIcon;
  addIcon.addEventListener("pointerup", (e) => {
    e.stopPropagation();

    domController.appendToRoot(createFormUI(app, null, "add-to-project", null, project));
    domController.getAppContainer().classList.add("disabled");
  })

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
  trashIcon.addEventListener("pointerup", (e) => {
    e.stopPropagation();

    domController.appendToRoot(createDelConfirmationUI(app, "project", project, container));
    domController.getAppContainer().classList.add("disabled");
  })

  container.append(title, addIcon, editIcon, trashIcon);

  return container;
}

export { projectFactory, createProjectUI };