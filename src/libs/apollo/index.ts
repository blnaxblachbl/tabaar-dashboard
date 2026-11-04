import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  Observable,
} from "@apollo/client";
import { ApolloLink } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { SetContextLink } from "@apollo/client/link/context";
import { RestLink } from "apollo-link-rest";

import { SAVED_ACCESS_TOKEN_KEY } from "@/utils/constants";
import { refreshToken } from "@/api";

const withToken = new SetContextLink((prev) => ({
  ...prev,
  headers: {
    ...prev.headers,
    authorization: `Bearer ${localStorage.getItem(SAVED_ACCESS_TOKEN_KEY)}`,
  },
}));

const httpLink = new HttpLink({
  uri: "/graphql",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const restLink = new RestLink({
  uri: "/api",
  headers: {
    authorization: `Bearer ${localStorage.getItem(SAVED_ACCESS_TOKEN_KEY)}`,
  },
});

const authLink = withToken.concat(httpLink);

const refreshTokenOserver = (
  operation: ApolloLink.Operation,
  forward: ApolloLink.ForwardFunction,
) => {
  return new Observable<ApolloLink.Result>((observer) => {
    refreshToken()
      .then(() => {
        const subscriber = {
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        };
        forward(operation).subscribe(subscriber);
      })
      .catch(() => observer.error(observer));
  });
};

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  let shuldForward = false;
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) => {
      if (import.meta.env.DEV) {
        console.log(
          `[GraphQL error]: Message: ${message}, Code: ${extensions?.code}, Operation: ${operation.operationName}`,
        );
      }
      if (extensions?.code === "TOKEN_EXPIRED") {
        shuldForward = true;
      }
    });
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) => {
      if (import.meta.env.DEV) {
        console.log(
          `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
            extensions,
          )}`,
        );
      }
    });
  } else {
    if (import.meta.env.DEV) {
      console.log(`[Network error]: ${error}`);
    }
  }
  if (shuldForward) {
    return refreshTokenOserver(operation, forward);
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, restLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        keyFields: ["id"],
      },
      User: {
        keyFields: ["id"],
      },
      ApiKey: {
        keyFields: ["id"],
      },
    },
  }),
});
