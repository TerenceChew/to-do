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

const getTodayInYYYYMMDD = () => {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export { setAttributes, getRandomNumInclusive, generateRandomID, addEventListenerToElems, getTodayInYYYYMMDD };
