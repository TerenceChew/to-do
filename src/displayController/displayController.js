const blurElem = (elem) => {
  elem.style.filter = "blur(4px)";
}

const getAppContainer = () => {
  return document.querySelector(".app-container");
}

export { blurElem, getAppContainer };