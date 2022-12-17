/* eslint-disable no-unused-expressions */
import "./app.css";
import * as appLogic from "./appLogic";
import createContentBoxUI from "../components/contentBox/contentBoxDOM";

const createAppUI = () => {
  const container = document.createElement("div");
  const app = appLogic.appFactory();

  appLogic.setUpApp(app);

  container.classList.add("app-container", "flex-column", "center");

  container.append(createContentBoxUI(app));

  return container;
};

export default createAppUI;
