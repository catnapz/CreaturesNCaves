import React from "react";
import { Route } from "react-router";
import { useSelector } from "react-redux";

import { Layout } from "./components/layout/layout";
import { Home } from "./components/home";
import { Counter } from "./components/counter/counter";
import { ApplicationPaths } from "./components/user/auth/api-auth-constants";
import { ProtectedRoute } from "./components/user/auth/protected-route";
import { LoginMenu } from "./components/user/login/login-menu";
import { SignUpMenu } from "./components/user/sign-up/sign-up-menu";
import { selectUserLoading } from "./components/user/auth/auth-store.slice";
import { ApiAuthorizationRoutes } from "./components/user/auth/api-auth-routes";
import { Profile } from "./components/user/profile/profile";
import { InProgress } from "./components/in-progress";

import "./app.scss";
import {Campaigns} from "./components/campaigns/campaigns";

export interface AppProps {
  loading: () => void;
  loaded: () => void;
}

export const App = (props: AppProps) => {
  const loading = useSelector(selectUserLoading);
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
          <Route path="/login" component={LoginMenu}/>
          <Route path="/signup" component={SignUpMenu} />
          <Route path="/profile" component={Profile}/>

          <Route path="/campaigns" component={Campaigns} />
          <Route path="/characters" component={InProgress}/>
          <Route path="/roll-initiative" component={InProgress}/>
          <Route path="/boblin" component={InProgress}/>
          <Route path="/loot" component={InProgress}/>
          

          <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes}/>
        </Layout>
      </>
    );
  }
};

export default App;
