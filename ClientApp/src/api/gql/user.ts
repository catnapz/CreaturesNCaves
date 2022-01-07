import { gql } from "@apollo/client";
export type { MutationCreateUserArgs, UserInput, User } from "../types";

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      id: userId
      name
    }
  }
`;

// export const queries = {}
export const mutations = { CREATE_USER_MUTATION };
