import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import authService from "../auth/auth.service";

import { mutations, MutationCreateUserArgs, User } from "./gql/user";

const httpLink = createHttpLink({
  uri: "/api",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await authService.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

authService.subscribeToAuthChanges(async (user) => {
  await client.resetStore();
  if (user) {
    client.mutate<User, MutationCreateUserArgs>({
      mutation: mutations.CREATE_USER_MUTATION,
      variables: {
        userInput: {
          userId: user.uid,
          name: user.displayName || user.email || "",
        },
      },
    });
  }
});

export default client;
