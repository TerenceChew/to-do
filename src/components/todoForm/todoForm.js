import "./todoForm.css";
import { setAttributes } from "../../utilityFunctions/utilityFunctions";
import * as domController from "../../domController/domController";

import { todoItemFactory, createTodoItemUI } from "../todoItem/todoItem";
// let testTodo = todoItemFactory(false, 'No Title', 'No Notes', '2022-11-12', 'low');

import { projectFactory, createProjectUI } from "../project/project";
let testProject = projectFactory("Test Project", []);


const createFormUI = (mode, todoItem, project) => {
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
    container.append(topContainer, createTodoFieldsUI(box, todoItem));
    box.append(container);
  } else if (mode === "edit-project") {
    projectBtn.classList.add("border-btm-w", "no-pointer-events");

    topContainer.append(projectBtn);
    container.append(topContainer, createProjectFieldsUI(box, project));
    box.append(container);
  } else {
    todoBtn.classList.add("border-btm-b");

    topContainer.append(todoBtn, projectBtn);
    container.append(topContainer, createTodoFieldsUI(box, null));
    box.append(container);

    todoBtn.addEventListener("pointerdown", () => {
      todoBtn.classList.add("border-btm-b");
      projectBtn.classList.remove("border-btm-b");

      container.lastElementChild.remove();
      container.append(createTodoFieldsUI(box, null));
      box.append(container);
    })

    projectBtn.addEventListener("pointerdown", () => {
      todoBtn.classList.remove("border-btm-b");
      projectBtn.classList.add("border-btm-b");

      container.lastElementChild.remove();
      container.append(createProjectFieldsUI(box, null));
      box.append(container);
    })
  }

  return box;
}

const createTodoFieldsUI = (box, todoItem) => {
  const fieldsContainer = document.createElement("div");
  const middleContainer = document.createElement("div");
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

  titleInput.classList.add("form-title-input");
  titleInput.placeholder = "Enter Title";
  titleInput.innerText = todoItem ? todoItem.getTitle() : "";
  titleInput.setAttribute("maxlength", "50");

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

const createProjectFieldsUI = (box, project) => {
  const fieldsContainer = document.createElement("div");
  const middleContainer = document.createElement("div");
  const titleInput = document.createElement("textarea");

  fieldsContainer.classList.add("form-fields-container", "flex-column");

  // Middle
  middleContainer.classList.add("form-middle-container", "flex-column");

  titleInput.classList.add("form-title-input");
  titleInput.placeholder = "Enter Title";
  titleInput.innerText = project ? project.getTitle() : "";
  titleInput.setAttribute("maxlength", "50");

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
  cancelBtn.addEventListener("pointerdown", () => {
    box.remove();
    domController.getAppContainer().classList.remove("disabled");
  })

  okBtn.classList.add("form-ok-btn");
  okBtn.innerText = "OK";

  bottomContainer.append(cancelBtn, okBtn);

  return bottomContainer;
}

export { createFormUI };