const getAppContainer = () => {
  return document.querySelector(".app-container");
}

const getHolderBox = () => {
  return document.querySelector(".holder-box-container");
}

const getContentBox = () => {
  return document.querySelector(".content-box-container");
}

const appendToRoot = (elem) => {
  const root = document.querySelector("#root");

  root.append(elem);
}

const appendToHolderBox = (elem) => {
  const holderBox = document.querySelector(".holder-box-container");

  holderBox.append(elem);
}



export { getAppContainer, appendToRoot, appendToHolderBox, getContentBox };