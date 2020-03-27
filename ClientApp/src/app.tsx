import React from "react";
import { Route } from "react-router";
import { useSelector } from "react-redux";
import { fromPromise } from "apollo-boost";

import { Layout } from "./components/layout/layout";
import { Home } from "./components/home";
import { Counter } from "./components/counter/counter";
import { ApplicationPaths } from "./components/auth/api-auth-constants";
import { ProtectedRoute } from "./components/auth/protected-route";
import { LoginMenu } from "./components/auth/login-menu";
import { SignUpMenu } from "./components/auth/sign-up-menu";
import { selectAuthCheckLoading } from "./components/auth/auth-store.slice";
import { ApiAuthorizationRoutes } from "./components/auth/api-auth-routes";
import { LogoutMenu } from "./components/auth/logout-menu";
import { Profile } from "./components/auth/profile";

import "./app.scss";

export interface AppProps {
  loading: () => void;
  loaded: () => void;
}

export const App = (props: AppProps) => {
  const loading = useSelector(selectAuthCheckLoading);

  if (loading) {
    props.loading();
    return <></>;
  } else {
    props.loaded();
    return (
      <>
        <Layout>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/counter" component={Counter} />
          <Route path="/login" component={LoginMenu} />
          <Route path="/logout" component={LogoutMenu} />
          <Route path="/signup" component={SignUpMenu} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route
            path={ApplicationPaths.ApiAuthorizationPrefix}
            component={ApiAuthorizationRoutes}
          />
        </Layout>
      </>
    );
  }
};

export default App;
