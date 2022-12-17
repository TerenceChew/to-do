import isThisWeek from "date-fns/isThisWeek";
import { todoFactory } from "../todo/todoLogic";
import projectFactory from "../project/projectLogic";
import * as utilityFunctions from "../../modules/utilityFunctions/utilityFunctions";

const getInputValues = () => {
  const titleInput = document.querySelector(".form-title-input");
  const notesInput = document.querySelector(".form-notes-input");
  const dueDateInput = document.querySelector(".form-due-date-input");
  const priorityInput = document.querySelector(
    "input[name='priority']:checked"
  );

  return {
    titleVal: titleInput.value,
    notesVal: notesInput ? notesInput.value : null,
    dueDateVal: dueDateInput ? dueDateInput.value : null,
    priorityVal: priorityInput ? priorityInput.value : null,
  };
};

const createTodo = () => {
  const { titleVal, notesVal, dueDateVal, priorityVal } = getInputValues();

  return todoFactory(false, titleVal, notesVal, dueDateVal, priorityVal, null);
};

const checkTodoDueDate = (todoItem) => {
  const today = utilityFunctions.getTodayInYYYYMMDD();
  const processedDueDate = `${todoItem.getDueDate()}T00:00:00`;
  const isDueToday = todoItem.getDueDate() === today;
  const isDueThisWeek = isThisWeek(new Date(processedDueDate), {
    weekStartsOn: 1,
  });

  return {
    isDueToday,
    isDueThisWeek,
  };
};

const createProject = () => {
  const { titleVal } = getInputValues();

  return projectFactory(titleVal, null, null);
};

const getProjectWithMatchingId = (app, projectId) =>
  app.getProjectsArr().filter((project) => project.getId() === projectId)[0];

export {
  getInputValues,
  createTodo,
  checkTodoDueDate,
  createProject,
  getProjectWithMatchingId,
};
