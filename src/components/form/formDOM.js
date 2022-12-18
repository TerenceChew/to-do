import "./form.css";
import * as formLogic from "./formLogic";
import { setAttributes } from "../../modules/utilityFunctions/utilityFunctions";
import * as domController from "../../modules/domController/domController";
import createHolderBoxUI from "../holderBox/holderBoxDOM";
import * as utilityFunctions from "../../modules/utilityFunctions/utilityFunctions";
import {
  updateTodosTotal,
  updateProjectsTotal,
  updateDayTotal,
  updateWeekTotal,
} from "../navbar/navbarDOM";

// Form consists of 3 parts (Top, Middle, Bottom)
// Middle part can either be todoFields or projectFields
const createFormUI = ({ objs, modes, projectId }) => {
  // Variables
  const { app, todo, project } = objs;
  const { navbarMode, formMode } = modes;

  // Elements
  const formHolder = document.createElement("div");
  const container = document.createElement("div");
  const topContainer = createTopContainerUI();
  const todoBtn = document.createElement("button");
  const projectBtn = document.createElement("button");

  formHolder.classList.add("form-holder", "flex", "center", "animate-appear");

  container.classList.add("form-container");

  todoBtn.classList.add("form-todo-btn");
  todoBtn.innerText = formMode === "edit-todo" ? "Edit Todo" : "New Todo";

  projectBtn.classList.add("form-project-btn");
  projectBtn.innerText =
    formMode === "edit-project" ? "Edit Project" : "New Project";

  if (formMode === "edit-todo") {
    const objs = { app, todo, project: null };
    const modes = { navbarMode, formMode };
    const elems = { formHolder, container, topContainer, todoBtn };

    createEditTodoFormUI({
      objs,
      modes,
      elems,
      projectId,
    });

    return formHolder;
  }

  if (formMode === "edit-project") {
    const objs = { app, project };
    const modes = { navbarMode, formMode };
    const elems = { formHolder, container, topContainer, projectBtn };

    createEditProjectFormUI({ objs, modes, elems });

    return formHolder;
  }

  if (formMode === "add-to-project") {
    const objs = { app, project, todo: null };
    const modes = { navbarMode, formMode };
    const elems = { formHolder, container, topContainer, todoBtn };

    createAddToProjectFormUI({ objs, modes, elems });

    return formHolder;
  }

  const o = { app, todo: null, project: null };
  const m = { navbarMode, formMode };
  const e = { formHolder, container, topContainer, todoBtn, projectBtn };

  createDefaultFormUI({ objs: o, modes: m, elems: e });

  return formHolder;
};

const createEditTodoFormUI = ({ objs, modes, elems, projectId }) => {
  const { formHolder, container, topContainer, todoBtn } = elems;

  todoBtn.classList.add("border-btm-w", "no-pointer-events");

  topContainer.append(todoBtn);

  container.append(
    topContainer,
    createTodoFieldsUI({
      objs,
      modes,
      elems: { formHolder },
      projectId,
    })
  );
  formHolder.append(container);
};

const createEditProjectFormUI = ({ objs, modes, elems }) => {
  const { formHolder, container, topContainer, projectBtn } = elems;

  container.classList.add("project-fields-height");
  projectBtn.classList.add("border-btm-w", "no-pointer-events");

  topContainer.append(projectBtn);
  container.append(
    topContainer,
    createProjectFieldsUI({ objs, modes, elems: { formHolder } })
  );
  formHolder.append(container);
};

const createAddToProjectFormUI = ({ objs, modes, elems }) => {
  const { formHolder, container, topContainer, todoBtn } = elems;

  todoBtn.classList.add("border-btm-w", "no-pointer-events");

  topContainer.append(todoBtn);
  container.append(
    topContainer,
    createTodoFieldsUI({
      objs,
      modes,
      elems: { formHolder },
      projectId: null,
    })
  );
  formHolder.append(container);
};

const createDefaultFormUI = ({ objs, modes, elems }) => {
  const { formHolder, container, topContainer, todoBtn, projectBtn } = elems;

  todoBtn.classList.add("border-btm-b");

  topContainer.append(todoBtn, projectBtn);
  container.append(
    topContainer,
    createTodoFieldsUI({ objs, modes, elems: { formHolder }, projectId: null })
  );
  formHolder.append(container);

  todoBtn.addEventListener("pointerup", () => {
    handleTodoBtnClick({ objs, modes, elems });
  });

  projectBtn.addEventListener("pointerup", () => {
    handleProjectBtnClick({ objs, modes, elems });
  });
};

const handleTodoBtnClick = ({ objs, modes, elems }) => {
  const { formHolder, container, todoBtn, projectBtn } = elems;

  container.classList.remove("project-fields-height");
  todoBtn.classList.add("border-btm-b");
  projectBtn.classList.remove("border-btm-b");

  container.lastElementChild.remove();
  container.append(
    createTodoFieldsUI({
      objs,
      modes,
      elems: { formHolder },
      projectId: null,
    })
  );
  formHolder.append(container);
};

const handleProjectBtnClick = ({ objs, modes, elems }) => {
  const { formHolder, container, todoBtn, projectBtn } = elems;

  container.classList.add("project-fields-height");
  todoBtn.classList.remove("border-btm-b");
  projectBtn.classList.add("border-btm-b");

  container.lastElementChild.remove();
  container.append(
    createProjectFieldsUI({ objs, modes, elems: { formHolder } })
  );
  formHolder.append(container);
};

// Top part of form
const createTopContainerUI = () => {
  const container = document.createElement("div");

  container.classList.add("form-top-container", "flex", "center");

  return container;
};

// Middle part of form
const createTodoFieldsUI = ({ objs, modes, elems, projectId }) => {
  // Variables
  const { todo } = objs;
  const { formHolder } = elems;

  // Elements
  const fieldsContainer = document.createElement("div");
  const middleContainer = document.createElement("form");
  const titleInput = document.createElement("textarea");
  const notesInput = document.createElement("textarea");
  const dueDateContainer = document.createElement("div");
  const dueDateLabel = document.createElement("label");
  const dueDateInput = document.createElement("input");
  const priorityContainer = document.createElement("div");
  const priorityTitle = document.createElement("p");
  const priorityOptionsContainer = document.createElement("div");
  const lowPriorityInput = document.createElement("input");
  const lowPriorityLabel = document.createElement("label");
  const midPriorityInput = document.createElement("input");
  const midPriorityLabel = document.createElement("label");
  const highPriorityInput = document.createElement("input");
  const highPriorityLabel = document.createElement("label");

  fieldsContainer.classList.add("form-fields-container", "flex-column");

  middleContainer.classList.add("form-middle-container", "flex-column");
  middleContainer.id = "form";
  middleContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    handleTodoFieldsSubmit({ objs, modes, elems, projectId });
  });

  titleInput.classList.add("form-title-input");
  titleInput.placeholder = "Enter Title";
  titleInput.value = todo ? todo.getTitle() : "";
  titleInput.setAttribute("maxlength", "50");
  titleInput.required = true;

  notesInput.classList.add("form-notes-input");
  notesInput.placeholder = "Enter Notes";
  notesInput.value = todo ? todo.getNotes() : "";
  notesInput.setAttribute("maxlength", "300");

  dueDateContainer.classList.add(
    "form-due-date-container",
    "flex-column",
    "center"
  );

  dueDateLabel.classList.add("form-due-date-label");
  dueDateLabel.innerText = "Due Date";

  dueDateInput.classList.add("form-due-date-input");
  dueDateInput.type = "date";
  dueDateInput.value = todo ? todo.getDueDate() : "22-11-11";
  dueDateInput.required = true;

  priorityContainer.classList.add(
    "form-priority-container",
    "flex-column",
    "center"
  );

  priorityTitle.classList.add("form-priority-title");
  priorityTitle.innerText = "Priority";

  priorityOptionsContainer.classList.add(
    "form-priority-options-container",
    "flex"
  );

  setAttributes(lowPriorityInput, {
    type: "radio",
    id: "l-prio",
    value: "low",
    name: "priority",
    required: true,
    checked: !!(todo && todo.getPriority() === "low"),
  });
  lowPriorityInput.classList.add("form-priority-radio", "hidden");

  lowPriorityLabel.setAttribute("for", "l-prio");
  lowPriorityLabel.innerText = "Low";
  lowPriorityLabel.classList.add("form-priority-label", "l-prio-label");

  setAttributes(midPriorityInput, {
    type: "radio",
    id: "m-prio",
    value: "medium",
    name: "priority",
    required: true,
    checked: !!(todo && todo.getPriority() === "medium"),
  });
  midPriorityInput.classList.add("form-priority-radio", "hidden");

  midPriorityLabel.setAttribute("for", "m-prio");
  midPriorityLabel.innerText = "Medium";
  midPriorityLabel.classList.add("form-priority-label", "m-prio-label");

  setAttributes(highPriorityInput, {
    type: "radio",
    id: "h-prio",
    value: "high",
    name: "priority",
    required: true,
    checked: !!(todo && todo.getPriority() === "high"),
  });
  highPriorityInput.classList.add("form-priority-radio", "hidden");

  highPriorityLabel.setAttribute("for", "h-prio");
  highPriorityLabel.innerText = "High";
  highPriorityLabel.classList.add("form-priority-label", "h-prio-label");

  fieldsContainer.append(middleContainer, createBottomContainerUI(formHolder));
  middleContainer.append(
    titleInput,
    notesInput,
    dueDateContainer,
    priorityContainer
  );
  dueDateContainer.append(dueDateLabel, dueDateInput);
  priorityContainer.append(priorityTitle, priorityOptionsContainer);
  priorityOptionsContainer.append(
    lowPriorityInput,
    lowPriorityLabel,
    midPriorityInput,
    midPriorityLabel,
    highPriorityInput,
    highPriorityLabel
  );

  return fieldsContainer;
};

const handleTodoFieldsSubmit = ({ objs, modes, elems, projectId }) => {
  const { app, todo, project } = objs;
  const { navbarMode, formMode } = modes;
  const { formHolder } = elems;

  if (formMode === "add") {
    addTodo(app, navbarMode);
  } else if (formMode === "edit-todo") {
    editTodo(app, navbarMode, todo, projectId);
  } else if (formMode === "add-to-project") {
    addToProject(app, project);
  }

  domController.getAppContainer().classList.remove("disabled");
  formHolder.remove();
};

// Middle part of form
const createProjectFieldsUI = ({ objs, modes, elems }) => {
  // Variables
  const { project } = objs;
  const { formHolder } = elems;

  // Elements
  const fieldsContainer = document.createElement("div");
  const middleContainer = document.createElement("form");
  const titleInput = document.createElement("textarea");

  fieldsContainer.classList.add("form-fields-container", "flex-column");

  middleContainer.classList.add("form-middle-container", "flex-column");
  middleContainer.id = "form";
  middleContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    handleProjectFieldsSubmit({ objs, modes, elems });
  });

  titleInput.classList.add("form-title-input");
  titleInput.placeholder = "Enter Title";
  titleInput.innerText = project ? project.getTitle() : "";
  titleInput.setAttribute("maxlength", "50");
  titleInput.required = true;

  fieldsContainer.append(middleContainer, createBottomContainerUI(formHolder));
  middleContainer.append(titleInput);

  return fieldsContainer;
};

const handleProjectFieldsSubmit = ({ objs, modes, elems }) => {
  const { app, project } = objs;
  const { navbarMode, formMode } = modes;
  const { formHolder } = elems;

  if (formMode === "add") {
    addProject(app, navbarMode);
  } else if (formMode === "edit-project") {
    editProject(app, project);
  }

  domController.getAppContainer().classList.remove("disabled");
  formHolder.remove();
};

// Bottom part of form
const createBottomContainerUI = (formHolder) => {
  const bottomContainer = document.createElement("div");
  const cancelBtn = document.createElement("button");
  const okBtn = document.createElement("button");

  bottomContainer.classList.add("form-bottom-container", "flex", "center");

  cancelBtn.classList.add("form-cancel-btn");
  cancelBtn.innerText = "CANCEL";
  cancelBtn.addEventListener("pointerup", () => {
    formHolder.remove();
    domController.getAppContainer().classList.remove("disabled");
  });

  okBtn.classList.add("form-ok-btn");
  okBtn.innerText = "OK";
  okBtn.setAttribute("form", "form");

  bottomContainer.append(cancelBtn, okBtn);

  return bottomContainer;
};

const addTodo = (app, navbarMode) => {
  const todo = formLogic.createTodo();
  const { isDueToday, isDueThisWeek } = formLogic.checkTodoDueDate(todo);

  performUpdatesForAddTodo(app, todo);

  if (navbarMode === "projects") return;

  renderLatestTodos({
    app,
    navbarMode,
    isDueToday,
    isDueThisWeek,
    projectId: null,
  });
};

const performUpdatesForAddTodo = (app, todo) => {
  app.pushToTodosArr(todo);

  utilityFunctions.updateLocalStorage(app);

  updateTodosTotal(app);
  updateDayTotal(app);
  updateWeekTotal(app);
};

const editTodo = (app, navbarMode, todo, projectId) => {
  const { titleVal, notesVal, dueDateVal, priorityVal } =
    formLogic.getInputValues();

  todo.editTitle(titleVal);
  todo.editNotes(notesVal);
  todo.editDueDate(dueDateVal);
  todo.editPriority(priorityVal);

  performUpdatesForEditTodo(app, todo);

  const todoEditedWithinProject = !!projectId;

  if (todoEditedWithinProject) {
    const project = utilityFunctions.getProjectWithMatchingId(app, projectId);

    renderProjectLatestTodos({ app, project });
  } else {
    const { isDueToday, isDueThisWeek } = formLogic.checkTodoDueDate(todo);

    renderLatestTodos({
      app,
      navbarMode,
      isDueToday,
      isDueThisWeek,
      projectId: null,
    });
  }
};

const performUpdatesForEditTodo = (app, todo) => {
  app.updateTodosArr(todo);

  utilityFunctions.updateLocalStorage(app);

  updateDayTotal(app);
  updateWeekTotal(app);
};

const addProject = (app, navbarMode) => {
  const project = formLogic.createProject();

  performUpdatesForAddProject(app, project);

  if (navbarMode !== "projects") return;

  renderLatestProjects(app);
};

const performUpdatesForAddProject = (app, project) => {
  app.pushToProjectsArr(project);

  utilityFunctions.updateLocalStorage(app);

  updateProjectsTotal(app);
};

const editProject = (app, project) => {
  const { titleVal } = formLogic.getInputValues();

  project.editTitle(titleVal);

  performUpdatesForEditProject(app, project);

  renderLatestProjects(app);
};

const performUpdatesForEditProject = (app, project) => {
  app.updateProjectsArr(project);

  utilityFunctions.updateLocalStorage(app);
};

const addToProject = (app, project) => {
  const todo = formLogic.createTodo();

  performUpdatesForAddToProject(app, project, todo);
};

const performUpdatesForAddToProject = (app, project, todo) => {
  project.pushToTodosArr(todo);

  app.pushToTodosArr(todo);

  app.updateProjectsArr(project);

  utilityFunctions.updateLocalStorage(app);

  updateTodosTotal(app);
  updateDayTotal(app);
  updateWeekTotal(app);
};

const renderTodosUI = ({
  app,
  navbarMode,
  todosArr,
  isDueToday,
  isDueThisWeek,
  projectId,
}) => {
  let holderBoxUI;

  if (navbarMode === "todos") {
    holderBoxUI = createHolderBoxUI({
      app,
      mode: "todos",
      arr: todosArr,
      projectId,
    });
  } else if (navbarMode === "day" && isDueToday) {
    holderBoxUI = createHolderBoxUI({
      app,
      mode: "day",
      arr: todosArr,
      projectId,
    });
  } else if (navbarMode === "week" && isDueThisWeek) {
    holderBoxUI = createHolderBoxUI({
      app,
      mode: "week",
      arr: todosArr,
      projectId,
    });
  }

  domController.getContentBox().append(holderBoxUI);
};

const renderProjectsUI = ({ app, projectsArr }) => {
  domController.getContentBox().append(
    createHolderBoxUI({
      app,
      mode: "projects",
      arr: projectsArr,
      projectId: null,
    })
  );
};

const renderProjectTodosUI = ({ app, todosArr, projectId }) => {
  domController.getContentBox().append(
    createHolderBoxUI({
      app,
      mode: "todos",
      arr: todosArr,
      projectId,
    })
  );
};

const renderLatestTodos = ({
  app,
  navbarMode,
  isDueToday,
  isDueThisWeek,
  projectId,
}) => {
  const todosArr = app.getTodosArr();

  renderTodosUI({
    app,
    navbarMode,
    todosArr,
    isDueToday,
    isDueThisWeek,
    projectId,
  });
};

const renderProjectLatestTodos = ({ app, project }) => {
  const todosArr = project.getTodosArr();

  renderProjectTodosUI({
    app,
    todosArr,
    projectId: project.getId(),
  });
};

const renderLatestProjects = (app) => {
  const projectsArr = app.getProjectsArr();

  renderProjectsUI({ app, projectsArr });
};

export default createFormUI;
