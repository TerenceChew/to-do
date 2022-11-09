import './app.css';
import { createContentBoxUI } from "../components/contentBox/contentBox";
import { todoItemFactory } from '../components/todoItem/todoItem';
import { projectFactory } from '../components/project/project';
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
  }
  const initializeProjectsArr = (arr) => {
    projectsArr = arr;
  }

  // Adding
  const pushToTodosArr = (todoItem) => {
    todosArr.push(todoItem);
  }
  const pushToProjectsArr = (project) => {
    projectsArr.push(project);
  }

  // Removing
  const removeFromTodosArr = (id) => {
    todosArr = todosArr.filter(e => e.id !== id);
  }
  const removeFromProjectsArr = (id) => {
    projectsArr = projectsArr.filter(e => e.id !== id);
  }

  // Updating
  const updateTodosArr = (todoItem) => {
    todosArr = todosArr.map(e => e.getId() === todoItem.getId() ? todoItem : e);
  }
  const updateProjectsArr = (project) => {
    projectsArr = projectsArr.map(e => e.getId() === project.getId() ? project : e);
  }

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
    updateProjectsArr
  }
}

const createAppUI = () => {
  const container = document.createElement('div');
  const app = appFactory();

  initializeApp(app);
  
  onbeforeunload = updateLocalStorage(app);

  container.classList.add("app-container", "flex-column", "center")

  // Logger btn
  // const logBtn = document.createElement("button");
  // logBtn.innerText = "LOG INFO";
  // logBtn.addEventListener("pointerup", () => {
  //   console.log({
  //     todosArrOri: app.getTodosArr(),
  //     projectsArrOri: app.getProjectsArr()
  //   })
  // })
  // Logger btn
  
  container.append(createContentBoxUI(app));

  return container;
}

const transformToTodosArr = (todosData) => {
  const todosArr = todosData.map(data => {
    const { checked, title, notes, dueDate, priority, id } = data;

    return todoItemFactory(checked, title, notes, dueDate, priority, id);
  })

  return todosArr;
}

const transformToProjectsArr = (projectsData) => {
  const projectsArr = projectsData.map(data => {
    const { title, id, todosData } = data;
    const todosArr = transformToTodosArr(todosData);

    return projectFactory(title, id, todosArr);
  });

  return projectsArr;
}

const initializeApp = (app) => {
  const [ defaultTodosArr, defaultProjectsArr ] = generateDefaultItems();

  localStorage.todosData ?
  app.initializeTodosArr(transformToTodosArr(JSON.parse(localStorage.todosData))) :
  app.initializeTodosArr(defaultTodosArr);

  localStorage.projectsData ?
  app.initializeProjectsArr(transformToProjectsArr(JSON.parse(localStorage.projectsData))) :
  app.initializeProjectsArr(defaultProjectsArr);
}

const generateDefaultItems = () => {
  const sharedTodoItem = todoItemFactory(true, "Leg day", "Squats x 100", "2022-11-25", "low", null);

  const todosArr = [todoItemFactory(false, "CS fundamentals", "Finish lesson 28", "2022-11-28", "high", null), todoItemFactory(false, "Codewars practice", "Complete 10 challenges today", "2022-11-28", "medium", null), todoItemFactory(false, "Project update", "Update sign-in form features", "2022-11-28", "high", null), sharedTodoItem];

  const projectsArr = [projectFactory("Fitness", null, [sharedTodoItem])];

  return [todosArr, projectsArr];
}

export { createAppUI };
