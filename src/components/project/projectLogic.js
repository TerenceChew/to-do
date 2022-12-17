import * as utilityFunctions from "../../modules/utilityFunctions/utilityFunctions";

const projectFactory = (title, idFromData, todosArrFromData) => {
  const id = idFromData || utilityFunctions.generateRandomID(title);
  let todosArr = todosArrFromData || [];

  // Getting
  const getTitle = () => title;
  const getTodosArr = () => todosArr;
  const getId = () => id;

  // Editing
  const editTitle = (newTitle) => {
    // eslint-disable-next-line no-param-reassign
    title = newTitle;
  };

  const pushToTodosArr = (todoItem) => {
    todosArr.push(todoItem);
  };

  // eslint-disable-next-line no-shadow
  const removeFromTodosArr = (id) => {
    todosArr = todosArr.filter((e) => e.getId() !== id);
  };

  return {
    getTitle,
    getTodosArr,
    getId,
    editTitle,
    pushToTodosArr,
    removeFromTodosArr,
  };
};

export default projectFactory;
