import compareAsc from "date-fns/compareAsc";

const sortObjsByDateAsc = (objsArr) =>
  objsArr.sort((a, b) =>
    compareAsc(new Date(a.getDueDate()), new Date(b.getDueDate()))
  );

const noProjectsFound = (arr, mode) => !arr.length && mode === "projects";

const noTodosFound = (arr) => !arr.length;

export { sortObjsByDateAsc, noProjectsFound, noTodosFound };
