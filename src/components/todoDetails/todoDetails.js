import "./todoDetails.css";
import * as domController from "../../modules/domController/domController";

const createTodoDetailsUI = ({
  getPriority,
  getDueDate,
  getTitle,
  getNotes,
}) => {
  const container = document.createElement("div");
  const topContainer = document.createElement("div");
  const bottomContainer = document.createElement("div");
  const priority = document.createElement("div");
  const dueDate = document.createElement("p");
  const title = document.createElement("p");
  const notes = document.createElement("p");
  const closeBtn = document.createElement("button");

  container.classList.add("details-container", "animate-box-appear");

  topContainer.classList.add("details-top-container", "flex");

  bottomContainer.classList.add("details-bottom-container");

  priority.classList.add("details-priority", "flex", "center");
  if (getPriority() === "low") {
    priority.classList.add("details-priority-l");
  } else if (getPriority() === "medium") {
    priority.classList.add("details-priority-m");
  } else {
    priority.classList.add("details-priority-h");
  }
  priority.innerText = getPriority()[0].toUpperCase() + getPriority().slice(1);

  dueDate.classList.add("details-due-date", "flex", "center");
  dueDate.innerText = `Due: ${getDueDate()}`;

  title.classList.add("details-title", "flex");
  title.innerText = getTitle();

  notes.classList.add("details-notes", "flex");
  notes.innerText = getNotes() || "No Notes";

  closeBtn.classList.add("details-close-btn");
  closeBtn.innerText = "CLOSE";
  closeBtn.addEventListener("pointerup", () => {
    container.remove();
    domController.getAppContainer().classList.remove("disabled");
  });

  topContainer.append(priority, dueDate);
  bottomContainer.append(title, notes, closeBtn);
  container.append(topContainer, bottomContainer);

  return container;
};

export default createTodoDetailsUI;
