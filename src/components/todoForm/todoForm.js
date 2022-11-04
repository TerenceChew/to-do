import "./todoForm.css";
import { setAttributes } from "../../utilityFunctions/utilityFunctions";
import * as domController from "../../domController/domController";
import { todoItemFactory, createTodoItemUI } from "../todoItem/todoItem";
import { projectFactory, createProjectUI } from "../project/project";
import { createHolderBoxUI } from "../holderBox/holderBox";
import * as utilityFunctions from "../../utilityFunctions/utilityFunctions";
import isThisWeek from "date-fns/isThisWeek";

const createFormUI = (app, navbarMode, mode, todoItem, project, projectId) => {
  const box = document.createElement("div");
  const container = document.createElement("div");
  const topContainer = document.createElement("div");
  const todoBtn = document.createElement("button");
  const projectBtn = document.createElement("button");

  box.classList.add("box", "flex", "center");

  container.classList.add("form-container");

  topContainer.classList.add("form-top-container", "flex", "center");

  todoBtn.classList.add("form-todo-btn");
  todoBtn.innerText = mode === "edit-todo" ? "Edit Todo" : "New Todo";

  projectBtn.classList.add("form-project-btn");
  projectBtn.innerText = mode === "edit-project" ? "Edit Project" : "New Project";

  if (mode === "edit-todo") {
    todoBtn.classList.add("border-btm-w", "no-pointer-events");

    topContainer.append(todoBtn);

    container.append(topContainer, createTodoFieldsUI(app, navbarMode, mode, box, todoItem, null, projectId));
    box.append(container);
  } else if (mode === "edit-project") {
    projectBtn.classList.add("border-btm-w", "no-pointer-events");

    topContainer.append(projectBtn);
    container.append(topContainer, createProjectFieldsUI(app, navbarMode, mode, box, project));
    box.append(container);
  } else if (mode === "add-to-project") {
    todoBtn.classList.add("border-btm-w", "no-pointer-events");

    topContainer.append(todoBtn);
    container.append(topContainer, createTodoFieldsUI(app, navbarMode, mode, box, null, project, null));
    box.append(container);
  } else {
    todoBtn.classList.add("border-btm-b");

    topContainer.append(todoBtn, projectBtn);
    container.append(topContainer, createTodoFieldsUI(app, navbarMode, mode, box, null, null, null));
    box.append(container);

    todoBtn.addEventListener("pointerup", () => {
      todoBtn.classList.add("border-btm-b");
      projectBtn.classList.remove("border-btm-b");

      container.lastElementChild.remove();
      container.append(createTodoFieldsUI(app, navbarMode, mode, box, null, null, null));
      box.append(container);
    })

    projectBtn.addEventListener("pointerup", () => {
      todoBtn.classList.remove("border-btm-b");
      projectBtn.classList.add("border-btm-b");

      container.lastElementChild.remove();
      container.append(createProjectFieldsUI(app, navbarMode, mode, box, null));
      box.append(container);
    })
  }

  return box;
}

const createTodoFieldsUI = (app, navbarMode, mode, box, todoItem, project, projectId) => {
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

  // Middle
  middleContainer.classList.add("form-middle-container", "flex-column");
  middleContainer.id = "form";
  middleContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    if (mode === "add") {
      addTodo(app, navbarMode);
    } else if (mode === "edit-todo") {
      editTodo(app, navbarMode, todoItem, projectId);
    } else if (mode === "add-to-project") {
      addToProject(app, project);
    }

    domController.getAppContainer().classList.remove("disabled");
    box.remove();
  });

  titleInput.classList.add("form-title-input");
  titleInput.placeholder = "Enter Title";
  titleInput.innerText = todoItem ? todoItem.getTitle() : "";
  titleInput.setAttribute("maxlength", "50");
  titleInput.required = true;

  notesInput.classList.add("form-notes-input");
  notesInput.placeholder = "Enter Notes";
  notesInput.innerText = todoItem ? todoItem.getNotes() : "";
  notesInput.setAttribute("maxlength", "300");

  dueDateContainer.classList.add("form-due-date-container", "flex-column", "center");

  dueDateLabel.classList.add("form-due-date-label");
  dueDateLabel.innerText = 'Due Date';

  dueDateInput.classList.add("form-due-date-input");
  dueDateInput.type = "date";
  dueDateInput.value = todoItem ? todoItem.getDueDate() : "22-11-11";
  dueDateInput.required = true;

  priorityContainer.classList.add("form-priority-container", "flex-column", "center");

  priorityTitle.classList.add("form-priority-title");
  priorityTitle.innerText = "Priority";

  priorityOptionsContainer.classList.add("form-priority-options-container", "flex");

  setAttributes(lowPriorityInput, {
    type: "radio",
    id: "l-prio",
    value: "low",
    name: "priority",
    required: true,
    checked: todoItem && todoItem.getPriority() === "low" ? true : false
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
    checked: todoItem && todoItem.getPriority() === "medium" ? true : false
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
    checked: todoItem && todoItem.getPriority() === "high" ? true : false
  })
  highPriorityInput.classList.add("form-priority-radio", "hidden");

  highPriorityLabel.setAttribute("for", "h-prio");
  highPriorityLabel.innerText = "High";
  highPriorityLabel.classList.add("form-priority-label", "h-prio-label");

  fieldsContainer.append(middleContainer, createBottomContainerUI(box));
  middleContainer.append(titleInput, notesInput, dueDateContainer, priorityContainer);
  dueDateContainer.append(dueDateLabel, dueDateInput);
  priorityContainer.append(priorityTitle, priorityOptionsContainer);
  priorityOptionsContainer.append(lowPriorityInput, lowPriorityLabel, midPriorityInput, midPriorityLabel, highPriorityInput, highPriorityLabel);

  return fieldsContainer;
}

const createProjectFieldsUI = (app, navbarMode, mode, box, project) => {
  const fieldsContainer = document.createElement("div");
  const middleContainer = document.createElement("form");
  const titleInput = document.createElement("textarea");

  fieldsContainer.classList.add("form-fields-container", "flex-column");

  // Middle
  middleContainer.classList.add("form-middle-container", "flex-column");
  middleContainer.id = "form";
  middleContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    if (mode === "add") {
      addProject(app, navbarMode);
    } else if (mode === "edit-project") {
      editProject(app, navbarMode, project);
    }

    domController.getAppContainer().classList.remove("disabled");
    box.remove();
  });

  titleInput.classList.add("form-title-input");
  titleInput.placeholder = "Enter Title";
  titleInput.innerText = project ? project.getTitle() : "";
  titleInput.setAttribute("maxlength", "50");
  titleInput.required = true;

  fieldsContainer.append(middleContainer, createBottomContainerUI(box));
  middleContainer.append(titleInput);

  return fieldsContainer;
}

const createBottomContainerUI = (box) => {
  const bottomContainer = document.createElement("div");
  const cancelBtn = document.createElement("button");
  const okBtn = document.createElement("button");

  bottomContainer.classList.add("form-bottom-container", "flex", "center");

  cancelBtn.classList.add("form-cancel-btn");
  cancelBtn.innerText = "CANCEL";
  cancelBtn.addEventListener("pointerup", () => {
    box.remove();
    domController.getAppContainer().classList.remove("disabled");
  })

  okBtn.classList.add("form-ok-btn");
  okBtn.innerText = "OK";
  okBtn.setAttribute("form", "form");

  bottomContainer.append(cancelBtn, okBtn);

  return bottomContainer;
}

const getInputValues = () => {
  const titleInput = document.querySelector(".form-title-input");
  const notesInput = document.querySelector(".form-notes-input");
  const dueDateInput = document.querySelector(".form-due-date-input");
  const priorityInput = document.querySelector("input[name='priority']:checked");

  return {
    titleVal: titleInput.value,
    notesVal: notesInput ? notesInput.value : null,
    dueDateVal: dueDateInput ? dueDateInput.value : null,
    priorityVal: priorityInput ? priorityInput.value : null
  };
}

const addTodo = (app, navbarMode) => {
  const todoItem = createTodoItem();

  const { isDueToday, isDueThisWeek } = checkDueDate(todoItem);

  app.pushToTodosArr(todoItem);

  const todosArr = app.getTodosArr();

  renderTodos(app, navbarMode, todosArr, isDueToday, isDueThisWeek, null);
}

const editTodo = (app, navbarMode, todoItem, projectId) => {
  const { titleVal, notesVal, dueDateVal, priorityVal } = getInputValues();

  todoItem.editTitle(titleVal);
  todoItem.editNotes(notesVal);
  todoItem.editDueDate(dueDateVal);
  todoItem.editPriority(priorityVal);

  app.updateTodosArr(todoItem);

  const { isDueToday, isDueThisWeek } = checkDueDate(todoItem);

  if (projectId) {
    const project = app.getProjectsArr().filter(project => project.getId() === projectId)[0];
    const todosArr = project.getTodosArr();

    renderTodos(app, navbarMode, todosArr, null, null, projectId);
  } else {
    const todosArr = app.getTodosArr();

    renderTodos(app, navbarMode, todosArr, isDueToday, isDueThisWeek, null);
  }  
}

const addProject = (app, navbarMode) => {
  const { titleVal } = getInputValues();
  const project = projectFactory(titleVal, []);

  app.pushToProjectsArr(project);

  const projectsArr = app.getProjectsArr();

  renderProjects(app, navbarMode, projectsArr);
}

const editProject = (app, navbarMode, project) => {
  const { titleVal } = getInputValues();

  project.editTitle(titleVal);

  // Update project in app arr
  app.updateProjectsArr(project);

  // Get latest projectsArr & rerender projects
  const projectsArr = app.getProjectsArr();

  renderProjects(app, navbarMode, projectsArr);
}

const checkDueDate = (todoItem) => {
  const today = utilityFunctions.getTodayInYYYYMMDD();
  const processedDueDate = `${todoItem.getDueDate()}T00:00:00`;
  const isDueToday = todoItem.getDueDate() === today;
  const isDueThisWeek = isThisWeek(new Date(processedDueDate), { weekStartsOn: 1 });

  return {
    isDueToday,
    isDueThisWeek
  };
}

const renderTodos = (app, navbarMode, todosArr, isDueToday, isDueThisWeek, projectId) => {
  if (navbarMode === "todos") {
    domController.getContentBox().append(createHolderBoxUI(app, "todos", todosArr, projectId));
  } else if (navbarMode === "day" && isDueToday) {
    domController.getContentBox().append(createHolderBoxUI(app, "day", todosArr, projectId));
  } else if (navbarMode === "week" && isDueThisWeek) {
    domController.getContentBox().append(createHolderBoxUI(app, "week", todosArr, projectId));
  } else if (navbarMode === "projects") {
    domController.getContentBox().append(createHolderBoxUI(app, "todos", todosArr, projectId));
  }
}

const renderProjects = (app, navbarMode, projectsArr) => {
  if (navbarMode === "projects") {
    domController.getContentBox().append(createHolderBoxUI(app, "projects", projectsArr));
  }
}

const addToProject = (app, project) => {
  const todoItem = createTodoItem();

  // Update project obj
  project.pushToTodosArr(todoItem);

  // Update app obj
  app.pushToTodosArr(todoItem);
  app.updateProjectsArr(project);
}

const createTodoItem = () => {
  const { titleVal, notesVal, dueDateVal, priorityVal } = getInputValues();
  return todoItemFactory(false, titleVal, notesVal, dueDateVal, priorityVal);
}

export { createFormUI };
