import "./todoDetails.css";

const createTodoDetailsUI = ({ getPriority, getDueDate, getTitle, getNotes }) => {
  const container = document.createElement("div");
  const topContainer = document.createElement("div");
  const bottomContainer = document.createElement("div");
  const priority = document.createElement("div");
  const dueDate = document.createElement("p");
  const title = document.createElement("p");
  const notes = document.createElement("p");
  const closeBtn = document.createElement("button");

  container.classList.add("details-container");

  topContainer.classList.add("details-top-container", "flex");

  bottomContainer.classList.add("details-bottom-container");

  priority.classList.add("details-priority", "flex", "center");
  priority.innerText = getPriority();

  dueDate.classList.add("details-due-date", "flex", "center");
  dueDate.innerText = `Due: ${getDueDate()}`;

  title.classList.add("details-title");
  title.innerText = getTitle();

  notes.classList.add("details-notes");
  notes.innerText = getNotes();

  closeBtn.classList.add("details-close-btn");
  closeBtn.innerText = "CLOSE";
  closeBtn.addEventListener("click", () => {
    container.remove();
  })

  topContainer.append(priority, dueDate);
  bottomContainer.append(title, notes, closeBtn);
  container.append(topContainer, bottomContainer);

  return container;
}

export { createTodoDetailsUI };