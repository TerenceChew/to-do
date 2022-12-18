/* eslint-disable no-param-reassign */
import isThisWeek from "date-fns/isThisWeek";

// OBJECTS
const getObjsDueToday = (arr) => {
  const today = getTodayInYYYYMMDD();
  return arr.filter((e) => e.getDueDate() === today);
};

// Mon - Sun
const getObjsDueThisWeek = (arr) =>
  arr.filter((e) => {
    const processedDueDate = `${e.getDueDate()}T00:00:00`;

    return isThisWeek(new Date(processedDueDate), { weekStartsOn: 1 });
  });

// ELEMENTS
const setAttributes = (el, attrs) => {
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in attrs) {
    el[key] = attrs[key];
  }
};

const addEventListenerToElems = (elemsArr, event, fn) => {
  elemsArr.forEach((e) => {
    e.addEventListener(event, fn);
  });
};

// NUMBERS
const getRandomNumInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateRandomID = (title) =>
  `${title}-${getRandomNumInclusive(1, 1000000)}`;

// DATES
const getTodayInYYYYMMDD = () => {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// DATA
const transformToTodosData = (todosArr) => {
  const todosData = todosArr.map((todo) => ({
    id: todo.getId(),
    checked: todo.getChecked(),
    title: todo.getTitle(),
    notes: todo.getNotes(),
    dueDate: todo.getDueDate(),
    priority: todo.getPriority(),
  }));

  return todosData;
};

const transformToProjectsData = (projectsArr) => {
  const projectsData = projectsArr.map((project) => ({
    id: project.getId(),
    todosData: transformToTodosData(project.getTodosArr()),
    title: project.getTitle(),
  }));

  return projectsData;
};

const updateLocalStorage = (app) => {
  localStorage.todosData = JSON.stringify(
    transformToTodosData(app.getTodosArr())
  );
  localStorage.projectsData = JSON.stringify(
    transformToProjectsData(app.getProjectsArr())
  );
};

const getProjectWithMatchingId = (app, id) =>
  app.getProjectsArr().filter((project) => project.getId() === id)[0];

export {
  setAttributes,
  getRandomNumInclusive,
  generateRandomID,
  addEventListenerToElems,
  getTodayInYYYYMMDD,
  updateLocalStorage,
  getObjsDueToday,
  getObjsDueThisWeek,
  getProjectWithMatchingId,
};
