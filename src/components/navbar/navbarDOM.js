/* eslint-disable no-param-reassign */
import "./navbar.css";
import createFormUI from "../form/formDOM";
import * as domController from "../../modules/domController/domController";
import * as utilityFunctions from "../../modules/utilityFunctions/utilityFunctions";
import createHolderBoxUI from "../holderBox/holderBoxDOM";
import todosIcon from "./assets/check-list.png";
import projectsIcon from "./assets/folder.png";
import dayIcon from "./assets/daily-calendar.png";
import weekIcon from "./assets/weekly-calendar.png";

const createNavbarUI = (app) => {
  const container = document.createElement("div");
  const todosBtn = document.createElement("div");
  const projectsBtn = document.createElement("div");
  const dayBtn = document.createElement("div");
  const weekBtn = document.createElement("div");
  const plusBtn = document.createElement("div");

  container.classList.add("navbar-container", "flex");
  container.dataset.mode = "todos";

  todosBtn.classList.add(
    "navbar-btn",
    "navbar-btn-grp-1",
    "navbar-todos-btn",
    "flex",
    "navbar-btn-selected"
  );
  todosBtn.dataset.count = app.getTodosArr().length;
  todosBtn.addEventListener("pointerup", (e) => {
    handleTodosBtnClick({ e, app, container });
  });

  projectsBtn.classList.add(
    "navbar-btn",
    "navbar-btn-grp-1",
    "navbar-projects-btn",
    "flex"
  );
  projectsBtn.dataset.count = app.getProjectsArr().length;
  projectsBtn.addEventListener("pointerup", (e) => {
    handleProjectsBtnClick({ e, app, container });
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
    handleDayBtnClick({ e, app, container });
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
    handleWeekBtnClick({ e, app, container });
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
    handlePlusBtnClick(app, container.dataset.mode);
  });

  setUpBtnsUI(container, [todosBtn, projectsBtn, dayBtn, weekBtn]);

  container.append(todosBtn, projectsBtn, dayBtn, weekBtn, plusBtn);

  return container;
};

const handleTodosBtnClick = ({ e, app, container }) => {
  handleBtnClickUI(e);
  container.dataset.mode = "todos";

  const todosArr = app.getTodosArr();

  domController.getContentBox().append(
    createHolderBoxUI({
      app,
      mode: "todos",
      arr: todosArr,
      projectId: null,
    })
  );
};

const handleProjectsBtnClick = ({ e, app, container }) => {
  handleBtnClickUI(e);
  container.dataset.mode = "projects";

  const projectsArr = app.getProjectsArr();

  domController.getContentBox().append(
    createHolderBoxUI({
      app,
      mode: "projects",
      arr: projectsArr,
      projectId: null,
    })
  );
};

const handleDayBtnClick = ({ e, app, container }) => {
  handleBtnClickUI(e);
  container.dataset.mode = "day";

  const todosArr = app.getTodosArr();
  const todosDueToday = utilityFunctions.getObjsDueToday(todosArr);

  domController.getContentBox().append(
    createHolderBoxUI({
      app,
      mode: "day",
      arr: todosDueToday,
      projectId: null,
    })
  );
};

const handleWeekBtnClick = ({ e, app, container }) => {
  handleBtnClickUI(e);
  container.dataset.mode = "week";

  const todosArr = app.getTodosArr();
  const todosDueThisWeek = utilityFunctions.getObjsDueThisWeek(todosArr);

  domController.getContentBox().append(
    createHolderBoxUI({
      app,
      mode: "week",
      arr: todosDueThisWeek,
      projectId: null,
    })
  );
};

const handlePlusBtnClick = (app, navbarMode) => {
  const objs = { app, todo: null, project: null };
  const modes = { navbarMode, formMode: "add" };

  domController.appendToRoot(createFormUI({ objs, modes, projectId: null }));
  domController.getAppContainer().classList.add("disabled");
};

const handleBtnClickUI = (e) => {
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

const changeBtnsToIcons = (btnsArr) => {
  const iconsArr = [todosIcon, projectsIcon, dayIcon, weekIcon];
  const iconsNameArr = ["Todos Icon", "Projects Icon", "Day Icon", "Week Icon"];

  btnsArr.forEach((btn, i) => {
    btn.innerText = "";
    const icon = document.createElement("img");

    icon.classList.add("navbar-btn-icon");
    icon.src = iconsArr[i];
    icon.alt = iconsNameArr[i];

    btn.append(icon);
  });
};

const changeBtnsToTexts = (btnsArr) => {
  const [todosBtn, projectsBtn, dayBtn, weekBtn] = btnsArr;

  todosBtn.innerText = "Todos";
  projectsBtn.innerText = "Projects";
  dayBtn.innerText = "Day";
  weekBtn.innerText = "Week";
};

const determineBtnsType = (btnsArr, navbarContainer) => {
  if (window.innerWidth < 650) {
    changeBtnsToIcons(btnsArr);

    btnsArr.forEach((btn) => btn.classList.add("animate-btn-appear"));

    navbarContainer.classList.add("animate-navbar-move-in");
  } else {
    changeBtnsToTexts(btnsArr);

    btnsArr.forEach((btn) => btn.classList.remove("animate-btn-appear"));

    navbarContainer.classList.remove("animate-navbar-move-in");
  }
};

const setUpBtnsUI = (container, btnsArr) => {
  determineBtnsType(btnsArr, container);

  window.onresize = () => determineBtnsType(btnsArr, container);
};

// For updating Todos & Projects total
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

export {
  createNavbarUI,
  updateTodosTotal,
  updateProjectsTotal,
  updateDayTotal,
  updateWeekTotal,
};
