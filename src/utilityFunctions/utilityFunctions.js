const setAttributes = (el, attrs) => {
  for (let key in attrs) {
    el[key] = attrs[key];
  }
}

const getRandomNumInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateRandomID = (title) => {
  return `${title}-${getRandomNumInclusive(1, 1000000)}`;
}

const addEventListenerToElems = (elemsArr, event, fn) => {
  elemsArr.forEach(e => {
    e.addEventListener(event, fn);
  })
}

export { setAttributes, getRandomNumInclusive, generateRandomID, addEventListenerToElems };
