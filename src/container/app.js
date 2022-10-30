import './app.css';
import { todoItemFactory, createTodoItemUI } from "../components/todoItem/todoItem";
import { createTodoDetailsUI } from "../components/todoDetails/todoDetails";
import { createFormUI } from "../components/todoForm/todoForm";
import { createProjectUI } from "../components/project/project";
import { createDelConfirmationUI } from "../components/delConfirmation/delConfirmation";
import * as displayController from "../displayController/displayController";
import * as domController from "../domController/domController";
import { createNavbarUI } from "../components/navbar/navbar";
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

  // let todoItemSample = todoItemFactory(false, "Test", "Notes", "2022-11-12", "low")

  // container.append(createTodoDetailsUI(todoItemSample));

  // container.append(createFormUI("add", null, null));

  // container.append(createProjectUI({getTitle() {return "sampleTitle"}}));

  // domController.appendToRoot(createDelConfirmationUI());

  // displayController.addFilterToElem(container, "blur(4px) brightness(.3)");

  
  // container.append(createTodoItemUI(todoItemSample, app));

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
