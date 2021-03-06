import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { selectUser } from "./auth-store.slice";

export interface ProtectedRouteProps extends RouteProps {
  component: any;
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { component: Component, ...rest } = props;
  const authenticated = useSelector(selectUser);

  if (!!Component && authenticated) {
    return (
      <>
        <Route {...rest} render={routeProps => <Component {...routeProps} />} />
      </>
    );
  } else {
    return (
      <>
        <Route
          {...rest}
          render={routeProps => (
            <Redirect
              to={{ pathname: "/login", state: { from: routeProps.location } }}
            />
          )}
        />
      </>
    );
  }
};
