import isThisWeek from "date-fns/isThisWeek";

const setAttributes = (el, attrs) => {
  for (let key in attrs) {
    el[key] = attrs[key];
  }
}

const getRandomNumInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateRandomID = (title) => {
  return `${title}-${getRandomNumInclusive(1, 1000000)}`;
}

const addEventListenerToElems = (elemsArr, event, fn) => {
  elemsArr.forEach(e => {
    e.addEventListener(event, fn);
  })
}

const getTodayInYYYYMMDD = () => {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

const transformToTodosData = (todosArr) => {
  let todosData = todosArr.map(todo => ({
    id: todo.getId(),
    checked: todo.getChecked(),
    title: todo.getTitle(),
    notes: todo.getNotes(),
    dueDate: todo.getDueDate(),
    priority: todo.getPriority()
  }));

  return todosData;
}

const transformToProjectsData = (projectsArr) => {
  let projectsData = projectsArr.map(project => ({
    id: project.getId(),
    todosData: transformToTodosData(project.getTodosArr()),
    title: project.getTitle()
  }));

  return projectsData;
}

const updateLocalStorage = (app) => {
  localStorage.todosData = JSON.stringify(transformToTodosData(app.getTodosArr()));
  localStorage.projectsData = JSON.stringify(transformToProjectsData(app.getProjectsArr()));
}

// Get objects that are due today
const getObjsDueToday = (arr) => {
  const today = getTodayInYYYYMMDD();
  return arr.filter(e => e.getDueDate() === today);
}

// Get objects that are due this week (Mon - Sun)
const getObjsDueThisWeek = (arr) => {
  return arr.filter(e => {
    const processedDueDate = `${e.getDueDate()}T00:00:00`;

    return isThisWeek(new Date(processedDueDate), { weekStartsOn: 1 });
  })
}

export { setAttributes, getRandomNumInclusive, generateRandomID, addEventListenerToElems, getTodayInYYYYMMDD, updateLocalStorage, getObjsDueToday, getObjsDueThisWeek };
