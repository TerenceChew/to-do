import "./todo.css";
import { formatDueDate, splitDueDate } from "./todoLogic";
import * as utilityFunctions from "../../modules/utilityFunctions/utilityFunctions";
import createTodoDetailsUI from "../todoDetails/todoDetailsDOM";
import createFormUI from "../form/formDOM";
import createDelConfirmationUI from "../delConfirmation/delConfirmationDOM";
import createProjectSelectorUI from "../projectSelector/projectSelectorDOM";
import * as domController from "../../modules/domController/domController";
import penIcon from "./assets/pencil-outline.svg";
import arrowIcon from "./assets/arrow-right-thin-circle-outline.svg";
import deleteIcon from "./assets/delete.svg";

const createTodoUI = (todo, app, projectId) => {
  // Elements
  const container = document.createElement("div");
  const leftContainer = document.createElement("div");
  const rightContainer = document.createElement("div");
  const checkbox = document.createElement("div");
  const title = document.createElement("p");
  const sup = document.createElement("sup");
  const dueDate = document.createElement("p");
  const editIcon = document.createElement("img");
  const moveIcon = document.createElement("img");
  const trashIcon = document.createElement("img");

  // Variables
  const { day, ordinalIndicator, month } = splitDueDate(
    formatDueDate(todo.getDueDate())
  );

  container.classList.add("item-container", "flex", "animate-appear");
  container.dataset.id = todo.getId();
  container.dataset.projectId = projectId;
  container.style.borderLeft = `5px solid var(--${todo.getPriority()}-prio)`;
  container.addEventListener("pointerup", (e) => {
    handleContainerClick(e, todo);
  });

  leftContainer.classList.add("item-left-container", "flex", "center");

  rightContainer.classList.add("item-right-container", "flex", "center");

  checkbox.classList.add("item-checkbox", "flex", "center");
  if (todo.getChecked()) {
    checkbox.classList.add("checked");
    container.classList.add("no-pointer-events");
  }
  checkbox.addEventListener("pointerup", (e) => {
    handleCheckboxClick({ e, app, container, todo });
  });

  title.classList.add("item-title");
  title.innerText = todo.getTitle();

  sup.innerText = ordinalIndicator;

  dueDate.classList.add("item-due-date");
  dueDate.append(day, sup, month);

  editIcon.classList.add("item-edit-icon");
  editIcon.title = "Edit Todo";
  editIcon.src = penIcon;
  editIcon.addEventListener("pointerup", (e) => {
    handleEditIconClick({ e, app, container, todo });
  });

  moveIcon.classList.add("item-move-icon");
  moveIcon.title = "Move to Project";
  moveIcon.src = arrowIcon;
  moveIcon.addEventListener("pointerup", (e) => {
    handleMoveIconClick({ e, app, todo });
  });

  trashIcon.classList.add("item-trash-icon");
  trashIcon.title = "Delete Todo";
  trashIcon.src = deleteIcon;
  trashIcon.addEventListener("pointerup", (e) => {
    handleTrashIconClick({ e, app, container, todo });
  });

  leftContainer.append(checkbox, title);
  rightContainer.append(dueDate, editIcon, moveIcon, trashIcon);
  container.append(leftContainer, rightContainer);

  return container;
};

const handleContainerClick = (e, todo) => {
  e.stopPropagation();

  domController.appendToRoot(createTodoDetailsUI(todo));
  domController.getAppContainer().classList.add("disabled");
};

const handleCheckboxClick = ({ e, app, container, todo }) => {
  const checkbox = e.target;
  e.stopPropagation();

  checkbox.classList.toggle("checked");
  container.classList.toggle("no-pointer-events");

  todo.editChecked();
  utilityFunctions.updateLocalStorage(app);
};

const handleEditIconClick = ({ e, app, container, todo }) => {
  e.stopPropagation();

  const navbarMode = document.querySelector(".navbar-container[data-mode]")
    .dataset.mode;
  const projectId =
    container.dataset.projectId === "null" ? null : container.dataset.projectId;
  const objs = { app, project: null, todo };
  const modes = { navbarMode, formMode: "edit-todo" };

  domController.appendToRoot(createFormUI({ objs, modes, projectId }));
  domController.getAppContainer().classList.add("disabled");
};

const handleMoveIconClick = ({ e, app, todo }) => {
  e.stopPropagation();

  domController.appendToRoot(createProjectSelectorUI(app, todo));
  domController.getAppContainer().classList.add("disabled");
};

const handleTrashIconClick = ({ e, app, container, todo }) => {
  e.stopPropagation();
  domController.appendToRoot(
    createDelConfirmationUI(app, "todo", todo, container)
  );
  domController.getAppContainer().classList.add("disabled");
};

export default createTodoUI;
