import React from "react";
import { Route, RouteProps } from "react-router-dom";

import { useIsAuthenticated } from "../../auth";
import { useHistory } from "react-router";

const AuthenticatedRoute = (props: RouteProps) => {
  const isAuthenticated = useIsAuthenticated();
  const history = useHistory();

  if (!isAuthenticated) history.replace("/login");

  return <Route {...props} />;
};

export default AuthenticatedRoute;
