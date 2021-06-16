import {objectMap} from "utils/object.helpers";

export const AUTH_FORM_CONF = {
  name: {
    default:"",
    min:2,
    max:10,
  },
  password: {
    default:"",
    min:2,
    max:10,
  },
};
export const DEFAULT_AUTH_FORM_STATE = objectMap(AUTH_FORM_CONF, fieldObj=>fieldObj.default)
export const PASSWORD_MODES = {
  text:'text',
  password:'password',
}
