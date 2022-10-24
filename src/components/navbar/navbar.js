import "./navbar.css";

const createNavbarUI = () => {
  const container = document.createElement("div");
  const todosBtn = document.createElement("div");
  const projectsBtn = document.createElement("div");
  const dayBtn = document.createElement("div");
  const weekBtn = document.createElement("div");
  const plusBtn = document.createElement("div");

  container.classList.add("navbar-container", "flex");

  todosBtn.classList.add("navbar-btn", "navbar-todos-btn", "flex");

  projectsBtn.classList.add("navbar-btn", "navbar-projects-btn", "flex");

  dayBtn.classList.add("navbar-btn", "navbar-day-btn", "flex");

  weekBtn.classList.add("navbar-btn", "navbar-week-btn", "flex");

  plusBtn.classList.add("navbar-btn", "navbar-plus-btn", "flex");
  plusBtn.innerText = "+";

  const updateBtnsText = () => {
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
    console.log(window.innerWidth);
  }

  updateBtnsText();

  window.onresize = updateBtnsText;

  container.append(todosBtn, projectsBtn, dayBtn, weekBtn, plusBtn);

  return container;
}

export { createNavbarUI };