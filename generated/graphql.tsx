import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Feed = {
  __typename?: 'Feed';
  count: Scalars['Int'];
  id?: Maybe<Scalars['ID']>;
  links: Array<Link>;
};

export type Link = {
  __typename?: 'Link';
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['Int'];
  postedBy?: Maybe<User>;
  url: Scalars['String'];
  voters: Array<User>;
};

export type LinkOrderByInput = {
  createdAt?: InputMaybe<Sort>;
  description?: InputMaybe<Sort>;
  url?: InputMaybe<Sort>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<RegisterResponse>;
  login?: Maybe<LoginResponse>;
  post: Link;
  vote?: Maybe<Vote>;
};


export type MutationCreateAccountArgs = {
  credentials: LoginCredentials;
};


export type MutationLoginArgs = {
  credentials: LoginCredentials;
};


export type MutationPostArgs = {
  description: Scalars['String'];
  url: Scalars['String'];
};


export type MutationVoteArgs = {
  linkId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  feed: Feed;
  implicitLogin?: Maybe<ImplicitLoginResponse>;
};


export type QueryFeedArgs = {
  filter?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Array<LinkOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  links: Array<Link>;
  name: Scalars['String'];
  votes: Array<Link>;
};

export type Vote = {
  __typename?: 'Vote';
  link: Link;
  user: User;
};

export type ImplicitLoginResponse = {
  __typename?: 'implicitLoginResponse';
  loggedIn: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
};

export type LoginCredentials = {
  name: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'loginResponse';
  message: Scalars['String'];
  user?: Maybe<User>;
};

export type RegisterResponse = {
  __typename?: 'registerResponse';
  message: Scalars['String'];
  user?: Maybe<User>;
};

export type LoginMutationVariables = Exact<{
  credentials: LoginCredentials;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'loginResponse', message: string, user?: { __typename?: 'User', name: string } | null } | null };

export type ImplicitLoginQueryVariables = Exact<{ [key: string]: never; }>;


export type ImplicitLoginQuery = { __typename?: 'Query', implicitLogin?: { __typename?: 'implicitLoginResponse', loggedIn: boolean, name?: string | null } | null };

export type VoteMutationVariables = Exact<{
  voteLinkId2: Scalars['Int'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote?: { __typename?: 'Vote', link: { __typename?: 'Link', url: string, description: string }, user: { __typename?: 'User', name: string } } | null };

export type FeedQueryVariables = Exact<{
  filter?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LinkOrderByInput> | LinkOrderByInput>;
}>;


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', links: Array<{ __typename?: 'Link', url: string, description: string, id: number, createdAt?: any | null, postedBy?: { __typename?: 'User', name: string } | null, voters: Array<{ __typename?: 'User', name: string }> }> } };

export type CreateAccountMutationVariables = Exact<{
  credentials: LoginCredentials;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount?: { __typename?: 'registerResponse', message: string, user?: { __typename?: 'User', name: string } | null } | null };

export type PostMutationVariables = Exact<{
  description: Scalars['String'];
  url: Scalars['String'];
}>;


export type PostMutation = { __typename?: 'Mutation', post: { __typename?: 'Link', id: number, url: string, description: string, createdAt?: any | null } };


export const LoginDocument = gql`
    mutation Login($credentials: loginCredentials!) {
  login(credentials: $credentials) {
    message
    user {
      name
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ImplicitLoginDocument = gql`
    query implicitLogin {
  implicitLogin {
    loggedIn
    name
  }
}
    `;

/**
 * __useImplicitLoginQuery__
 *
 * To run a query within a React component, call `useImplicitLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useImplicitLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImplicitLoginQuery({
 *   variables: {
 *   },
 * });
 */
export function useImplicitLoginQuery(baseOptions?: Apollo.QueryHookOptions<ImplicitLoginQuery, ImplicitLoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImplicitLoginQuery, ImplicitLoginQueryVariables>(ImplicitLoginDocument, options);
      }
export function useImplicitLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImplicitLoginQuery, ImplicitLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImplicitLoginQuery, ImplicitLoginQueryVariables>(ImplicitLoginDocument, options);
        }
export type ImplicitLoginQueryHookResult = ReturnType<typeof useImplicitLoginQuery>;
export type ImplicitLoginLazyQueryHookResult = ReturnType<typeof useImplicitLoginLazyQuery>;
export type ImplicitLoginQueryResult = Apollo.QueryResult<ImplicitLoginQuery, ImplicitLoginQueryVariables>;
export const VoteDocument = gql`
    mutation Vote($voteLinkId2: Int!) {
  vote(linkId: $voteLinkId2) {
    link {
      url
      description
    }
    user {
      name
    }
  }
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      voteLinkId2: // value for 'voteLinkId2'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const FeedDocument = gql`
    query Feed($filter: String, $skip: Int, $take: Int, $orderBy: [LinkOrderByInput!]) {
  feed(filter: $filter, skip: $skip, take: $take, orderBy: $orderBy) {
    links {
      url
      description
      id
      createdAt
      postedBy {
        name
      }
      voters {
        name
      }
    }
  }
}
    `;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFeedQuery(baseOptions?: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const CreateAccountDocument = gql`
    mutation CreateAccount($credentials: loginCredentials!) {
  createAccount(credentials: $credentials) {
    message
    user {
      name
    }
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const PostDocument = gql`
    mutation Post($description: String!, $url: String!) {
  post(description: $description, url: $url) {
    id
    url
    description
    createdAt
  }
}
    `;
export type PostMutationFn = Apollo.MutationFunction<PostMutation, PostMutationVariables>;

/**
 * __usePostMutation__
 *
 * To run a mutation, you first call `usePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMutation, { data, loading, error }] = usePostMutation({
 *   variables: {
 *      description: // value for 'description'
 *      url: // value for 'url'
 *   },
 * });
 */
export function usePostMutation(baseOptions?: Apollo.MutationHookOptions<PostMutation, PostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostMutation, PostMutationVariables>(PostDocument, options);
      }
export type PostMutationHookResult = ReturnType<typeof usePostMutation>;
export type PostMutationResult = Apollo.MutationResult<PostMutation>;
export type PostMutationOptions = Apollo.BaseMutationOptions<PostMutation, PostMutationVariables>;