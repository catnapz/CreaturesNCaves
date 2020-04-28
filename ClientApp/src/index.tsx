import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ReduxStore, history } from "./store/ReduxStore";
import { App } from "./app";
import * as serviceWorker from "./serviceWorker";
import { initUserManager, loadUser } from "./components/user/auth/auth-service";
import { UserManager } from "oidc-client";
import { AuthProvider } from "./components/user/auth/auth-provider";
import "./index.scss";

// root load animation
const loader: HTMLElement | null = document.getElementById("loader");
const loading = () => (loader!.style.display = "block");
const loaded = () => (loader!.style.display = "none");

const apolloClient = new ApolloClient({
  uri: 'https://localhost:5001/api',
});
apolloClient.resetStore()
  .catch(error => {
    console.error(error);
  });

initUserManager()
  .then((userManager: UserManager | null) => {
    if (userManager !== null) {
      loadUser(userManager, ReduxStore).then(user => {

        ReactDOM.render(
          <Provider store={ReduxStore}>
            <ConnectedRouter history={history}>
              <AuthProvider userManager={userManager}>
                <ApolloProvider client={apolloClient}>
                  <App loading={loading} loaded={loaded} />
                </ApolloProvider>
              </AuthProvider>
            </ConnectedRouter>
          </Provider>,
          document.getElementById("root")
        );
      })
        .catch(error => {
          console.error(error);
        })
    }
  })

  .catch(error => {
    console.log(error);
    // render error page?
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
