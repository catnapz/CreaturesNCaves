import React from "react";
import ReactDOM from "react-dom";
import {Provider as ReduxProvider} from "react-redux";
import {ApolloProvider} from "@apollo/client";
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import reportWebVitals from "./reportWebVitals";
import reduxStore from "./store";
import client from "./api";
import AuthProvider from "./auth";
import "./index.scss";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer/>
    <ReduxProvider store={reduxStore}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </AuthProvider>
      </ApolloProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
