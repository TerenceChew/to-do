import "./project.css";
import penIcon from "./pencil-outline.svg";
import deleteIcon from "./delete.svg";

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

const createProjectUI = ({ getTitle }) => {
  const container = document.createElement("div");
  const title = document.createElement("p");
  const viewBtn = document.createElement("button");
  const editIcon = document.createElement("img");
  const trashIcon = document.createElement("img");

  container.classList.add("project-container", "flex", "center");

  title.classList.add("project-title");
  title.innerText = getTitle();

  viewBtn.classList.add("project-view-btn");
  viewBtn.innerText = "VIEW";

  editIcon.classList.add("project-edit-icon");
  editIcon.src = penIcon;

  trashIcon.classList.add("project-trash-icon");
  trashIcon.src = deleteIcon;

  container.append(title, viewBtn, editIcon, trashIcon);

  return container;
}

export { projectFactory, createProjectUI };