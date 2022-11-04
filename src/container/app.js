import './app.css';
import { createContentBoxUI } from "../components/contentBox/contentBox";

const appFactory = () => {
  let todosArr = [];
  let projectsArr = [];

  const getTodosArr = () => todosArr;
  const getProjectsArr = () => projectsArr;

  const pushToTodosArr = (todoItem) => {
    todosArr.push(todoItem);
  }

  const removeFromTodosArr = (id) => {
    todosArr = todosArr.filter(e => e.id !== id);
  }

  const updateTodosArr = (todoItem) => {
    todosArr = todosArr.map(e => e.getId() === todoItem.getId() ? todoItem : e);
  }

  const pushToProjectsArr = (project) => {
    projectsArr.push(project);
  }

  const removeFromProjectsArr = (id) => {
    projectsArr = projectsArr.filter(e => e.id !== id);
  }

  const updateProjectsArr = (project) => {
    projectsArr = projectsArr.map(e => e.getId() === project.getId() ? project : e);
  }

  return {
    getTodosArr,
    getProjectsArr,
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

  container.classList.add("app-container", "flex-column", "center")

  const logBtn = document.createElement("button");
  logBtn.innerText = "LOG INFO";
  logBtn.addEventListener("pointerup", () => {
    console.log({
      todosArr: app.getTodosArr(),
      projectsArr: app.getProjectsArr()
    })
  })
  
  container.append(createContentBoxUI(app), logBtn);

  return container;
}

export { createAppUI };
