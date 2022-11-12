/* eslint-disable no-param-reassign */
import "./navbar.css";
import { createFormUI } from "../todoForm/todoForm";
import * as domController from "../../modules/domController/domController";
import * as utilityFunctions from "../../modules/utilityFunctions/utilityFunctions";
import createHolderBoxUI from "../holderBox/holderBox";
import todosIcon from "./check-list.png";
import projectsIcon from "./folder.png";
import dayIcon from "./daily-calendar.png";
import weekIcon from "./weekly-calendar.png";

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

  todosBtn.classList.add(
    "navbar-btn",
    "navbar-btn-grp-1",
    "navbar-todos-btn",
    "flex",
    "navbar-btn-selected"
  );
  todosBtn.dataset.count = app.getTodosArr().length;
  todosBtn.addEventListener("pointerup", (e) => {
    handleBtnUI(e);
    updateNavbarMode("todos");

    const todosArr = app.getTodosArr();
    console.log("todosArr:", todosArr);
    domController
      .getContentBox()
      .append(createHolderBoxUI(app, "todos", todosArr, null));
  });

  projectsBtn.classList.add(
    "navbar-btn",
    "navbar-btn-grp-1",
    "navbar-projects-btn",
    "flex"
  );
  projectsBtn.dataset.count = app.getProjectsArr().length;
  projectsBtn.addEventListener("pointerup", (e) => {
    handleBtnUI(e);
    updateNavbarMode("projects");

    const projectsArr = app.getProjectsArr();
    console.log("projectsArr:", projectsArr);
    domController
      .getContentBox()
      .append(createHolderBoxUI(app, "projects", projectsArr));
  });

  dayBtn.classList.add(
    "navbar-btn",
    "navbar-btn-grp-1",
    "navbar-day-btn",
    "flex"
  );
  dayBtn.dataset.count = utilityFunctions.getObjsDueToday(
    app.getTodosArr()
  ).length;
  dayBtn.addEventListener("pointerup", (e) => {
    handleBtnUI(e);
    updateNavbarMode("day");

    const todosArr = app.getTodosArr();
    console.log("todosArr:", todosArr);
    domController
      .getContentBox()
      .append(createHolderBoxUI(app, navbarMode, todosArr, null));
  });

  weekBtn.classList.add(
    "navbar-btn",
    "navbar-btn-grp-1",
    "navbar-week-btn",
    "flex"
  );
  weekBtn.dataset.count = utilityFunctions.getObjsDueThisWeek(
    app.getTodosArr()
  ).length;
  weekBtn.addEventListener("pointerup", (e) => {
    handleBtnUI(e);
    updateNavbarMode("week");

    const todosArr = app.getTodosArr();
    console.log("todosArr:", todosArr);
    domController
      .getContentBox()
      .append(createHolderBoxUI(app, navbarMode, todosArr, null));
  });

  plusBtn.classList.add(
    "navbar-btn",
    "navbar-btn-grp-2",
    "navbar-plus-btn",
    "flex"
  );
  plusBtn.title = "Add New";
  plusBtn.innerText = "+";
  plusBtn.addEventListener("pointerup", () => {
    domController.appendToRoot(
      createFormUI(app, navbarMode, "add", null, null, null)
    );
    domController.getAppContainer().classList.add("disabled");
  });

  function updateNavbarMode(newMode) {
    navbarMode = newMode;
    container.dataset.mode = navbarMode;
  }

  const btnsArr = [todosBtn, projectsBtn, dayBtn, weekBtn];

  updateBtns(btnsArr, container);
  window.onresize = () => updateBtns(btnsArr, container);

  container.append(todosBtn, projectsBtn, dayBtn, weekBtn, plusBtn);

  return container;
};

const updateTodosTotal = (app) => {
  const todosBtn = document.querySelector(".navbar-todos-btn");
  todosBtn.dataset.count = app.getTodosArr().length;
};

const updateProjectsTotal = (app) => {
  const projectsBtn = document.querySelector(".navbar-projects-btn");
  projectsBtn.dataset.count = app.getProjectsArr().length;
};

const updateDayTotal = (app) => {
  const dayBtn = document.querySelector(".navbar-day-btn");
  dayBtn.dataset.count = utilityFunctions.getObjsDueToday(
    app.getTodosArr()
  ).length;
};

const updateWeekTotal = (app) => {
  const weekBtn = document.querySelector(".navbar-week-btn");
  weekBtn.dataset.count = utilityFunctions.getObjsDueThisWeek(
    app.getTodosArr()
  ).length;
};

const changeBtnsToIcons = (todosBtn, projectsBtn, dayBtn, weekBtn) => {
  todosBtn.innerText = "";
  projectsBtn.innerText = "";
  dayBtn.innerText = "";
  weekBtn.innerText = "";

  const iconsArr = [todosIcon, projectsIcon, dayIcon, weekIcon];
  const btnsArr = [todosBtn, projectsBtn, dayBtn, weekBtn];

  btnsArr.forEach((btn, i) => {
    const icon = document.createElement("img");

    icon.classList.add("navbar-btn-icon");
    icon.src = iconsArr[i];

    btn.append(icon);
  });
};

const changeBtnsToTexts = (todosBtn, projectsBtn, dayBtn, weekBtn) => {
  todosBtn.innerText = "Todos";
  projectsBtn.innerText = "Projects";
  dayBtn.innerText = "Day";
  weekBtn.innerText = "Week";
};

const updateBtns = (btnsArr, container) => {
  if (window.innerWidth < 650) {
    changeBtnsToIcons(...btnsArr);

    btnsArr.forEach((btn) => btn.classList.add("animate-appear"));

    container.classList.add("animate-move-in");
  } else {
    changeBtnsToTexts(...btnsArr);

    btnsArr.forEach((btn) => btn.classList.remove("animate-appear"));

    container.classList.remove("animate-move-in");
  }
};

const handleBtnUI = (e) => {
  document.querySelectorAll(".navbar-btn-grp-1").forEach((e) => {
    e.classList.remove("navbar-btn-selected");
  });

  document.querySelectorAll(".navbar-btn-icon").forEach((e) => {
    e.classList.remove("navbar-btn-selected");
  });

  if (e.target.classList.contains("navbar-btn-icon")) {
    e.target.parentElement.classList.add("navbar-btn-selected");
  }

  e.target.classList.add("navbar-btn-selected");
};

export {
  createNavbarUI,
  updateTodosTotal,
  updateProjectsTotal,
  updateDayTotal,
  updateWeekTotal,
};
