import "./holderBox.css";
import { createTodoItemUI } from "../todoItem/todoItem";
import { createProjectUI } from "../project/project";
import * as utilityFunctions from "../../utilityFunctions/utilityFunctions";
import * as domController from "../../domController/domController";
import compareAsc from "date-fns/compareAsc";
import isThisWeek from "date-fns/isThisWeek";

const createHolderBoxUI = (app, type, arr) => {
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

    container.append(...sortedArr.map(e => createTodoItemUI(e, app)));
  } else if (type === "projects") {
    container.append(...arr.map(e => createProjectUI(e, app)));
  } else if (type === "day") {
    const filteredArr = getObjsDueToday(arr);

    container.append(...filteredArr.map(e => createTodoItemUI(e, app)));
  } else if (type === "week") {
    const filteredArr = getObjsDueThisWeek(arr);
    const sortedArr = sortObjsByDateAsc(filteredArr);

    container.append(...sortedArr.map(e => createTodoItemUI(e, app)));
  }

  return container;
}

const sortObjsByDateAsc = (objsArr) => {
  return objsArr.sort((a, b) => compareAsc(new Date(a.getDueDate()), new Date(b.getDueDate())));
}

// Get objects that are due today
const getObjsDueToday = (arr) => {
  const today = utilityFunctions.getTodayInYYYYMMDD();
  return arr.filter(e => e.getDueDate() === today);
}

// Get objects that are due this week (Mon - Sun)
const getObjsDueThisWeek = (arr) => {
  return arr.filter(e => {
    const processedDueDate = `${e.getDueDate()}T00:00:00`;

    return isThisWeek(new Date(processedDueDate), { weekStartsOn: 1 });
  })
}

export { createHolderBoxUI };

