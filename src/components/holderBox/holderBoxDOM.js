import "./holderBox.css";
import {
  sortObjsByDateAsc,
  noProjectsFound,
  noTodosFound,
} from "./holderBoxLogic";
import createTodoUI from "../todo/todoDOM";
import createProjectUI from "../project/projectDOM";
import * as utilityFunctions from "../../modules/utilityFunctions/utilityFunctions";
import * as domController from "../../modules/domController/domController";

const createHolderBoxUI = ({ app, mode, arr, projectId }) => {
  const container = document.createElement("div");

  container.classList.add("holder-box-container", "flex-column");

  if (isContentBoxLoaded()) {
    removeCurrHolderBox();
  }

  if (noProjectsFound(arr, mode)) {
    container.append("No Projects");
    return container;
  }

  if (noTodosFound(arr)) {
    container.append("No Todos");
    return container;
  }

  if (mode === "todos") {
    container.append(...createTodosUI({ app, arr, projectId }));
    return container;
  }

  if (mode === "projects") {
    container.append(...createProjectsUI({ app, arr }));
    return container;
  }

  if (mode === "day") {
    container.append(...createTodosUIDueToday({ app, arr, projectId }));
    return container;
  }

  if (mode === "week") {
    container.append(...createTodosUIDueThisWeek({ app, arr, projectId }));
    return container;
  }

  return container;
};

const isContentBoxLoaded = () => !!domController.getContentBox();

const removeCurrHolderBox = () => {
  domController.getContentBox().lastElementChild.remove();
};

const createTodosUI = ({ app, arr, projectId }) => {
  const sortedArr = sortObjsByDateAsc(arr);

  return sortedArr.map((elem) => createTodoUI(elem, app, projectId));
};

const createProjectsUI = ({ app, arr }) =>
  arr.map((elem) => createProjectUI(elem, app));

const createTodosUIDueToday = ({ app, arr, projectId }) => {
  const filteredArr = utilityFunctions.getObjsDueToday(arr);

  return filteredArr.map((e) => createTodoUI(e, app, projectId));
};

const createTodosUIDueThisWeek = ({ app, arr, projectId }) => {
  const filteredArr = utilityFunctions.getObjsDueThisWeek(arr);
  const sortedArr = sortObjsByDateAsc(filteredArr);

  return sortedArr.map((e) => createTodoUI(e, app, projectId));
};

export default createHolderBoxUI;
