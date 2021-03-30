import React from "react";
import { Route, Switch } from "react-router-dom";

import { initFontAwesome } from "./components/icons/font-awesome";
import AuthenticatedRoute from "./components/authenticated-route/authenticated-route";

import { LandingPage, Layout, Login, SignUp, TestPage } from "./views";
import "./App.scss";

initFontAwesome();

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/test" component={TestPage} />
        <Route path="/roll-initiative" render={() => <p>In Progress</p>} />
        <Route path="/boblin" render={() => <p>In Progress</p>} />
        <Route path="/loot" render={() => <p>In Progress</p>} />

        <AuthenticatedRoute path="/profile" render={() => <p>In Progress</p>} />
        <AuthenticatedRoute
          path="/campaigns"
          render={() => <p>In Progress</p>}
        />
        <AuthenticatedRoute
          path="/characters"
          render={() => <p>In Progress</p>}
        />
      </Switch>
    </Layout>
  );
}

export default App;
