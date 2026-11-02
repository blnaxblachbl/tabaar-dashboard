/* eslint-disable */
// @ts-nocheck
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type LoginUserInput = {
  email: string;
  password: string;
};

export type UserFragmentFragment = { id: number, createdAt: unknown, updatedAt: unknown, name: string, email: string };

export type LoginUserMutationVariables = Exact<{
  data: LoginUserInput;
}>;


export type LoginUserMutation = { loginUser: { accessToken: string, refreshToken: string, user: { id: number, createdAt: unknown, updatedAt: unknown, name: string, email: string } } };

export type FindMeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMeQuery = { findMe: { id: number, createdAt: unknown, updatedAt: unknown, name: string, email: string } | null };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  createdAt
  updatedAt
  name
  email
}
    `;
export const LoginUserDocument = gql`
    mutation LoginUser($data: LoginUserInput!) {
  loginUser(data: $data) {
    user {
      ...UserFragment
    }
    accessToken
    refreshToken
  }
}
    ${UserFragmentFragmentDoc}`;
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const FindMeDocument = gql`
    query FindMe {
  findMe {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useFindMeQuery__
 *
 * To run a query within a React component, call `useFindMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FindMeQuery, FindMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FindMeQuery, FindMeQueryVariables>(FindMeDocument, options);
      }
export function useFindMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindMeQuery, FindMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FindMeQuery, FindMeQueryVariables>(FindMeDocument, options);
        }
// @ts-ignore
export function useFindMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FindMeQuery, FindMeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindMeQuery, FindMeQueryVariables>;
export function useFindMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindMeQuery, FindMeQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FindMeQuery | undefined, FindMeQueryVariables>;
export function useFindMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FindMeQuery, FindMeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FindMeQuery, FindMeQueryVariables>(FindMeDocument, options);
        }
export type FindMeQueryHookResult = ReturnType<typeof useFindMeQuery>;
export type FindMeLazyQueryHookResult = ReturnType<typeof useFindMeLazyQuery>;
export type FindMeSuspenseQueryHookResult = ReturnType<typeof useFindMeSuspenseQuery>;
export type FindMeQueryResult = ApolloReactCommon.QueryResult<FindMeQuery, FindMeQueryVariables>;