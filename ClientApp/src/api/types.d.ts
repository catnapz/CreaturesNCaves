import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER'
}

export type Campaign = {
  __typename?: 'Campaign';
  campaignId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  user?: Maybe<User>;
  userId: Scalars['ID'];
};

export type CampaignInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCampaign: Campaign;
  createUser: User;
  deleteCampaign: Scalars['Boolean'];
};


export type MutationCreateCampaignArgs = {
  campaignInput: CampaignInput;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationDeleteCampaignArgs = {
  campaignId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  /** Return a list of all campaigns */
  allCampaigns?: Maybe<Array<Maybe<Campaign>>>;
  /** Return current user */
  me?: Maybe<User>;
  /** Return a user by id */
  user?: Maybe<User>;
  /** Return a list of all users */
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  /** Return a campaigns by campaignId */
  campaign?: Maybe<Campaign>;
  /** Return a list of all campaigns */
  campaigns?: Maybe<Array<Maybe<Campaign>>>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['ID'];
};


export type UserCampaignArgs = {
  campaignId: Scalars['ID'];
};

export type UserInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateUserMutationMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type CreateUserMutationMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', name: string, id: string } };

export type GetUsersNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersNamesQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', name: string } | null | undefined> | null | undefined };


export const CreateUserMutationDocument = gql`
    mutation CreateUserMutation($userInput: UserInput!) {
  createUser(userInput: $userInput) {
    id: userId
    name
  }
}
    `;
export type CreateUserMutationMutationFn = Apollo.MutationFunction<CreateUserMutationMutation, CreateUserMutationMutationVariables>;

/**
 * __useCreateUserMutationMutation__
 *
 * To run a mutation, you first call `useCreateUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutationMutation, { data, loading, error }] = useCreateUserMutationMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useCreateUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutationMutation, CreateUserMutationMutationVariables>(CreateUserMutationDocument, options);
      }
export type CreateUserMutationMutationHookResult = ReturnType<typeof useCreateUserMutationMutation>;
export type CreateUserMutationMutationResult = Apollo.MutationResult<CreateUserMutationMutation>;
export type CreateUserMutationMutationOptions = Apollo.BaseMutationOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>;
export const GetUsersNamesDocument = gql`
    query GetUsersNames {
  users {
    name
  }
}
    `;

/**
 * __useGetUsersNamesQuery__
 *
 * To run a query within a React component, call `useGetUsersNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersNamesQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersNamesQuery, GetUsersNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersNamesQuery, GetUsersNamesQueryVariables>(GetUsersNamesDocument, options);
      }
export function useGetUsersNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersNamesQuery, GetUsersNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersNamesQuery, GetUsersNamesQueryVariables>(GetUsersNamesDocument, options);
        }
export type GetUsersNamesQueryHookResult = ReturnType<typeof useGetUsersNamesQuery>;
export type GetUsersNamesLazyQueryHookResult = ReturnType<typeof useGetUsersNamesLazyQuery>;
export type GetUsersNamesQueryResult = Apollo.QueryResult<GetUsersNamesQuery, GetUsersNamesQueryVariables>;