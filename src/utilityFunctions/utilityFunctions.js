const setAttributes = (el, attrs) => {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
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

export { setAttributes, getRandomNumInclusive, generateRandomID };
