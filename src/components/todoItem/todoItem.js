import "./todoItem.css";
import penIcon from "./pencil-outline.svg";
import arrowIcon from "./arrow-right-thin-circle-outline.svg";
import deleteIcon from "./delete.svg";
import { createTodoDetailsUI } from "../todoDetails/todoDetails";
import { createFormUI } from "../todoForm/todoForm";
import { createDelConfirmationUI } from "../delConfirmation/delConfirmation";
import * as domController from "../../domController/domController";
import * as utilityFunctions from "../../utilityFunctions/utilityFunctions";
import format from "date-fns/format";

const todoItemFactory = (checked, title, notes, dueDate, priority) => {
  // Create ID
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

const createTodoItemUI = (todoItem, app) => {
  const container = document.createElement("div");
  const leftContainer = document.createElement("div");
  const rightContainer = document.createElement("div");
  const checkbox = document.createElement("div");
  const title = document.createElement("p");
  // const detailsBtn = document.createElement("button");
  const sup =  document.createElement("sup");
  const dueDate = document.createElement("p");
  const editIcon = document.createElement("img");
  const moveIcon = document.createElement("img");
  const trashIcon = document.createElement("img");

  const processedDueDate = formatDueDate(todoItem.getDueDate());

  container.classList.add("item-container", "flex");
  container.dataset.id = todoItem.getId();
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
    todoItem.editChecked();
    checkbox.innerText = todoItem.getChecked() ? "✓" : "";
  });

  title.classList.add("item-title");
  title.innerText = todoItem.getTitle();

  // detailsBtn.classList.add("item-details-btn");
  // detailsBtn.innerText = "DETAILS";

  sup.innerText = processedDueDate.slice(-6, -4);

  dueDate.classList.add("item-due-date");
  dueDate.append(processedDueDate.slice(0, -6), sup, processedDueDate.slice(-4));

  // dueDate.innerText = utilityFunctions.formatDueDate(todoItem.getDueDate());

  editIcon.classList.add("item-edit-icon");
  editIcon.title = "Edit Todo";
  editIcon.src = penIcon;
  editIcon.addEventListener("pointerup", (e) => {
    e.stopPropagation();
    
    const navbarMode = document.querySelector(`.navbar-container[data-mode]`).dataset.mode;

    domController.appendToRoot(createFormUI(app, navbarMode, "edit-todo", todoItem, null));
    domController.getAppContainer().classList.add("disabled");
  })

  moveIcon.classList.add("item-move-icon");
  moveIcon.title = "Move to Project";
  moveIcon.src = arrowIcon;
  moveIcon.addEventListener("pointerup", (e) => {
    e.stopPropagation();
    
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

const formatDueDate = (dueDate) => {
  const [ y, m, d ] = dueDate.split("-");
  const processedM = Number(m) - 1;

  return format(new Date(y, processedM, d), 'do MMM');
}

export { todoItemFactory, createTodoItemUI };