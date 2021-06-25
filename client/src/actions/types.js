import {arrayToObject} from "utils/array.helpers";

const actions = [
  // notes
  "SET_NOTES",
  "CREATE_NOTE",
  "UPDATE_NOTE",
  "REMOVE_NOTE",
];

const actionTypes = arrayToObject(actions);

export default actionTypes;
