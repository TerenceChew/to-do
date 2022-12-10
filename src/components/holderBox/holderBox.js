import "./holderBox.css";
import compareAsc from "date-fns/compareAsc";
import { createTodoItemUI } from "../todoItem/todoItem";
import { createProjectUI } from "../project/project";
import * as utilityFunctions from "../../modules/utilityFunctions/utilityFunctions";
import * as domController from "../../modules/domController/domController";

const createHolderBoxUI = (app, type, arr, projectId) => {
  const container = document.createElement("div");

  container.classList.add("holder-box-container", "flex-column");

  if (domController.getContentBox()) {
    domController.getContentBox().lastElementChild.remove();
  }

  if (!arr.length && type === "projects") {
    container.append("No Projects");

    return container;
  }

  if (!arr.length) {
    container.append("No Todos");

    return container;
  }

  if (type === "todos") {
    const sortedArr = sortObjsByDateAsc(arr);

    container.append(
      ...sortedArr.map((e) => createTodoItemUI(e, app, projectId))
    );

    return container;
  }

  if (type === "projects") {
    container.append(...arr.map((e) => createProjectUI(e, app)));

    return container;
  }

  if (type === "day") {
    const filteredArr = utilityFunctions.getObjsDueToday(arr);

    container.append(
      ...filteredArr.map((e) => createTodoItemUI(e, app, projectId))
    );

    return container;
  }

  if (type === "week") {
    const filteredArr = utilityFunctions.getObjsDueThisWeek(arr);
    const sortedArr = sortObjsByDateAsc(filteredArr);

    container.append(
      ...sortedArr.map((e) => createTodoItemUI(e, app, projectId))
    );

    return container;
  }

  return container;
};

const sortObjsByDateAsc = (objsArr) =>
  objsArr.sort((a, b) =>
    compareAsc(new Date(a.getDueDate()), new Date(b.getDueDate()))
  );

export default createHolderBoxUI;
