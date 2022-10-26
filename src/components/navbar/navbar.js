import "./navbar.css";

const createNavbarUI = () => {
  const container = document.createElement("div");
  const todosBtn = document.createElement("div");
  const projectsBtn = document.createElement("div");
  const dayBtn = document.createElement("div");
  const weekBtn = document.createElement("div");
  const plusBtn = document.createElement("div");

  container.classList.add("navbar-container", "flex");

  todosBtn.classList.add("navbar-btn", "navbar-btn-grp-1", "navbar-todos-btn", "flex");
  todosBtn.addEventListener("pointerdown", handleBtnUI);

  projectsBtn.classList.add("navbar-btn", "navbar-btn-grp-1", "navbar-projects-btn", "flex");
  projectsBtn.addEventListener("pointerdown", handleBtnUI);

  dayBtn.classList.add("navbar-btn", "navbar-btn-grp-1", "navbar-day-btn", "flex");
  dayBtn.addEventListener("pointerdown", handleBtnUI);

  weekBtn.classList.add("navbar-btn", "navbar-btn-grp-1", "navbar-week-btn", "flex");
  weekBtn.addEventListener("pointerdown", handleBtnUI);

  plusBtn.classList.add("navbar-btn", "navbar-btn-grp-2", "navbar-plus-btn", "flex");
  plusBtn.title = "Add New";
  plusBtn.innerText = "+";

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
    console.log(window.innerWidth);
  }

  updateBtnsText();

  window.onresize = updateBtnsText;

  container.append(todosBtn, projectsBtn, dayBtn, weekBtn, plusBtn);

  return container;
}

export { createNavbarUI };