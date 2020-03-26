import React from "react";
import { Route } from "react-router-dom";
import { ApplicationPaths } from "./api-auth-constants";
import { LoginCallback } from "./login-callback";
import { Logout } from "./logout";
import { LogoutCallback } from "./logout-callback";
import { SilentRenew } from "./silent-renew";
import { Login } from "./login";

export const ApiAuthorizationRoutes = () => (
  <>
    <Route exact path={ApplicationPaths.Login} component={Login} />
    <Route exact path={"/silentrenew"} component={SilentRenew} /> // add 
    {/* <Route exact path={ApplicationPaths.LoginFailed} component={Logout} /> */}
    <Route exact path={ApplicationPaths.LoginCallback} component={LoginCallback} />
    {/* <Route exact path={ApplicationPaths.Profile} component={} /> */}
    {/* <Route exact path={ApplicationPaths.Register} component={} /> */}
    <Route exact path={ApplicationPaths.LogOut} component={Logout} />
    <Route exact path={ApplicationPaths.LogOutCallback} component={LogoutCallback} />
    {/* <Route exact path={ApplicationPaths.LoggedOut} component={} /> */}
  </>
);
