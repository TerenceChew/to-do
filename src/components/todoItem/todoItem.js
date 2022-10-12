import "./todoItem.css";
import pencilIcon from "./pencil-outline.svg";
import deleteIcon from "./delete.svg";

export {todoItemFactory, createTodoItemUI};

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

const createTodoItemUI = ({ getChecked, getTitle, getDueDate, getPriority, editChecked }) => {
  const todoItemContainer = document.createElement("div");
  const leftContainer = document.createElement("div");
  const rightContainer = document.createElement("div");
  const checkbox = document.createElement("div");
  const title = document.createElement("p");
  const detailsBtn = document.createElement("button");
  const dueDate = document.createElement("p");
  const editIcon = document.createElement("img");
  const trashIcon = document.createElement("img");

  todoItemContainer.classList.add("todo-item-container", `var(--${getPriority()}-prio)`, "flex");
  leftContainer.classList.add("todo-left-container", "flex", "center");
  rightContainer.classList.add("todo-right-container", "flex", "center");

  checkbox.classList.add("todo-checkbox", "flex", "center");
  checkbox.addEventListener("click", () => {
    checkbox.classList.toggle('checked');
    editChecked();
    checkbox.innerText = getChecked() ? '✓' : '';
  });


  title.classList.add("todo-title");
  title.innerText = getTitle();

  detailsBtn.classList.add("todo-details-btn");
  detailsBtn.innerText = 'DETAILS';

  dueDate.classList.add("todo-due-date");
  dueDate.innerText = getDueDate(); 

  editIcon.classList.add("todo-edit-icon");
  editIcon.src = pencilIcon;

  trashIcon.classList.add("todo-remove-icon");
  trashIcon.src = deleteIcon;

  leftContainer.append(checkbox, title);
  rightContainer.append(detailsBtn, dueDate, editIcon, trashIcon);
  todoItemContainer.append(leftContainer, rightContainer);

  return todoItemContainer;
}
