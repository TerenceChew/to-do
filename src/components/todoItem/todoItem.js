import "./todoItem.css";
import penIcon from "./pencil-outline.svg";
import deleteIcon from "./delete.svg";
import { createTodoDetailsUI } from "../todoDetails/todoDetails";

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

const createTodoItemUI = (todoItem, elem) => {
  const container = document.createElement("div");
  const leftContainer = document.createElement("div");
  const rightContainer = document.createElement("div");
  const checkbox = document.createElement("div");
  const title = document.createElement("p");
  const detailsBtn = document.createElement("button");
  const editIcon = document.createElement("img");
  const trashIcon = document.createElement("img");

  container.classList.add("item-container", `var(--${todoItem.getPriority()}-prio)`, "flex");
  leftContainer.classList.add("item-left-container", "flex", "center");
  rightContainer.classList.add("item-right-container", "flex", "center");

  checkbox.classList.add("item-checkbox", "flex", "center");
  checkbox.addEventListener("click", () => {
    checkbox.classList.toggle("checked");
    todoItem.editChecked();
    checkbox.innerText = todoItem.getChecked() ? "✓" : "";
  });


  title.classList.add("item-title");
  title.innerText = todoItem.getTitle();

  detailsBtn.classList.add("item-details-btn");
  detailsBtn.innerText = "DETAILS";
  detailsBtn.addEventListener("click", () => {
    elem.append(createTodoDetailsUI(todoItem));
  });

  editIcon.classList.add("item-edit-icon");
  editIcon.src = penIcon;

  trashIcon.classList.add("item-trash-icon");
  trashIcon.src = deleteIcon;

  leftContainer.append(checkbox, title);
  rightContainer.append(detailsBtn, editIcon, trashIcon);
  container.append(leftContainer, rightContainer);

  return container;
}

export { todoItemFactory, createTodoItemUI };