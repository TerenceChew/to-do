import "./delConfirmation.css";
import * as domController from "../../modules/domController/domController";
import { updateLocalStorage } from "../../modules/utilityFunctions/utilityFunctions";
import {
  updateTodosTotal,
  updateProjectsTotal,
  updateDayTotal,
  updateWeekTotal,
} from "../navbar/navbar";

const createDelConfirmationUI = (app, type, obj, objUI) => {
  const container = document.createElement("div");
  const confirmationMsg = document.createElement("p");
  const btnsContainer = document.createElement("div");
  const noBtn = document.createElement("button");
  const yesBtn = document.createElement("button");

  container.classList.add(
    "del-confirmation-container",
    "flex-column",
    "center",
    "animate-box-appear"
  );

  confirmationMsg.classList.add("del-confirmation-msg");
  confirmationMsg.innerText = "Confirm Delete?";

  btnsContainer.classList.add(
    "del-confirmation-btns-container",
    "flex",
    "center"
  );

  noBtn.classList.add("del-confirmation-no-btn");
  noBtn.innerText = "NO";
  noBtn.addEventListener("pointerup", () => {
    removeContainer(container);
  });

  yesBtn.classList.add("del-confirmation-yes-btn");
  yesBtn.innerText = "YES";
  yesBtn.addEventListener("pointerup", () => {
    if (type === "todo") {
      app.removeFromTodosArr(obj.getId());

      app.getProjectsArr().forEach((project) => {
        project.removeFromTodosArr(obj.getId());
      });
    } else if (type === "project") {
      obj.getTodosArr().forEach((todo) => {
        app.removeFromTodosArr(todo.getId());
      });

      app.removeFromProjectsArr(obj.getId());
    }

    updateLocalStorage(app);
    updateNavbarTotals(app);
    objUI.classList.add("animate-delete");
    setTimeout(() => {
      objUI.remove();
    }, 1250);
    removeContainer(container);
  });

  btnsContainer.append(noBtn, yesBtn);
  container.append(confirmationMsg, btnsContainer);

  return container;
};

const removeContainer = (container) => {
  container.remove();
  domController.getAppContainer().classList.remove("disabled");
};

const updateNavbarTotals = (app) => {
  updateTodosTotal(app);
  updateProjectsTotal(app);
  updateDayTotal(app);
  updateWeekTotal(app);
};

export default createDelConfirmationUI;
