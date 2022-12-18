import "./delConfirmation.css";
import isArrEmpty from "./delConfirmationLogic";
import * as domController from "../../modules/domController/domController";
import * as utilityFunctions from "../../modules/utilityFunctions/utilityFunctions";
import { updateLocalStorage } from "../../modules/utilityFunctions/utilityFunctions";
import {
  updateTodosTotal,
  updateProjectsTotal,
  updateDayTotal,
  updateWeekTotal,
} from "../navbar/navbarDOM";
import createHolderBoxUI from "../holderBox/holderBoxDOM";

const createDelConfirmationUI = (app, type, obj, objUI) => {
  const container = document.createElement("div");
  const confirmationMsg = document.createElement("p");
  const btnsContainer = document.createElement("div");
  const noBtn = document.createElement("button");
  const yesBtn = document.createElement("button");

  container.classList.add(
    "del-confirmation-container",
    "flex-column",
    "center",
    "animate-appear"
  );

  confirmationMsg.classList.add("del-confirmation-msg");
  confirmationMsg.innerText = "Confirm Delete?";

  btnsContainer.classList.add(
    "del-confirmation-btns-container",
    "flex",
    "center"
  );

  noBtn.classList.add("del-confirmation-no-btn");
  noBtn.innerText = "NO";
  noBtn.addEventListener("pointerup", () => {
    removeDelConfirmationUI(container);
  });

  yesBtn.classList.add("del-confirmation-yes-btn");
  yesBtn.innerText = "YES";
  yesBtn.addEventListener("pointerup", () => {
    handleYesBtnClick({ app, container, objUI, obj, type });
  });

  btnsContainer.append(noBtn, yesBtn);
  container.append(confirmationMsg, btnsContainer);

  return container;
};

const handleYesBtnClick = ({ app, container, objUI, obj, type }) => {
  if (type === "todo") {
    handleTodoDelete(app, obj, container, objUI);
  } else if (type === "project") {
    handleProjectDelete(app, obj, container, objUI);
  }

  updateLocalStorage(app);
  updateNavbarTotals(app);
};

const handleTodoDelete = async (app, obj, container, objUI) => {
  app.removeFromTodosArr(obj.getId());

  // Remove todoItem from every project that contains it
  app.getProjectsArr().forEach((project) => {
    project.removeFromTodosArr(obj.getId());
  });

  removeDelConfirmationUI(container);

  const { projectId } = objUI.dataset;
  const navbarMode = domController.getNavbar().dataset.mode;

  await deleteObjUI(objUI);

  if (navbarMode === "todos") {
    const todosArr = app.getTodosArr();

    if (isArrEmpty(todosArr)) {
      displayNoTodos(app);
    }
  }

  if (navbarMode === "day") {
    const todosArr = app.getTodosArr();
    const todosDueToday = utilityFunctions.getObjsDueToday(todosArr);

    if (isArrEmpty(todosDueToday)) {
      displayNoTodos(app);
    }
  }

  if (navbarMode === "week") {
    const todosArr = app.getTodosArr();
    const todosDueThisWeek = utilityFunctions.getObjsDueThisWeek(todosArr);

    if (isArrEmpty(todosDueThisWeek)) {
      displayNoTodos(app);
    }
  }

  if (navbarMode === "projects") {
    const projectBeingViewed = utilityFunctions.getProjectWithMatchingId(
      app,
      projectId
    );
    const todosArr = projectBeingViewed.getTodosArr();

    if (isArrEmpty(todosArr)) {
      displayNoTodos(app);
    }
  }
};

const handleProjectDelete = async (app, obj, container, objUI) => {
  app.removeFromProjectsArr(obj.getId());

  // Remove any todoItem that the project contains
  obj.getTodosArr().forEach((todo) => {
    app.removeFromTodosArr(todo.getId());
  });

  removeDelConfirmationUI(container);

  await deleteObjUI(objUI);

  const projectsArr = app.getProjectsArr();

  if (isArrEmpty(projectsArr)) {
    displayNoProjects(app);
  }
};

const displayNoTodos = (app) => {
  domController.getContentBox().append(
    createHolderBoxUI({
      app,
      mode: "todos",
      arr: [],
      projectId: null,
    })
  );
};

const displayNoProjects = (app) => {
  domController.getContentBox().append(
    createHolderBoxUI({
      app,
      mode: "projects",
      arr: [],
      projectId: null,
    })
  );
};

const deleteObjUI = (objUI) => {
  objUI.classList.add("animate-delete");

  return new Promise((resolve) => {
    setTimeout(() => {
      objUI.remove();

      resolve();
    }, 1000);
  });
};

const removeDelConfirmationUI = (container) => {
  container.remove();
  domController.getAppContainer().classList.remove("disabled");
};

const updateNavbarTotals = (app) => {
  updateTodosTotal(app);
  updateProjectsTotal(app);
  updateDayTotal(app);
  updateWeekTotal(app);
};

export default createDelConfirmationUI;
