import { createContext } from "react";

const Auth = createContext({
  currentUser: false,
  updateAuth: () => {}
});

export default Auth;
