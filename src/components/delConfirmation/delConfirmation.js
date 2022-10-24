import "./delConfirmation.css";

const createDelConfirmationUI = () => {
  const container = document.createElement("div");
  const confirmationMsg = document.createElement("p");
  const btnsContainer = document.createElement("div");
  const noBtn = document.createElement("button");
  const yesBtn = document.createElement("button");

  container.classList.add("del-confirmation-container", "flex-column", "center");

  confirmationMsg.classList.add("del-confirmation-msg");
  confirmationMsg.innerText = "Confirm Delete?";

  btnsContainer.classList.add("del-confirmation-btns-container", "flex", "center");

  noBtn.classList.add("del-confirmation-no-btn");
  noBtn.innerText = "NO";

  yesBtn.classList.add("del-confirmation-yes-btn");
  yesBtn.innerText = "YES";

  container.append(confirmationMsg, btnsContainer);
  btnsContainer.append(noBtn, yesBtn);

  return container;
}

export { createDelConfirmationUI };