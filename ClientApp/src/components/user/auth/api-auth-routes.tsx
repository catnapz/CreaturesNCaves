import React from "react";
import { Route } from "react-router-dom";
import { ApplicationPaths } from "./api-auth-constants";
import { LoginCallback } from "../login/login-callback";
import { LogoutCallback } from "../logout/logout-callback";
import { UserManager } from "oidc-client";
import { useHistory, useLocation, Redirect } from "react-router-dom";

export const ApiAuthorizationRoutes = (props: { userManager: UserManager }) => {
  const histroy = useHistory();
  const location = useLocation();

  return (
    <>
      <Route
        exact
        path={ApplicationPaths.LoginCallback}
        render={routerProps => (
          <LoginCallback
            {...routerProps}
            userManager={props.userManager}
            successCallback={user => histroy.replace("/")}
            errorCallback={error => {
              histroy.push("/");
              console.error(error);
            }}
          />
        )}
      />

      <Route
        exact
        path={ApplicationPaths.LogOutCallback}
        render={routerProps => (
          <LogoutCallback
            {...routerProps}
            userManager={props.userManager}
            successCallback={() => histroy.push("/")}
            errorCallback={error => {
              histroy.push("/");
              console.error(error);
            }}
          />
        )}
      />
    </>
  );
};
