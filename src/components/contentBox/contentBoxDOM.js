import "./contentBox.css";
import { createNavbarUI } from "../navbar/navbarDOM";
import createHolderBoxUI from "../holderBox/holderBoxDOM";

const createContentBoxUI = (app) => {
  const container = document.createElement("div");
  const titleIcon = document.createElement("span");
  const title = document.createElement("h1");

  container.classList.add("content-box-container");

  titleIcon.classList.add("material-symbols-outlined");
  titleIcon.append("checklist");

  title.classList.add("content-box-title", "flex");

  title.append(titleIcon, "To-Do");

  container.append(
    title,
    createNavbarUI(app),
    createHolderBoxUI({
      app,
      mode: "todos",
      arr: app.getTodosArr(),
      projectId: null,
    })
  );

  return container;
};

export default createContentBoxUI;
