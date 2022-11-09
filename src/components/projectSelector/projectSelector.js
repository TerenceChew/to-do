import "./projectSelector.css";
import * as domController from "../../modules/domController/domController";
import { updateLocalStorage } from "../../modules/utilityFunctions/utilityFunctions";

const createProjectSelectorUI = (app, todoItem) => {
  const container = document.createElement("div");
  const title = document.createElement("p");
  const projectsBox = document.createElement("div");
  const btnsContainer = document.createElement("div");
  const cancelBtn = document.createElement("button");
  const okBtn = document.createElement("button");

  container.classList.add("project-selector-container");

  title.classList.add("project-selector-title", "flex", "center");
  title.innerText = "Add To Project";

  projectsBox.classList.add("project-selector-projects-box", "flex-column");

  btnsContainer.classList.add("project-selector-btns-container", "flex", "center");

  cancelBtn.classList.add("project-selector-cancel-btn");
  cancelBtn.innerText = "CANCEL";
  cancelBtn.addEventListener("pointerup", () => {
    container.remove();
    domController.getAppContainer().classList.remove("disabled");
  })

  okBtn.classList.add("project-selector-ok-btn");
  okBtn.innerText = "OK";
  okBtn.addEventListener("pointerup", () => {
    const selectedProjects = Array.from(document.querySelectorAll(".project-option.selected"));

    if (!selectedProjects.length) {
      domController.getAppContainer().classList.remove("disabled");
      container.remove();
      return;
    }

    const selectedProjectsId = selectedProjects.map(project => project.dataset.id);
    console.log("ids:", selectedProjectsId);

    selectedProjectsId.forEach(id => {
      app.getProjectsArr().forEach(project => {
        if (id === project.getId()) {
          project.pushToTodosArr(todoItem);
        }
      })
    });

    updateLocalStorage(app);
    domController.getAppContainer().classList.remove("disabled");
    container.remove();
  })

  const filteredProjects = app.getProjectsArr().filter(project => {
    return project.getTodosArr().every(todo => todo.getId() !== todoItem.getId());
  });

  const projectOptionUIs = filteredProjects.map(project => createProjectOptionUI(project));

  if (!projectOptionUIs.length) {
    projectsBox.append("No Projects");
  } else {
    projectsBox.append(...projectOptionUIs);
  }

  btnsContainer.append(cancelBtn, okBtn);
  container.append(title, projectsBox, btnsContainer);

  return container;
}

const createProjectOptionUI = (project) => {
  const container = document.createElement("div");
  const title = document.createElement("p");
  const checkbox = document.createElement("div");

  container.classList.add("project-option", "flex", "center");
  container.dataset.id = project.getId();
  container.addEventListener("pointerup", () => {
    container.classList.toggle("selected");
  })

  title.classList.add("project-option-title");
  title.innerText = project.getTitle();

  checkbox.classList.add("project-option-checkbox");

  container.append(title, checkbox);

  return container;
}

export { createProjectSelectorUI };