import "./todoForm.css";
import { setAttributes } from "../../utilityFunctions/utilityFunctions";

const createFormUI = () => {
  const container = document.createElement("div");
  const topContainer = document.createElement("div");
  const todoBtn = document.createElement("button");
  const projectBtn = document.createElement("button");

  container.classList.add("form-container");

  topContainer.classList.add("form-top-container", "flex", "center");

  todoBtn.classList.add("form-todo-btn");
  todoBtn.innerText = "Todo";
  todoBtn.addEventListener("pointerdown", () => {
    todoBtn.style.borderBottom = "6px solid black";
    projectBtn.style.borderBottom = "6px solid white";
    container.lastElementChild.remove();
    container.append(createTodoFieldsUI());
  })

  projectBtn.classList.add("form-project-btn");
  projectBtn.innerText = "Project";
  projectBtn.addEventListener("pointerdown", () => {
    projectBtn.style.borderBottom = "6px solid black";
    todoBtn.style.borderBottom = "6px solid white";
    container.lastElementChild.remove();
    container.append(createProjectFieldsUI());
  })

  container.append(topContainer, createTodoFieldsUI());
  topContainer.append(todoBtn, projectBtn);

  return container;
}

const createTodoFieldsUI = () => {
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
  const bottomContainer = document.createElement("div");
  const cancelBtn = document.createElement("button");
  const addBtn = document.createElement("button");

  fieldsContainer.classList.add("form-fields-container", "flex-column");

  // Middle
  middleContainer.classList.add("form-middle-container", "flex-column");

  titleInput.classList.add("form-title-input");
  titleInput.placeholder = "Enter Title";
  titleInput.setAttribute("maxlength", "50");

  notesInput.classList.add("form-notes-input");
  notesInput.placeholder = "Enter Notes";
  notesInput.setAttribute("maxlength", "300");

  dueDateContainer.classList.add("form-due-date-container", "flex-column", "center");

  dueDateLabel.classList.add("form-due-date-label");
  dueDateLabel.innerText = 'Due Date';

  dueDateInput.classList.add("form-due-date-input");
  dueDateInput.type = "date";

  priorityContainer.classList.add("form-priority-container", "flex-column", "center");

  priorityTitle.classList.add("form-priority-title");
  priorityTitle.innerText = "Priority";

  priorityOptionsContainer.classList.add("form-priority-options-container", "flex");

  setAttributes(lowPriorityInput, {
    type: "radio",
    id: "l-prio",
    value: "low",
    name: "priority",
    required: true
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
    required: true
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
    required: true
  })
  highPriorityInput.classList.add("form-priority-radio", "hidden");

  highPriorityLabel.setAttribute("for", "h-prio");
  highPriorityLabel.innerText = "High";
  highPriorityLabel.classList.add("form-priority-label", "h-prio-label");

  // Bottom
  bottomContainer.classList.add("form-bottom-container", "flex", "center");
  
  cancelBtn.classList.add("form-cancel-btn");
  cancelBtn.innerText = "CANCEL";

  addBtn.classList.add("form-add-btn");
  addBtn.innerText = "ADD";

  fieldsContainer.append(middleContainer, bottomContainer);
  middleContainer.append(titleInput, notesInput, dueDateContainer, priorityContainer);
  dueDateContainer.append(dueDateLabel, dueDateInput);
  priorityContainer.append(priorityTitle, priorityOptionsContainer);
  priorityOptionsContainer.append(lowPriorityInput, lowPriorityLabel, midPriorityInput, midPriorityLabel, highPriorityInput, highPriorityLabel);
  bottomContainer.append(cancelBtn, addBtn);

  return fieldsContainer;
}

const createProjectFieldsUI = () => {
  const fieldsContainer = document.createElement("div");
  const middleContainer = document.createElement("div");
  const titleInput = document.createElement("textarea");
  const bottomContainer = document.createElement("div");
  const cancelBtn = document.createElement("button");
  const addBtn = document.createElement("button");

  fieldsContainer.classList.add("form-fields-container", "flex-column");

  // Middle
  middleContainer.classList.add("form-middle-container", "flex-column");

  titleInput.classList.add("form-title-input");
  titleInput.placeholder = "Enter Title";
  titleInput.setAttribute("maxlength", "50");

  // Bottom
  bottomContainer.classList.add("form-bottom-container", "flex", "center");
  
  cancelBtn.classList.add("form-cancel-btn");
  cancelBtn.innerText = "CANCEL";

  addBtn.classList.add("form-add-btn");
  addBtn.innerText = "ADD";

  fieldsContainer.append(middleContainer, bottomContainer);
  middleContainer.append(titleInput);
  bottomContainer.append(cancelBtn, addBtn);

  return fieldsContainer;
}

export { createFormUI };