import "./holderBox.css";
import { todoItemFactory, createTodoItemUI } from "../todoItem/todoItem";
import { projectFactory, createProjectUI } from "../project/project";
import * as utilityFunctions from "../../utilityFunctions/utilityFunctions";
import compareAsc from "date-fns/compareAsc";
import isThisWeek from "date-fns/isThisWeek";

const createHolderBoxUI = (app, type, arr) => {
  const container = document.createElement("div");

  container.classList.add("holder-box-container", "flex-column");

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

const getObjsDueToday = (arr) => {
  const today = utilityFunctions.getTodayInYYYYMMDD();
  return arr.filter(e => e.getDueDate() === today);
}

const getObjsDueThisWeek = (arr) => {
  return arr.filter(e => {
    const processedDueDate = `${e.getDueDate()}T00:00:00`;

    return isThisWeek(new Date(processedDueDate), { weekStartsOn: 1 });
  })
}

export { createHolderBoxUI };

