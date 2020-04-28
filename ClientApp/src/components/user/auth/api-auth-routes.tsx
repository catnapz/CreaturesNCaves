import React from "react";
import { Route } from "react-router-dom";
import { ApplicationPaths } from "./api-auth-constants";
import { LoginCallback } from "../login/login-callback";
import { LogoutCallback } from "../logout/logout-callback";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserManager } from "./auth-store.slice";

export const ApiAuthorizationRoutes = () => {
  const histroy = useHistory();
  const userManager = useSelector(selectUserManager);

  return (
    <>
      <Route
        exact
        path={ApplicationPaths.LoginCallback}
        render={routerProps => (
          <LoginCallback
            {...routerProps}
            userManager={userManager!}
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
            userManager={userManager!}
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
