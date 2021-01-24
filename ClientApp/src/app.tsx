import React from "react";
import { Route } from "react-router";
import { useSelector } from "react-redux";

import { Layout } from "./components/layout/layout";
import { Home } from "./components/pages/home/home";
import { Counter } from "./components/pages/counter/counter";
import { ProtectedRoute } from "./components/pages/user/auth/protected-route";
import { LoginMenu } from "./components/pages/user/login/firebase-login";
import { SignUpMenu } from "./components/pages/user/sign-up/sign-up-menu";
import { selectUserLoading } from "./components/pages/user/auth/auth-store.slice";
import { Profile } from "./components/pages/user/profile/profile";
import { InProgress } from "./components/in-progress/in-progress";
import { Campaigns } from "./components/pages/campaigns/campaigns";

import "./app.scss";

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

          <ProtectedRoute path="/campaigns" component={Campaigns} />
          <ProtectedRoute path="/characters" component={InProgress}/>
          <Route path="/roll-initiative" component={InProgress}/>
          <Route path="/boblin" component={InProgress}/>
          <Route path="/loot" component={InProgress}/>
          
        </Layout>
      </>
    );
  }
};

export default App;
