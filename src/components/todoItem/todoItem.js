import "./todoItem.css";
import penIcon from "./pencil-outline.svg";
import arrowIcon from "./arrow-right-thin-circle-outline.svg";
import deleteIcon from "./delete.svg";
import { createTodoDetailsUI } from "../todoDetails/todoDetails";
import { createFormUI } from "../todoForm/todoForm";
import { createDelConfirmationUI } from "../delConfirmation/delConfirmation";
import { createProjectSelectorUI } from "../projectSelector/projectSelector";
import * as domController from "../../domController/domController";
import * as utilityFunctions from "../../utilityFunctions/utilityFunctions";
import format from "date-fns/format";

const todoItemFactory = (checked, title, notes, dueDate, priority) => {
  const id = utilityFunctions.generateRandomID(title);

  // Getting
  const getChecked = () => checked;
  const getTitle = () => title;
  const getNotes = () => notes;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getId = () => id;

  // Editing
  const editChecked = () => {
    checked = !checked;
  };
  const editTitle = (newTitle) => {
    title = newTitle;
  };
  const editNotes = (newNotes) => {
    notes = newNotes;
  };
  const editDueDate = (newDueDate) => {
    dueDate = newDueDate;
  };
  const editPriority = (newPriority) => {
    priority = newPriority;
  };


  return {
    id,
    getChecked,
    getTitle,
    getNotes,
    getDueDate,
    getPriority,
    getId,
    editChecked,
    editTitle,
    editNotes,
    editDueDate,
    editPriority
  };
};

const createTodoItemUI = (todoItem, app, projectId) => {
  const container = document.createElement("div");
  const leftContainer = document.createElement("div");
  const rightContainer = document.createElement("div");
  const checkbox = document.createElement("div");
  const title = document.createElement("p");
  const sup =  document.createElement("sup");
  const dueDate = document.createElement("p");
  const editIcon = document.createElement("img");
  const moveIcon = document.createElement("img");
  const trashIcon = document.createElement("img");

  const processedDueDate = formatDueDate(todoItem.getDueDate());

  container.classList.add("item-container", "flex");
  container.dataset.id = todoItem.getId();
  container.dataset.projectId = projectId;
  container.style.borderLeft = `4px solid var(--${todoItem.getPriority()}-prio)`;
  container.addEventListener("pointerup", (e) => {
    e.stopPropagation();
    
    domController.appendToRoot(createTodoDetailsUI(todoItem));
    domController.getAppContainer().classList.add("disabled");
  });

  leftContainer.classList.add("item-left-container", "flex", "center");

  rightContainer.classList.add("item-right-container", "flex", "center");

  checkbox.classList.add("item-checkbox", "flex", "center");
  checkbox.addEventListener("pointerup", (e) => {
    e.stopPropagation();
    checkbox.classList.toggle("checked");
    container.classList.toggle("no-pointer-events");
    todoItem.editChecked();
    checkbox.innerText = todoItem.getChecked() ? "✓" : "";
  });

  title.classList.add("item-title");
  title.innerText = todoItem.getTitle();

  sup.innerText = processedDueDate.slice(-6, -4);

  dueDate.classList.add("item-due-date");
  dueDate.append(processedDueDate.slice(0, -6), sup, processedDueDate.slice(-4));

  editIcon.classList.add("item-edit-icon");
  editIcon.title = "Edit Todo";
  editIcon.src = penIcon;
  editIcon.addEventListener("pointerup", (e) => {
    e.stopPropagation();
    
    const navbarMode = document.querySelector(`.navbar-container[data-mode]`).dataset.mode;
    const projectId = container.dataset.projectId === "null" ? null : container.dataset.projectId;

    domController.appendToRoot(createFormUI(app, navbarMode, "edit-todo", todoItem, null, projectId));
    domController.getAppContainer().classList.add("disabled");
  })

  moveIcon.classList.add("item-move-icon");
  moveIcon.title = "Move to Project";
  moveIcon.src = arrowIcon;
  moveIcon.addEventListener("pointerup", (e) => {
    e.stopPropagation();
    
    domController.appendToRoot(createProjectSelectorUI(app, todoItem));
    domController.getAppContainer().classList.add("disabled");
  })

  trashIcon.classList.add("item-trash-icon");
  trashIcon.title = "Delete Todo";
  trashIcon.src = deleteIcon;
  trashIcon.addEventListener("pointerup", (e) => {
    e.stopPropagation();
    domController.appendToRoot(createDelConfirmationUI(app, "todo", todoItem, container));
    domController.getAppContainer().classList.add("disabled");
  })

  leftContainer.append(checkbox, title);
  rightContainer.append(dueDate, editIcon, moveIcon, trashIcon);
  container.append(leftContainer, rightContainer);

  return container;
}

// Format "2022-12-30" to "30th Dec"
const formatDueDate = (dueDate) => {
  const [ y, m, d ] = dueDate.split("-");
  const processedM = Number(m) - 1;

  return format(new Date(y, processedM, d), 'do MMM');
}

export { todoItemFactory, createTodoItemUI };