const getAppContainer = () => {
  return document.querySelector(".app-container");
}

const appendToRoot = (elem) => {
  const root = document.querySelector("#root");

  root.append(elem);
}

const appendToHolderBox = (elemsArr) => {
  const holderBox = document.querySelector(".holder-box-container");
}

export { getAppContainer, appendToRoot };