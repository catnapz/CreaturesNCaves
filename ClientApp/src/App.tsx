import React from "react";
import { Route, Routes } from "react-router-dom";

import { initFontAwesome } from "./components/icons/font-awesome";
import { Protected } from "./components/authenticated-route/authenticated-route";

import { LandingPage, Layout, Login, SignUp, TestPage } from "./views";
import "./App.scss";

initFontAwesome();

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/roll-initiative" element={<p>In Progress</p>} />
        <Route path="/boblin" element={<p>In Progress</p>} />
        <Route path="/loot" element={<p>In Progress</p>} />

        <Route path="/profile" element={<Protected><p>In Progress</p></Protected>} />
        <Route
          path="/campaigns"
          element={<Protected><p>In Progress</p></Protected>} />
        <Route
          path="/characters"
          element={<Protected><p>In Progress</p></Protected>} />
      </Routes>
    </Layout>
  );
}

export default App;
