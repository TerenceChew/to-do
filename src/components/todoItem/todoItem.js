import "./todoItem.css";
import penIcon from "./pencil-outline.svg";
import arrowIcon from "./arrow-right-thin-circle-outline.svg";
import deleteIcon from "./delete.svg";
import { createTodoDetailsUI } from "../todoDetails/todoDetails";
import { createFormUI } from "../todoForm/todoForm";
import { createDelConfirmationUI } from "../delConfirmation/delConfirmation";
import * as domController from "../../domController/domController";

const todoItemFactory = (checked, title, notes, dueDate, priority) => {
  // Getting
  const getChecked = () => checked;
  const getTitle = () => title;
  const getNotes = () => notes;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;

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
    getChecked,
    getTitle,
    getNotes,
    getDueDate,
    getPriority,
    editChecked,
    editTitle,
    editNotes,
    editDueDate,
    editPriority
  };
};

const createTodoItemUI = (todoItem) => {
  const container = document.createElement("div");
  const leftContainer = document.createElement("div");
  const rightContainer = document.createElement("div");
  const checkbox = document.createElement("div");
  const title = document.createElement("p");
  const detailsBtn = document.createElement("button");
  const editIcon = document.createElement("img");
  const moveIcon = document.createElement("img");
  const trashIcon = document.createElement("img");

  container.classList.add("item-container", "flex");
  container.style.borderLeft = `4px solid var(--${todoItem.getPriority()}-prio)`;

  leftContainer.classList.add("item-left-container", "flex", "center");

  rightContainer.classList.add("item-right-container", "flex", "center");

  checkbox.classList.add("item-checkbox", "flex", "center");
  checkbox.addEventListener("pointerdown", () => {
    checkbox.classList.toggle("checked");
    todoItem.editChecked();
    checkbox.innerText = todoItem.getChecked() ? "✓" : "";
  });

  title.classList.add("item-title");
  title.innerText = todoItem.getTitle();

  detailsBtn.classList.add("item-details-btn");
  detailsBtn.innerText = "DETAILS";
  detailsBtn.addEventListener("pointerdown", () => {
    domController.appendToRoot(createTodoDetailsUI(todoItem));
    domController.getAppContainer().classList.add("disabled");
  });

  editIcon.classList.add("item-edit-icon");
  editIcon.title = "Edit Todo";
  editIcon.src = penIcon;
  editIcon.addEventListener("pointerdown", () => {
    domController.appendToRoot(createFormUI("edit-todo", todoItem, null));
    domController.getAppContainer().classList.add("disabled");
  })

  moveIcon.classList.add("item-move-icon");
  moveIcon.title = "Move to Project";
  moveIcon.src = arrowIcon;

  trashIcon.classList.add("item-trash-icon");
  trashIcon.title = "Delete Todo";
  trashIcon.src = deleteIcon;
  trashIcon.addEventListener("pointerdown", () => {
    domController.appendToRoot(createDelConfirmationUI(todoItem, container));
    domController.getAppContainer().classList.add("disabled");
  })

  leftContainer.append(checkbox, title);
  rightContainer.append(detailsBtn, editIcon, moveIcon, trashIcon);
  container.append(leftContainer, rightContainer);

  return container;
}

export { todoItemFactory, createTodoItemUI };

