import React from "react";
import { Route } from "react-router";
import { useSelector } from "react-redux";

import { Layout } from "./components/layout/layout";
import { Home } from "./components/home";
import { Counter } from "./components/counter/counter";
import { ApplicationPaths } from "./components/auth/api-auth-constants";
import { ProtectedRoute } from "./components/auth/protected-route";
import { LoginMenu } from "./components/auth/login-menu";
import { SignUpMenu } from "./components/auth/sign-up-menu";
import { selectUserLoading } from "./components/auth/auth-store.slice";
import { ApiAuthorizationRoutes } from "./components/auth/api-auth-routes";
import { LogoutMenu } from "./components/auth/logout-menu";
import { Profile } from "./components/auth/profile";
import { UserManager } from "oidc-client";
import { InProgress } from "./components/in-progress";

import "./app.scss";
import {Campaigns} from "./components/campaigns/campaigns";

export interface AppProps {
  loading: () => void;
  loaded: () => void;
  userManager: UserManager;
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
          <Route path="/login" render={ (routerProps) => <LoginMenu {...routerProps} userManager={props.userManager}/> }/>
          <Route path="/logout" render={ (routerProps) => <LogoutMenu {...routerProps} userManager={props.userManager}/> }/>
          <Route path="/signup" component={SignUpMenu} />

          <Route path="/campaigns" component={Campaigns} />
          <Route path="/characters" component={InProgress}/>
          <Route path="/roll-initiative" component={InProgress}/>
          <Route path="/boblin" component={InProgress}/>
          <Route path="/loot" component={InProgress}/>
          
          <Route path="/profile" render={ (routerProps) => <Profile {...routerProps} userManager={props.userManager}/> }/>
          <Route
            path={ApplicationPaths.ApiAuthorizationPrefix}
            render={ (routerProps) => <ApiAuthorizationRoutes {...routerProps} userManager={props.userManager}/> }
          />
        </Layout>
      </>
    );
  }
};

export default App;
