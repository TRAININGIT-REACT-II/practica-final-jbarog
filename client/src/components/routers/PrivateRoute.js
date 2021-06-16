import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import Auth from "contexts/auth";

const PrivateRoute = ({ children, ...others }) => {
  const { currentUser } = useContext(Auth);

  console.log("....",currentUser);
  return (
    <Route
      {...others}
      render={() =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { msg: "Session lost" },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
