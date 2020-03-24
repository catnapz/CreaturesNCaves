import React from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ReduxStore, history } from "./store/ReduxStore";
import { App } from "./app";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";
import { initializeUserManager } from "./api-authorization/auth-store.slice";
import { InitUserManager } from "./api-authorization/auth-service";

// root load animation
const loader: HTMLElement | null = document.getElementById("loader");
const loading = () => (loader!.style.display = "block");
const loaded = () => (loader!.style.display = "none");
InitUserManager(ReduxStore);
// const apiEndpointHostname = "localhost:5001";
// const apolloClient = new ApolloClient({
//   uri: "https://" + apiEndpointHostname + "/api"
// });

// apolloClient
//   .query({
//     query: gql`
//       {
//         user(userId: "1") {
//           name
//           campaign(campaignId: "11") {
//             name
//             campaignId
//           }
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

ReactDOM.render(
  <Provider store={ReduxStore}>
    <ConnectedRouter history={history}>
      {/* <ApolloProvider client={apolloClient}> */}
        <App loading={loading} loaded={loaded} />
      {/* </ApolloProvider> */}
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
