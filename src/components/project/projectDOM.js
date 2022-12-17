import "./project.css";
import plusIcon from "./assets/plus.svg";
import penIcon from "./assets/pencil-outline.svg";
import deleteIcon from "./assets/delete.svg";
import createFormUI from "../form/formDOM";
import createDelConfirmationUI from "../delConfirmation/delConfirmationDOM";
import createHolderBoxUI from "../holderBox/holderBoxDOM";
import * as domController from "../../modules/domController/domController";

const createProjectUI = (project, app) => {
  const container = document.createElement("div");
  const title = document.createElement("p");
  const addIcon = document.createElement("img");
  const editIcon = document.createElement("img");
  const trashIcon = document.createElement("img");

  container.classList.add(
    "project-container",
    "flex",
    "center",
    "animate-appear"
  );
  container.dataset.id = project.getId();
  container.addEventListener("pointerup", (e) => {
    handleContainerClick({ e, app, container, project });
  });

  title.classList.add("project-title");
  title.innerText = project.getTitle();

  addIcon.classList.add("project-add-icon");
  addIcon.src = plusIcon;
  addIcon.addEventListener("pointerup", (e) => {
    handleAddIconClick({ e, app, project });
  });

  editIcon.classList.add("project-edit-icon");
  editIcon.src = penIcon;
  editIcon.addEventListener("pointerup", (e) => {
    handleEditIconClick({ e, app, project });
  });

  trashIcon.classList.add("project-trash-icon");
  trashIcon.src = deleteIcon;
  trashIcon.addEventListener("pointerup", (e) => {
    handleTrashIconClick({ e, app, container, project });
  });

  container.append(title, addIcon, editIcon, trashIcon);

  return container;
};

const handleContainerClick = ({ e, app, container, project }) => {
  e.stopPropagation();

  const todosArr = project.getTodosArr();
  const projectId = container.dataset.id;

  domController
    .getContentBox()
    .append(
      createHolderBoxUI({ app, mode: "todos", arr: todosArr, projectId })
    );
};

const handleAddIconClick = ({ e, app, project }) => {
  e.stopPropagation();

  const objs = { app, project, todo: null };
  const modes = { navbarMode: null, formMode: "add-to-project" };

  domController.appendToRoot(createFormUI({ objs, modes, projectId: null }));
  domController.getAppContainer().classList.add("disabled");
};

const handleEditIconClick = ({ e, app, project }) => {
  e.stopPropagation();

  const navbarMode = document.querySelector(".navbar-container[data-mode]")
    .dataset.mode;
  const objs = { app, project, todo: null };
  const modes = { navbarMode, formMode: "edit-project" };

  domController.appendToRoot(createFormUI({ objs, modes, projectId: null }));
  domController.getAppContainer().classList.add("disabled");
};

const handleTrashIconClick = ({ e, app, container, project }) => {
  e.stopPropagation();

  domController.appendToRoot(
    createDelConfirmationUI(app, "project", project, container)
  );
  domController.getAppContainer().classList.add("disabled");
};

export default createProjectUI;
