import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { ApolloClient, InMemoryCache, gql, ApolloProvider } from "@apollo/client";
import { ReduxStore, history } from "./store/ReduxStore";
import { App } from "./app";
import * as serviceWorker from "./serviceWorker";
import { AuthService } from "./auth/auth-service";
import { userLoading, userSignedIn, userSignedOut } from "./components/user/auth/auth-store.slice";
import firebase from "firebase";

import "./index.scss";
// root load animation
const loader: HTMLElement | null = document.getElementById("loader");
const loading = () => (loader!.style.display = "block");
const loaded = () => (loader!.style.display = "none");

// Init Apollo
let apolloClient = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_ADDRESS || ''}/api`,
  cache: new InMemoryCache()
});

apolloClient.resetStore()
  .catch(error => {
    console.error(error);
  });

// Register Auth State Change observer
const authService = new AuthService();
authService.onAuthStateChanged((user: firebase.User | null) => {
  ReduxStore.dispatch(userLoading())
  if(user) {
      apolloClient = authService.authenticateApolloClient();
      const USER_LOGIN = gql`
      mutation createUserMutation($userInput: UserInput!) {
        createUser(userInput: $userInput) {
          userId
          name
        }
      }
    `;
    apolloClient.mutate({mutation: USER_LOGIN, variables: {
        "userInput": {
          "userId": user.uid,
          "name": user.displayName ? user.displayName : user.email
        }
      }
    }).then(result => console.log(result));
    ReduxStore.dispatch(userSignedIn({ user }));
  } else {
    apolloClient.resetStore();
    ReduxStore.dispatch(userSignedOut());
  }
})

ReactDOM.render(
  <Provider store={ReduxStore}>
    <ConnectedRouter history={history}>
      <ApolloProvider client={apolloClient}>
        <App loading={loading} loaded={loaded} />
      </ApolloProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
