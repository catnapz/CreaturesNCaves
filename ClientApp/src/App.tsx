import React from "react";
import { Route, Routes } from "react-router-dom";

import { initFontAwesome } from "./components/icons/font-awesome";
import AuthenticatedRoute from "./components/authenticated-route/authenticated-route";

import { LandingPage, Layout, Login, SignUp, TestPage } from "./views";
import "./App.scss";

initFontAwesome();

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"> <LandingPage /> </Route>
        <Route path="/login"> <Login /> </Route>
        <Route path="/sign-up"> <SignUp /> </Route>
        <Route path="/test"> <TestPage /> </Route>
        <Route path="/roll-initiative">
          <p>In Progress</p>
        </Route>
        <Route path="/boblin">
          <p>In Progress</p>
        </Route>
        <Route path="/loot">
          <p>In Progress</p>
        </Route>

        <AuthenticatedRoute path="/profile">
          <p>In Progress</p>
        </AuthenticatedRoute>
        <AuthenticatedRoute
          path="/campaigns"
        >
          <p>In Progress</p>
        </AuthenticatedRoute>
        <AuthenticatedRoute
          path="/characters"
        >
          <p>In Progress</p>
        </AuthenticatedRoute>
      </Routes>
    </Layout>
  );
}

export default App;
