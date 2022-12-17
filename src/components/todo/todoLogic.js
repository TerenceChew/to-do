/* eslint-disable no-param-reassign */
import format from "date-fns/format";
import * as utilityFunctions from "../../modules/utilityFunctions/utilityFunctions";

const todoFactory = (checked, title, notes, dueDate, priority, idFromData) => {
  const id = idFromData || utilityFunctions.generateRandomID(title);

  // Getting
  const getChecked = () => checked;
  const getTitle = () => title;
  const getNotes = () => notes;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getId = () => id;

  // Editing
  const editChecked = () => {
    checked = !checked;
  };
  const editTitle = (newTitle) => {
    title = newTitle;
  };
  const editNotes = (newNotes) => {
    notes = newNotes;
  };
  const editDueDate = (newDueDate) => {
    dueDate = newDueDate;
  };
  const editPriority = (newPriority) => {
    priority = newPriority;
  };

  return {
    getChecked,
    getTitle,
    getNotes,
    getDueDate,
    getPriority,
    getId,
    editChecked,
    editTitle,
    editNotes,
    editDueDate,
    editPriority,
  };
};

// Format "2022-12-30" to "30th Dec"
const formatDueDate = (dueDate) => {
  const [y, m, d] = dueDate.split("-");
  const processedM = Number(m) - 1;

  return format(new Date(y, processedM, d), "do MMM");
};

const splitDueDate = (formattedDueDate) => {
  const day = formattedDueDate.slice(0, -6);
  const ordinalIndicator = formattedDueDate.slice(-6, -4);
  const month = formattedDueDate.slice(-4);

  return { day, ordinalIndicator, month };
};

export { todoFactory, formatDueDate, splitDueDate };
