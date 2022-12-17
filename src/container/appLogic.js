import { todoFactory } from "../components/todo/todoLogic";
import projectFactory from "../components/project/projectLogic";
import { updateLocalStorage } from "../modules/utilityFunctions/utilityFunctions";

const appFactory = () => {
  let todosArr = [];
  let projectsArr = [];

  // Getting
  const getTodosArr = () => todosArr;
  const getProjectsArr = () => projectsArr;

  // Initializing
  const initializeTodosArr = (arr) => {
    todosArr = arr;
  };
  const initializeProjectsArr = (arr) => {
    projectsArr = arr;
  };

  // Adding
  const pushToTodosArr = (todoItem) => {
    todosArr.push(todoItem);
  };
  const pushToProjectsArr = (project) => {
    projectsArr.push(project);
  };

  // Removing
  const removeFromTodosArr = (id) => {
    todosArr = todosArr.filter((e) => e.getId() !== id);
  };
  const removeFromProjectsArr = (id) => {
    projectsArr = projectsArr.filter((e) => e.getId() !== id);
  };

  // Updating
  const updateTodosArr = (todoItem) => {
    todosArr = todosArr.map((e) =>
      e.getId() === todoItem.getId() ? todoItem : e
    );
  };
  const updateProjectsArr = (project) => {
    projectsArr = projectsArr.map((e) =>
      e.getId() === project.getId() ? project : e
    );
  };

  return {
    getTodosArr,
    getProjectsArr,
    initializeTodosArr,
    initializeProjectsArr,
    pushToTodosArr,
    removeFromTodosArr,
    updateTodosArr,
    pushToProjectsArr,
    removeFromProjectsArr,
    updateProjectsArr,
  };
};

const isTodosDataAvailable = () => !!localStorage.todosData;

const isProjectsDataAvailable = () => !!localStorage.projectsData;

const getTodosData = () => JSON.parse(localStorage.todosData);

const getProjectsData = () => JSON.parse(localStorage.projectsData);

// Transform data to an array of TODO objects
const transformToTodosArr = (todosData) => {
  const todosArr = todosData.map((data) => {
    const { checked, title, notes, dueDate, priority, id } = data;

    return todoFactory(checked, title, notes, dueDate, priority, id);
  });

  return todosArr;
};

// Transform data to an array of PROJECT objects
const transformToProjectsArr = (projectsData) => {
  const projectsArr = projectsData.map((data) => {
    const { title, id, todosData } = data;
    const todosArr = transformToTodosArr(todosData);

    return projectFactory(title, id, todosArr);
  });

  return projectsArr;
};

// For first-time users
const generateDefaultItems = () => {
  const sharedTodo = todoFactory(
    true,
    "Leg day",
    "Squats x 100",
    "2022-11-25",
    "low",
    null
  );

  const todosArr = [
    todoFactory(
      false,
      "CS fundamentals",
      "Finish lesson 28",
      "2022-11-28",
      "high",
      null
    ),
    todoFactory(
      false,
      "Codewars practice",
      "Complete 10 challenges today",
      "2022-11-28",
      "medium",
      null
    ),
    todoFactory(
      false,
      "Project update",
      "Update sign-in form features",
      "2022-11-28",
      "high",
      null
    ),
    sharedTodo,
  ];

  const projectsArr = [projectFactory("Fitness", null, [sharedTodo])];

  return [todosArr, projectsArr];
};

const initializeApp = (app) => {
  const [defaultTodosArr, defaultProjectsArr] = generateDefaultItems();

  app.initializeTodosArr(
    isTodosDataAvailable()
      ? transformToTodosArr(getTodosData())
      : defaultTodosArr
  );

  app.initializeProjectsArr(
    isProjectsDataAvailable()
      ? transformToProjectsArr(getProjectsData())
      : defaultProjectsArr
  );
};

const setUpApp = (app) => {
  initializeApp(app);

  onbeforeunload = updateLocalStorage(app);
};

export { appFactory, setUpApp };
