import React from "react";
import { Route } from "react-router-dom";

const Route404 = ({ children, ...others }) => {

  return (
    <Route path="*">
      <div>
        Route not found
      </div>
    </Route>
  );
};

export default Route404;
