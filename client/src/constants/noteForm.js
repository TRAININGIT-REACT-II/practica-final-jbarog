import {objectMap} from "utils/object.helpers";

export const NOTE_FORM_CONF = {
  title: {
    default:"",
    min:2,
    max:100,
  },
  content: {
    default:"",
    min:2,
    max:1000,
  },
};
export const DEFAULT_NOTE_FORM_STATE = objectMap(NOTE_FORM_CONF, fieldObj=>fieldObj.default)
