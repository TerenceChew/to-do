import "./todoItem.css";
import pencilIcon from "./pencil-outline.svg";
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
  }
};

const createTodoItemUI = (todoItem, container) => {
  const todoItemContainer = document.createElement("div");
  const leftContainer = document.createElement("div");
  const rightContainer = document.createElement("div");
  const checkbox = document.createElement("div");
  const title = document.createElement("p");
  const detailsBtn = document.createElement("button");
  const dueDate = document.createElement("p");
  const editIcon = document.createElement("img");
  const trashIcon = document.createElement("img");

  todoItemContainer.classList.add("item-container", `var(--${todoItem.getPriority()}-prio)`, "flex");
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
    container.append(createTodoDetailsUI(todoItem));
  });

  dueDate.classList.add("item-due-date");
  dueDate.innerText = todoItem.getDueDate(); 

  editIcon.classList.add("item-edit-icon");
  editIcon.src = pencilIcon;

  trashIcon.classList.add("item-remove-icon");
  trashIcon.src = deleteIcon;

  leftContainer.append(checkbox, title);
  rightContainer.append(detailsBtn, dueDate, editIcon, trashIcon);
  todoItemContainer.append(leftContainer, rightContainer);

  return todoItemContainer;
}

export { todoItemFactory, createTodoItemUI };