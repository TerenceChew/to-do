import "./navbar.css";
import { createFormUI } from "../todoForm/todoForm";
import * as domController from "../../domController/domController";
import { createHolderBoxUI } from "../holderBox/holderBox";

const createNavbarUI = (app) => {
  let navbarMode = "todos";
  const container = document.createElement("div");
  const todosBtn = document.createElement("div");
  const projectsBtn = document.createElement("div");
  const dayBtn = document.createElement("div");
  const weekBtn = document.createElement("div");
  const plusBtn = document.createElement("div");

  container.classList.add("navbar-container", "flex");
  container.dataset.mode = navbarMode;

  todosBtn.classList.add("navbar-btn", "navbar-btn-grp-1", "navbar-todos-btn", "flex", "navbar-btn-selected");

  todosBtn.addEventListener("pointerup", (e) => {
    handleBtnUI(e);
    updateNavbarMode("todos");

    const todosArr = app.getTodosArr();
    console.log("todosArr:", todosArr);
    domController.getContentBox().append(createHolderBoxUI(app, "todos", todosArr, null));
  });

  projectsBtn.classList.add("navbar-btn", "navbar-btn-grp-1", "navbar-projects-btn", "flex");
  projectsBtn.addEventListener("pointerup", (e) => {
    handleBtnUI(e);
    updateNavbarMode("projects");

    
    const projectsArr = app.getProjectsArr();
    console.log("projectsArr:", projectsArr);
    domController.getContentBox().append(createHolderBoxUI(app, "projects", projectsArr));
  });

  dayBtn.classList.add("navbar-btn", "navbar-btn-grp-1", "navbar-day-btn", "flex");
  dayBtn.addEventListener("pointerup", (e) => {
    handleBtnUI(e);
    updateNavbarMode("day");
    

    const todosArr = app.getTodosArr();
    console.log("todosArr:", todosArr);
    domController.getContentBox().append(createHolderBoxUI(app, navbarMode, todosArr, null));
  });

  weekBtn.classList.add("navbar-btn", "navbar-btn-grp-1", "navbar-week-btn", "flex");
  weekBtn.addEventListener("pointerup", (e) => {
    handleBtnUI(e);
    updateNavbarMode("week");

    const todosArr = app.getTodosArr();
    console.log("todosArr:", todosArr);
    domController.getContentBox().append(createHolderBoxUI(app, navbarMode, todosArr, null));
  });

  plusBtn.classList.add("navbar-btn", "navbar-btn-grp-2", "navbar-plus-btn", "flex");
  plusBtn.title = "Add New";
  plusBtn.innerText = "+";
  plusBtn.addEventListener("pointerup", () => {
    domController.appendToRoot(createFormUI(app, navbarMode, "add", null, null, null));
    domController.getAppContainer().classList.add("disabled");
  })

  function updateNavbarMode(mode) {
    navbarMode = mode;
    container.dataset.mode = navbarMode;
  }

  function handleBtnUI(e) {
    document.querySelectorAll(".navbar-btn-grp-1").forEach(btn => {
      btn.classList.remove("navbar-btn-selected");
    });

    e.target.classList.add("navbar-btn-selected");
  }

  function updateBtnsText() {
    if (window.innerWidth < 650) {
      todosBtn.innerText = "T";
      projectsBtn.innerText = "P";
      dayBtn.innerText = "D";
      weekBtn.innerText = "W";
    } else {
      todosBtn.innerText = "Todos";
      projectsBtn.innerText = "Projects";
      dayBtn.innerText = "Day";
      weekBtn.innerText = "Week";
    }
    // console.log(window.innerWidth);
  }

  updateBtnsText();

  window.onresize = updateBtnsText;

  container.append(todosBtn, projectsBtn, dayBtn, weekBtn, plusBtn);

  return container;
}

export { createNavbarUI };