import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { ApolloClient, InMemoryCache, gql, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { ReduxStore, history } from "./store/ReduxStore";
import { App } from "./app";
import * as serviceWorker from "./serviceWorker";
import { authService, getToken } from "./auth/auth-service";
import { userLoading, userSignedIn, userSignedOut } from "./components/user/auth/auth-store.slice";

import "./index.scss";

// root load animation
const loader: HTMLElement | null = document.getElementById("loader");
const loading = () => (loader!.style.display = "block");
const loaded = () => (loader!.style.display = "none");

// Init Apollo
let apolloClient = new ApolloClient({
  uri: 'https://localhost:5001/api',
  cache: new InMemoryCache()
});

apolloClient.resetStore()
  .catch(error => {
    console.error(error);
  });

// Register Auth State Change observer
authService.onAuthStateChanged((user) => {
  ReduxStore.dispatch(userLoading())
  if(user) {
    const httpLink = createHttpLink({
      uri: 'https://localhost:5001/api',
    });
    const authLink = setContext((_, { headers }) => {
      // get the authentication token 
      const token = getToken();
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });
    apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
    });
    const USER_LOGIN =  gql`
      mutation AddTodo($type: String!) {
        addTodo(type: $type) {
          id
          type
        }
      }
    `;
    apolloClient.mutate({mutation: USER_LOGIN}).then(result => console.log(result));
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
